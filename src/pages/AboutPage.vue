<template>
  <div class="w-full min-h-screen flex flex-col lg:flex-row bg-surface-950 text-white overflow-hidden">

    <div class="lg:w-3/5 w-full flex flex-col justify-center p-8 md:p-16 lg:p-24 space-y-8 order-2 lg:order-1">

      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <img src="/DataLedge-logo.png" class="w-12 h-12" alt="DataLedge Logo">
          <h1 class="text-3xl md:text-5xl font-black tracking-tight uppercase">
            Data<span class="text-secondary-500">Ledge</span>
          </h1>
        </div>
        <div class="h-1 w-20 bg-secondary-500 rounded-full"></div>
      </div>

      <div class="space-y-6 max-w-2xl">
        <p class="text-lg md:text-xl leading-relaxed text-surface-300 font-light">
          This project was developed during my studies at
          <span class="text-white font-medium border-b border-secondary-500">Fontys University of Applied Sciences</span>
          in Eindhoven, Netherlands for my 6th semester.
        </p>

        <p class="text-lg leading-relaxed text-surface-400">
          DataLedge offers a centralized architecture for multi-source data storage.
          As of <span class="text-surface-100 font-mono">Jan 3, 2026</span>, it supports
          automated **API Ingestion** and **Cloud File Management**, both powered by
          <span class="text-secondary-400">Microsoft Azure Blob Storage</span> through a
          high-performance microservice backend.
        </p>
      </div>

      <div class="pt-4">
        <router-link to="/" class="group inline-flex items-center gap-2 text-lg font-semibold text-secondary-400 hover:text-secondary-300 transition-all">
          <span class="transform group-hover:-translate-x-2 transition-transform">←</span>
          Back to Home
        </router-link>
      </div>
    </div>

    <div class="lg:w-2/5 w-full h-64 lg:h-full relative order-1 lg:order-2">
      <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-950 to-transparent z-10"></div>

      <img
        src="/ivan-bandura-EWVXMoIWlpA-unsplash.jpg"
        class="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
        alt="Data Storage Concept"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
h1 {
  text-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
</style>
