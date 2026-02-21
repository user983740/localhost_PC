import { delay } from '@/shared/lib/delay'
import { mockUsers } from '@/mocks/users'
import type { User, LoginInput, RegisterInput } from '@/entities/user/model/types'

let users = [...mockUsers]

export async function login(input: LoginInput): Promise<{ user: User; token: string }> {
  await delay(500)
  const found = users.find(
    (u) => u.username === input.username && u.password === input.password,
  )
  if (!found) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
  }
  const { password: _, ...user } = found
  return { user, token: `mock-token-${user.id}` }
}

export async function register(input: RegisterInput): Promise<{ user: User; token: string }> {
  await delay(500)
  const exists = users.some((u) => u.username === input.username)
  if (exists) {
    throw new Error('이미 사용 중인 아이디입니다.')
  }

  const newUser = {
    id: `user-${Date.now()}`,
    username: input.username,
    password: input.password,
    name: input.name,
    email: input.email,
    role: 'STORE_OWNER' as const,
    storeId: `store-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  users = [...users, newUser]

  const { password: _, ...user } = newUser
  return { user, token: `mock-token-${user.id}` }
}

export async function checkUsername(username: string): Promise<boolean> {
  await delay(300)
  return !users.some((u) => u.username === username)
}
