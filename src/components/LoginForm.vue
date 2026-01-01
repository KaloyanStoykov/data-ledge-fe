<template>
  <div class="card flex justify-center flex-col">
    <Toast position="top-left" />
    <h2 data-testid="login-heading" class="text-3xl font-bold text-center mb-2">Welcome Back.</h2>
    <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-60">
      <div class="flex flex-col gap-1">
        <InputText data-testid="login-email-input" name="email" type="text" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <Password data-testid="login-password-input" name="password" placeholder="Password" :feedback="false" toggleMask fluid />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          <ul class="my-0 flex flex-col gap-1">
            <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
          </ul>
        </Message>
      </div>
      <Button
        data-testid="login-button"
        type="submit"
        label="Login"
        severity="secondary"
        icon="pi pi-arrow-right"
        class="mx-auto w-full sm:w-40 h-12 text-lg"
      />

    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import Message from 'primevue/message'
import Password from 'primevue/password'
import { InputText } from 'primevue'
import Button from 'primevue/button'
import Form from '@primevue/forms/form';
import { z } from 'zod';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import type { LoginRequest } from '@/export/exports.ts'
import { useAuthStore } from '@/hooks/authStore.ts'
import { useRouter } from 'vue-router';
import type { FormSubmitEvent } from '@primevue/forms'

const toast = useToast();
const authStore = useAuthStore(); // Initialize the store
const router = useRouter(); // Initialize router


const initialValues = ref<LoginRequest>({

  email: '',
  password: '',
})

const resolver =  zodResolver(
  z.object({
    email: z.string().min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
);


const onFormSubmit = async (event: FormSubmitEvent<Record<string, string>>) => {
  const values = event.values

  if(event.valid){
    try {
      await authStore.login(values.email, values.password);

      toast.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'You have been logged in!',
        life: 3000
      });

      await router.push('/dashboard');

    } catch (error: unknown) {

      toast.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: error.response.data.message,
        life: 5000
      });
    }
  }

};

</script>
