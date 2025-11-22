<script setup lang="ts">
import { InputText } from 'primevue'
import Form from '@primevue/forms/form'
import Message from 'primevue/message'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Password from 'primevue/password'
import Button from 'primevue/button'
import type { SignUpRequest } from '@/export/exports.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/hooks/authStore.ts'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import type { FormSubmitEvent } from '@primevue/forms'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const initialValues = ref<SignUpRequest>({
  name: '',
  email: '',
  password: '',
})

const resolver = zodResolver(
  z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  }),
)

const onFormSubmit = async (event: FormSubmitEvent<Record<string, string>>) => {
  const values = event?.values


  if (event.valid) {
    try {

      await authStore.signup(values.name, values.email, values.password)

      toast.add({
        severity: 'success',
        summary: 'Signup Successful',
        detail: 'Your account has been created!',
        life: 3000,
      })

      await router.push('/login')
    } catch (error: unknown) {
      toast.add({
        severity: 'error',
        summary: 'Signup Failed',
        detail: error.message,
        life: 5000,
      })
    }
  }
}
</script>

<template>
  <Toast position="top-right"></Toast>
  <Form
    v-slot="$form"
    :initialValues
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full"
  >
    <div class="flex flex-col gap-1">
      <InputText name="name" type="text" placeholder="Name" fluid />
      <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
        $form.name.error.message
      }}</Message>
    </div>
    <div class="flex flex-col gap-1">
      <InputText name="email" type="text" placeholder="Email" fluid />
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
        $form.email.error.message
      }}</Message>
    </div>
    <div class="flex flex-col gap-1">
      <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
        <ul class="my-0 flex flex-col gap-1">
          <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
        </ul>
      </Message>
    </div>
    <Button
      type="submit"
      label="Create account"
      severity="secondary"
      icon="pi pi-arrow-right"
      class="mx-auto w-full h-12 text-lg"
    />
  </Form>
</template>

<style scoped></style>
