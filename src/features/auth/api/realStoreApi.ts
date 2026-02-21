import { fetchClient } from '@/shared/lib/fetchClient'
import type { CreateStoreRequest } from '@/shared/lib/apiTypes'
import type { Store } from '@/entities/store/model/types'

export function createStoreApi(input: CreateStoreRequest): Promise<Store> {
  return fetchClient<Store>('/api/stores', {
    method: 'POST',
    body: input,
    auth: true,
  })
}
