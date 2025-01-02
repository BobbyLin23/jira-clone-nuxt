import type { InsertWorkspace, Workspace } from '~/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

type ResponseType = Workspace
type RequestType = InsertWorkspace

export function useCreateWorkspace() {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await $fetch<ResponseType>('/api/workspaces', {
        method: 'POST',
        body: JSON.stringify(json),
      })

      return JSON.parse(JSON.stringify(res))
    },
    onSuccess: async () => {
      toast.success('Workspace created')
      await queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    },
    onError: () => {
      toast.error('Failed to create workspace')
    },
  })
}
