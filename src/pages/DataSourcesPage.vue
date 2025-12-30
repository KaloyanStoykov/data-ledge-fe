<template>
  <div
    class="w-full bg-primary-100 h-screen dark:bg-primary-500 flex flex-col justify-start items-center p-6 gap-2"
  >
    <Toast />

    <div
      class="w-full h-full bg-white dark:bg-surface-800 rounded-xl shadow-md flex flex-col overflow-hidden"
    >
      <div class="w-full flex justify-between items-center gap-2 p-6 pb-0">
        <div class="w-2/3">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-search p-1"></i>
            </InputGroupAddon>
            <InputText
              v-model="query"
              placeholder="Search by name, description, or URL..."
              class="w-full"
            />
          </InputGroup>
        </div>
        <Button icon="pi pi-plus" label="Create" variant="primary" @click="handleCreate"></Button>
      </div>

      <div class="w-full flex-1 overflow-hidden bg-surface-0 dark:bg-surface-800 p-6 pt-0 flex flex-col">

        <div class="flex-1 flex flex-col min-h-0 relative overflow-hidden">

          <div class="flex-1 flex items-center justify-center" v-if="isLoadingDataSources">
            <ProgressSpinner />
          </div>

          <div v-else class="flex-1 overflow-auto bg-transparent rounded-base">
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

            <div v-if="items.length === 0" class="text-center p-10 text-surface-500">
              No datasources found.
            </div>
          </div>
        </div>

        <Paginator
          :first="page * pageSize"
          :rows="pageSize"
          :totalRecords="totalCount"
          :rowsPerPageOptions="[10, 20, 30]"
          @page="onPageChange"
          class="border-t border-surface-200 dark:border-surface-700"
        />
      </div>
    </div>


    <Dialog v-model:visible="openDialog" modal :header="createSources ? 'Create datasource' : 'Manage Datasource'" :style="{ width: '35rem' }">
      <Tabs value="0">
        <TabList>
          <Tab value="0">Configuration</Tab>
          <Tab v-if="!createSources" value="1">Write Data</Tab>
        </TabList>

        <TabPanels>
          <TabPanel value="0">
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
                <Message
                  v-if="!selectedType && $form.typeId?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                >
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
          </TabPanel>

          <TabPanel value="1">
            <div v-if="getTypeName(initialValues) === 'API'" class="flex flex-col gap-3">
              <label class="text-xs font-bold text-surface-500 uppercase">Target Source URL</label>
              <InputText
                :value="initialValues.url"
                :disabled="true"
                class="bg-surface-100 dark:bg-surface-700 opacity-80 cursor-not-allowed"
                fluid
              />

              <label class="text-xs font-bold text-surface-500 uppercase">Save As (Blob Name)</label>
              <InputText v-model="writeFileName" placeholder="e.g. daily_sync.json" fluid />

              <Button
                label="Execute Fetch"
                icon="pi pi-cloud-download"
                @click="handleApiWrite"
                :loading="isWriting"
                class="mt-2"
              />
            </div>

            <div v-else-if="getTypeName(initialValues).includes('File')" class="flex flex-col gap-3">
              <label class="text-xs font-bold text-surface-500 uppercase">Select File</label>
              <FileUpload
                mode="basic"
                auto
                customUpload
                @select="onFileSelect"
                chooseLabel="Browse Files"
                class="w-full"
              />

              <label class="text-xs font-bold text-surface-500 uppercase">Rename File (Optional)</label>
              <InputText v-model="writeFileName" placeholder="File name in storage" fluid />

              <Button
                label="Upload File"
                icon="pi pi-upload"
                @click="handleFileUpload"
                :loading="isWriting"
                class="mt-2"
              />
            </div>

            <div v-else class="text-center p-4 text-surface-500">
              This data type does not support manual writes.
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms'
import 'primeicons/primeicons.css'
import type { FormSubmitEvent, FormResolverOptions } from '@primevue/forms'
import { InputGroupAddon, InputGroup, Dialog, InputText } from 'primevue'
import Button from 'primevue/button'
import type { CreateDataSource, DataSource, DataType } from '@/export/exports.ts'
import Message from 'primevue/message'
import { onMounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import axios from 'axios'
import FileUpload from 'primevue/fileupload';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import datasourceService from '@/service/datasourceService.ts'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import Paginator from 'primevue/paginator';
import { useToast } from 'primevue/usetoast'

const toast = useToast()


const isWriting = ref(false);
const writeFileName = ref('');
const selectedFile = ref<File | null>(null);
const query = ref('')
const totalCount = ref(0)
const page = ref(0)
const pageSize = ref(10)

// State
const openDialog = ref(false)
const isLoadingDataSources = ref(true)
const items = ref<DataSource[]>([]);
const dataTypes = ref<DataType[]>([]);
const createSources = ref(true)
const selectedType = ref<number | null>(0)

const initialValues = ref<DataSource>({
  name: '',
  typeId: 0,
  description: '',
  id: 0,
  url: '',
  createdAt: new Date(),
  updatedAt: new Date()
})

const getTypeName = (item: DataSource) => {
  // Check nested object first, then top-level ID
  const idToCheck = item.type?.id || item.typeId;

  if (!idToCheck) return 'Unknown';

  const typeObj = dataTypes.value.find((t) => t.id === idToCheck);
  return typeObj ? typeObj.name : `ID: ${idToCheck}`;
}

const onPageChange = (event: any) => {
  page.value = event.page;
  pageSize.value = event.rows;
  fetchItems();
};

const fetchItems = async () => {
  isLoadingDataSources.value = true; // Show spinner while changing pages
  try {
    // Pass page and pageSize to your service
    const result = await datasourceService.getDatasource(page.value, pageSize.value, query.value);
    items.value = result.items || [];
    totalCount.value = result.totalCount;
  } catch (error) {
    // ... error handling
  } finally {
    isLoadingDataSources.value = false;
  }
}

const debouncedSearch = debounce(() => {
  page.value = 0 // Reset to first page on new search
  fetchItems()
}, 400)

// Watch for changes in the search input
watch(query, () => {
  debouncedSearch()
})

watch(openDialog, (isOpen) => {
  if(!isOpen) {
    isWriting.value = false;
    writeFileName.value = '';
    selectedFile.value = null;
  }

})

onMounted(async () => {
  try {
    const dataTypesResult = await datasourceService.getDatasourceTypes()
    dataTypes.value = dataTypesResult.dataTypes
  } catch (e) { console.error(e) }

  // Initial fetch
  await fetchItems()
})

const handleEdit = (data: DataSource) => {
  createSources.value = false

  const currentTypeId = data.type?.id ?? data.typeId

  selectedType.value = currentTypeId

  initialValues.value = {
    ...data,
    typeId: currentTypeId,
  }

  openDialog.value = true
}

const handleCreate = () => {
  createSources.value = true
  selectedType.value = null // Reset dropdown
  initialValues.value = {
    id: 0,
    name: '',
    typeId: 0,
    description: '',
    url: '',
    createdAt: new Date(),
    updatedAt: new Date(),
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
  const values = event.values as DataSource
  const { valid } = event

  // SYNC: Ensure the form value matches the dropdown selection before sending
  if (selectedType.value) {
    values.typeId = selectedType.value
  }

  if (valid && selectedType.value) {
    isLoadingDataSources.value = true

    try {
      if (createSources.value) {
        // Create
        const result = await datasourceService.createDataSources(values)
        console.log(result);
        if (result) {
          console.log('Entered result.data')
          values.id = result.id

          // If API returns specific structure, adapt here. For now pushing values:
          items.value.push(values)

          toast.add({
            severity: 'success',
            summary: 'Created!',
            detail: `Datasource ${values.name} created.`,
            life: 3000,
          })
        }
      } else {
        // Update
        await axios.put(`http://localhost:8080/datasources/${values.id}`, values)

        // Update local state to reflect changes immediately
        const index = items.value.findIndex((i) => i.id === values.id)
        if (index !== -1) {
          // Preserve original structure but update fields
          items.value[index] = {
            ...items.value[index],
            ...values,
            typeId: selectedType.value, // Ensure typeId is updated locally
            updatedAt: new Date(),
          }
        }

        toast.add({
          severity: 'success',
          summary: 'Updated!',
          detail: `Datasource ${values.name} updated.`,
          life: 3000,
        })
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

const onFileSelect = (event: any) => {
  selectedFile.value = event.files[0];
  if (!writeFileName.value) {
    writeFileName.value = selectedFile.value?.name || '';
  }
};


const handleApiWrite = async () => {
  // Use the URL from initialValues (the record being edited)
  const targetUrl = initialValues.value.url;

  if (!targetUrl || !writeFileName.value) {
    toast.add({ severity: 'warn', summary: 'Missing Info', detail: 'File name is required.' });
    return;
  }

  isWriting.value = true;
  try {
    // Pass the datasource's URL directly
    await datasourceService.saveApiContent(targetUrl, writeFileName.value, initialValues.value.id);
    toast.add({ severity: 'success', summary: 'Success', detail: 'API data captured successfully' });
    writeFileName.value = ''; // Clear for next use
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Failure', detail: err.response.data.message });
  } finally {
    isWriting.value = false;
  }
};


const handleFileUpload = async () => {
  if (!selectedFile.value || !writeFileName.value) return;
  isWriting.value = true;
  try {
    await datasourceService.uploadFile(selectedFile.value, writeFileName.value, initialValues.value.id);
    toast.add({ severity: 'success', summary: 'Success', detail: 'File uploaded to Blob Storage' });
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Failure', detail: 'Upload failed' });
  } finally {
    isWriting.value = false;
  }
};
</script>
