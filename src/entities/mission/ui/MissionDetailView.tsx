import { Card, Group, Text, Stack, Divider, Badge } from '@mantine/core'
import { MISSION_TYPE_LABELS, MISSION_TYPE_COLORS } from '@/shared/config/constants'
import { formatCurrency } from '@/shared/lib/format'
import type { Mission } from '../model/types'

interface MissionDetailViewProps {
  mission: Mission
}

function parseConfig(configJson: string): Record<string, unknown> {
  try {
    return JSON.parse(configJson)
  } catch {
    return {}
  }
}

export function MissionDetailView({ mission }: MissionDetailViewProps) {
  const config = parseConfig(mission.configJson)

  return (
    <Stack gap="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Badge color={MISSION_TYPE_COLORS[mission.type]} variant="light" size="lg">
            {MISSION_TYPE_LABELS[mission.type]}
          </Badge>
          <Badge color={mission.active ? 'green' : 'gray'} variant="light" size="lg">
            {mission.active ? '활성' : '비활성'}
          </Badge>
        </Group>

        <Divider mb="md" />

        <Stack gap="sm">
          <Group justify="space-between">
            <Text c="dimmed">리워드 금액</Text>
            <Text fw={600} c="blue">{formatCurrency(mission.rewardAmount)}</Text>
          </Group>

          {mission.type === 'RECEIPT' && (
            <>
              <Group justify="space-between">
                <Text c="dimmed">대상 제품명</Text>
                <Text fw={500}>{(config.targetProductKey as string) || '-'}</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">신뢰도 임계값</Text>
                <Text>{(config.confidenceThreshold as number) ?? 0.8}</Text>
              </Group>
            </>
          )}

          {mission.type === 'DWELL' && config.minStayMinutes && (
            <Group justify="space-between">
              <Text c="dimmed">최소 체류 시간</Text>
              <Text>{config.minStayMinutes as number}분</Text>
            </Group>
          )}

          {mission.type === 'TIME_WINDOW' && (
            <Group justify="space-between">
              <Text c="dimmed">방문 시간대</Text>
              <Text>{config.startHour as number}시 ~ {config.endHour as number}시</Text>
            </Group>
          )}

          {mission.type === 'STAMP' && config.requiredCount && (
            <Group justify="space-between">
              <Text c="dimmed">필요 스탬프 수</Text>
              <Text>{config.requiredCount as number}회</Text>
            </Group>
          )}

          {mission.type === 'INVENTORY' && (
            <Group justify="space-between">
              <Text c="dimmed">설정</Text>
              <Text size="sm">{mission.configJson}</Text>
            </Group>
          )}
        </Stack>
      </Card>
    </Stack>
  )
}
