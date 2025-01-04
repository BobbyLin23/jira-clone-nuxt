<script setup lang="ts">
const route = useRoute()

const open = ref(false)

watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <Sheet :modal="false" :open="open" @update:open="open = $event">
    <SheetTrigger as-child>
      <Button size="icon" variant="secondary" class="lg:hidden">
        <Icon name="mdi:menu" class="size-4 text-neutral-500" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="p-0">
      <Sidebar />
    </SheetContent>
  </Sheet>
</template>
