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
    email: z.email({ message: 'Invalid email address.' }).min(1, { message: 'Email is required.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  }),
)

const onFormSubmit = async (event: FormSubmitEvent) => {
  const { valid, values } = event;

  if (valid) {
    try {
      const formValues = values as SignUpRequest;
      await authStore.signup(formValues.name, formValues.email, formValues.password);

      toast.add({
        severity: 'success',
        summary: 'Signup Successful',
        detail: 'Your account has been created!',
        life: 3000,
      })

      await router.push('/login')

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.response.data.message : 'An unknown error occurred';

      toast.add({
        severity: 'error',
        summary: 'Signup Failed',
        detail: errorMessage,
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
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex flex-col gap-5 w-full"
  >
    <div class="flex flex-col gap-1">
      <InputText name="name" type="text" placeholder="Full Name" fluid class="!py-3 !rounded-lg" />
      <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
        {{ $form.name.error.message }}
      </Message>
    </div>

    <div class="flex flex-col gap-1">
      <InputText name="email" type="text" placeholder="Email Address" fluid class="!py-3 !rounded-lg" />
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
        {{ $form.email.error.message }}
      </Message>
    </div>

    <div class="flex flex-col gap-1">
      <Password
        name="password"
        placeholder="Password"
        :feedback="false"
        toggleMask
        fluid
        :inputProps="{ class: 'w-full !py-3 !rounded-lg' }"
      />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
        <ul class="my-0 flex flex-col gap-1">
          <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
        </ul>
      </Message>
    </div>

    <Button
      data-testid="signup-button"
      type="submit"
      label="Create account"
      icon="pi pi-arrow-right"
      iconPos="right"
      class="w-full h-12 !rounded-lg !bg-blue-600 !border-none hover:!bg-blue-500 transition-all font-semibold"
    />
  </Form>
</template>

<style scoped></style>
