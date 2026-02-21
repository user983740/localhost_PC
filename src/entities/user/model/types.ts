export interface User {
  id: string
  username: string
  name: string
  email: string
  role: 'STORE_OWNER'
  storeId: string
  createdAt: string
}

export interface LoginInput {
  username: string
  password: string
}

export interface RegisterInput {
  username: string
  password: string
  name: string
  email: string
  storeName: string
  storeCategory: string
  storeAddress: string
  storePhone: string
}
