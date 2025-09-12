<script setup lang="ts">
import { ref } from 'vue'
const hasError = ref(false)
</script>
<template>
  <h1>DataLedge.</h1>
</template>

<style>
body {
  background-color: rgb(17, 16, 16);
}
</style>

<style scoped>
h1 {
  font-weight: bold;
  color: white;
}

.static {
  color: blue;
}

p {
  line-height: 1.6;
  margin-top: 1em;
}
</style>
