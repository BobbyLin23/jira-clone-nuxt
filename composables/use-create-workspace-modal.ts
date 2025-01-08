import { useUrlSearchParams } from '@vueuse/core'

export function useCreateWorkspaceModal() {
  const params = useUrlSearchParams('history', {
    writeMode: 'replace',
  })

  const isOpen = computed({
    get: () => params['create-workspace'] === 'true',
    set: (value) => {
      if (value) {
        params['create-workspace'] = value.toString()
      }
      else {
        params['create-workspace'] = ''
      }
    },
  })

  function setIsOpen(value: boolean) {
    isOpen.value = value
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  }
}
