<script setup lang="ts">
import ResourceBox from '@/components/ResourceBox.vue'
import { useAuthStore } from '@/hooks/authStore.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

// 1. Make the function async
const logout = async () => {
  try {
    // 2. Wait for the store to finish the network call/state cleanup
    await authStore.logout();
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    // 3. Redirect regardless of success/failure
    await router.replace('/login');
  }
}


</script>

<template>
  <main class="w-full h-full md:p-16 p-6 flex flex-col gap-10 items-center justify-center">
    <h2 class="font-black text-5xl tracking-tight"
        v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-700' }">
      Welcome, <span class="bg-gradient-to-r from-blue-950 via-blue-700 to-purple-700 bg-clip-text text-transparent">{{authStore.user?.name}}</span>
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
      <ResourceBox title="Datasources" iconClass="pi pi-user"/>
      <ResourceBox title="Logout" iconClass="pi pi-sign-out" @click="logout" />
    </div>
  </main>

</template>

<style scoped></style>
