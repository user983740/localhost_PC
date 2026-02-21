import { Card, Group, Text, Stack, Divider, Badge, Image } from '@mantine/core'
import { MISSION_TYPE_LABELS, MISSION_TYPE_COLORS } from '@/shared/config/constants'
import { formatCurrency } from '@/shared/lib/format'
import type { Mission } from '../model/types'

const DAY_LABELS: Record<string, string> = {
  MON: '월', TUE: '화', WED: '수', THU: '목', FRI: '금', SAT: '토', SUN: '일',
}

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
            <Group justify="space-between">
              <Text c="dimmed">대상 제품명</Text>
              <Text fw={500}>{(config.targetProductKey as string) || '-'}</Text>
            </Group>
          )}

          {mission.type === 'DWELL' && config.durationMinutes != null && (
            <Group justify="space-between">
              <Text c="dimmed">체류 시간</Text>
              <Text>{String(config.durationMinutes)}분</Text>
            </Group>
          )}

          {mission.type === 'TIME_WINDOW' && (
            <>
              <Group justify="space-between">
                <Text c="dimmed">방문 시간대</Text>
                <Text>{String(config.startHour)}시 ~ {String(config.endHour)}시</Text>
              </Group>
              {Array.isArray(config.days) && (
                <Group justify="space-between">
                  <Text c="dimmed">요일</Text>
                  <Text>{(config.days as string[]).map((d) => DAY_LABELS[d] ?? d).join(', ')}</Text>
                </Group>
              )}
            </>
          )}

          {mission.type === 'STAMP' && config.requiredCount != null && (
            <Group justify="space-between">
              <Text c="dimmed">필요 방문 횟수</Text>
              <Text>{String(config.requiredCount)}회</Text>
            </Group>
          )}

          {mission.type === 'INVENTORY' && (
            <>
              <Group justify="space-between">
                <Text c="dimmed">답안 이미지</Text>
                <Text fw={500}>{config.answerImageUrl ? '등록됨' : '미등록'}</Text>
              </Group>
              {config.answerImageUrl && (
                <Image
                  src={config.answerImageUrl as string}
                  alt="답안 이미지"
                  maw={300}
                  radius="md"
                />
              )}
            </>
          )}
        </Stack>
      </Card>
    </Stack>
  )
}
