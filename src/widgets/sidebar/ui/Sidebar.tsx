import { NavLink, Stack, Text, Divider, Box, Image } from '@mantine/core'
import {
  IconDashboard,
  IconTarget,
  IconBuildingStore,
} from '@tabler/icons-react'
import { useRouter, useRouterState } from '@tanstack/react-router'

const navItems = [
  { label: '대시보드', icon: IconDashboard, to: '/dashboard' },
  { label: '미션 관리', icon: IconTarget, to: '/missions' },
  { label: '매장 정보', icon: IconBuildingStore, to: '/store' },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <Box p="md">
      <Stack gap={4} mb="md" align="center">
        <Image src="/logo.png" alt="localhost" w={36} h={36} radius="md" />
        <Text fw={700} size="sm">localhost</Text>
      </Stack>
      <Divider mb="md" />
      <Stack gap={4}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            label={item.label}
            leftSection={<item.icon size={18} />}
            active={pathname.startsWith(item.to)}
            onClick={() => router.navigate({ to: item.to })}
            variant="filled"
          />
        ))}
      </Stack>
    </Box>
  )
}
