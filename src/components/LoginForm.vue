
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

const toast = useToast();

const initialValues = ref({
  username: '',
  password: '',
})

const resolver =  zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
  })
);

const onFormSubmit = ({ valid }) => {
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Fill in required fields!.', life: 3000 });
  }
};
</script>
