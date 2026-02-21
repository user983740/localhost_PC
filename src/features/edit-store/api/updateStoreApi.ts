import { delay } from '@/shared/lib/delay'
import { getStoresData, setStoresData } from '@/entities/store/api/storeApi'
import type { Store } from '@/entities/store/model/types'

export async function updateStore(
  storeId: string,
  input: Partial<Pick<Store, 'name' | 'category' | 'address' | 'phone' | 'description' | 'businessHours'>>,
): Promise<Store> {
  await delay(500)
  const stores = getStoresData()
  const index = stores.findIndex((s) => s.id === storeId)
  if (index === -1) {
    throw new Error('매장을 찾을 수 없습니다.')
  }
  const updated = { ...stores[index], ...input }
  const newStores = [...stores]
  newStores[index] = updated
  setStoresData(newStores)
  return updated
}
