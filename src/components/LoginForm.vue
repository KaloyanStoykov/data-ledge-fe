<template>
  <div class="w-full">
    <Toast position="top-left" />

    <h2 data-testid="login-heading" class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
      Welcome Back.
    </h2>

    <Form
      v-slot="$form"
      :initialValues
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-5 w-full"
    >
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email</label>
        <InputText
          data-testid="login-email-input"
          name="email"
          type="text"
          placeholder="Enter your email"
          fluid
          class="!rounded-xl"
        />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error.message }}
        </Message>
      </div>

      <div class="flex flex-col gap-1.5">
        <div class="flex justify-between items-center px-1">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
        </div>
        <Password
          data-testid="login-password-input"
          name="password"
          placeholder="••••••••"
          :feedback="false"
          toggleMask
          fluid
          :inputProps="{ class: 'w-full !rounded-xl' }"
        />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          <ul class="my-0 flex flex-col gap-1">
            <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
          </ul>
        </Message>
      </div>

      <Button
        data-testid="login-button"
        type="submit"
        label="Sign In"
        icon="pi pi-arrow-right"
        iconPos="right"
        class="w-full h-12 !rounded-xl !bg-blue-600 !border-none hover:!bg-blue-500 transition-all mt-2"
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
