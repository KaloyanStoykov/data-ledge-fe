<script setup lang="ts">
import ResourceBox from '@/components/ResourceBox.vue'
</script>

<template>
  <main class="w-full h-full md:p-16 p-6 flex flex-col gap-10 items-center justify-center h-full">
    <h2 class="font-black text-5xl tracking-tight"
        v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-700' }">
      Welcome, <span class="bg-gradient-to-r from-blue-950 via-blue-700 to-purple-700 bg-clip-text text-transparent">Kaloyan</span>
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
      <ResourceBox title="Datasources" iconClass="pi pi-user"/>
      <ResourceBox title="Logout" iconClass="pi pi-sign-out" />
    </div>
  </main>

</template>

<style scoped></style>
