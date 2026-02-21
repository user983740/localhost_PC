import { Stack, Text, ThemeIcon } from '@mantine/core'
import { IconInbox } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  title = '데이터가 없습니다',
  description,
  action,
}: EmptyStateProps) {
  return (
    <Stack align="center" py={60} gap="md">
      <ThemeIcon size={64} variant="light" color="gray" radius="xl">
        <IconInbox size={32} />
      </ThemeIcon>
      <Text fw={500} size="lg">
        {title}
      </Text>
      {description && (
        <Text c="dimmed" size="sm" ta="center" maw={400}>
          {description}
        </Text>
      )}
      {action}
    </Stack>
  )
}
