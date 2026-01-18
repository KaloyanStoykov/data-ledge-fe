<<<<<<< Updated upstream
=======
<template>
  <div
    class="relative group cursor-pointer p-6 border-2 border-surface-200 dark:border-surface-800 rounded-2xl
           bg-white dark:bg-surface-900 transition-all duration-300 ease-out
           hover:border-transparent hover:shadow-xl hover:-translate-y-1"
  >
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div class="relative z-10 flex flex-col items-center justify-center text-center">
      <div class="mb-4 p-4 rounded-full bg-surface-50 dark:bg-surface-800 group-hover:bg-white/20 transition-colors duration-300">
        <i :class="[iconClass, 'text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:text-white text-primary-600 dark:text-primary-400']"></i>
      </div>

      <h3 class="text-xl font-bold tracking-tight text-surface-900 dark:text-surface-0 group-hover:text-white transition-colors duration-300">
        {{ title }}
      </h3>

      <i class="pi pi-arrow-up-right absolute top-0 right-0 opacity-0 group-hover:opacity-100 group-hover:text-white p-2 transition-all"></i>
    </div>
  </div>
</template>

>>>>>>> Stashed changes
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
  <main class="w-full min-h-screen flex overflow-hidden bg-white dark:bg-[#0a0f1c]">
    <aside class="h-screen w-full lg:max-w-[450px] flex flex-col p-8 relative z-10 border-r border-slate-200 dark:border-slate-800">

      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <img src="/DataLedge-logo.png" alt="" class="dark:block hidden w-8 h-8" />
          <img src="/DataLedge-Dark.png" alt="" class="dark:hidden block w-8 h-8" />
          <span class="font-bold text-xl text-slate-900 dark:text-white tracking-tight">DataLedge</span>
        </div>
        <DarkModeSwitch />
      </div>

      <div class="flex-1 flex flex-col justify-center w-full max-w-[320px] mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back.</h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm">Please enter your details to continue.</p>
        </div>

        <LoginForm />

        <div class="mt-6 text-center">
          <RouterLink
            to="/signup"
            class="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors underline underline-offset-4"
            data-testid="cta-signup"
          >
            Don't have an account? <span class="text-blue-500 font-medium">Create one for free</span>
          </RouterLink>
        </div>
      </div>

      <footer class="mt-auto pt-8">
        <p class="text-[10px] text-center text-slate-400 uppercase tracking-widest">
          &copy; 2026 DataLedge Inc. All rights reserved.
        </p>
      </footer>
    </aside>

    <section class="flex-1 hidden lg:block relative">
      <img src="/nasa-Q1p7bh3SHj8-unsplash(1).jpg" alt="Login-background" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div class="absolute bottom-12 left-12 max-w-md">
        <p class="text-white text-lg font-light leading-relaxed opacity-90 italic">
          "Data is the new oil, but only if you have the right ledge to stand on."
        </p>
      </div>
    </section>
  </main>
</template>
