import { useState } from 'react'
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import { signupApi } from '../api/realAuthApi'
import { useAuthStore } from '../model/authStore'
import { useRouter } from '@tanstack/react-router'
import { ApiRequestError } from '@/shared/lib/fetchClient'
import type { User } from '@/entities/user/model/types'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const router = useRouter()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      username: (v) => {
        if (!v.trim()) return '아이디를 입력해주세요'
        if (v.trim().length < 6 || v.trim().length > 12) return '아이디는 6~12자여야 합니다'
        return null
      },
      password: (v) => {
        if (!v) return '비밀번호를 입력해주세요'
        if (v.length < 8 || v.length > 12) return '비밀번호는 8~12자여야 합니다'
        return null
      },
      passwordConfirm: (v, values) =>
        v === values.password ? null : '비밀번호가 일치하지 않습니다',
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    setError(null)
    setLoading(true)
    try {
      const result = await signupApi({
        username: values.username,
        password: values.password,
        role: 'OWNER',
      })
      const user: User = {
        id: String(result.userId),
        username: values.username,
        role: result.role as User['role'],
      }
      setAuth(user, result.token)
      router.navigate({ to: '/store-setup' })
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.validationErrors) {
          for (const [field, message] of Object.entries(err.validationErrors)) {
            form.setFieldError(field, message)
          }
        }
        setError(err.message)
      } else {
        setError('회원가입에 실패했습니다.')
      }
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
          placeholder="6~12자 입력"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="8~12자 입력"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          {...form.getInputProps('passwordConfirm')}
        />
        <Button type="submit" fullWidth loading={loading} mt="sm">
          회원가입
        </Button>
      </Stack>
    </form>
  )
}
