<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

defineProps<{
  onCancel: () => void
}>()

const formSchema = toTypedSchema(
  createWorkspaceSchema,
)

const form = useForm({
  validationSchema: formSchema,
})

const { mutate, isPending } = useCreateWorkspace()

const onSubmit = form.handleSubmit((values) => {
  mutate(values)
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
        <DottedSeparator class="py-7" />
        <div class="flex items-center justify-between">
          <Button :disabled="isPending" type="button" size="lg" variant="secondary" @click="onCancel">
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
