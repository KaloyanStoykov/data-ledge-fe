<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SignUpForm from '@/components/SignUpForm.vue'
</script>

<template>
  <section class="flex flex-col w-full bg-slate-50 dark:bg-neutral-900 min-h-screen items-center justify-center p-4">

    <div class="bg-white dark:bg-slate-800 w-full max-w-6xl min-h-[600px] shadow-2xl flex flex-col lg:flex-row rounded-2xl overflow-hidden">

      <div class="flex flex-col items-center justify-center h-48 lg:h-auto lg:flex-1 relative">
        <img src="/richard-horvath-_nWaeTF6qo0-unsplash%20(1).jpg" alt="Signup" class="object-cover h-full w-full">
        <div class="absolute inset-0 bg-black/30 flex items-center justify-center p-6">
          <p class="text-center text-2xl lg:text-3xl font-bold text-white drop-shadow-md">All your data in one place</p>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center flex-1 p-8 lg:p-12">
        <div class="w-full max-w-[400px] space-y-8"> <div class="text-center">
          <h2 class="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Create an account.</h2>
          <p class="text-slate-500 dark:text-slate-400">
            Already have an account?
            <RouterLink to="/login" class="underline text-blue-500 font-medium">Login.</RouterLink>
          </p>
        </div>

          <div class="w-full">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
