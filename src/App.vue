<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useRoute, useRouter } from "vue-router";
import { computed } from 'vue';


const route = useRoute();

const isMainLayout = computed(() => {
  return route.name !== 'Login';
});
</script>

<template>
  <div id="principal">
    <div id="nav" class="overflow-hidden">
      <MainLayout v-if="isMainLayout">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </MainLayout>
      <template v-else>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </template>
    </div>
  </div> 
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
