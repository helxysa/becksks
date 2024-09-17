<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl min-h-[400px]">
        <img src="../../assets/imagens/logoMSBOSS.jpeg" alt="Logomarca" class="w-60 mx-auto mb-8">
        <h1 class="text-3xl md:text-4xl lg:text-5xl text-blue-600 text-center font-medium tracking-wide">Redefinir Senha</h1>
        <span class="font-sans text-base md:text-lg lg:text-xl text-slate-600 flex justify-center text-center mt-4">
          Insira sua nova senha abaixo para concluir a redefinição.
        </span>
      <form class="flex flex-col gap-8 mt-8" @submit.prevent="handleResetPassword">
        <div class="font-sans">
          <label for="newPassword" class="block text-gray-700 text-lg md:text-xl lg:text-2xl">
            Nova Senha
          </label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-lg md:placeholder:text-xl lg:placeholder:text-2xl"
            placeholder="Digite sua nova senha"
            required
            :disabled="loading"
          />
          <p v-if="errors.newPassword" class="text-red-500 mt-2">{{ errors.newPassword }}</p>
        </div>

        <div class="font-sans">
          <label for="confirmPassword" class="block text-gray-700 text-lg md:text-xl lg:text-2xl">
            Confirmar Senha
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-lg md:placeholder:text-xl lg:placeholder:text-2xl"
            placeholder="Confirme sua nova senha"
            required
            :disabled="loading"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 mt-2">{{ errors.confirmPassword }}</p>
        </div>

        <button
          type="submit"
          class="w-full text-white py-3 rounded-lg text-lg md:text-xl lg:text-2xl transition-colors duration-300 shadow-md"
          :class="{
            'bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500': !loading,
            'bg-gray-400 cursor-not-allowed': loading
          }"
          :disabled="loading"
        >
          <span>Redefinir Senha</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/services/api';
import { toast } from 'vue3-toastify';

const newPassword = ref('');
const confirmPassword = ref('');
const errors = ref({});
const loading = ref(false);
const route = useRoute();
const router = useRouter();

const handleResetPassword = async () => {
  if (loading.value) return;
  loading.value = true;
  errors.value = {};
  const passwordRules = [
    /[A-Z]/,
    /[a-z]/,
    /\d/,
    /[!@#\$%\^&\*]/,
  ];
  const token = route.query.token;

  if (!token) {
    toast('Token inválido ou expirado!', {
      type: 'error',
    });
    loading.value = false;
    return;
  }

  if (newPassword.value.length < 8) {
    errors.value.newPassword = 'A nova senha deve ter pelo menos 8 caracteres.';
    loading.value = false;
    return;
  }

  const invalidPassword = passwordRules.some((rule) => !rule.test(newPassword.value));
  if (invalidPassword) {
    errors.value.newPassword = 'A senha deve conter caracteres maiúsculos, minúsculos, números e especiais.';
    loading.value = false;
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'As senhas não coincidem.';
    loading.value = false;
    return;
  }

  try {
    await api.post('users/esqueci-minha-senha', {
      token,
      newPassword: newPassword.value,
    });

    toast.success('Senha alterada com sucesso! Você será redirecionado para o login.', {
      autoClose: 3000,
    });

    setTimeout(() => {
      router.replace('/login');
    }, 3000);

  } catch (error) {
    toast('Erro ao redefinir senha!', {
      type: 'error',
    });
    console.error(error);
  }
};
</script>
