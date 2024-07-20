<template>
  <header class="bg-white flex justify-between items-center relative border-b border-blue-300 rounded-md">
    <div class="flex items-center gap-4 justify-end w-full pb-6 mr-12">
      <div>
        <Icon icon="carbon:user-avatar" width="2.5rem" height="2.5rem" style="color: #60a5fa" />
      </div>
      <span
        @click="logout"
        class="text-gray-700 hover:text-blue-400 cursor-pointer"
      >
        Sair
      </span>
    </div>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated } from "@/state/auth";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
  router.push("/login");
};
</script>
