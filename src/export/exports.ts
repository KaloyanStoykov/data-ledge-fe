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
  url: string
  created: string
  updated: string
}
