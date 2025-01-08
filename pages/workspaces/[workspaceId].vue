<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div>
    Workspace {{ route.params.workspaceId }}
  </div>
</template>
