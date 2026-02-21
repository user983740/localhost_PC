import { TextInput, Select, NumberInput, Button, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { Mission, MissionType, CreateMissionRequest } from '@/entities/mission/model/types'

interface MissionFormProps {
  initialValues?: Mission
  onSubmit: (values: CreateMissionRequest) => void
  loading?: boolean
}

const missionTypeOptions = [
  { value: 'TIME_WINDOW', label: '시간대 방문' },
  { value: 'DWELL', label: '체류' },
  { value: 'RECEIPT', label: '영수증 인증' },
  { value: 'INVENTORY', label: '재고 확인' },
  { value: 'STAMP', label: '스탬프' },
]

function parseConfigJson(configJson: string): Record<string, unknown> {
  try {
    return JSON.parse(configJson)
  } catch {
    return {}
  }
}

export function MissionForm({ initialValues, onSubmit, loading }: MissionFormProps) {
  const parsedConfig = initialValues ? parseConfigJson(initialValues.configJson) : {}

  const form = useForm({
    initialValues: {
      type: (initialValues?.type ?? 'RECEIPT') as MissionType,
      rewardAmount: initialValues?.rewardAmount ?? 1000,
      // RECEIPT
      targetProductKey: (parsedConfig.targetProductKey as string) ?? '',
      confidenceThreshold: (parsedConfig.confidenceThreshold as number) ?? 0.8,
      // DWELL
      minStayMinutes: (parsedConfig.minStayMinutes as number) ?? 30,
      // TIME_WINDOW
      startHour: (parsedConfig.startHour as number) ?? 9,
      endHour: (parsedConfig.endHour as number) ?? 18,
      // STAMP
      requiredCount: (parsedConfig.requiredCount as number) ?? 3,
    },
    validate: {
      rewardAmount: (v) => (v > 0 ? null : '리워드 금액은 0보다 커야 합니다'),
      targetProductKey: (v, values) =>
        values.type === 'RECEIPT' && !v.trim() ? '대상 제품명을 입력해주세요' : null,
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    let configJson: string

    switch (values.type) {
      case 'RECEIPT':
        configJson = JSON.stringify({
          targetProductKey: values.targetProductKey,
          confidenceThreshold: values.confidenceThreshold,
        })
        break
      case 'DWELL':
        configJson = JSON.stringify({
          minStayMinutes: values.minStayMinutes,
        })
        break
      case 'TIME_WINDOW':
        configJson = JSON.stringify({
          startHour: values.startHour,
          endHour: values.endHour,
        })
        break
      case 'STAMP':
        configJson = JSON.stringify({
          requiredCount: values.requiredCount,
        })
        break
      default:
        configJson = '{}'
    }

    onSubmit({
      type: values.type,
      configJson,
      rewardAmount: values.rewardAmount,
    })
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Select
          label="미션 유형"
          data={missionTypeOptions}
          allowDeselect={false}
          {...form.getInputProps('type')}
        />
        <NumberInput
          label="리워드 금액 (원)"
          min={100}
          step={100}
          {...form.getInputProps('rewardAmount')}
        />

        {form.values.type === 'RECEIPT' && (
          <>
            <TextInput
              label="대상 제품명"
              placeholder="예: 아메리카노"
              {...form.getInputProps('targetProductKey')}
            />
            <NumberInput
              label="신뢰도 임계값"
              min={0}
              max={1}
              step={0.1}
              decimalScale={2}
              {...form.getInputProps('confidenceThreshold')}
            />
          </>
        )}

        {form.values.type === 'DWELL' && (
          <NumberInput
            label="최소 체류 시간 (분)"
            min={1}
            {...form.getInputProps('minStayMinutes')}
          />
        )}

        {form.values.type === 'TIME_WINDOW' && (
          <>
            <NumberInput
              label="시작 시간 (시)"
              min={0}
              max={23}
              {...form.getInputProps('startHour')}
            />
            <NumberInput
              label="종료 시간 (시)"
              min={0}
              max={23}
              {...form.getInputProps('endHour')}
            />
          </>
        )}

        {form.values.type === 'STAMP' && (
          <NumberInput
            label="필요 스탬프 수"
            min={1}
            {...form.getInputProps('requiredCount')}
          />
        )}

        <Button type="submit" loading={loading} mt="sm">
          {initialValues ? '미션 수정' : '미션 생성'}
        </Button>
      </Stack>
    </form>
  )
}
