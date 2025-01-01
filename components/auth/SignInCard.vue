<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().trim().email({
      message: 'Please enter a valid email address',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }).max(256, {
      message: 'Password must be at most 256 characters',
    }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('values', values)
})
</script>

<template>
  <Card class="w-full h-full md:w-[487px] border-none shadow-none">
    <CardHeader class="flex items-center justify-center text-center p-7">
      <CardTitle>
        Welcome back
      </CardTitle>
    </CardHeader>
    <div class="px-7 mb-2">
      <DottedSeparator />
    </div>
    <CardContent class="p-7">
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                type="email"
                placeholder="Enter email address"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                type="password"
                placeholder="Enter password"
                :min="8"
                :max="256"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button size="lg" class="w-full" :disabled="false">
          Login
        </Button>
      </form>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex flex-col gap-y-4">
      <Button variant="secondary" size="lg" class="w-full" :disabled="false">
        <Icon name="devicon:google" class="size-5 mr-2" />
        Login with Google
      </Button>
      <Button variant="secondary" size="lg" class="w-full" :disabled="false">
        <Icon name="devicon:github" class="size-5 mr-2" />
        Login with GitHub
      </Button>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex items-center justify-center">
      <p>
        Don&apos;t have an account?
        <NuxtLink href="/sign-up">
          <span class="text-blue-700">&nbsp;Sign up</span>
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>
