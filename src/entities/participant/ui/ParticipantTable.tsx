import { Table, Badge, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { getParticipants } from '../api/participantApi'
import { formatDateTime } from '@/shared/lib/format'
import type { ParticipantStatus } from '../model/types'

const STATUS_LABELS: Record<ParticipantStatus, string> = {
  IN_PROGRESS: '진행중',
  COMPLETED: '완료',
  FAILED: '실패',
  REWARDED: '리워드 지급',
}

const STATUS_COLORS: Record<ParticipantStatus, string> = {
  IN_PROGRESS: 'blue',
  COMPLETED: 'green',
  FAILED: 'red',
  REWARDED: 'teal',
}

interface ParticipantTableProps {
  missionId: string
}

export function ParticipantTable({ missionId }: ParticipantTableProps) {
  const { data: participants = [], isLoading } = useQuery({
    queryKey: ['participants', missionId],
    queryFn: () => getParticipants(missionId),
  })

  if (isLoading) {
    return <Text c="dimmed">로딩 중...</Text>
  }

  if (participants.length === 0) {
    return <Text c="dimmed" ta="center" py="xl">아직 참여자가 없습니다.</Text>
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>참여자</Table.Th>
          <Table.Th>상태</Table.Th>
          <Table.Th>참여일시</Table.Th>
          <Table.Th>완료일시</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {participants.map((p) => (
          <Table.Tr key={p.id}>
            <Table.Td>{p.userName}</Table.Td>
            <Table.Td>
              <Badge color={STATUS_COLORS[p.status]} variant="light" size="sm">
                {STATUS_LABELS[p.status]}
              </Badge>
            </Table.Td>
            <Table.Td>{formatDateTime(p.joinedAt)}</Table.Td>
            <Table.Td>{p.completedAt ? formatDateTime(p.completedAt) : '-'}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
