import { SimpleGrid, Card, Group, Text, ThemeIcon } from '@mantine/core'
import {
  IconTarget,
  IconCoin,
  IconChecks,
} from '@tabler/icons-react'
import { formatCurrency } from '@/shared/lib/format'
import type { Mission } from '@/entities/mission/model/types'

interface DashboardStatsProps {
  missions: Mission[]
}

export function DashboardStats({ missions }: DashboardStatsProps) {
  const activeMissions = missions.filter((m) => m.isActive).length
  const totalMissions = missions.length
  const totalRewardBudget = missions.reduce((sum, m) => sum + m.rewardAmount, 0)

  const stats = [
    {
      title: '활성 미션',
      value: `${activeMissions}개`,
      icon: IconTarget,
      color: 'blue',
    },
    {
      title: '전체 미션',
      value: `${totalMissions}개`,
      icon: IconChecks,
      color: 'teal',
    },
    {
      title: '미션 리워드 합계',
      value: formatCurrency(totalRewardBudget),
      icon: IconCoin,
      color: 'orange',
    },
  ]

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
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
