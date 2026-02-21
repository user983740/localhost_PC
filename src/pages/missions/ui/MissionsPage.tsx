import { Stack, Loader, Center, Button, SegmentedControl } from '@mantine/core'
import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MissionList } from '@/widgets/mission-list/ui/MissionList'
import { useMissions } from '@/entities/mission/model/hooks'
import { useAuthStore } from '@/features/auth/model/authStore'
import type { MissionStatus } from '@/entities/mission/model/types'

const statusFilters: { label: string; value: string }[] = [
  { label: '전체', value: 'ALL' },
  { label: '진행중', value: 'ACTIVE' },
  { label: '일시중지', value: 'PAUSED' },
  { label: '완료', value: 'COMPLETED' },
  { label: '취소', value: 'CANCELLED' },
]

export function MissionsPage() {
  const user = useAuthStore((s) => s.user)
  const { data: missions = [], isLoading } = useMissions(user?.storeId ?? '')
  const router = useRouter()
  const [filter, setFilter] = useState('ALL')

  const filteredMissions = filter === 'ALL'
    ? missions
    : missions.filter((m) => m.status === (filter as MissionStatus))

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader />
      </Center>
    )
  }

  return (
    <Stack>
      <PageHeader
        title="미션 관리"
        description="미션을 생성하고 관리하세요"
        rightSection={
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => router.navigate({ to: '/missions/create' })}
          >
            새 미션
          </Button>
        }
      />
      <SegmentedControl data={statusFilters} value={filter} onChange={setFilter} />
      <MissionList
        missions={filteredMissions}
        onMissionClick={(id) => router.navigate({ to: '/missions/$missionId', params: { missionId: id } })}
      />
    </Stack>
  )
}
