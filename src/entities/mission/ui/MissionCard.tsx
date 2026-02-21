import { Card, Group, Text, Badge, Progress, Stack } from '@mantine/core'
import { MissionStatusBadge } from './MissionStatusBadge'
import { MISSION_TYPE_LABELS, MISSION_TYPE_COLORS } from '@/shared/config/constants'
import { formatCurrency, formatDate } from '@/shared/lib/format'
import type { Mission } from '../model/types'

interface MissionCardProps {
  mission: Mission
  onClick?: () => void
}

export function MissionCard({ mission, onClick }: MissionCardProps) {
  const progress = mission.maxParticipants > 0
    ? (mission.currentParticipants / mission.maxParticipants) * 100
    : 0

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Group justify="space-between" mb="xs">
        <Badge color={MISSION_TYPE_COLORS[mission.type]} variant="light">
          {MISSION_TYPE_LABELS[mission.type]}
        </Badge>
        <MissionStatusBadge status={mission.status} />
      </Group>

      <Text fw={600} size="lg" mb={4} lineClamp={1}>
        {mission.title}
      </Text>
      <Text size="sm" c="dimmed" lineClamp={2} mb="md">
        {mission.description}
      </Text>

      <Stack gap="xs">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">리워드</Text>
          <Text size="sm" fw={600} c="blue">{formatCurrency(mission.rewardAmount)}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">기간</Text>
          <Text size="sm">{formatDate(mission.startDate)} ~ {formatDate(mission.endDate)}</Text>
        </Group>
        <div>
          <Group justify="space-between" mb={4}>
            <Text size="sm" c="dimmed">참여</Text>
            <Text size="sm">{mission.currentParticipants} / {mission.maxParticipants}명</Text>
          </Group>
          <Progress value={progress} size="sm" radius="xl" />
        </div>
      </Stack>
    </Card>
  )
}
