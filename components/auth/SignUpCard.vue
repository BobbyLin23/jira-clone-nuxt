<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, {
      message: 'Please enter your name',
    }),
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
        Sign Up
      </CardTitle>
      <CardDescription>
        By signing up, you agree to our
        <NuxtLink href="#">
          <span class="text-blue-700">Privacy Policy</span>
        </NuxtLink>
        and
        <NuxtLink href="#">
          <span class="text-blue-700">Terms of Service</span>
        </NuxtLink>
      </CardDescription>
    </CardHeader>
    <div class="px-7 mb-2">
      <DottedSeparator />
    </div>
    <CardContent class="p-7">
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                type="text"
                placeholder="Enter your name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
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
          Sign Up
        </Button>
      </form>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex flex-col gap-y-4">
      <Button variant="secondary" size="lg" class="w-full" :disabled="false">
        <Icon name="devicon:google" class="size-5 mr-2" />
        Continue with Google
      </Button>
      <Button variant="secondary" size="lg" class="w-full" :disabled="false">
        <Icon name="devicon:github" class="size-5 mr-2" />
        Continue with GitHub
      </Button>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex items-center justify-center">
      <p>
        Already have an account?
        <NuxtLink href="/sign-in">
          <span class="text-blue-700">&nbsp;Login</span>
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>
