import { useQuery } from '@tanstack/react-query'
import { getMissions, getMission } from '../api/missionApi'

export function useMissions(storeId: string) {
  return useQuery({
    queryKey: ['missions', storeId],
    queryFn: () => getMissions(storeId),
    enabled: !!storeId,
  })
}

export function useMission(missionId: string) {
  return useQuery({
    queryKey: ['mission', missionId],
    queryFn: () => getMission(missionId),
    enabled: !!missionId,
  })
}
