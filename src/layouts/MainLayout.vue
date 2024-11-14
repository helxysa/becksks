<template>
  <section :class="{ 'bg-[#f1f8fe] h-screen w-screen': showMainLayout }">
  <div :class="{'p-4 flex flex-row gap-8 h-full': showMainLayout}">
      <Sidebar v-if="showMainLayout" class="w-[280px] h-full" />
      <div class="w-full flex flex-col h-full">
        <Header v-if="showMainLayout" class="mb-4 rounded-md w-full h-40 flex-shrink-0 shadow-sm" />
        <section :class="{'bg-white p-8 rounded-md flex-grow overflow-y-auto shadow-lg': showMainLayout}">
          <slot />
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import { isAuthenticated } from "@/state/auth";
import { useRoute } from "vue-router";
import { useProfileStore } from "@/stores/ProfileStore";

const route = useRoute();
const store = useProfileStore();

const rotasExcluidas = ["Login", "alterar-senha", "esqueci-minha-senha"];

const showMainLayout = computed(() => {
  const passwordChanged = store.passwordChanged;
  return isAuthenticated.value && !rotasExcluidas.includes(route.name) && passwordChanged;
});

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem("token");
});
</script>
