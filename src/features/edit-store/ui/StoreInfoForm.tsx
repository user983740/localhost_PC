import { TextInput, Textarea, Button, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { updateStore } from '../api/updateStoreApi'
import type { Store } from '@/entities/store/model/types'

interface StoreInfoFormProps {
  store: Store
}

export function StoreInfoForm({ store }: StoreInfoFormProps) {
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
      name: store.name,
      category: store.category,
      address: store.address,
      phone: store.phone,
      description: store.description,
      businessHours: store.businessHours,
    },
    validate: {
      name: (v) => (v.trim() ? null : '매장명을 입력해주세요'),
      address: (v) => (v.trim() ? null : '주소를 입력해주세요'),
      phone: (v) => (v.trim() ? null : '전화번호를 입력해주세요'),
    },
  })

  const mutation = useMutation({
    mutationFn: (values: typeof form.values) => updateStore(store.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store'] })
      notifications.show({
        title: '저장 완료',
        message: '매장 정보가 수정되었습니다.',
        color: 'green',
      })
    },
    onError: () => {
      notifications.show({
        title: '저장 실패',
        message: '매장 정보 수정에 실패했습니다.',
        color: 'red',
      })
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
      <Stack>
        <TextInput label="매장명" {...form.getInputProps('name')} />
        <TextInput label="업종" {...form.getInputProps('category')} />
        <TextInput label="주소" {...form.getInputProps('address')} />
        <TextInput label="전화번호" {...form.getInputProps('phone')} />
        <TextInput label="영업시간" {...form.getInputProps('businessHours')} />
        <Textarea
          label="매장 소개"
          minRows={3}
          {...form.getInputProps('description')}
        />
        <Button type="submit" loading={mutation.isPending}>
          저장
        </Button>
      </Stack>
    </form>
  )
}
