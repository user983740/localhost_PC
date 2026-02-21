import { Stack, Loader, Center } from '@mantine/core'
import { PageHeader } from '@/shared/ui/PageHeader'
import { StoreCard } from '@/entities/store/ui/StoreCard'
import { useStore } from '@/entities/store/model/hooks'
import { useAuthStore } from '@/features/auth/model/authStore'

export function StorePage() {
  const user = useAuthStore((s) => s.user)
  const { data: store, isLoading } = useStore(user?.storeId ?? '')

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader />
      </Center>
    )
  }

  if (!store) {
    return <Center py={100}>매장 정보를 불러올 수 없습니다.</Center>
  }

  return (
    <Stack>
      <PageHeader title="매장 정보" description="매장 정보를 확인하세요" />
      <StoreCard store={store} />
    </Stack>
  )
}
