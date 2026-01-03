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
  <main class="w-full min-h-screen flex bg-slate-50 dark:bg-primary-500 transition-colors duration-300">

    <aside class="h-screen w-full lg:max-w-[480px] flex flex-col p-8 relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-800">

      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <img src="/DataLedge-logo.png" alt="Logo" class="dark:block hidden w-8 h-8" />
          <img src="/DataLedge-Dark.png" alt="Logo" class="dark:hidden block w-8 h-8" />
          <span class="font-bold text-xl tracking-tight text-slate-900 dark:text-white">DataLedge</span>
        </div>
        <DarkModeSwitch />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto gap-8">

        <div class="w-full">
          <LoginForm />
        </div>

        <p class="text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?
          <RouterLink
            to="/signup"
            class="font-semibold text-primary-600 hover:text-primary-500 underline underline-offset-4 transition-all"
            data-testid="cta-signup"
          >
            Create one for free
          </RouterLink>
        </p>
      </div>

      <footer class="text-xs text-center text-slate-400 mt-auto">
        &copy; 2026 DataLedge Inc. All rights reserved.
      </footer>
    </aside>

    <section class="hidden lg:block flex-1 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
      <img
        src="/nasa-Q1p7bh3SHj8-unsplash(1).jpg"
        alt="Login-background"
        class="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[10s] ease-out"
      />

      <div class="absolute bottom-12 left-12 z-20 max-w-lg text-white">
        <blockquote class="text-2xl font-light italic">
          "Data is the new oil, but only if you have the right ledge to stand on."
        </blockquote>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Custom primary colors if not defined in tailwind.config.js */
.text-primary-600 { color: #2563eb; }
.hover\:text-primary-500:hover { color: #3b82f6; }
</style>
