import { Card, Group, Text, Badge, Stack } from '@mantine/core'
import { MISSION_TYPE_LABELS, MISSION_TYPE_COLORS } from '@/shared/config/constants'
import { formatCurrency } from '@/shared/lib/format'
import type { Mission } from '../model/types'

interface MissionCardProps {
  mission: Mission
  onClick?: () => void
}

function getConfigSummary(type: string, configJson: string): string | null {
  try {
    const config = JSON.parse(configJson)
    switch (type) {
      case 'RECEIPT':
        return config.targetProductKey ? `대상 제품: ${config.targetProductKey}` : null
      case 'DWELL':
        return config.minStayMinutes ? `최소 ${config.minStayMinutes}분 체류` : null
      case 'TIME_WINDOW':
        return config.startHour != null && config.endHour != null
          ? `${config.startHour}시 ~ ${config.endHour}시`
          : null
      case 'STAMP':
        return config.requiredCount ? `${config.requiredCount}회 방문` : null
      default:
        return null
    }
  } catch {
    return null
  }
}

export function MissionCard({ mission, onClick }: MissionCardProps) {
  const configSummary = getConfigSummary(mission.type, mission.configJson)

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
        <Badge color={mission.active ? 'green' : 'gray'} variant="light">
          {mission.active ? '활성' : '비활성'}
        </Badge>
      </Group>

      <Stack gap="xs">
        {configSummary && (
          <Text size="sm" c="dimmed">{configSummary}</Text>
        )}
        <Group justify="space-between">
          <Text size="sm" c="dimmed">리워드</Text>
          <Text size="sm" fw={600} c="blue">{formatCurrency(mission.rewardAmount)}</Text>
        </Group>
      </Stack>
    </Card>
  )
}
