import { Badge } from '@mantine/core'

interface ActiveBadgeProps {
  active: boolean
}

export function ActiveBadge({ active }: ActiveBadgeProps) {
  return (
    <Badge color={active ? 'green' : 'gray'} variant="light">
      {active ? '활성' : '비활성'}
    </Badge>
  )
}
