import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/entities/user/model/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  setStoreId: (storeId: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      setStoreId: (storeId) =>
        set((state) => ({
          user: state.user ? { ...state.user, storeId } : null,
        })),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
