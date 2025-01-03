import type { Workspace } from '~/types'
import { useQuery } from '@tanstack/vue-query'

export function useUseGetWorkspaces() {
  const query = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await $fetch<Workspace[]>('/api/workspaces', {
        method: 'GET',
      })

      return response
    },
  })

  return query
}
