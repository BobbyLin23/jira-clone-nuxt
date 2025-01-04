<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  image?: string | null
  name: string
  class?: HTMLAttributes['class']
}>()

const supabase = useSupabaseClient()

const imageUrl = computed(() => {
  if (props.image) {
    return supabase.storage.from('images').getPublicUrl(props.image).data.publicUrl
  }
  return ''
})
</script>

<template>
  <div v-if="imageUrl" :class="cn('size-10 relative rounded-md overflow-hidden', props.class)">
    <NuxtImg :src="imageUrl" :alt="name" class="object-cover" />
  </div>
  <Avatar v-else :class="cn('size-10', props.class)">
    <AvatarFallback class="text-white size-full flex items-center justify-center bg-blue-600 font-semibold text-lg uppercase">
      {{ name[0] }}
    </AvatarFallback>
  </Avatar>
</template>
