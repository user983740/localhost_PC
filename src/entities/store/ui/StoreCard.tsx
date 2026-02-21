import { Card, Group, Text, Stack, Progress, ThemeIcon } from '@mantine/core'
import { IconBuildingStore } from '@tabler/icons-react'
import { formatCurrency } from '@/shared/lib/format'
import type { Store } from '../model/types'

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  const budgetUsage = store.totalBudget > 0
    ? (store.usedBudget / store.totalBudget) * 100
    : 0

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb="md">
        <ThemeIcon size={48} radius="md" variant="light">
          <IconBuildingStore size={24} />
        </ThemeIcon>
        <div>
          <Text fw={600} size="lg">{store.name}</Text>
          <Text size="sm" c="dimmed">{store.category}</Text>
        </div>
      </Group>

      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">주소</Text>
          <Text size="sm">{store.address}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">전화번호</Text>
          <Text size="sm">{store.phone}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">영업시간</Text>
          <Text size="sm">{store.businessHours}</Text>
        </Group>
        <div>
          <Group justify="space-between" mb={4}>
            <Text size="sm" c="dimmed">예산 사용</Text>
            <Text size="sm">
              {formatCurrency(store.usedBudget)} / {formatCurrency(store.totalBudget)}
            </Text>
          </Group>
          <Progress value={budgetUsage} size="sm" radius="xl" />
        </div>
      </Stack>
    </Card>
  )
}
