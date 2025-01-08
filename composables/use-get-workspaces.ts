import type { Workspace } from '~/types'
import { useQuery } from '@tanstack/vue-query'

export function useGetWorkspaces() {
  const query = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await $fetch<Workspace[]>('/api/workspaces', {
        method: 'GET',
        headers: useRequestHeaders(['cookie']),
      })

      return response
    },
  })

  return query
}
