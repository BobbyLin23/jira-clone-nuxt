<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  image?: string | null
  name: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div v-if="image" :class="cn('size-10 relative rounded-md overflow-hidden', props.class)">
    <NuxtImg :src="image" :alt="name" class="object-cover" />
  </div>
  <Avatar v-else :class="cn('size-10', props.class)">
    <AvatarFallback class="text-white bg-blue-600 font-semibold text-lg uppercase">
      {{ name[0] }}
    </AvatarFallback>
  </Avatar>
</template>
