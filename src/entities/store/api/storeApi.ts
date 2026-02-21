import { delay } from '@/shared/lib/delay'
import { mockStores } from '@/mocks/stores'
import type { Store } from '../model/types'

let stores = [...mockStores]

export function getStoresData() {
  return stores
}

export function setStoresData(data: Store[]) {
  stores = data
}

export async function getStore(storeId: string): Promise<Store | undefined> {
  await delay()
  return stores.find((s) => s.id === storeId)
}
