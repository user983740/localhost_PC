import { useState, useCallback, useEffect } from 'react'
import { TextInput, NumberInput, Button, Stack, Group, Text, FileInput, Image, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconPhoto, IconInfoCircle } from '@tabler/icons-react'
import { getInventoryPresignedUrl, getMissionImagePresignedUrl, confirmImageUpload, uploadToS3 } from '@/entities/mission/api/presignedUrlApi'
import type { Mission, MissionType, DayOfWeek, CreateMissionRequest } from '@/entities/mission/model/types'

interface MissionFormProps {
  storeId: string
  missionId?: string
  initialValues?: Mission
  onSubmit: (values: CreateMissionRequest) => void
  loading?: boolean
}

const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp'

const missionTypeOptions = [
  { value: 'TIME_WINDOW', label: '시간대 방문' },
  { value: 'DWELL', label: '체류' },
  { value: 'RECEIPT', label: '영수증 인증' },
  { value: 'INVENTORY', label: '재고 확인' },
  { value: 'STAMP', label: '반복 방문' },
]

const dayOptions = [
  { value: 'MON', label: '월' },
  { value: 'TUE', label: '화' },
  { value: 'WED', label: '수' },
  { value: 'THU', label: '목' },
  { value: 'FRI', label: '금' },
  { value: 'SAT', label: '토' },
  { value: 'SUN', label: '일' },
]

function parseConfigJson(configJson: string | Record<string, unknown>): Record<string, unknown> {
  if (typeof configJson === 'object' && configJson !== null) {
    return configJson as Record<string, unknown>
  }
  try {
    return JSON.parse(configJson)
  } catch {
    return {}
  }
}

