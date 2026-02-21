import { delay } from '@/shared/lib/delay'
import { getMissionsData, setMissionsData } from '@/entities/mission/api/missionApi'
import type { Mission, UpdateMissionInput } from '@/entities/mission/model/types'

export async function updateMission(
  missionId: string,
  input: UpdateMissionInput,
): Promise<Mission> {
  await delay(500)
  const missions = getMissionsData()
  const index = missions.findIndex((m) => m.id === missionId)
  if (index === -1) {
    throw new Error('미션을 찾을 수 없습니다.')
  }
  const updated: Mission = {
    ...missions[index],
    ...input,
    conditions: input.conditions ?? missions[index].conditions,
    updatedAt: new Date().toISOString(),
  }
  const newMissions = [...missions]
  newMissions[index] = updated
  setMissionsData(newMissions)
  return updated
}
