<template>
<<<<<<< Updated upstream
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
=======
  <div class="w-full h-screen bg-surface-50 dark:bg-surface-950 flex flex-col p-4 md:p-6 overflow-hidden">
    <Toast />

    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 flex-shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 leading-tight">Datasources</h1>
        <p class="text-surface-500 text-sm">Manage your external data integrations and storage.</p>
      </div>
      <Button icon="pi pi-plus" label="Create New" raised @click="handleCreate" class="px-6" />
    </div>

    <div class="flex-1 flex flex-col bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden">

      <div class="p-4 border-b border-surface-100 dark:border-surface-800 blue-gradient">
        <InputGroup class="max-w-md shadow-sm">
          <InputGroupAddon>
            <i class="pi pi-search text-surface-400"></i>
          </InputGroupAddon>
          <InputText
            v-model="query"
            placeholder="Search by name, description, or URL..."
            class="border-none focus:ring-0"
          />
        </InputGroup>
      </div>

      <div class="flex-1 overflow-auto relative">
        <div v-if="isLoadingDataSources" class="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-surface-900/60 z-10 backdrop-blur-sm">
          <ProgressSpinner strokeWidth="4" />
        </div>

        <table class="w-full text-sm text-left border-collapse">
          <thead class="sticky top-0 z-20 bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-300 font-semibold uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Description</th>
            <th class="px-6 py-4">URL</th>
            <th class="px-6 py-4">Type</th>
            <th class="px-6 py-4 text-center">Manage</th>
          </tr>
          </thead>

          <tbody class="divide-y divide-surface-100 dark:divide-surface-800">
          <tr
            v-for="item in items"
            :key="item.id"
            class="hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors group"
          >
            <td class="px-6 py-4 font-bold text-surface-900 dark:text-surface-0">{{ item.name }}</td>
            <td class="px-6 py-4 text-surface-500 max-w-xs truncate">{{ item.description }}</td>
            <td class="px-6 py-4">
              <div class="max-w-[200px] truncate font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded inline-block" :title="item.url">
                {{ item.url }}
              </div>
            </td>
            <td class="px-6 py-4">
              <Tag :value="getTypeName(item)" severity="secondary" rounded />
            </td>
            <td class="px-6 py-4 text-center">
              <Button
                icon="pi pi-cog"
                text
                rounded
                severity="secondary"
                @click="handleEdit(item)"
                class="group-hover:text-primary-600 transition-colors"
              />
            </td>
          </tr>
          </tbody>
        </table>

        <div v-if="items.length === 0 && !isLoadingDataSources" class="flex flex-col items-center justify-center py-24">
          <i class="pi pi-database text-6xl text-surface-200 mb-4"></i>
          <p class="text-surface-500 text-lg">No datasources found</p>
        </div>
      </div>

      <Paginator
        :first="page * pageSize"
        :rows="pageSize"
        :totalRecords="totalCount"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="onPageChange"
        class="border-t border-surface-100 dark:border-surface-800 p-2"
      />
    </div>

    <Dialog
      v-model:visible="openDialog"
      modal
      :style="{ width: '40rem' }"
      class="p-fluid"
    >

      <template #header>
        <div class="flex items-center justify-between w-full pr-8">
      <span class="text-xl font-bold">
        {{ createSources ? 'New Datasource' : 'Datasource Settings' }}
      </span>

          <Button
            v-if="!createSources"
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            @click="confirmDelete"
            v-tooltip.bottom="'Delete Datasource'"
          />
        </div>
      </template>
      <Tabs value="0" class="mt-2">
        <TabList class="mb-4">
          <Tab value="0"><i class="pi pi-sliders-h mr-2"></i>Config</Tab>
          <Tab v-if="!createSources" value="1"><i class="pi pi-cloud-upload mr-2"></i>Sync</Tab>
          <Tab v-if="!createSources" value="2" @click="fetchFilesForSource"><i class="pi pi-file mr-2"></i>Files</Tab>
>>>>>>> Stashed changes
        </TabList>

        <TabPanels>
          <TabPanel value="0">
<<<<<<< Updated upstream
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
=======
            <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-5 pt-2">
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase text-surface-500">Name</label>
                  <InputText name="name" type="text" placeholder="e.g. Production DB" />
                  <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase text-surface-500">Data Type</label>
                  <Select
                    v-model="selectedType"
                    :options="dataTypes"
                    optionValue="id"
                    optionLabel="name"
                    placeholder="Select Type"
                    :invalid="!selectedType && $form.typeId?.invalid"
                  />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase text-surface-500">Description</label>
                <InputText name="description" placeholder="Describe this data source..." />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase text-surface-500">Resource URL</label>
                <InputText name="url" placeholder="https://api.example.com/v1" />
              </div>

              <div class="flex gap-2 mt-4">
                <Button type="button" label="Cancel" severity="secondary" text @click="openDialog = false" class="flex-1" />
                <Button type="submit" :label="createSources ? 'Create' : 'Save Changes'" class="flex-1" />
