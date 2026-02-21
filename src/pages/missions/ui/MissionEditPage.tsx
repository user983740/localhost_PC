import { Stack, Button, Group, Card, Loader, Center } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MissionForm } from '@/features/create-mission/ui/MissionForm'
import { updateMission } from '@/features/edit-mission/api/updateMissionApi'
import { useMission } from '@/entities/mission/model/hooks'
import type { CreateMissionInput } from '@/entities/mission/model/types'

interface MissionEditPageProps {
  missionId: string
}

export function MissionEditPage({ missionId }: MissionEditPageProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: mission, isLoading } = useMission(missionId)

  const mutation = useMutation({
    mutationFn: (input: CreateMissionInput) => updateMission(missionId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] })
      queryClient.invalidateQueries({ queryKey: ['mission', missionId] })
      notifications.show({
        title: '수정 완료',
        message: '미션이 수정되었습니다.',
        color: 'green',
      })
      router.navigate({ to: '/missions/$missionId', params: { missionId } })
    },
    onError: () => {
      notifications.show({
        title: '수정 실패',
        message: '미션 수정에 실패했습니다.',
        color: 'red',
      })
    },
  })

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
          onClick={() =>
            router.navigate({ to: '/missions/$missionId', params: { missionId } })
          }
        >
          돌아가기
        </Button>
      </Group>
      <PageHeader title="미션 수정" description={mission.title} />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <MissionForm
          initialValues={mission}
          onSubmit={(v) => mutation.mutate(v)}
          loading={mutation.isPending}
        />
      </Card>
    </Stack>
  )
}
