import { Button, Group, Modal, Text } from '@mantine/core'

interface ConfirmModalProps {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  loading?: boolean
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = '확인',
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text size="sm" mb="lg">
        {message}
      </Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          취소
        </Button>
        <Button color="red" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  )
}
