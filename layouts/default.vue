<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen">
    <CreateWorkspaceModal />
    <div class="flex w-full h-full">
      <div class="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
        <Sidebar />
      </div>
      <div class="lg:pl-[264px] w-full">
        <div class="mx-auto max-w-screen-2xl h-full">
          <Navbar />
          <main class="h-full py-8 px-6 flex flex-col">
            <slot />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
