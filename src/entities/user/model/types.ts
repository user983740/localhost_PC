export interface User {
  id: string
  username: string
  role: 'USER' | 'OWNER'
  point?: number
  storeId?: string
}
