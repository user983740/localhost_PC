import { fetchClient } from '@/shared/lib/fetchClient'
import type { SignupRequest, LoginRequest, AuthResponse } from '@/shared/lib/apiTypes'

export function signupApi(input: SignupRequest): Promise<AuthResponse> {
  return fetchClient<AuthResponse>('/api/auth/signup', {
    method: 'POST',
    body: input,
  })
}

export function loginApi(input: LoginRequest): Promise<AuthResponse> {
  return fetchClient<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: input,
  })
}
