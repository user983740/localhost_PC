import { useState } from 'react'
import { TextInput, PasswordInput, Button, Stack, Alert, Group, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'
import { register, checkUsername } from '../api/authApi'
import { useAuthStore } from '../model/authStore'
import { useRouter } from '@tanstack/react-router'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const router = useRouter()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      name: '',
      email: '',
      storeName: '',
      storeCategory: '',
      storeAddress: '',
      storePhone: '',
    },
    validate: {
      username: (v) => (v.trim().length >= 4 ? null : '아이디는 4자 이상이어야 합니다'),
      password: (v) => (v.length >= 4 ? null : '비밀번호는 4자 이상이어야 합니다'),
      passwordConfirm: (v, values) =>
        v === values.password ? null : '비밀번호가 일치하지 않습니다',
      name: (v) => (v.trim() ? null : '이름을 입력해주세요'),
      email: (v) => (/\S+@\S+\.\S+/.test(v) ? null : '유효한 이메일을 입력해주세요'),
      storeName: (v) => (v.trim() ? null : '매장명을 입력해주세요'),
      storeCategory: (v) => (v.trim() ? null : '업종을 입력해주세요'),
      storeAddress: (v) => (v.trim() ? null : '주소를 입력해주세요'),
      storePhone: (v) => (v.trim() ? null : '전화번호를 입력해주세요'),
    },
  })

  const handleCheckUsername = async () => {
    const username = form.values.username.trim()
    if (username.length < 4) {
      form.setFieldError('username', '아이디는 4자 이상이어야 합니다')
      return
    }
    setCheckingUsername(true)
    try {
      const available = await checkUsername(username)
      setUsernameAvailable(available)
      if (!available) {
        form.setFieldError('username', '이미 사용 중인 아이디입니다')
      }
    } finally {
      setCheckingUsername(false)
    }
  }

  const handleSubmit = form.onSubmit(async (values) => {
    if (usernameAvailable !== true) {
      form.setFieldError('username', '아이디 중복확인을 해주세요')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const { passwordConfirm: _, ...input } = values
      const result = await register(input)
      setAuth(result.user, result.token)
      router.navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
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

        <Group align="flex-end">
          <TextInput
            label="아이디"
            placeholder="4자 이상 입력"
            style={{ flex: 1 }}
            {...form.getInputProps('username')}
            onChange={(e) => {
              form.getInputProps('username').onChange(e)
              setUsernameAvailable(null)
            }}
          />
          <Button
            variant="outline"
            onClick={handleCheckUsername}
            loading={checkingUsername}
            leftSection={usernameAvailable ? <IconCheck size={14} /> : undefined}
            color={usernameAvailable ? 'green' : undefined}
          >
            {usernameAvailable ? '사용 가능' : '중복확인'}
          </Button>
        </Group>

        <PasswordInput
          label="비밀번호"
          placeholder="4자 이상 입력"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          {...form.getInputProps('passwordConfirm')}
        />

        <TextInput label="이름" placeholder="이름" {...form.getInputProps('name')} />
        <TextInput label="이메일" placeholder="email@example.com" {...form.getInputProps('email')} />

        <Divider label="매장 정보" labelPosition="center" />

        <TextInput label="매장명" placeholder="매장명" {...form.getInputProps('storeName')} />
        <TextInput label="업종" placeholder="예: 카페, 음식점" {...form.getInputProps('storeCategory')} />
        <TextInput label="주소" placeholder="매장 주소" {...form.getInputProps('storeAddress')} />
        <TextInput label="전화번호" placeholder="02-1234-5678" {...form.getInputProps('storePhone')} />

        <Button type="submit" fullWidth loading={loading} mt="sm">
          회원가입
        </Button>
      </Stack>
    </form>
  )
}
