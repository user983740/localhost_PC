import { delay } from '@/shared/lib/delay'
import { mockParticipants } from '@/mocks/participants'
import type { MissionParticipant } from '../model/types'

const participants: MissionParticipant[] = [...mockParticipants]

export async function getParticipants(missionId: string): Promise<MissionParticipant[]> {
  await delay()
  return participants.filter((p) => p.missionId === missionId)
}
