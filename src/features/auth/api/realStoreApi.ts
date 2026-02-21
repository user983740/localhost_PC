import { fetchClient } from '@/shared/lib/fetchClient'
import type { CreateStoreRequest, StoreApiResponse } from '@/shared/lib/apiTypes'

export function createStoreApi(input: CreateStoreRequest): Promise<StoreApiResponse> {
  return fetchClient<StoreApiResponse>('/api/stores', {
    method: 'POST',
    body: input,
    auth: true,
  })
}
