<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SignUpForm from '@/components/SignUpForm.vue'
</script>

<template>
  <section class="flex flex-col w-full h-screen items-center justify-center flex-1 p-4 gap-4">
    <div class="bg-neutral-200 dark:bg-primary-500 w-full max-w-6xl h-[80dvh] lg:max-h-2/3 p-3 gap-4 flex flex-col lg:flex-row rounded-xl">
      <div class="flex flex-col items-center justify-center max-h-1/3 lg:max-h-full lg:flex-1 gap-4 relative rounded-xl">
        <img src="/richard-horvath-_nWaeTF6qo0-unsplash%20(1).jpg" alt="" class="object-cover h-full w-full rounded-lg">
        <div class="absolute lg:bottom-5 w-full text-center flex flex-col justify-center items-center">
          <p class="text-center text-3xl font-bold text-white ">All your data in one place</p>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center flex-1 gap-2">
        <div>
          <h2 class="text-4xl font-bold text-center">Create an account.</h2>
          <p class="text-center">Already have an account? <RouterLink to="/login" class="underline text-blue-500">Login.</RouterLink></p>
        </div>

        <div class="w-10/12 p-6">
          <SignUpForm></SignUpForm>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
