import { TextInput, Textarea, Select, NumberInput, Button, Stack, Group } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import type { Mission, MissionType, CreateMissionInput } from '@/entities/mission/model/types'

interface MissionFormProps {
  initialValues?: Mission
  onSubmit: (values: CreateMissionInput) => void
  loading?: boolean
}

const missionTypeOptions = [
  { value: 'VISIT', label: '방문' },
  { value: 'STAY', label: '체류' },
  { value: 'PURCHASE', label: '구매' },
  { value: 'REVISIT', label: '재방문' },
]

export function MissionForm({ initialValues, onSubmit, loading }: MissionFormProps) {
  const form = useForm({
    initialValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      type: (initialValues?.type ?? 'VISIT') as MissionType,
      rewardAmount: initialValues?.rewardAmount ?? 1000,
      maxParticipants: initialValues?.maxParticipants ?? 50,
      startDate: initialValues?.startDate ? new Date(initialValues.startDate) : new Date(),
      endDate: initialValues?.endDate
        ? new Date(initialValues.endDate)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      minStayMinutes: initialValues?.conditions?.minStayMinutes ?? 0,
      minPurchaseAmount: initialValues?.conditions?.minPurchaseAmount ?? 0,
      revisitDays: initialValues?.conditions?.revisitDays ?? 0,
    },
    validate: {
      title: (v) => (v.trim() ? null : '미션 제목을 입력해주세요'),
      description: (v) => (v.trim() ? null : '미션 설명을 입력해주세요'),
      rewardAmount: (v) => (v > 0 ? null : '리워드 금액은 0보다 커야 합니다'),
      maxParticipants: (v) => (v > 0 ? null : '최대 참여자 수는 0보다 커야 합니다'),
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    const conditions: CreateMissionInput['conditions'] = {}
    if (values.type === 'STAY' && values.minStayMinutes > 0) {
      conditions.minStayMinutes = values.minStayMinutes
    }
    if (values.type === 'PURCHASE' && values.minPurchaseAmount > 0) {
      conditions.minPurchaseAmount = values.minPurchaseAmount
    }
    if (values.type === 'REVISIT' && values.revisitDays > 0) {
      conditions.revisitDays = values.revisitDays
    }

    onSubmit({
      title: values.title,
      description: values.description,
      type: values.type,
      rewardAmount: values.rewardAmount,
      maxParticipants: values.maxParticipants,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      conditions,
    })
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="미션 제목"
          placeholder="미션 제목을 입력하세요"
          {...form.getInputProps('title')}
        />
        <Textarea
          label="미션 설명"
          placeholder="미션에 대한 상세 설명을 입력하세요"
          minRows={3}
          {...form.getInputProps('description')}
        />
        <Select
          label="미션 유형"
          data={missionTypeOptions}
          {...form.getInputProps('type')}
        />
        <NumberInput
          label="리워드 금액 (원)"
          min={100}
          step={100}
          {...form.getInputProps('rewardAmount')}
        />
        <NumberInput
          label="최대 참여자 수"
          min={1}
          {...form.getInputProps('maxParticipants')}
        />
        <Group grow>
          <DatePickerInput
            label="시작일"
            {...form.getInputProps('startDate')}
          />
          <DatePickerInput
            label="종료일"
            {...form.getInputProps('endDate')}
          />
        </Group>

        {form.values.type === 'STAY' && (
          <NumberInput
            label="최소 체류 시간 (분)"
            min={1}
            {...form.getInputProps('minStayMinutes')}
          />
        )}
        {form.values.type === 'PURCHASE' && (
          <NumberInput
            label="최소 구매 금액 (원)"
            min={100}
            step={100}
            {...form.getInputProps('minPurchaseAmount')}
          />
        )}
        {form.values.type === 'REVISIT' && (
          <NumberInput
            label="재방문 기한 (일)"
            min={1}
            {...form.getInputProps('revisitDays')}
          />
        )}

        <Button type="submit" loading={loading} mt="sm">
          {initialValues ? '미션 수정' : '미션 생성'}
        </Button>
      </Stack>
    </form>
  )
}
