import { delay } from '@/shared/lib/delay'
import { getMissionsData, setMissionsData } from '@/entities/mission/api/missionApi'

export async function deleteMission(missionId: string): Promise<void> {
  await delay(500)
  const missions = getMissionsData()
  setMissionsData(missions.filter((m) => m.id !== missionId))
}
