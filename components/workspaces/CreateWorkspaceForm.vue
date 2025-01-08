<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = defineProps<{
  onCancel?: () => void
}>()

const formSchema = toTypedSchema(
  createWorkspaceSchema,
)

const form = useForm({
  validationSchema: formSchema,
})

const inputRef = ref<HTMLInputElement | null>(null)

const { mutate, isPending } = useCreateWorkspace()

const onSubmit = form.handleSubmit((values) => {
  mutate(values)
  props.onCancel?.()
})

const imageUrl = computed(() => {
  if (form.values.image instanceof File) {
    return URL.createObjectURL(form.values.image)
  }
  return ''
})
</script>

<template>
  <Card class="size-full border-none shadow-none">
    <CardHeader class="flex p-7">
      <CardTitle class="text-xl font-bold">
        Create a new workspace
      </CardTitle>
    </CardHeader>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7">
      <form class="flex flex-col gap-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="Enter workspace name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="image">
          <div class="flex flex-col gap-y-2">
            <div class="flex items-center gap-x-5">
              <div v-if="componentField.modelValue" class="size-[72px] relative overflow-hidden rounded-md">
                <NuxtImg
                  :src="imageUrl"
                  class="w-full h-full object-cover"
                  alt="logo"
                />
              </div>
              <Avatar v-else class="size-[72px]">
                <AvatarFallback>
                  <Icon name="carbon:image" class="size-9 text-neutral-400" />
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <p class="text-sm">
                  Workspace Icon
                </p>
                <p class="text-sm text-muted-foreground">
                  JPG,PNG,SVG or JPEG, max 1mb
                </p>
                <input
                  ref="inputRef"
                  v-bind="componentField"
                  :disabled="isPending"
                  class="hidden"
                  type="file"
                  accept="image/*"
                >
                <Button type="button" size="xs" variant="teritrary" class="w-fit mt-2" @click="() => inputRef?.click()">
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        </FormField>
        <DottedSeparator class="py-7" />
        <div class="flex items-center justify-between">
          <Button
            :disabled="isPending"
            type="button" size="lg"
            variant="secondary"
            :class="cn(!onCancel && 'invisible')"
            @click="onCancel"
          >
            Cancel
          </Button>
          <Button :disabled="isPending" type="submit" size="lg">
            Create workspace
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
