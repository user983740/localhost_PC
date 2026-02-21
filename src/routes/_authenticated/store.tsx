import { createFileRoute } from '@tanstack/react-router'
import { StorePage } from '@/pages/store/ui/StorePage'

export const Route = createFileRoute('/_authenticated/store')({
  component: StorePage,
})
