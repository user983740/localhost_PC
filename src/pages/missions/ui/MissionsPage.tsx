import { Stack, Loader, Center, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MissionList } from '@/widgets/mission-list/ui/MissionList'
import { useMissions } from '@/entities/mission/model/hooks'
import { useAuthStore } from '@/features/auth/model/authStore'

export function MissionsPage() {
  const user = useAuthStore((s) => s.user)
  const { data: missions = [], isLoading } = useMissions(user?.storeId ?? '')
  const router = useRouter()

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
      <MissionList
        missions={missions}
        onMissionClick={(id) => router.navigate({ to: '/missions/$missionId', params: { missionId: id } })}
      />
    </Stack>
  )
}
