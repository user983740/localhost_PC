import dayjs from 'dayjs'

export function formatDate(date: string | Date): string {
  return dayjs(date).format('YYYY.MM.DD')
}

export function formatDateTime(date: string | Date): string {
  return dayjs(date).format('YYYY.MM.DD HH:mm')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원'
}
