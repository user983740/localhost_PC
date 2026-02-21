import type { Mission } from '@/entities/mission/model/types'

export const mockMissions: Mission[] = [
  {
    id: 1,
    storeId: 1,
    type: 'RECEIPT',
    configJson: '{"targetProductKey":"아메리카노","confidenceThreshold":0.8}',
    rewardAmount: 3000,
    lat: 37.5665,
    lng: 126.978,
    active: true,
  },
  {
    id: 2,
    storeId: 1,
    type: 'DWELL',
    configJson: '{"minStayMinutes":30}',
    rewardAmount: 5000,
    lat: 37.5665,
    lng: 126.978,
    active: true,
  },
  {
    id: 3,
    storeId: 1,
    type: 'TIME_WINDOW',
    configJson: '{"startHour":9,"endHour":18}',
    rewardAmount: 2000,
    lat: 37.5665,
    lng: 126.978,
    active: true,
  },
]
