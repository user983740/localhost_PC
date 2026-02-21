import { fetchClient } from '@/shared/lib/fetchClient'
import type { Mission } from '../model/types'

export async function getMissions(storeId: string): Promise<Mission[]> {
  return fetchClient<Mission[]>(`/api/stores/${storeId}/missions`, { auth: true })
}

export async function getMission(storeId: string, missionId: string): Promise<Mission> {
  return fetchClient<Mission>(`/api/stores/${storeId}/missions/${missionId}`, { auth: true })
}
