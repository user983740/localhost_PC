import { fetchClient } from '@/shared/lib/fetchClient'
import type { Store } from '../model/types'

export function getStore(storeId: string): Promise<Store> {
  return fetchClient<Store>(`/api/stores/${storeId}`)
}

export function getMyStores(): Promise<Store[]> {
  return fetchClient<Store[]>('/api/stores/my', { auth: true })
}

export function deleteStore(storeId: string): Promise<void> {
  return fetchClient('/api/stores/' + storeId, {
    method: 'DELETE',
    auth: true,
  })
}
