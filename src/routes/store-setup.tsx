import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/model/authStore'
import { StoreSetupPage } from '@/pages/store-setup/ui/StoreSetupPage'

export const Route = createFileRoute('/store-setup')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated
    if (!isAuthenticated) {
      throw redirect({ to: '/register' })
    }
  },
  component: StoreSetupPage,
})
