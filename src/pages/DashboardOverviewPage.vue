<script setup lang="ts">
import ResourceBox from '@/components/ResourceBox.vue'
import { useAuthStore } from '@/hooks/authStore.ts'
import { useRouter } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    await router.replace('/login');
  }
}

const requireConfirmation = async () => {
  confirm.require({
    group: 'headless',
    header: 'Delete Account?',
    message: 'This action is permanent and cannot be undone. All your datasources will be removed.',
    accept: async () => {
      try {
        // 1. Ensure the store call actually finishes
        await authStore.deleteMyAccount();

        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Account removed.', life: 3000 });

        await router.replace('/login');
      } catch (error) {
        console.error("Deletion failed:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete account.', life: 3000 });
      }
    },
<<<<<<< Updated upstream

    // Добавяме reject callback за пълнота, ако не сте го добавили
=======
>>>>>>> Stashed changes
    reject: () => {
      toast.add({ severity: 'info', summary: 'Cancelled', detail: 'Action cancelled.', life: 3000 });
    }
  });
};
</script>

<template>
  <main class="min-h-screen w-full bg-surface-50 dark:bg-surface-950 p-6 md:p-12 lg:p-16 flex flex-col items-center">
    <Toast />

    <div class="w-full max-w-6xl space-y-10">

      <section class="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        <div v-animateonscroll="{ enterClass: 'animate-fadeinleft animate-duration-500' }">
          <h1 class="text-sm font-bold text-primary tracking-widest uppercase mb-2">User Dashboard</h1>
          <h2 data-testid="dashboard-welcome-heading" class="font-black text-4xl md:text-6xl tracking-tighter text-surface-900 dark:text-surface-0">
            Welcome,
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {{ authStore.user?.name || 'Explorer' }}
            </span>
          </h2>
        </div>

        <div class="flex gap-3">
          <Button icon="pi pi-sign-out" label="Logout" severity="secondary" text @click="logout" />
        </div>
      </section>


      <section>
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
          <i class="pi pi-th-large text-primary"></i> Quick Actions
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ResourceBox title="Manage Sources" iconClass="pi pi-server" class="hover:border-primary transition-all cursor-pointer" @click="router.push('/dashboard/datasources')" />
        </div>
      </section>

      <section class="pt-10 border-t border-surface-200 dark:border-surface-800">
        <div class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 class="text-red-600 font-bold text-xl mb-1">Danger Zone</h4>
            <p class="text-surface-600 dark:text-surface-400 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <Button
            severity="danger"
            outlined
            label="Delete Account"
            icon="pi pi-trash"
            @click="requireConfirmation()"
            class="whitespace-nowrap"
          />
        </div>
      </section>

      <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="flex flex-col items-center p-10 bg-surface-0 dark:bg-surface-900 rounded-3xl shadow-2xl border border-surface-200 dark:border-surface-800 max-w-md">
            <div class="rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 inline-flex justify-center items-center h-20 w-20 mb-6">
              <i class="pi pi-exclamation-triangle text-3xl"></i>
            </div>
<<<<<<< Updated upstream
            <span class="font-bold text-2xl block mb-2 mt-6 w-ful text-centerl">{{ message.header }}</span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex items-center gap-2 mt-6">
              <Button label="Cancel" severity="secondary" variant="outlined" @click="rejectCallback"></Button>
              <Button label="Save" severity="danger" @click="acceptCallback"></Button>
=======
            <span class="font-bold text-2xl block mb-2 text-center">{{ message.header }}</span>
            <p class="text-surface-500 text-center mb-8 leading-relaxed">{{ message.message }}</p>
            <div class="flex items-center gap-3 w-full">
              <Button label="Keep Account" severity="secondary" text @click="rejectCallback" class="flex-1"></Button>
              <Button label="Yes, Delete" severity="danger" @click="acceptCallback" class="flex-1 shadow-lg shadow-red-500/20"></Button>
>>>>>>> Stashed changes
            </div>
          </div>
        </template>
      </ConfirmDialog>
<<<<<<< Updated upstream
      <Toast></Toast>
      <Button severity="danger" size="xl" label="Delete my Account" icon="pi pi-exclamation-triangle" @click="requireConfirmation()"></Button>
=======
>>>>>>> Stashed changes
    </div>
  </main>
</template>
