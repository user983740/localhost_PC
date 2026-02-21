import { createFileRoute } from '@tanstack/react-router'
import { MissionCreatePage } from '@/pages/missions/ui/MissionCreatePage'

export const Route = createFileRoute('/_authenticated/missions/create')({
  component: MissionCreatePage,
})
