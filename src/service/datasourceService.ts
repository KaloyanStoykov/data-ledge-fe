import {
  API_BASEURL,
  type CreateDataSourceResponse,
  type DataSource,
  type DataTypesResponse,
  type GetDataSourceResponse,
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
  createDataSources: async (values: DataSource): Promise<CreateDataSourceResponse> => {
    try {
      const result = await axios.post(`${API_BASEURL}/datasources`, values)
      return result.data;
    }
    catch(err){
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
  }
}

export default datasourceService;
