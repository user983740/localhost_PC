export const MISSION_TYPE_LABELS: Record<string, string> = {
  TIME_WINDOW: '시간대 방문',
  DWELL: '체류',
  RECEIPT: '영수증 인증',
  INVENTORY: '재고 확인',
  STAMP: '반복 방문',
} as const

export const MISSION_TYPE_COLORS: Record<string, string> = {
  TIME_WINDOW: 'cyan',
  DWELL: 'violet',
  RECEIPT: 'orange',
  INVENTORY: 'teal',
  STAMP: 'pink',
} as const
