export type MissionType = 'TIME_WINDOW' | 'DWELL' | 'RECEIPT' | 'INVENTORY' | 'STAMP'

export interface Mission {
  id: number
  storeId: number
  type: MissionType
  configJson: string
  rewardAmount: number
  lat: number
  lng: number
  active: boolean
}

export interface CreateMissionRequest {
  type: MissionType
  configJson: Record<string, unknown>
  rewardAmount: number
  active?: boolean
}

export interface UpdateMissionRequest {
  configJson: Record<string, unknown>
  rewardAmount: number
  active: boolean
}

export interface ImageConfirmRequest {
  imageUrl: string
}

// configJson 파싱 헬퍼 타입
export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export interface TimeWindowConfig {
  startHour: number
  endHour: number
  days: DayOfWeek[]
}

export interface DwellConfig {
  durationMinutes: number
}

export interface ReceiptConfig {
  targetProductKey: string
}

export interface InventoryConfig {
  answerImageUrl: string
}

export interface StampConfig {
  requiredCount: number
}

export interface PresignedUrlResponse {
  presignedUrl: string
  imageUrl: string
}
