<template>
  <section class="bg-[#f1f8fe] h-screen w-screen">
    <div v-if="isAuthenticated" class="p-4 flex flex-row gap-8">
      <Sidebar class="w-[280px]" />
      <div class="w-full">
        <Header v-if="isAuthenticated" class="mb-4 rounded-md w-full h-40" />
        <section class="bg-white p-12 rounded-md h-screen">
          <slot  />
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

<style  scoped>

</style>
