import { Group, Title, Text } from '@mantine/core'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  rightSection?: ReactNode
}

export function PageHeader({ title, description, rightSection }: PageHeaderProps) {
  return (
    <Group justify="space-between" mb="lg">
      <div>
        <Title order={2}>{title}</Title>
        {description && (
          <Text c="dimmed" size="sm" mt={4}>
            {description}
          </Text>
        )}
      </div>
      {rightSection && <div>{rightSection}</div>}
    </Group>
  )
}
