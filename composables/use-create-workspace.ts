import type { InsertWorkspace, Workspace } from '~/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

type ResponseType = Workspace
type RequestType = InsertWorkspace & {
  image?: File
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const formData = new FormData()
      formData.append('name', json.name)
      if (json.image) {
        formData.append('image', json.image)
      }
      const res = await $fetch<ResponseType>('/api/workspaces', {
        method: 'POST',
        body: formData,
        headers: useRequestHeaders(['cookie']),
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
