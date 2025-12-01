<script setup lang="ts">
import { ToggleSwitch } from 'primevue'
import { ref, watch } from 'vue'

const checked = ref(localStorage.getItem('dark-mode') !== null)

watch(checked, (newVal) => {
  const key = 'dark-mode'
  document.documentElement.classList.toggle('my-app-dark', newVal)
  if (newVal) {
    localStorage.setItem(key, 'true')
  } else {
    localStorage.removeItem(key)
  }
})
</script>

<template>
  <ToggleSwitch v-model="checked">
    <template #handle="{ checked }">
      <i
        :class="['!text-xs pi dark:text-primary-50', { 'pi-sun': !checked, 'pi-moon': checked }]"
      />
    </template>
  </ToggleSwitch>
</template>

<style scoped></style>
