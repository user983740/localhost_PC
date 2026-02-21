import { useState } from 'react'
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import { login } from '../api/authApi'
import { useAuthStore } from '../model/authStore'
import { useRouter } from '@tanstack/react-router'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const router = useRouter()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (v) => (v.trim() ? null : '아이디를 입력해주세요'),
      password: (v) => (v ? null : '비밀번호를 입력해주세요'),
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    setError(null)
    setLoading(true)
    try {
      const result = await login(values)
      setAuth(result.user, result.token)
      router.navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}
        <TextInput
          label="아이디"
          placeholder="아이디를 입력하세요"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          {...form.getInputProps('password')}
        />
        <Button type="submit" fullWidth loading={loading}>
          로그인
        </Button>
      </Stack>
    </form>
  )
}
