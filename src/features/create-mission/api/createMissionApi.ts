import { delay } from '@/shared/lib/delay'
import { getMissionsData, setMissionsData } from '@/entities/mission/api/missionApi'
import type { Mission, CreateMissionInput } from '@/entities/mission/model/types'

export async function createMission(
  storeId: string,
  input: CreateMissionInput,
): Promise<Mission> {
  await delay(500)
  const newMission: Mission = {
    id: `mission-${Date.now()}`,
    storeId,
    ...input,
    status: 'ACTIVE',
    currentParticipants: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  setMissionsData([...getMissionsData(), newMission])
  return newMission
}
