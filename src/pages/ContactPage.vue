<script setup lang="ts">
import Button from 'primevue/button'

const socialLinks = [
  {
    label: 'GitHub Repository',
    icon: 'pi pi-github',
    description: 'Explore the source code and documentation.',
    color: 'bg-slate-900',
    url: 'https://github.com/your-username/dataledge'
  },
  {
    label: 'LinkedIn Profile',
    icon: 'pi pi-linkedin',
    description: 'Connect with the developer behind DataLedge.',
    color: 'bg-blue-700',
    url: 'https://linkedin.com/in/your-profile'
  },
  {
    label: 'Email Us',
    icon: 'pi pi-envelope',
    description: 'Direct line for support or inquiries.',
    color: 'bg-purple-600',
    url: 'mailto:support@dataledge.edu'
  },
  {
    label: 'Project Documentation',
    icon: 'pi pi-book',
    description: 'Read the technical implementation details.',
    color: 'bg-emerald-600',
    url: '#'
  }
]
</script>

<template>
  <div class="min-h-screen w-full hero-section flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>

    <div class="w-full max-w-2xl flex flex-col items-center">

      <div
        class="text-center mb-10"
        v-animateonscroll="{ enterClass: 'animate-fadein animate-duration-1000' }"
      >
        <div class="inline-block p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
          <img src="/DataLedge-logo.png" class="w-20 h-20" alt="DataLedge" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">Get in touch.</h1>
        <p class="text-blue-100/80 text-lg">Choose a channel to connect with DataLedge.</p>
      </div>

      <div class="w-full flex flex-col gap-4">
        <a
          v-for="(link, index) in socialLinks"
          :key="index"
          :href="link.url"
          target="_blank"
          class="group block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          v-animateonscroll="{ enterClass: 'animate-fadeinup', delay: index * 150 }"
        >
          <div class="flex items-center gap-5">
            <div :class="[link.color, 'w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg']">
              <i :class="[link.icon, 'text-2xl']"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-bold text-lg leading-none mb-1 group-hover:text-blue-300 transition-colors">
                {{ link.label }}
              </h3>
              <p class="text-white/60 text-sm italic">{{ link.description }}</p>
            </div>
            <i class="pi pi-chevron-right text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all mr-2"></i>
          </div>
        </a>
      </div>

      <div class="mt-12">
        <Button
          label="Back to Home"
          icon="pi pi-arrow-left"
          severity="secondary"
          variant="text"
          @click="$router.push('/')"
          class="text-white/60 hover:text-white"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background-image: url('/richard-horvath-_nWaeTF6qo0-unsplash (1).jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* Custom fade-in-up animation if not using PrimeVue standard library */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeinup {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
