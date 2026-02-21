import { Stack, Loader, Center, Group, Button, Card, Title } from '@mantine/core'
import { IconEdit, IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MissionDetailView } from '@/entities/mission/ui/MissionDetailView'
import { ParticipantTable } from '@/entities/participant/ui/ParticipantTable'
import { DeleteMissionButton } from '@/features/delete-mission/ui/DeleteMissionButton'
import { useMission } from '@/entities/mission/model/hooks'

interface MissionDetailPageProps {
  missionId: string
}

export function MissionDetailPage({ missionId }: MissionDetailPageProps) {
  const { data: mission, isLoading } = useMission(missionId)
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
        title={mission.title}
        rightSection={
          <Group>
            <Button
              variant="outline"
              leftSection={<IconEdit size={16} />}
              onClick={() =>
                router.navigate({
                  to: '/missions/$missionId/edit',
                  params: { missionId: mission.id },
                })
              }
            >
              수정
            </Button>
            <DeleteMissionButton
              missionId={mission.id}
              onDeleted={() => router.navigate({ to: '/missions' })}
            />
          </Group>
        }
      />
      <MissionDetailView mission={mission} />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">참여자 현황</Title>
        <ParticipantTable missionId={missionId} />
      </Card>
    </Stack>
  )
}
