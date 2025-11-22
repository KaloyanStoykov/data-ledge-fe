<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

})
</script>

<template>
  <div class="max-w-3xs aspect-square p-4 border-3 hover:bg-gradient-to-r hover:text-white dark:text-white hover:from-blue-950 text-primary-500 hover:via-blue-700 hover:to-purple-700 border-primary-300 rounded-2xl text-center flex flex-col justify-center items-center">
    <i :class="iconClass" style="font-size:50px; margin-bottom: 0.2em;"></i>
    <h3 class="text-3xl">{{props.title}}</h3>
  </div>
</template>

<style scoped></style>
