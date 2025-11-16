<script setup lang="ts">
import DarkModeSwitch from '@/components/DarkModeSwitch.vue'
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <main class="w-full h-screen flex">
    <aside class="h-full w-full max-w-96 flex flex-col p-4 relative">
      <div class="absolute top-4 right-4">
        <DarkModeSwitch />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 gap-6">
        <LoginForm />
      </div>

      <p class="text-center text-xl mb-4">
        Haven't signed up yet?
      </p>
    </aside>

    <section class="flex-1 bg-green-500">
      <img src="/nasa-Q1p7bh3SHj8-unsplash(1).jpg" alt="Login-background" class="w-full h-full object-cover" />
    </section>
  </main>
</template>

<style scoped></style>
