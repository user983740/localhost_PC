import { useAuthStore } from '@/features/auth/model/authStore'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class ApiRequestError extends Error {
  status: number
  validationErrors?: Record<string, string>

  constructor(status: number, message: string, validationErrors?: Record<string, string>) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.validationErrors = validationErrors
  }
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  auth?: boolean
}

export async function fetchClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { body, auth = false, headers: customHeaders, ...rest } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders as Record<string, string>,
  }

  if (auth) {
    const token = useAuthStore.getState().token
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let message = '요청에 실패했습니다.'
    let validationErrors: Record<string, string> | undefined

    try {
      const errorBody = await response.json()
      if (errorBody.message) message = errorBody.message
      if (errorBody.validationErrors) validationErrors = errorBody.validationErrors
    } catch {
      // ignore JSON parse error
    }

    throw new ApiRequestError(response.status, message, validationErrors)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
