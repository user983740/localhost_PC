export type MissionType = 'VISIT' | 'STAY' | 'PURCHASE' | 'REVISIT'
export type MissionStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED'

export interface Mission {
  id: string
  storeId: string
  title: string
  description: string
  type: MissionType
  status: MissionStatus
  rewardAmount: number
  maxParticipants: number
  currentParticipants: number
  startDate: string
  endDate: string
  conditions: MissionCondition
  createdAt: string
  updatedAt: string
}

export interface MissionCondition {
  minStayMinutes?: number
  minPurchaseAmount?: number
  revisitDays?: number
}

export interface CreateMissionInput {
  title: string
  description: string
  type: MissionType
  rewardAmount: number
  maxParticipants: number
  startDate: string
  endDate: string
  conditions: MissionCondition
}

export type UpdateMissionInput = Partial<CreateMissionInput> & { status?: MissionStatus }
