import { Center, Card, Stack, Title, Text, Anchor } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/ui/LoginForm'

export function LoginPage() {
  return (
    <Center mih="100vh" bg="gray.0">
      <Card shadow="md" padding="xl" radius="md" w={400} withBorder>
        <Stack align="center" mb="lg">
          <img src="/logo.png" alt="localhost" width={48} height={48} />
          <Title order={2}>localhost</Title>
          <Text c="dimmed" size="sm">매장 관리자 로그인</Text>
        </Stack>
        <LoginForm />
        <Text ta="center" mt="md" size="sm">
          계정이 없으신가요?{' '}
          <Anchor component={Link} to="/register">
            회원가입
          </Anchor>
        </Text>
      </Card>
    </Center>
  )
}
