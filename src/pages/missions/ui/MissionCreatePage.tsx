import { Stack, Button, Group, Card } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MissionForm } from '@/features/create-mission/ui/MissionForm'
import { createMission } from '@/features/create-mission/api/createMissionApi'
import { useAuthStore } from '@/features/auth/model/authStore'
import type { CreateMissionRequest } from '@/entities/mission/model/types'

export function MissionCreatePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)
  const storeId = user?.storeId ?? ''

  const mutation = useMutation({
    mutationFn: (input: CreateMissionRequest) => createMission(storeId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] })
      notifications.show({
        title: '생성 완료',
        message: '새 미션이 생성되었습니다.',
        color: 'green',
      })
      router.navigate({ to: '/missions' })
    },
    onError: () => {
      notifications.show({
        title: '생성 실패',
        message: '미션 생성에 실패했습니다.',
        color: 'red',
      })
    },
  })

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
      <PageHeader title="새 미션 생성" description="새로운 미션을 만들어 고객을 유치하세요" />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <MissionForm onSubmit={(v) => mutation.mutate(v)} loading={mutation.isPending} />
      </Card>
    </Stack>
  )
}
