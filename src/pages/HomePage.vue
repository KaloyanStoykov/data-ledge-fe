<script setup lang="ts">
import 'primeicons/primeicons.css';
import { Menubar } from 'primevue'
import Button from 'primevue/button';
import { ref } from 'vue'


const items = ref([
  {
    label: 'Home',
    link: '/',
    root: true,
    hasSubmenu: false,
  },
  {
    label: 'About',
    link: '/',
    root: true,
    hasSubmenu: false,
  },
  {
    label: 'Contact',
    link: '/',
    root: true,
    hasSubmenu: false,
  }
])

// const toggleDarkMode = (): void => {
//   document.documentElement.classList.toggle('my-app-dark');
// }
//
// const checked = ref(false);

const menuStyle = ref({
  colorScheme: {
    light: {
      root: {
        borderColor: 'none',
        background: 'none',
        padding: '0'
      }
    },
    dark: {
      root: {
        borderColor: 'none',
        padding: '0'
      }
    }
  }
})

</script>

<template>
  <div class="w-full p-6 lg:p-8 hero-section flex h-screen flex-col gap-2 relative justify-between">

    <Menubar :model="items" class="justify-between" :dt="menuStyle">

      <template #item="{ item, props, hasSubmenu, root }">
        <a class="items-center" v-bind="props.action">
          <span class="text-xl">{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>

      </template>
      <template #start>
        <div class="flex items-center gap-2">
          <img src="/DataLedge-logo.png" class="w-14 h-14" alt="DataLedge Logo">
          <h2 class="text-lg md:text-2xl ml-2 font-bold">DataLedge</h2>
        </div>
      </template>
    </Menubar>

    <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }" class="w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-end">
      <p class="text-5xl md:text-6xl font-extrabold">Unify all your <br> business data</p>
      <div class="flex items-center gap-2 lg:mr-4">
        <Button label="Get Started">
          <a href="/dashboard/datasources">Get Started</a>
        </Button>
        <Button label="Contact" severity="secondary" variant="outlined"/>
      </div>
    </div>
  </div>

  <section class="h-screen w-full flex items-center justify-center text-6xl">
    <h3 class="bg-gradient-to-r from-blue-600 via-blue-400 to-pink-300 inline-block text-transparent bg-clip-text">Why choose us?</h3>
    <div class="w-md h-80 bg-gradient-to-r from-blue-950 via-blue-700 to-purple-700">

    </div>
  </section>

</template>

<style scoped>
.hero-section {
  background-image: url("/richard-horvath-_nWaeTF6qo0-unsplash (1).jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
}
</style>

