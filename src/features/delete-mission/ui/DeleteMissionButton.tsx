import { useState } from 'react'
import { Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { deleteMission } from '../api/deleteMissionApi'

interface DeleteMissionButtonProps {
  missionId: string
  onDeleted?: () => void
}

export function DeleteMissionButton({ missionId, onDeleted }: DeleteMissionButtonProps) {
  const [opened, setOpened] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => deleteMission(missionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] })
      notifications.show({
        title: '삭제 완료',
        message: '미션이 삭제되었습니다.',
        color: 'green',
      })
      setOpened(false)
      onDeleted?.()
    },
    onError: () => {
      notifications.show({
        title: '삭제 실패',
        message: '미션 삭제에 실패했습니다.',
        color: 'red',
      })
    },
  })

  return (
    <>
      <Button
        variant="outline"
        color="red"
        leftSection={<IconTrash size={16} />}
        onClick={() => setOpened(true)}
      >
        삭제
      </Button>
      <ConfirmModal
        opened={opened}
        onClose={() => setOpened(false)}
        onConfirm={() => mutation.mutate()}
        title="미션 삭제"
        message="이 미션을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        loading={mutation.isPending}
      />
    </>
  )
}
