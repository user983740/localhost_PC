import { fetchClient } from '@/shared/lib/fetchClient'
import type { Mission, CreateMissionRequest } from '@/entities/mission/model/types'

export async function createMission(storeId: string, input: CreateMissionRequest): Promise<Mission> {
  return fetchClient<Mission>(`/api/stores/${storeId}/missions`, {
    method: 'POST',
    body: input,
    auth: true,
  })
}