>>>>>>> Stashed changes
              </div>

              <Button type="submit" severity="primary" :label="createSources ? 'Create' : 'Update'" />
            </Form>
          </TabPanel>

          <TabPanel value="1">
<<<<<<< Updated upstream
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
=======
            <div class="flex flex-col gap-6 pt-2">
              <div v-if="getTypeName(initialValues) === 'API'" class="space-y-4">
                <div class="p-3 bg-surface-50 dark:bg-surface-800 rounded border border-surface-200 dark:border-surface-700">
                  <label class="text-[10px] font-bold uppercase text-surface-400">Target Endpoint</label>
                  <div class="text-xs truncate font-mono mt-1 opacity-70">{{ initialValues.url }}</div>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase text-surface-500">Storage Filename</label>
                  <InputText v-model="writeFileName" placeholder="e.g. sync_result.json" />
                </div>
                <Button label="Execute Sync" icon="pi pi-cloud-download" @click="handleApiWrite" :loading="isWriting" />
              </div>

              <div v-else-if="getTypeName(initialValues).includes('File')" class="space-y-4">
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl p-8 text-center">
                  <FileUpload mode="basic" auto customUpload @select="onFileSelect" chooseLabel="Choose Local File" class="w-full" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase text-surface-500">Rename on Upload</label>
                  <InputText v-model="writeFileName" placeholder="Optional name" />
                </div>
                <Button label="Upload to Storage" icon="pi pi-upload" @click="handleFileUpload" :loading="isWriting" severity="success" />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="2">
            <div class="flex flex-col gap-4 pt-2">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold uppercase text-surface-500">Remote Objects</span>
                <Button
                  v-if="selectedFileNames.length > 0"
                  label="Delete Selected"
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  size="small"
                  @click="handleBatchDelete"
                  :loading="isDeletingFiles"
                />
              </div>

              <div class="max-h-[300px] overflow-auto border border-surface-200 dark:border-surface-700 rounded-lg">
                <table class="w-full text-sm">
                  <thead class="bg-surface-50 dark:bg-surface-800 sticky top-0">
                  <tr>
                    <th class="p-3 w-12"><Checkbox v-model="selectAll" :binary="true" @change="toggleAllFiles" /></th>
                    <th class="p-3 text-left font-bold text-surface-600">Blob Filename</th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-surface-100 dark:divide-surface-800">
                  <tr v-for="file in blobFiles" :key="file.name" class="hover:bg-surface-50/50 transition-colors">
                    <td class="p-3"><Checkbox v-model="selectedFileNames" :value="file.name" /></td>
                    <td class="p-3 font-mono text-xs">{{ file.name }}</td>
                  </tr>
                  <tr v-if="blobFiles.length === 0">
                    <td colspan="2" class="p-8 text-center text-surface-400 italic">No files found in storage.</td>
                  </tr>
                  </tbody>
                </table>
              </div>
>>>>>>> Stashed changes
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dialog>


  </div>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms'
