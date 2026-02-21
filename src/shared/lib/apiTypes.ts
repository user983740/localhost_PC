export interface SignupRequest {
  username: string
  password: string
  role: 'USER' | 'OWNER'
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  userId: number
  role: string
}

export interface CreateStoreRequest {
  name: string
  address: string
  detailAddress?: string
  businessNumber?: string
  iconEmoji?: string
}
