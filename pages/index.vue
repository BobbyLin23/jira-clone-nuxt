<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="p-4 h-full bg-neutral-500">
    <CreateWorkspaceForm :on-cancel="() => {}" />
  </div>
</template>