export function MissionForm({ storeId, missionId, initialValues, onSubmit, loading }: MissionFormProps) {
  const parsedConfig = initialValues ? parseConfigJson(initialValues.configJson) : {}

  const [answerImageUrl, setAnswerImageUrl] = useState<string>(
    (parsedConfig.answerImageUrl as string) ?? '',
  )
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  // 컴포넌트 언마운트 시 object URL 해제
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleImageUpload = useCallback(
    async (file: File | null) => {
      if (!file) return

      // 로컬 미리보기 즉시 표시
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(URL.createObjectURL(file))

      setUploading(true)
      try {
        const { presignedUrl, imageUrl } = missionId
          ? await getMissionImagePresignedUrl(storeId, missionId, file.type)
          : await getInventoryPresignedUrl(storeId, file.type)
        await uploadToS3(presignedUrl, file)

        // 기존 미션 수정 시 confirm 호출하여 configJson.answerImageUrl 갱신
        if (missionId) {
          await confirmImageUpload(storeId, missionId, imageUrl)
        }

        setAnswerImageUrl(imageUrl)
        notifications.show({
          title: '업로드 완료',
          message: '답안 이미지가 업로드되었습니다.',
          color: 'green',
        })
      } catch {
        // 업로드 실패 시 미리보기 제거
        setPreviewUrl('')
        notifications.show({
          title: '업로드 실패',
          message: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
          color: 'red',
        })
      } finally {
        setUploading(false)
      }
    },
    [storeId, missionId, previewUrl],
  )

  const form = useForm({
    initialValues: {
      type: (initialValues?.type ?? 'RECEIPT') as MissionType,
      rewardAmount: initialValues?.rewardAmount ?? 1000,
      // RECEIPT
      targetProductKey: (parsedConfig.targetProductKey as string) ?? '',
      // DWELL
      durationMinutes: (parsedConfig.durationMinutes as number) ?? 10,
      // TIME_WINDOW
      startHour: (parsedConfig.startHour as number) ?? 9,
      endHour: (parsedConfig.endHour as number) ?? 18,
      days: (parsedConfig.days as DayOfWeek[]) ?? [],
      // STAMP
      requiredCount: (parsedConfig.requiredCount as number) ?? 3,
    },
    validate: {
      rewardAmount: (v) => (v > 0 ? null : '리워드 금액은 0보다 커야 합니다'),
      targetProductKey: (v, values) =>
        values.type === 'RECEIPT' && !v.trim() ? '대상 제품명을 입력해주세요' : null,
      days: (v, values) =>
        values.type === 'TIME_WINDOW' && v.length === 0 ? '요일을 하나 이상 선택해주세요' : null,
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    if (values.type === 'INVENTORY' && uploading) {
      notifications.show({
        title: '업로드 진행 중',
        message: '이미지 업로드가 완료될 때까지 잠시 기다려주세요.',
        color: 'blue',
      })
      return
    }

    if (values.type === 'INVENTORY' && !answerImageUrl) {
      notifications.show({
        title: '이미지 필요',
        message: '재고 확인 미션은 정답 상품 이미지를 등록해야 합니다.',
        color: 'orange',
      })
      return
    }

    let configJson: Record<string, unknown>

    switch (values.type) {
      case 'RECEIPT':
        configJson = { targetProductKey: values.targetProductKey }
        break
      case 'DWELL':
        configJson = { durationMinutes: values.durationMinutes }
        break
      case 'TIME_WINDOW':
        configJson = { startHour: values.startHour, endHour: values.endHour, days: values.days }
        break
      case 'INVENTORY':
        configJson = { answerImageUrl }
        break
      case 'STAMP':
        configJson = { requiredCount: values.requiredCount }
        break
      default:
        configJson = {}
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
        <div>
          <Text size="sm" fw={500} mb={4}>미션 유형</Text>
          <Group gap="xs" grow>
            {missionTypeOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={form.values.type === opt.value ? 'filled' : 'default'}
                onClick={() => form.setFieldValue('type', opt.value as MissionType)}
                type="button"
              >
                {opt.label}
              </Button>
            ))}
          </Group>
        </div>
        <NumberInput
          label="리워드 금액 (원)"
          min={100}
          step={100}
          {...form.getInputProps('rewardAmount')}
        />

        {form.values.type === 'RECEIPT' && (
          <TextInput
            label="대상 제품명"
            placeholder="예: 아메리카노"
            {...form.getInputProps('targetProductKey')}
          />
        )}

        {form.values.type === 'DWELL' && (
          <NumberInput
            label="체류 시간 (분)"
            min={1}
            {...form.getInputProps('durationMinutes')}
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
            <div>
              <Text size="sm" fw={500} mb={4}>요일</Text>
              <Group gap="xs" grow>
                {dayOptions.map((day) => {
                  const selected = form.values.days.includes(day.value as DayOfWeek)
                  return (
                    <Button
                      key={day.value}
                      variant={selected ? 'filled' : 'default'}
                      onClick={() => {
                        const current = form.values.days
                        form.setFieldValue(
                          'days',
                          selected
                            ? current.filter((d) => d !== day.value)
                            : [...current, day.value as DayOfWeek],
                        )
                      }}
                      type="button"
                    >
                      {day.label}
                    </Button>
                  )
                })}
              </Group>
              {form.errors.days && (
                <Text size="xs" c="red" mt={4}>{form.errors.days}</Text>
              )}
            </div>
          </>
        )}

        {form.values.type === 'INVENTORY' && (
          <>
            <Alert
              variant="light"
              color="teal"
              title="촬영 가이드"
              icon={<IconInfoCircle size={16} />}
            >
              <Stack gap={4}>
                <span>- 상품이 정면에서 잘 보이도록 촬영해주세요</span>
                <span>- 밝은 조명에서 그림자 없이 촬영해주세요</span>
                <span>- 깔끔한 배경에서 상품만 촬영해주세요</span>
                <span>- 상품이 사진 중앙에 위치하도록 해주세요</span>
              </Stack>
            </Alert>
            <FileInput
              label="정답 상품 이미지"
              placeholder="이미지를 선택하세요"
              accept={ACCEPTED_IMAGE_TYPES}
              leftSection={<IconPhoto size={16} />}
              onChange={handleImageUpload}
              disabled={uploading}
              description={uploading ? '업로드 중...' : undefined}
            />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="정답 상품 이미지"
                radius="md"
                maw={400}
                fit="contain"
              />
            )}
            {!previewUrl && answerImageUrl && (
              <Text size="sm" c="dimmed">답안 이미지 등록됨</Text>
            )}
          </>
        )}

        {form.values.type === 'STAMP' && (
          <NumberInput
            label="필요 방문 횟수"
            min={1}
            {...form.getInputProps('requiredCount')}
          />
        )}

        <Button type="submit" loading={loading} disabled={uploading} mt="sm">
          {initialValues ? '미션 수정' : '미션 생성'}
        </Button>
      </Stack>
    </form>
  )
}
