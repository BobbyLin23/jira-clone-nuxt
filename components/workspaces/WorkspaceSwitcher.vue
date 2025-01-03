<script lang="ts" setup>
const { data } = useUseGetWorkspaces()
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center justify-between">
      <p class="text-xs uppercase text-neutral-500">
        Workspaces
      </p>
      <Icon name="carbon:add-filled" class="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
    </div>
    <Select>
      <SelectTrigger class="w-full bg-neutral-200 font-medium p-1">
        <SelectValue placeholder="No workspace selected" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="workspace in data" :key="workspace.id" :value="workspace.id">
          <div class="flex justify-start items-center gap-3 font-medium">
            <WorkspaceAvatar :name="workspace.name" :image="workspace.image_url" />
            <span class="truncate">{{ workspace.name }}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
