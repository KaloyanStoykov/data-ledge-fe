<script setup lang="ts">
import ResourceBox from '@/components/ResourceBox.vue'
import { useAuthStore } from '@/hooks/authStore.ts'
import { useRouter } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const confirm = useConfirm();

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


const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: 'Are you sure?',
    message: 'Please confirm to proceed.',

    accept: async () => {
      try {
        await authStore.deleteMyAccount();

        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Account Deleted successfully!', life: 3000 });

      } catch (error) {
        await router.replace('/login');
        console.error("Account deletion failed:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete account. Please try again.', life: 3000 });

      } finally {
        await router.replace('/login');
      }
    },

    // Добавяме reject callback за пълнота, ако не сте го добавили
    reject: () => {
      toast.add({ severity: 'info', summary: 'Cancelled', detail: 'Account deletion cancelled.', life: 3000 });
    }
  });
};

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
      <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="flex flex-col min-w-80 items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
            <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
              <i class="pi pi-exclamation-triangle !text-4xl dark:text-white text-black"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-6 w-ful text-centerl">{{ message.header }}</span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex items-center gap-2 mt-6">
              <Button label="Cancel" severity="secondary" variant="outlined" @click="rejectCallback"></Button>
              <Button label="Save" severity="danger" @click="acceptCallback"></Button>
            </div>
          </div>
        </template>
      </ConfirmDialog>
      <Toast></Toast>
      <Button severity="danger" size="xl" label="Delete my Account" icon="pi pi-exclamation-triangle" @click="requireConfirmation()"></Button>
    </div>
  </main>

</template>

<style scoped></style>
