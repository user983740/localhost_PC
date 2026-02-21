import { Stack, Loader, Center } from '@mantine/core'
import { useRouter } from '@tanstack/react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { DashboardStats } from '@/widgets/dashboard-stats/ui/DashboardStats'
import { MissionList } from '@/widgets/mission-list/ui/MissionList'
import { useMissions } from '@/entities/mission/model/hooks'
import { useAuthStore } from '@/features/auth/model/authStore'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const storeId = user?.storeId ?? ''
  const { data: missions = [], isLoading } = useMissions(storeId)
  const router = useRouter()

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader />
      </Center>
    )
  }

  const activeMissions = missions.filter((m) => m.isActive)

  return (
    <Stack>
      <PageHeader title="대시보드" description="매장 운영 현황을 한눈에 확인하세요" />
      <DashboardStats missions={missions} />
      <PageHeader title="활성 미션" />
      <MissionList
        missions={activeMissions}
        onMissionClick={(id) => router.navigate({ to: '/missions/$missionId', params: { missionId: id } })}
      />
    </Stack>
  )
}
