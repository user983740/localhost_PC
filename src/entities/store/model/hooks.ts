import { useQuery } from '@tanstack/react-query'
import { getStore } from '../api/storeApi'

export function useStore(storeId: string) {
  return useQuery({
    queryKey: ['store', storeId],
    queryFn: () => getStore(storeId),
    enabled: !!storeId,
  })
}
