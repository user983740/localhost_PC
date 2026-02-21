import { fetchClient } from '@/shared/lib/fetchClient'
import type { Mission, UpdateMissionRequest } from '@/entities/mission/model/types'

export async function updateMission(storeId: string, missionId: string, input: UpdateMissionRequest): Promise<Mission> {
  return fetchClient<Mission>(`/api/stores/${storeId}/missions/${missionId}`, {
    method: 'PUT',
    body: input,
    auth: true,
  })
}
