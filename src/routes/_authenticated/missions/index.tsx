import { createFileRoute } from '@tanstack/react-router'
import { MissionsPage } from '@/pages/missions/ui/MissionsPage'

export const Route = createFileRoute('/_authenticated/missions/')({
  component: MissionsPage,
})
