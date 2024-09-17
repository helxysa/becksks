<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-4xl font-bold text-center mb-6">Primeiro Acesso</h1>
      <p class="text-xl font-bold text-center mb-6">É necessária a alteração da sua senha padrão para prosseguir.</p>
      <form class="flex flex-col gap-8 mt-8" @submit.prevent="handleChangePassword">
        <div class="font-sans">
          <label for="newPassword" class="block text-gray-700">Nova Senha</label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            class="w-full mt-2 p-2 border rounded-lg"
            placeholder="Digite sua nova senha"
          />
          <p v-if="errors.newPassword" class="text-red-500 mt-2">{{ errors.newPassword }}</p>
        </div>

        <div class="font-sans">
          <label for="confirmPassword" class="block text-gray-700 font-sans">Confirmar Senha</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full mt-2 p-2 border rounded-lg"
            placeholder="Confirme sua senha"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 mt-2">{{ errors.confirmPassword }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Alterar Senha
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from "@/services/api";
import { isAuthenticated } from "@/state/auth";
import { toast } from "vue3-toastify";

const newPassword = ref('');
const confirmPassword = ref('');
const errors = ref({});
const router = useRouter();
const userId = localStorage.getItem("userId")

const handleChangePassword = async () => {
  errors.value = {};

  if (newPassword.value.length < 8) {
    errors.value.newPassword = 'A senha deve ter pelo menos 8 caracteres.';
    return;
  }

  const passwordRules = [
    /[A-Z]/,
    /[a-z]/,
    /\d/,
    /[!@#\$%\^&\*]/,
  ];

  const invalidPassword = passwordRules.some((rule) => !rule.test(newPassword.value));
  if (invalidPassword) {
    errors.value.newPassword = 'A senha deve conter caracteres maiúsculos, minúsculos, números e especiais.';
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'As senhas não coincidem.';
    return;
  }

  try {
    const response = await api.put(`/users/change-password/${userId}`, {
      newPassword: newPassword.value,
    });
    console.log(response)
    // localStorage.removeItem("token");
    // localStorage.removeItem("userId");
    isAuthenticated.value = true;
    router.push('/');
    toast.success(response.data.message)
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
  }
};
</script>
