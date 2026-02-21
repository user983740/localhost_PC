export interface SignupRequest {
  username: string
  password: string
  role: 'OWNER'
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  userId: string
  role: string
}

export interface CreateStoreRequest {
  name: string
  address: string
  detailAddress?: string
  businessNumber?: string
}

export interface StoreApiResponse {
  id: string
  name: string
  ownerId: string
  address: string
  detailAddress?: string
  businessNumber?: string
}
