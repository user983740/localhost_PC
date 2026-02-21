import { Group, Burger, Text } from '@mantine/core'
import { UserMenu } from '@/entities/user/ui/UserMenu'
import { useAuthStore } from '@/features/auth/model/authStore'
import { useRouter } from '@tanstack/react-router'

interface HeaderProps {
  opened: boolean
  onToggle: () => void
}

export function Header({ opened, onToggle }: HeaderProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.navigate({ to: '/login' })
  }

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={onToggle} hiddenFrom="sm" size="sm" />
        <Text fw={700} size="lg" visibleFrom="sm">
          매장 관리자
        </Text>
      </Group>
      {user && <UserMenu user={user} onLogout={handleLogout} />}
    </Group>
  )
}
