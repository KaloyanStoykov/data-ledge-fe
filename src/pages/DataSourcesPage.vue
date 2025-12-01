<template>
  <div
    class="w-full bg-primary-100 h-screen dark:bg-primary-500 flex flex-col justify-start items-center p-6 gap-2"
  >
    <Toast />

    <div class="w-full h-full bg-white dark:bg-surface-800 rounded-xl shadow-md flex flex-col overflow-hidden">
      <div class="w-full flex justify-between items-center gap-2 p-6 pb-0">
        <div class="w-2/3">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-search p-1"></i>
            </InputGroupAddon>
            <InputText v-model="text1" placeholder="Search (To be developed) ..." class="w-1/2" />
          </InputGroup>
        </div>
        <Button icon="pi pi-plus" label="Create" variant="primary" @click="handleCreate"></Button>
      </div>

      <div class="w-full flex-1 overflow-auto bg-surface-0 dark:bg-surface-800 p-6 pt-0">

        <div class="w-full h-max text-center pt-10" v-if="isLoadingDataSources">
          <ProgressSpinner />
        </div>

        <div v-else class="relative overflow-x-auto bg-transparent rounded-base">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="border-b-2 border-blue-500 uppercase">
            <tr>
              <th scope="col" class="p-2 pl-0 font-bold">Name</th>
              <th scope="col" class="p-2 pl-0 font-bold">Description</th>
              <th scope="col" class="p-2 pl-0 font-bold">URL</th>
              <th scope="col" class="p-2 pl-0 font-bold">Type</th>
              <th scope="col" class="p-2 pl-0 font-bold text-center">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>

            <tbody class="text-primary-200">
            <tr
              v-for="item in items"
              :key="item.id"
              class="bg-neutral-primary-soft hover:bg-neutral-secondary-medium border-b-1 border-b-primary-400 transition-colors"
            >
              <th scope="row" class="py-3 font-medium text-heading whitespace-nowrap">
                {{ item.name }}
              </th>
              <td class="font-medium">
                {{ item.description }}
              </td>
              <td class="font-medium truncate max-w-[200px]" :title="item.url">
                {{ item.url }}
              </td>
              <td class="font-medium">
                {{ getTypeName(item) }}
              </td>
              <td class="text-center font-medium cursor-pointer hover:text-blue-600" @click="handleEdit(item)">
                <i class="pi pi-cog" style="font-size: 1.5em;"></i>
              </td>
            </tr>
            </tbody>
          </table>

          <div v-if="items.length === 0" class="text-center p-4 text-surface-500">
            No datasources found.
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="openDialog"
      modal
      :header="createSources ? 'Create datasource' : 'Edit Datasource'"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        {{ createSources ? 'Create a new datasource' : 'Update existing datasource' }}
      </span>

      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4"
      >
        <div class="flex flex-col gap-1 w-full">
          <InputText name="name" type="text" placeholder="Name" fluid />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
            {{ $form.name.error?.message }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <Select
            v-model="selectedType"
            :options="dataTypes"
            optionValue="id"
            optionLabel="name"
            name="typeId"
            placeholder="Select a datatype..."
            class="w-full"
            :invalid="!selectedType && $form.typeId?.invalid"
          />
          <Message v-if="!selectedType && $form.typeId?.invalid" severity="error" size="small" variant="simple">
            Type is required.
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <InputText name="description" type="text" placeholder="Description" fluid />
          <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
            {{ $form.description.error?.message }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <InputText name="url" type="text" placeholder="URL" fluid />
          <Message v-if="$form.url?.invalid" severity="error" size="small" variant="simple">
            {{ $form.url.error?.message }}
          </Message>
        </div>

        <Button type="submit" severity="primary" :label="createSources ? 'Create' : 'Update'" />
      </Form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms'
import 'primeicons/primeicons.css'
import type { FormSubmitEvent, FormResolverOptions } from '@primevue/forms'
import { InputGroupAddon, InputGroup, Dialog, InputText } from 'primevue'
import Button from 'primevue/button'
import type { CreateDataSource, DataType } from '@/export/exports.ts'
import Message from 'primevue/message'
import { useAuthStore } from '@/hooks/authStore.ts'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore();
const toast = useToast()

// State
const openDialog = ref(false)
const isLoadingDataSources = ref(true)
const items = ref([] as CreateDataSource[])
const dataTypes = ref([] as DataType[])
const text1 = ref('')
const createSources = ref(true)
const selectedType = ref<number | null>(0)

const initialValues = ref<CreateDataSource>({
  name: '',
  typeId: 0,
  description: '',
  url: '',
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
})

const getTypeName = (item: any) => {
  // Handle case where item has typeId (flat) or item.type.id (nested object)
  const idToCheck = item.typeId ?? item.type?.id;
  const typeObj = dataTypes.value.find(t => t.id === idToCheck);
  return typeObj ? typeObj.name : idToCheck; // Return Name if found, else ID
}

onMounted(async () => {
  isLoadingDataSources.value = true;

  try {
    // 1. Load Data Types (Essential UI data, should run even if data sources fail)
    const dataTypesResult = await axios.get('http://localhost:8080/datasource-types', {});
    dataTypes.value = dataTypesResult.data.dataTypes || [];

    // 2. Load Data Sources (User-specific, may fail with 404/NotFound)
    try {
      const result = await axios.get('http://localhost:8080/datasources', {
        params: { pageNumber: 0, pageSize: 10 },
      });
      items.value = result.data.items || [];
    } catch (error) {
      // If data sources retrieval fails (e.g., 404 Not Found),
      // we log the specific error but continue execution.
      // The user will just see an empty list, but the data types will still be loaded.
      if (error.response && error.response.status === 404) {
        console.info("No data sources found for the user, continuing.", error);
        items.value = []; // Explicitly set to empty array
      } else {
        // Re-throw or handle other critical errors (e.g., 500 server error)
        console.error("Failed to load user data sources:", error);
        items.value = [];
      }
    }

  } catch (error) {
    // This catch block handles CRITICAL failures (like 500 or network issues)
    // with the 'datasource-types' API or any code execution errors.
    console.error("Critical failure during initial data load:", error);
    dataTypes.value = []; // Ensure state is handled
  } finally {
    isLoadingDataSources.value = false;
  }
})

const handleEdit = (data: CreateDataSource) => {
  createSources.value = false

  const currentTypeId = data.typeId ?? data.type?.id;

  selectedType.value = currentTypeId;

  initialValues.value = {
    ...data,
    typeId: currentTypeId
  }

  openDialog.value = true
}

const handleCreate = () => {
  createSources.value = true
  selectedType.value = null // Reset dropdown
  initialValues.value = {
    name: '',
    typeId: 0,
    description: '',
    url: '',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  }
  openDialog.value = true
}

const resolver = (e: FormResolverOptions) => {
  const values = e.values as CreateDataSource
  const errors: Record<string, { message: string }[]> = {}

  if (!values.name) errors.name = [{ message: 'Name is required.' }]
  // Validation: Check the bound variable 'selectedType' specifically
  if (!selectedType.value) errors.typeId = [{ message: 'Type is required.' }]
  if (!values.url) errors.url = [{ message: 'URL is required.' }]
  if (!values.description) errors.description = [{ message: 'Description is required.' }]

  return { values, errors }
}

const onFormSubmit = async (event: FormSubmitEvent) => {
  const values = event.values as CreateDataSource
  const { valid } = event

  // SYNC: Ensure the form value matches the dropdown selection before sending
  if(selectedType.value) {
    values.typeId = selectedType.value;
  }

  if (valid && selectedType.value) {
    isLoadingDataSources.value = true

    try {
      if (createSources.value) {
        // Create
        const result = await axios.post('http://localhost:8080/datasources', values, {
          headers: { Authorization : `Bearer ${authStore.token}` }
        })
        if (result.data) {
          values.id = result.data.id
          values.created = new Date().toISOString()

          // If API returns specific structure, adapt here. For now pushing values:
          items.value.push(values)

          toast.add({ severity: 'success', summary: 'Created!', detail: `Datasource ${values.name} created.`, life: 3000 })
        }
      } else {
        // Update
        await axios.put(`http://localhost:8080/datasources/${values.id}`, values);

        // Update local state to reflect changes immediately
        const index = items.value.findIndex(i => i.id === values.id)
        if (index !== -1) {
          // Preserve original structure but update fields
          items.value[index] = {
            ...items.value[index],
            ...values,
            typeId: selectedType.value, // Ensure typeId is updated locally
            updated: new Date().toISOString()
          }
        }

        toast.add({ severity: 'success', summary: 'Updated!', detail: `Datasource ${values.name} updated.`, life: 3000 })
      }
      openDialog.value = false

    } catch (error) {
      console.error(error)
      toast.add({ severity: 'error', summary: 'Error', detail: 'Operation failed', life: 3000 })
    } finally {
      isLoadingDataSources.value = false
    }
  }
}
</script>
