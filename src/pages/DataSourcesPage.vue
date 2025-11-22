<template>
  <div
    class="w-full h-full bg-primary-50 dark:bg-primary-500 flex flex-col justify-center items-center p-4 gap-2"
  >
    <Toast />
    <div class="w-11/12 flex justify-between items-center gap-2">
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

    <Dialog
      v-model:visible="openDialog"
      modal
      :header="createSources ? 'Create datasource' : 'Edit Datasource'"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Create a new datasource</span>
      <Form
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="flex flex-col gap-4"
      >
        <div class="flex flex-col gap-1 w-full">
          <InputText name="name" type="text" placeholder="Name" fluid />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
            $form.name.error?.message
          }}</Message>
        </div>
        <div class="flex flex-col gap-1">
          <Select
            :invalid="!selectedType"
            v-model="selectedType"
            :options="dataTypes"
            optionValue="id"
            optionLabel="name"
            name="typeId"
            placeholder="Select a datatype..."
            class="w-full md:w-56"
          />
          <Message v-if="$form.typeId?.invalid" severity="error" size="small" variant="simple">
            {{ $form.typeId.error?.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="description" type="text" placeholder="Description" fluid />
          <Message
            v-if="$form.description?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.description.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="url" type="text" placeholder="URL" fluid />
          <Message v-if="$form.url?.invalid" severity="error" size="small" variant="simple">{{
            $form.url.error?.message
          }}</Message>
        </div>
        <Button type="submit" severity="primary" label="Submit" />
      </Form>
    </Dialog>

    <div class="w-11/12 flex-1">
      <div class="w-full h-max text-center" v-if="isLoadingDataSources">
        <ProgressSpinner />
      </div>
      <DataTable :value="items" v-else>
        <Column field="id" header="Id"></Column>
        <Column field="created" header="Created"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="updated" header="Updated"></Column>
        <Column field="url" header="Url"></Column>
        <Column class="w-10 text-red-300">
          <template #body="{ data }">
            <Button
              icon="pi pi-search"
              variant="outlined"
              severity="secondary"
              size="sm"
              @click="handleEdit(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms'
import 'primeicons/primeicons.css'
import type { FormSubmitEvent } from '@primevue/forms'
import { Column, InputGroupAddon, InputGroup, Dialog, DataTable, InputText } from 'primevue'
import Button from 'primevue/button'
import type { CreateDataSource, DataType } from '@/export/exports.ts'
import Message from 'primevue/message'
import { useAuthStore } from '@/hooks/authStore.ts'
import type { FormResolverOptions } from '@primevue/forms'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore();

onMounted(async () => {
  const result = await axios.get('http://localhost:8080/datasources', {
    params: {
      pageNumber: 0,
      pageSize: 10,
    },
    headers: {
      Authorization : `Bearer ${authStore.token}`
    }
  })

  const dataTypesResult = await axios.get('http://localhost:8080/datasource-types',
    {
      headers: {
        Authorization : `Bearer ${authStore.token}`
      }
    }
  );
  items.value = result.data.items
  console.log(items.value)
  dataTypes.value = dataTypesResult.data.dataTypes
  isLoadingDataSources.value = false
})

const selectedType = ref(0)

const toast = useToast()
const openDialog = ref(false)
const isLoadingDataSources = ref(true)

const items = ref([] as CreateDataSource[])
const dataTypes = ref([] as DataType[])
const text1 = ref('')
const createSources = ref(true)


const handleEdit = (data: CreateDataSource) => {
  console.log(data.type?.id);
  createSources.value = false
  openDialog.value = true
  selectedType.value = 1
  initialValues.value = { ...data }
}

const handleCreate = () => {
  createSources.value = true
  openDialog.value = true
  selectedType.value = 0
  initialValues.value = {
    name: '',
    typeId: 0,
    description: '',
    url: '',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  }
}

const initialValues = ref<CreateDataSource>({
  name: '',
  typeId: 0,
  description: '',
  url: '',
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
})


const resolver = (e: FormResolverOptions) => {
  const values = e.values as CreateDataSource
  const errors: Record<string, { message: string }[]> = {}

  if (!values.name) {
    errors.name = [{ message: 'Name is required.' }]
  }

  if (!values.typeId || values.typeId === 0) {
    errors.typeId = [{ message: 'Type is required.' }]
  }

  if (!values.url) {
    errors.url = [{ message: 'URL is required.' }]
  }

  if (!values.description) {
    errors.description = [{ message: 'Description is required.' }]
  }

  return {
    values,
    errors,
  }
}

const onFormSubmit = async (event: FormSubmitEvent) => {
  const values = event.values as CreateDataSource
  const { valid } = event


  if (valid && selectedType.value > 0) {
    isLoadingDataSources.value = true
    const result = await axios.post('http://localhost:8080/datasources', values)
    if (result.data) {
      values.id = result.data.id
      values.created = new Date().toISOString()
      items.value.push(values)
    }

    toast.add({
      severity: 'success',
      summary: `Created!`,
      detail: `Datasource ${values.name} created successfully.`,
      life: 3000,
    })

    isLoadingDataSources.value = false
    openDialog.value = false
  }
}
</script>
