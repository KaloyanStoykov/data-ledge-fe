<script lang="ts" setup>
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

const items = ref([
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: 'pi pi-home',
    isFavorite: true,
  },
  {
    label: 'Settings',
    link: '/settings',
    icon: 'pi pi-cog',
    isFavorite: false,
  },
  {
    label: 'Data Sources',
    link: '/dashboard/datasources',
    icon: 'pi pi-file-import',
    isFavorite: false,
  },
])

const visible = ref(false)

import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import { ToggleSwitch } from 'primevue'
import Avatar from 'primevue/avatar'
import 'primeicons/primeicons.css'
</script>

<template>
  <div class="h-screen flex relative">
    <button
      class="hover:scale-125 bg-gradient-to-r from-blue-950 via-blue-700 to-purple-700 text-primary-50 z-20 h-max w-max fixed -translate-y-1/2 left-0 top-1/2 p-4"
      @click="visible = true"
    >
      <i class="pi pi-arrow-right" />
    </button>

    <Drawer v-model:visible="visible">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <img class="w-8 h-8 dark:hidden" src="/DataLedge-Dark.png" alt="DataLedge-logo" />
              <img class="w-8 h-8 hidden dark:block" src="/DataLedge-logo.png" alt="DataLedge-logo" />
              <span class="font-semibold text-2xl text-primary-500 dark:text-primary-50">
                DataLedge
              </span>
            </span>

            <Button
              type="button"
              @click="closeCallback"
              icon="pi pi-times"
              rounded
              class="bg-transparent hover:bg-gray-800 focus:outline-none"
            />
          </div>

          <ul class="list-none p-4 m-0">
            <li>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
              >
                <span class="font-medium">APPLICATION</span>
                <i class="pi pi-chevron-down" />
              </div>

              <ul class="list-none p-0 m-0 overflow-hidden">
                <li v-for="(item, index) in items" :key="index">
                  <a
                    :href="item.link"
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i :class="item.icon" class="mr-2" />
                    <span class="font-medium">{{ item.label }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div class="mt-auto">
            <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />

            <a
              v-ripple
              class="m-4 flex items-center justify-between cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
            >
              <div class="flex items-center gap-2">
                <Avatar
                  image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                  shape="circle"
                />
                <span class="font-bold">Amy Elsner</span>
              </div>

              <ToggleSwitch v-model="checked">
                <template #handle="{ checked }">
                  <i :class="['!text-xs pi dark:text-primary-50', { 'pi-sun': !checked, 'pi-moon': checked }]" />
                </template>
              </ToggleSwitch>
            </a>
          </div>
        </div>
      </template>
    </Drawer>

    <router-view />
  </div>
</template>
