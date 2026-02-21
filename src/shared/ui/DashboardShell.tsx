import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface DashboardShellProps {
  sidebar: ReactNode
  header: (props: { opened: boolean; toggle: () => void }) => ReactNode
}

export function DashboardShell({ sidebar, header }: DashboardShellProps) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>{header({ opened, toggle })}</AppShell.Header>
      <AppShell.Navbar>{sidebar}</AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
