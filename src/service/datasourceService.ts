import {
  API_BASEURL,
  type CreateDataSourceResponse,
  type DataSource,
  type DataTypesResponse,
  type DeleteDataSourceResponse,
  type GetDataSourceResponse,
  type GetPagedBlobMetadataResponse,
  type UpdateDataSourceResponse,
} from '@/export/exports.ts'
import axios from 'axios'

const datasourceService = {
  getDatasourceTypes: async (): Promise<DataTypesResponse> => {
    try{
      const result = await axios.get(`${API_BASEURL}/datasource-types`);
      return result.data;
    }
    catch(err){
      throw err;
    }
  },
  getDatasource: async (pageNumber: number, pageSize: number, searchTerm?: string): Promise<GetDataSourceResponse> => {
    const params: { pageNumber: number; pageSize: number; searchTerm: string | undefined } = { pageNumber, pageSize, searchTerm };

    // Only add searchTerm to the request if it has content
    if (searchTerm && searchTerm.trim() !== '') {
      params.searchTerm = searchTerm;
    }

    const response = await axios.get(`${API_BASEURL}/datasources`, { params });
    return response.data;
  },
  deleteDataSource: async (id: number): Promise<DeleteDataSourceResponse> => {
    try {
      const result = await axios.delete(`${API_BASEURL}/datasources/${id}`);
      return result.data;
    } catch (err) {
      throw err;
    }
  },
  createDataSources: async (values: DataSource): Promise<CreateDataSourceResponse> => {
    try {
      const result = await axios.post(`${API_BASEURL}/datasources`, values)
      return result.data;
    }
    catch(err){
      throw err;
    }
  },
  updateDataSource: async (id: number, values: DataSource): Promise<UpdateDataSourceResponse> => {
    try {
      const result = await axios.put(`${API_BASEURL}/datasources/${id}`, {
        name: values.name,
        description: values.description,
        typeId: values.typeId,
        dataSourceUrl: values.url
      });
      return result.data;
    } catch (err) {
      throw err;
    }
  },
  uploadFile: async (file: File, fileName: string, dsId: number): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('dsId', String(dsId));
    const result = await axios.post(`${API_BASEURL}/blob/writeBlobFile`, formData);
    return result.data;
  },

  saveApiContent: async (apiUrl: string, blobFileName: string, source_id: number): Promise<string> => {
    const params = new URLSearchParams();
    params.append('apiUrl', apiUrl);
    params.append('blobFileName', blobFileName);
    params.append('source_id', String(source_id));
    const result = await axios.post(`${API_BASEURL}/blob/saveApiContent`, params);
    console.log(result);
    return result.data;
  },
  deleteFilesBatch: async (blobFileNames: string[]): Promise<string> => {
    try {
      const result = await axios.delete(`${API_BASEURL}/blob/deleteBatch`, {
        data: { blobFileNames } // This matches your DeleteDataSourcesRequest DTO
      });
      return result.data;
    } catch (err) {
      console.error("Error deleting files:", err);
      throw err;
    }
  },

// Add the getFiles method as well
  getFiles: async (dsId: number, pageable: { page: number; size: number }): Promise<GetPagedBlobMetadataResponse> => {
    const params = {
      dsId,
      page: pageable.page,
      size: pageable.size
    };
    const response = await axios.get(`${API_BASEURL}/blob/getFiles`, { params });
    return response.data;
  }
}

export default datasourceService;
