import { Card, Group, Text, Stack, ThemeIcon } from '@mantine/core'
import { IconBuildingStore } from '@tabler/icons-react'
import type { Store } from '../model/types'

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb="md">
        <ThemeIcon size={48} radius="md" variant="light">
          <IconBuildingStore size={24} />
        </ThemeIcon>
        <div>
          <Text fw={600} size="lg">{store.name}</Text>
        </div>
      </Group>

      <Stack gap="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">주소</Text>
          <Text size="sm">{store.address}</Text>
        </Group>
        {store.detailAddress && (
          <Group justify="space-between">
            <Text size="sm" c="dimmed">상세주소</Text>
            <Text size="sm">{store.detailAddress}</Text>
          </Group>
        )}
        {store.businessNumber && (
          <Group justify="space-between">
            <Text size="sm" c="dimmed">사업자번호</Text>
            <Text size="sm">{store.businessNumber}</Text>
          </Group>
        )}
      </Stack>
    </Card>
  )
}
