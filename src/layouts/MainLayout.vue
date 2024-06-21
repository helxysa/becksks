<template>
  <div class="bg-blue-100">
    <Header/>
    <Sidebar />
  </div>

  <div class="p-20 sm:ml-80 mt-16">
      <slot/>
  </div>

</template>

<script setup>
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
</script>

<style  scoped>

</style>
