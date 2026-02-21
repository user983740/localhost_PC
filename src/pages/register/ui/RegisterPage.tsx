import { Center, Card, Stack, Title, Text, Anchor, ScrollArea } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'

export function RegisterPage() {
  return (
    <Center mih="100vh" bg="gray.0" py="xl">
      <Card shadow="md" padding="xl" radius="md" w={480} withBorder>
        <Stack align="center" mb="lg">
          <Title order={2}>회원가입</Title>
          <Text c="dimmed" size="sm">매장 관리자 계정을 생성하세요</Text>
        </Stack>
        <ScrollArea.Autosize mah="70vh">
          <RegisterForm />
        </ScrollArea.Autosize>
        <Text ta="center" mt="md" size="sm">
          이미 계정이 있으신가요?{' '}
          <Anchor component={Link} to="/login">
            로그인
          </Anchor>
        </Text>
      </Card>
    </Center>
  )
}
