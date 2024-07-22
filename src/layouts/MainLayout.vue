<template>
  <section :class="{'bg-[#f1f8fe] h-screen w-screen': isAuthenticated}">
    <div :class="{'p-4 flex flex-row gap-8 h-full': isAuthenticated}">
      <Sidebar v-if="isAuthenticated" class="w-[280px] h-full" />
      <div class="w-full flex flex-col h-full">
        <Header v-if="isAuthenticated" class="mb-4 rounded-md w-full h-40 flex-shrink-0" />
        <section :class="{'bg-white p-12 rounded-md flex-grow overflow-y-auto': isAuthenticated}">
          <slot />
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { isAuthenticated } from '@/state/auth';

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token');
})
</script>

<style scoped>
</style>
