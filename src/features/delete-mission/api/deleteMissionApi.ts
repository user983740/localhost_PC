import { fetchClient } from '@/shared/lib/fetchClient'

export async function deleteMission(storeId: string, missionId: string): Promise<void> {
  await fetchClient(`/api/stores/${storeId}/missions/${missionId}`, {
    method: 'DELETE',
    auth: true,
  })
}
