import { useState, useEffect } from 'react'
import { TextInput, Button, Stack, Alert, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconSearch } from '@tabler/icons-react'
import { createStoreApi } from '../api/realStoreApi'
import { useAuthStore } from '../model/authStore'
import { useRouter } from '@tanstack/react-router'
import { ApiRequestError } from '@/shared/lib/fetchClient'

const DAUM_POSTCODE_SCRIPT = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

export function StoreSetupForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const setStoreId = useAuthStore((s) => s.setStoreId)
  const router = useRouter()

  useEffect(() => {
    if (document.querySelector(`script[src="${DAUM_POSTCODE_SCRIPT}"]`)) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = DAUM_POSTCODE_SCRIPT
    script.onload = () => setScriptLoaded(true)
    document.head.appendChild(script)
  }, [])

  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      detailAddress: '',
      businessNumber: '',
    },
    validate: {
      name: (v) => (v.trim() ? null : '매장명을 입력해주세요'),
      address: (v) => (v.trim() ? null : '주소를 검색해주세요'),
    },
  })

  const handleSearchAddress = () => {
    if (!scriptLoaded) return
    new daum.Postcode({
      oncomplete: (data) => {
        form.setFieldValue('address', data.address)
        form.clearFieldError('address')
      },
    }).open()
  }

  const handleSubmit = form.onSubmit(async (values) => {
    setError(null)
    setLoading(true)
    try {
      const result = await createStoreApi({
        name: values.name,
        address: values.address,
        detailAddress: values.detailAddress || undefined,
        businessNumber: values.businessNumber || undefined,
      })
      setStoreId(String(result.id))
      router.navigate({ to: '/dashboard' })
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.validationErrors) {
          for (const [field, message] of Object.entries(err.validationErrors)) {
            form.setFieldError(field, message)
          }
        }
        setError(err.message)
      } else {
        setError('매장 등록에 실패했습니다.')
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
          label="매장명"
          placeholder="매장명을 입력하세요"
          required
          {...form.getInputProps('name')}
        />
        <Group align="flex-end">
          <TextInput
            label="주소"
            placeholder="주소를 검색하세요"
            required
            readOnly
            style={{ flex: 1 }}
            {...form.getInputProps('address')}
            onClick={handleSearchAddress}
          />
          <Button
            variant="outline"
            leftSection={<IconSearch size={14} />}
            onClick={handleSearchAddress}
            disabled={!scriptLoaded}
          >
            주소 검색
          </Button>
        </Group>
        <TextInput
          label="상세주소"
          placeholder="상세주소를 입력하세요 (선택)"
          {...form.getInputProps('detailAddress')}
        />
        <TextInput
          label="사업자등록번호"
          placeholder="사업자등록번호 (선택)"
          {...form.getInputProps('businessNumber')}
        />
        <Button type="submit" fullWidth loading={loading} mt="sm">
          매장 등록
        </Button>
      </Stack>
    </form>
  )
}
