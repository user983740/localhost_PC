import { fetchClient } from '@/shared/lib/fetchClient'
import type { Mission, PresignedUrlResponse } from '../model/types'

/** 미션 생성 전 — missionId 불필요 */
export async function getInventoryPresignedUrl(
  storeId: string,
  contentType: string,
): Promise<PresignedUrlResponse> {
  return fetchClient<PresignedUrlResponse>(
    `/api/stores/${storeId}/missions/inventory/presigned-url`,
    { method: 'POST', body: { contentType }, auth: true },
  )
}

/** 기존 미션 수정용 — missionId 필요 */
export async function getMissionImagePresignedUrl(
  storeId: string,
  missionId: string,
  contentType: string,
): Promise<PresignedUrlResponse> {
  return fetchClient<PresignedUrlResponse>(
    `/api/stores/${storeId}/missions/${missionId}/image/presigned-url`,
    { method: 'POST', body: { contentType }, auth: true },
  )
}

export async function confirmImageUpload(
  storeId: string,
  missionId: string,
  imageUrl: string,
): Promise<Mission> {
  return fetchClient<Mission>(
    `/api/stores/${storeId}/missions/${missionId}/image/confirm`,
    { method: 'PUT', body: { imageUrl }, auth: true },
  )
}

export async function uploadToS3(presignedUrl: string, file: File): Promise<void> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  if (!response.ok) {
    throw new Error(`S3 업로드 실패: ${response.status}`)
  }
}
