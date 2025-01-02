<script setup lang="ts">
const supabase = useSupabaseClient()

const user = useSupabaseUser()

const avatarFallback = computed(() => {
  if (user?.value?.user_metadata?.name) {
    return user.value.user_metadata.full_name.charAt(0).toUpperCase()
  }
  return user.value?.email?.charAt(0).toUpperCase() ?? 'U'
})

async function handleLogOut() {
  await supabase.auth.signOut()
  navigateTo('/sign-in')
}
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger class="outline-none relative">
      <Avatar class="size-10 hover:opacity-75 transition border border-neutral-300">
        <AvatarFallback class="size-full bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
          {{ avatarFallback }}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" side="bottom" class="w-60" :side-offset="10">
      <div class="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
        <Avatar class="size-[52px] border border-neutral-300">
          <AvatarFallback class="size-full bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
            {{ avatarFallback }}
          </AvatarFallback>
        </Avatar>
        <div class="flex flex-col items-center justify-center">
          <p class="text-sm font-medium text-neutral-900">
            {{ user?.user_metadata?.full_name ?? 'User' }}
          </p>
          <p class="text-xs text-neutral-500">
            {{ user?.email }}
          </p>
        </div>
      </div>
      <DottedSeparator class="mb-1" />
      <DropdownMenuItem
        class="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        @click="handleLogOut"
      >
        <Icon name="carbon:logout" class="size-4 mr-2" />
        Log Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
