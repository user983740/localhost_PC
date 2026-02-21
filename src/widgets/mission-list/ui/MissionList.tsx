import { SimpleGrid } from '@mantine/core'
import { MissionCard } from '@/entities/mission/ui/MissionCard'
import { EmptyState } from '@/shared/ui/EmptyState'
import type { Mission } from '@/entities/mission/model/types'

interface MissionListProps {
  missions: Mission[]
  onMissionClick: (missionId: string) => void
}

export function MissionList({ missions, onMissionClick }: MissionListProps) {
  if (missions.length === 0) {
    return (
      <EmptyState
        title="미션이 없습니다"
        description="새 미션을 생성하여 고객을 유치해보세요."
      />
    )
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          onClick={() => onMissionClick(String(mission.id))}
        />
      ))}
    </SimpleGrid>
  )
}
