<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'

defineProps<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>()

const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <Dialog v-if="isDesktop" :open="open" @update:open="onOpenChange">
    <DialogContent class="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
      <slot />
    </DialogContent>
  </Dialog>
  <Drawer v-else :open="open" @update:open="onOpenChange">
    <DrawerContent>
      <div class="overflow-y-auto hide-scrollbar max-h-[85vh]">
        <slot />
      </div>
    </DrawerContent>
  </Drawer>
</template>
