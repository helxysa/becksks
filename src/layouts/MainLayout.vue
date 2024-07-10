<template>
  <div v-if="isAuthenticated" class="bg-blue-100">
    <Header />
    <Sidebar />
  </div>

  <div :class="{'p-20 sm:ml-80': isAuthenticated, '': !isAuthenticated}">
      <slot/>
  </div>

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

<style  scoped>

</style>
