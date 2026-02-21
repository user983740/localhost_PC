import { SimpleGrid, Card, Group, Text, ThemeIcon } from '@mantine/core'
import {
  IconTarget,
  IconUsers,
  IconCoin,
  IconTrendingUp,
} from '@tabler/icons-react'
import { formatCurrency } from '@/shared/lib/format'
import type { Mission } from '@/entities/mission/model/types'
import type { Store } from '@/entities/store/model/types'

interface DashboardStatsProps {
  missions: Mission[]
  store?: Store
}

export function DashboardStats({ missions, store }: DashboardStatsProps) {
  const activeMissions = missions.filter((m) => m.status === 'ACTIVE').length
  const totalParticipants = missions.reduce((sum, m) => sum + m.currentParticipants, 0)
  const totalRewardSpent = missions.reduce(
    (sum, m) => sum + m.currentParticipants * m.rewardAmount,
    0,
  )
  const remainingBudget = store ? store.totalBudget - store.usedBudget : 0

  const stats = [
    {
      title: '진행중 미션',
      value: `${activeMissions}개`,
      icon: IconTarget,
      color: 'blue',
    },
    {
      title: '총 참여자',
      value: `${totalParticipants}명`,
      icon: IconUsers,
      color: 'teal',
    },
    {
      title: '지출 리워드',
      value: formatCurrency(totalRewardSpent),
      icon: IconCoin,
      color: 'orange',
    },
    {
      title: '잔여 예산',
      value: formatCurrency(remainingBudget),
      icon: IconTrendingUp,
      color: 'green',
    },
  ]

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
      {stats.map((stat) => (
        <Card key={stat.title} shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                {stat.title}
              </Text>
              <Text fw={700} size="xl" mt={4}>
                {stat.value}
              </Text>
            </div>
            <ThemeIcon color={stat.color} variant="light" size={48} radius="md">
              <stat.icon size={24} />
            </ThemeIcon>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  )
}
