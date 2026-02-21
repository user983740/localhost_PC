export const MISSION_TYPE_LABELS: Record<string, string> = {
  VISIT: '방문',
  STAY: '체류',
  PURCHASE: '구매',
  REVISIT: '재방문',
} as const

export const MISSION_STATUS_LABELS: Record<string, string> = {
  DRAFT: '임시저장',
  ACTIVE: '진행중',
  PAUSED: '일시중지',
  COMPLETED: '완료',
  CANCELLED: '취소',
} as const

export const MISSION_STATUS_COLORS: Record<string, string> = {
  DRAFT: 'gray',
  ACTIVE: 'blue',
  PAUSED: 'yellow',
  COMPLETED: 'green',
  CANCELLED: 'red',
} as const

export const MISSION_TYPE_COLORS: Record<string, string> = {
  VISIT: 'cyan',
  STAY: 'violet',
  PURCHASE: 'orange',
  REVISIT: 'teal',
} as const
