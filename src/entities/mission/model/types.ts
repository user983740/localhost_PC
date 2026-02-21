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
  configJson: string
  rewardAmount: number
}

export interface UpdateMissionRequest {
  configJson: string
  rewardAmount: number
  active: boolean
}

// configJson 파싱 헬퍼 타입
export interface ReceiptConfig {
  targetProductKey: string
  confidenceThreshold?: number
}
