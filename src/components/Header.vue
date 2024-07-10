<template>
  <header class="bg-white p-8 flex justify-between items-center z-50 relative border-b-[12px] border-b-blue-200">
    <div class="flex items-center">
      <img
        class="h-20 mr-3"
        src="../assets/imagens/logoMSB.png"
        alt="MSB Logo"
      />
      <nav class="flex gap-4">
      </nav>
    </div>
    <div class="flex items-center gap-4">
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
