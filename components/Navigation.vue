<script setup lang="ts">
const routes = [
  {
    label: 'Home',
    href: '/',
    icon: 'mdi:home-import-outline',
    activeIcon: 'mdi:home',
  },
  {
    label: 'My Tasks',
    href: '/tasks',
    icon: 'carbon:checkmark-outline',
    activeIcon: 'carbon:checkmark-filled',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'mdi:cog-outline',
    activeIcon: 'mdi:cog',
  },
  {
    label: 'Members',
    href: '/members',
    icon: 'carbon:user',
    activeIcon: 'carbon:user-filled',
  },
]

const isActive = ref(false)
</script>

<template>
  <ul class="flex flex-col">
    <li v-for="item in routes" :key="item.label">
      <NuxtLink :href="item.href">
        <div :class="cn('flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500', isActive && 'bg-white shadow-sm hover:opacity-100 text-primary')">
          <Icon v-if="isActive" :name="item.icon" class="size-5 text-neutral-500" />
          <Icon v-else :name="item.activeIcon" class="size-5 text-neutral-500" />
          <span>{{ item.label }}</span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
