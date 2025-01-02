<script setup lang="ts">

</script>

<template>
  <Sheet :modal="false">
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
