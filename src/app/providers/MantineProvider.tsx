import { MantineProvider as BaseMantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { theme } from '../config/theme'
import type { ReactNode } from 'react'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

export function MantineProvider({ children }: { children: ReactNode }) {
  return (
    <BaseMantineProvider theme={theme}>
      <Notifications position="top-right" />
      {children}
    </BaseMantineProvider>
  )
}
