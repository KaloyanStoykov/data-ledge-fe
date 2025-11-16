
<template>
  <div class="card flex justify-center flex-col">
    <Toast />
    <h2 class="text-3xl font-bold text-center mb-2">Login.</h2>
    <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-60">
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
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
import { useToast } from 'primevue/usetoast';
import type { FormSubmitEvent } from '@primevue/forms'
// 1. Import the Auth Store
import { useAuthStore } from '@/hooks/authStore.ts'// 2. Import useRouter for navigation after successful login
import { useRouter } from 'vue-router';

const toast = useToast();
const authStore = useAuthStore(); // Initialize the store
const router = useRouter(); // Initialize router

// Define the type for the form values based on the schema

const initialValues = ref<LoginFormValues>({
  username: '',
  password: '',
})

const resolver =  zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
);

// 3. Update onFormSubmit to perform the login
const onFormSubmit = async ({ e }: { e: FormSubmitEvent}) => {
  // The 'e.valid' check is redundant here because @submit only fires when valid
  // But we can check for values in case of any custom logic or server errors

  try {
    // Call the login action from the Pinia store
    //await authStore.login(values.username, values.password);

    // If login is successful (no error thrown)
    toast.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: 'You have been logged in!',
      life: 3000
    });

    // Navigate to the dashboard or home page
    //router.push('/'); // Change '/home' to your desired post-login route

  } catch (error) {
    // Handle API login errors
    console.error('Login failed:', error);

    // Display a generic error message or a specific one if the error object provides it
    const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.';

    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: errorMessage,
      life: 5000
    });
  }
};
</script>
