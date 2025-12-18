<script setup lang="ts">
import DarkModeSwitch from '@/components/DarkModeSwitch.vue'
import LoginForm from '@/components/LoginForm.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/hooks/authStore.ts'

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if(authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <main class="w-full h-screen flex">
    <aside class="h-full bg-primary-50 dark:bg-primary-500 w-full max-w-96 flex flex-col p-4 relative">
      <div class="absolute top-4 right-4">
        <DarkModeSwitch />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 gap-4">
        <img src="/DataLedge-logo.png" alt="" class="dark:block hidden w-16 h-16" />
        <img src="/DataLedge-Dark.png" alt="" class="dark:hidden block w-16 h-16" />
        <LoginForm />
        <RouterLink to="/signup" class="underline">Don't have an account yet?</RouterLink>
      </div>
    </aside>
    <section class="flex-1 hidden lg:block">
      <img src="/nasa-Q1p7bh3SHj8-unsplash(1).jpg" alt="Login-background" class="w-full h-full object-cover" />
    </section>
  </main>
</template>

<style scoped></style>
