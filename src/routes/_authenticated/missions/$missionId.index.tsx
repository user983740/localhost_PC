import { createFileRoute } from '@tanstack/react-router'
import { MissionDetailPage } from '@/pages/missions/ui/MissionDetailPage'

export const Route = createFileRoute('/_authenticated/missions/$missionId/')({
  component: MissionDetailRoute,
})

function MissionDetailRoute() {
  const { missionId } = Route.useParams()
  return <MissionDetailPage missionId={missionId} />
}
