<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/hooks/authStore.ts'

const authStore = useAuthStore()

// When application renders, check for darkmode
onMounted(() => {
  const darkMode: string | null = localStorage.getItem('dark-mode')
  if (darkMode !== null) {
    document.documentElement.classList.toggle('my-app-dark')
  }
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
