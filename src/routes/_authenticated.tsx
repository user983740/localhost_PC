import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuthStore } from '@/features/auth/model/authStore'
import { getMyStores } from '@/entities/store/api/storeApi'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { Header } from '@/widgets/header/ui/Header'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { isAuthenticated, user } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    // OWNER인데 storeId가 없으면 매장 정보를 가져와서 설정
    if (user?.role === 'OWNER' && !user.storeId) {
      try {
        const stores = await getMyStores()
        if (stores.length > 0) {
          useAuthStore.getState().setStoreId(String(stores[0].id))
        }
      } catch {
        // 매장 조회 실패 시 무시 (이후 페이지에서 빈 상태 표시)
      }
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} onToggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
