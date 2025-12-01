export interface DataType {
  id?: number
  name: string
  description: string
}

export interface CreateDataSource {
  id?: number
  name: string
  typeId: number
  description: string
  type?: {
    id: number
    name: string
    description: string
  }
  url: string
  created: string
  updated: string
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

export interface SignUpResponse {
  message: string
}
