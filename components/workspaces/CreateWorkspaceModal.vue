<script lang="ts" setup>
const { isOpen, setIsOpen } = useCreateWorkspaceModal()
</script>

<template>
  <ResponsiveModal :open="isOpen" @open-change="setIsOpen">
    <CreateWorkspaceForm @cancel="() => {}" />
  </ResponsiveModal>
</template>
