<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl min-h-[400px]">
      <img src="../../assets/imagens/logoMSB.png" alt="Logomarca" class="w-72 mx-auto mb-8">
      <h1 class="text-4xl font-bold text-center mb-6">Primeiro Acesso</h1>
      <span class="font-sans text-base md:text-lg lg:text-xl text-slate-600 flex justify-center text-center mt-4">É necessária a alteração da sua senha padrão para prosseguir.</span>
      <form class="flex flex-col gap-8 mt-8" @submit.prevent="handleChangePassword">

        <div class="font-sans">
          <label for="newPassword" class="block text-gray-700 text-lg md:text-xl lg:text-2xl">Nova Senha</label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-lg md:placeholder:text-xl lg:placeholder:text-2xl"
            placeholder="Digite sua nova senha"
          />
          <p v-if="errors.newPassword" class="text-red-500 mt-2">{{ errors.newPassword }}</p>
        </div>

        <div class="font-sans">
          <label for="confirmPassword" class="block text-gray-700 text-lg md:text-xl lg:text-2xl">Confirmar Senha</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-lg md:placeholder:text-xl lg:placeholder:text-2xl"
            placeholder="Confirme sua senha"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 mt-2">{{ errors.confirmPassword }}</p>
        </div>

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white py-3 rounded-lg text-lg md:text-xl lg:text-2xl transition-colors duration-300 shadow-md"
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
    const response = await api.put(`/users/alterar-senha/${userId}`, {
      newPassword: newPassword.value,
    });
    isAuthenticated.value = true;
    localStorage.removeItem("userId");
    router.push('/');
    toast.success(response.data.message)
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
  }
};
</script>
