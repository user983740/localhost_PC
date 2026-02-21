import { Stack, Loader, Center, Group, Button } from '@mantine/core'
import { IconEdit, IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MissionDetailView } from '@/entities/mission/ui/MissionDetailView'
import { DeleteMissionButton } from '@/features/delete-mission/ui/DeleteMissionButton'
import { useMission } from '@/entities/mission/model/hooks'
import { useAuthStore } from '@/features/auth/model/authStore'
import { MISSION_TYPE_LABELS } from '@/shared/config/constants'

interface MissionDetailPageProps {
  missionId: string
}

export function MissionDetailPage({ missionId }: MissionDetailPageProps) {
  const user = useAuthStore((s) => s.user)
  const storeId = user?.storeId ?? ''
  const { data: mission, isLoading } = useMission(storeId, missionId)
  const router = useRouter()

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader />
      </Center>
    )
  }

  if (!mission) {
    return <Center py={100}>미션을 찾을 수 없습니다.</Center>
  }

  return (
    <Stack>
      <Group>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => router.navigate({ to: '/missions' })}
        >
          목록으로
        </Button>
      </Group>
      <PageHeader
        title={MISSION_TYPE_LABELS[mission.type] ?? mission.type}
        rightSection={
          <Group>
            <Button
              variant="outline"
              leftSection={<IconEdit size={16} />}
              onClick={() =>
                router.navigate({
                  to: '/missions/$missionId/edit',
                  params: { missionId: String(mission.id) },
                })
              }
            >
              수정
            </Button>
            <DeleteMissionButton
              storeId={storeId}
              missionId={String(mission.id)}
              onDeleted={() => router.navigate({ to: '/missions' })}
            />
          </Group>
        }
      />
      <MissionDetailView mission={mission} />
    </Stack>
  )
}
