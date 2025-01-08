<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: workspaces } = useGetWorkspaces()

watchEffect(() => {
  if (!workspaces.value?.length) {
    navigateTo('/workspaces/create')
  }
  else {
    navigateTo(`/workspaces/${workspaces.value[0].id}`)
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <Icon name="mdi:loading" class="size-6 animate-spin text-muted-foreground" />
  </div>
</template>
