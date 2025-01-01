<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main class="bg-neutral-100 min-h-screen">
    <div class="mx-auto max-w-screen-2xl p-4">
      <nav class="flex justify-between items-center">
        <NuxtImg src="/logo.svg" alt="Logo" width="156" height="40" />
        <Button variant="secondary">
          <NuxtLink :href="route.path === '/sign-in' ? '/sign-up' : '/sign-in'">
            {{ route.path === '/sign-in' ? 'Sign Up' : 'Login' }}
          </NuxtLink>
        </Button>
      </nav>
      <div class="flex flex-col items-center justify-center pt-4 md:pt-14">
        <slot />
      </div>
    </div>
  </main>
</template>
