<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { computed } from 'vue';

const verificarLayout = computed({
  isMainLayout() {
      return (       
        this.$route.name !== 'Login' 
      
      );
    }

})
</script>

<template>
  <div id="principal">
    <div id="nav" class="overflow-hidden">
      <MainLayout v-if="!isMainLayout">
        <router-view />
      </MainLayout>
      <template v-else>
        <router-view />
      </template>
    </div>
  </div> 
</template>

<style >
 </style>
