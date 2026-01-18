export interface DataType {
  id?: number
  name: string
  description: string
}

export interface DataTypesResponse {
  dataTypes: DataType[]
}

export interface DataSource {
  id: number
  name: string
  typeId: number
  type?: DataType
  description: string,
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateDataSourceResponse {
  id: number
  name: string
}

export interface GetDataSourceResponse {
  items: DataSource[],
  totalCount: number
  page: number
  pageSize: number
}

export interface CreateDataSource {
  id?: number
  name: string
  typeId: number
  description: string
  url: string
  created: string
  updated: string
}

export interface BlobMetadataResponse {
  id: number
  name: string
  created: Date;
}

export interface GetPagedBlobMetadataResponse {
  blobsData: BlobMetadataResponse[]
  totalCount: number
  page: number
  pageSize: number
}

export interface DeleteDataSourceResponse {
  message: string;
}

export interface UpdateDataSourceResponse {
  id: number;
  name: string;
  description: string;
  dataSourceUrl: string; // Matches your Java private String dataSourceUrl
  updatedAt: string;     // Received as ISO string from Java LocalDateTime
}

export interface LoginRequest {
  email: string,
  password: string,
}

export interface SignUpRequest {
  name: string,
  email: string,
  password: string
}

export interface User {
  id: number,
  name: string,
  email: string,
}


// Config
export const API_BASEURL = 'http://localhost:8080';
