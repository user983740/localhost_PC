import type { Store } from '@/entities/store/model/types'

export const mockStores: Store[] = [
  {
    id: 'store-1',
    ownerId: 'user-1',
    name: '맛있는 카페',
    category: '카페',
    address: '서울시 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    description: '분위기 좋은 동네 카페입니다. 핸드드립 커피와 수제 디저트를 판매합니다.',
    businessHours: '09:00 - 22:00',
    totalBudget: 1000000,
    usedBudget: 350000,
    createdAt: '2025-01-15T09:00:00Z',
  },
  {
    id: 'store-2',
    ownerId: 'user-2',
    name: '테스트 매장',
    category: '음식점',
    address: '서울시 서초구 서초동 100-1',
    phone: '02-9876-5432',
    description: '테스트용 매장입니다.',
    businessHours: '10:00 - 21:00',
    totalBudget: 500000,
    usedBudget: 0,
    createdAt: '2025-02-01T00:00:00Z',
  },
]
