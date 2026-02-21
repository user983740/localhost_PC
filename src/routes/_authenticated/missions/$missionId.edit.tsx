import { createFileRoute } from '@tanstack/react-router'
import { MissionEditPage } from '@/pages/missions/ui/MissionEditPage'

export const Route = createFileRoute('/_authenticated/missions/$missionId/edit')({
  component: MissionEditRoute,
})

function MissionEditRoute() {
  const { missionId } = Route.useParams()
  return <MissionEditPage missionId={missionId} />
}