import Checkbox from 'primevue/checkbox'
import 'primeicons/primeicons.css'
import type { FormSubmitEvent, FormResolverOptions } from '@primevue/forms'
import { InputGroupAddon, InputGroup, Dialog, InputText } from 'primevue'
import Button from 'primevue/button'
import type {
  BlobMetadataResponse,
  CreateDataSource,
  DataSource,
  DataType,
} from '@/export/exports.ts'
import Message from 'primevue/message'
import Tag from 'primevue/tag';
import { onMounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import axios from 'axios'
import FileUpload from 'primevue/fileupload'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import datasourceService from '@/service/datasourceService.ts'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import Paginator from 'primevue/paginator'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const isWriting = ref(false)
const isDeleting = ref(false)
const writeFileName = ref('')
const selectedFile = ref<File | null>(null)
const query = ref('')
const totalCount = ref(0)
const page = ref(0)
const pageSize = ref(10)

// State
const openDialog = ref(false)
const isLoadingDataSources = ref(true)
const items = ref<DataSource[]>([])
const dataTypes = ref<DataType[]>([])
const createSources = ref(true)
const selectedType = ref<number | null>(0)

const blobFiles = ref<BlobMetadataResponse[]>([])
const selectedFileNames = ref<string[]>([])
const isDeletingFiles = ref(false)
const selectAll = ref(false)

// 1. Fetch files when tab is clicked
const fetchFilesForSource = async () => {
  try {
    const response = await datasourceService.getFiles(initialValues.value.id, { page: 0, size: 50 })
    blobFiles.value = response.blobsData
    selectedFileNames.value = [] // Reset selection on fetch
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load files' })
  }
}

// 2. Handle the deletion
const handleBatchDelete = async () => {
  if (selectedFileNames.value.length === 0) return

  isDeletingFiles.value = true
  try {
    await datasourceService.deleteFilesBatch(selectedFileNames.value)

    toast.add({
      severity: 'success',
      summary: 'Deleted',
      detail: `Successfully removed ${selectedFileNames.value.length} files`,
    })

    // Refresh the list
    await fetchFilesForSource()
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete some files' })
  } finally {
    isDeletingFiles.value = false
  }
}

// 3. Helper for "Select All"
const toggleAllFiles = () => {
  if (selectAll.value) {
    selectedFileNames.value = blobFiles.value.map((f) => f.name)
  } else {
    selectedFileNames.value = []
  }
}

const initialValues = ref<DataSource>({
  name: '',
  typeId: 0,
  description: '',
  id: 0,
  url: '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

const getTypeName = (item: DataSource) => {
  // Check nested object first, then top-level ID
  const idToCheck = item.type?.id || item.typeId

  if (!idToCheck) return 'Unknown'

  const typeObj = dataTypes.value.find((t) => t.id === idToCheck)
  return typeObj ? typeObj.name : `ID: ${idToCheck}`
}

const onPageChange = (event: any) => {
  page.value = event.page
  pageSize.value = event.rows
  fetchItems()
}

const fetchItems = async () => {
  isLoadingDataSources.value = true
  try {
    // Pass page and pageSize to your service
    const result = await datasourceService.getDatasource(page.value, pageSize.value, query.value)
    items.value = result.items || []
    totalCount.value = result.totalCount
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingDataSources.value = false
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
  if (!isOpen) {
    isWriting.value = false
    writeFileName.value = ''
    selectedFile.value = null
  }
})

onMounted(async () => {
  try {
    const dataTypesResult = await datasourceService.getDatasourceTypes()
    dataTypes.value = dataTypesResult.dataTypes
  } catch (e) {
    console.error(e)
  }

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

  const dataSourceId = values.id || initialValues.value.id;

  // Sync the type selection from the dropdown to the form values
  if (selectedType.value) {
    values.typeId = selectedType.value
  }

  if (valid && selectedType.value) {
    isLoadingDataSources.value = true

    try {
      if (createSources.value) {
        // --- Create Logic ---
        const result = await datasourceService.createDataSources(values)
        if (result) {
          // Push the new item with the ID generated by the backend
          items.value.push({ ...values, id: result.id })
          toast.add({
            severity: 'success',
            summary: 'Created!',
            detail: `Datasource ${values.name} created.`,
            life: 3000,
          })
        }
      } else {

        const result = await datasourceService.updateDataSource(dataSourceId, values);

        // Update local state to reflect the specific response from your Java code
        const index = items.value.findIndex((i) => i.id === dataSourceId)
        if (index !== -1) {
          items.value[index] = {
            ...items.value[index],
            name: result.name,
            description: result.description,
            url: result.dataSourceUrl, // Maps from your Java 'dataSourceUrl' field
            updatedAt: result.updatedAt,
            // Find the full type object to keep the UI 'Tag' updated
            type: dataTypes.value.find(t => t.id === selectedType.value)
          }
        }

        toast.add({
          severity: 'success',
          summary: 'Updated!',
          detail: `Datasource updated successfully.`,
          life: 3000,
        })
      }
      openDialog.value = false
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Operation failed';
      toast.add({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 })
    } finally {
      isLoadingDataSources.value = false
    }
  }
}

const onFileSelect = (event: any) => {
  selectedFile.value = event.files[0]
  if (!writeFileName.value) {
    writeFileName.value = selectedFile.value?.name || ''
  }
}

const confirmDelete = async () => {
  const dsId = initialValues.value.id;
  if (!dsId) return;

  // Simple browser confirm, or you could use PrimeVue's ConfirmDialog
  if (!confirm(`Are you sure you want to delete "${initialValues.value.name}"?`)) {
    return;
  }

  isDeleting.value = true;
  try {
    // 1. Call the service
    await datasourceService.deleteDataSource(dsId);

    // 2. Remove from local list
    items.value = items.value.filter(item => item.id !== dsId);

    // 3. UI Feedback
    toast.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'Datasource removed successfully',
      life: 3000
    });

    // 4. Close Dialog
    openDialog.value = false;
  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.message || 'Delete failed';
    toast.add({ severity: 'error', summary: 'Error', detail: msg });
  } finally {
    isDeleting.value = false;
  }
};

const handleApiWrite = async () => {
  // Use the URL from initialValues (the record being edited)
  const targetUrl = initialValues.value.url

  if (!targetUrl || !writeFileName.value) {
    toast.add({ severity: 'warn', summary: 'Missing Info', detail: 'File name is required.' })
    return
  }

  isWriting.value = true
  try {
    // Pass the datasource's URL directly
    await datasourceService.saveApiContent(targetUrl, writeFileName.value, initialValues.value.id)
    toast.add({ severity: 'success', summary: 'Success', detail: 'API data captured successfully' })
    writeFileName.value = '' // Clear for next use
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Failure', detail: err.response.data.message })
  } finally {
    isWriting.value = false
  }
}

const handleFileUpload = async () => {
  if (!selectedFile.value || !writeFileName.value) return
  isWriting.value = true
  try {
    await datasourceService.uploadFile(
      selectedFile.value,
      writeFileName.value,
      initialValues.value.id,
    )
    toast.add({ severity: 'success', summary: 'Success', detail: 'File uploaded to Blob Storage' })
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Failure', detail: 'Upload failed' })
  } finally {
    isWriting.value = false
  }
}
</script>
