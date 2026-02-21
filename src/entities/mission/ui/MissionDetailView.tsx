import { Card, Group, Text, Stack, Progress, Divider, Badge } from '@mantine/core'
import { MissionStatusBadge } from './MissionStatusBadge'
import { MISSION_TYPE_LABELS, MISSION_TYPE_COLORS } from '@/shared/config/constants'
import { formatCurrency, formatDate, formatDateTime } from '@/shared/lib/format'
import type { Mission } from '../model/types'

interface MissionDetailViewProps {
  mission: Mission
}

export function MissionDetailView({ mission }: MissionDetailViewProps) {
  const progress = mission.maxParticipants > 0
    ? (mission.currentParticipants / mission.maxParticipants) * 100
    : 0

  return (
    <Stack gap="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Group>
            <Badge color={MISSION_TYPE_COLORS[mission.type]} variant="light" size="lg">
              {MISSION_TYPE_LABELS[mission.type]}
            </Badge>
            <MissionStatusBadge status={mission.status} />
          </Group>
        </Group>

        <Text fw={700} size="xl" mb="xs">{mission.title}</Text>
        <Text c="dimmed" mb="lg">{mission.description}</Text>

        <Divider mb="md" />

        <Stack gap="sm">
          <Group justify="space-between">
            <Text c="dimmed">리워드 금액</Text>
            <Text fw={600} c="blue">{formatCurrency(mission.rewardAmount)}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">미션 기간</Text>
            <Text>{formatDate(mission.startDate)} ~ {formatDate(mission.endDate)}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">참여 현황</Text>
            <Text>{mission.currentParticipants} / {mission.maxParticipants}명</Text>
          </Group>
          <Progress value={progress} size="md" radius="xl" />

          {mission.conditions.minStayMinutes && (
            <Group justify="space-between">
              <Text c="dimmed">최소 체류 시간</Text>
              <Text>{mission.conditions.minStayMinutes}분</Text>
            </Group>
          )}
          {mission.conditions.minPurchaseAmount && (
            <Group justify="space-between">
              <Text c="dimmed">최소 구매 금액</Text>
              <Text>{formatCurrency(mission.conditions.minPurchaseAmount)}</Text>
            </Group>
          )}
          {mission.conditions.revisitDays && (
            <Group justify="space-between">
              <Text c="dimmed">재방문 기한</Text>
              <Text>{mission.conditions.revisitDays}일 이내</Text>
            </Group>
          )}

          <Divider />
          <Group justify="space-between">
            <Text c="dimmed" size="sm">생성일</Text>
            <Text size="sm">{formatDateTime(mission.createdAt)}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed" size="sm">최종 수정일</Text>
            <Text size="sm">{formatDateTime(mission.updatedAt)}</Text>
          </Group>
        </Stack>
      </Card>
    </Stack>
  )
}
