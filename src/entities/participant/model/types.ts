export type ParticipantStatus = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'REWARDED'

export interface MissionParticipant {
  id: string
  missionId: string
  userId: string
  userName: string
  status: ParticipantStatus
  joinedAt: string
  completedAt?: string
  rewardedAt?: string
}
