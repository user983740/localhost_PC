import { delay } from '@/shared/lib/delay'
import { mockMissions } from '@/mocks/missions'
import type { Mission } from '../model/types'

let missions = [...mockMissions]

export function getMissionsData() {
  return missions
}

export function setMissionsData(data: Mission[]) {
  missions = data
}

export async function getMissions(storeId: string): Promise<Mission[]> {
  await delay()
  return missions.filter((m) => m.storeId === storeId)
}

export async function getMission(missionId: string): Promise<Mission | undefined> {
  await delay()
  return missions.find((m) => m.id === missionId)
}
