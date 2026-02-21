export interface Store {
  id: number
  name: string
  address: string
  detailAddress?: string
  lat?: number
  lng?: number
  ownerId: number
  businessNumber?: string
  iconEmoji?: string
}
