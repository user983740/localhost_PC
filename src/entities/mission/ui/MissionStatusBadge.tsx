import { Badge } from '@mantine/core'
import { MISSION_STATUS_LABELS, MISSION_STATUS_COLORS } from '@/shared/config/constants'
import type { MissionStatus } from '../model/types'

interface MissionStatusBadgeProps {
  status: MissionStatus
}

export function MissionStatusBadge({ status }: MissionStatusBadgeProps) {
  return (
    <Badge color={MISSION_STATUS_COLORS[status]} variant="light">
      {MISSION_STATUS_LABELS[status]}
    </Badge>
  )
}
