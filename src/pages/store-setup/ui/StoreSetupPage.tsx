import { Center, Card, Stack, Title, Text } from '@mantine/core'
import { StoreSetupForm } from '@/features/auth/ui/StoreSetupForm'

export function StoreSetupPage() {
  return (
    <Center mih="100vh" bg="gray.0" py="xl">
      <Card shadow="md" padding="xl" radius="md" w={480} withBorder>
        <Stack align="center" mb="lg">
          <Title order={2}>매장 등록</Title>
          <Text c="dimmed" size="sm">매장 정보를 등록하면 서비스를 시작할 수 있습니다</Text>
        </Stack>
        <StoreSetupForm />
      </Card>
    </Center>
  )
}
