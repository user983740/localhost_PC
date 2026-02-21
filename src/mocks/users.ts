import type { User } from '@/entities/user/model/types'

export const mockUsers: (User & { password: string })[] = [
  {
    id: 'user-1',
    username: 'owner1',
    password: '1234',
    name: '김사장',
    email: 'owner1@test.com',
    role: 'STORE_OWNER',
    storeId: 'store-1',
    createdAt: '2025-01-15T09:00:00Z',
  },
  {
    id: 'user-2',
    username: 'testtest',
    password: 'test',
    name: '테스트',
    email: 'testtest@test.com',
    role: 'STORE_OWNER',
    storeId: 'store-2',
    createdAt: '2025-02-01T00:00:00Z',
  },
]
