<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
    <!-- Waveform Loading -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
    >
      <l-waveform size="40" stroke="3.5" speed="1" color="white"></l-waveform>
    </div>
    <div class="bg-white p-8 h-auto rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4 animate-fadein">
        <transition name="fade" mode="out-in">
          <div v-if="!showResetPassword">
            <img src="../../assets/imagens/logoMSB.png" alt="Logomarca" class="w-72 mx-auto mb-8">
            <h1 key="title" class="text-3xl md:text-4xl lg:text-5xl text-blue-600 text-center font-medium tracking-wide">
              Login
            </h1>
          </div>
          <div v-else>
            <img src="../../assets/imagens/logoMSB.png" alt="Logomarca" class="w-72 mx-auto mb-8">
            <h1 key="title" class="text-3xl md:text-4xl lg:text-5xl text-blue-600 text-center font-medium tracking-wide">Recuperar Senha</h1>
          </div>
        </transition>
       <transition name="fade" mode="out-in">
        <div v-if="!showResetPassword" key="login-form">
          <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
            <div>
              <label for="email" class="block text-lg md:text-xl lg:text-2xl font-medium text-blue-600 mb-2 font-sans">E-mail</label>
              <input
                v-model="email"
                type="email"
                id="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-xl md:placeholder:text-2xl placeholder:font-sans"
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-lg md:text-xl lg:text-2xl font-medium text-blue-600 mb-2 font-sans">Senha</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-xl md:placeholder:text-2xl placeholder:font-sans"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg md:text-xl lg:text-2xl hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Entrar
            </button>

            <div class="w-full flex justify-end">
              <span
                class="text-blue-600 hover:underline hover:text-blue-800 cursor-pointer text-base md:text-lg lg:text-xl transition duration-300"
                @click="ChangeResetPasswordForm"
              >
                Esqueceu sua senha?
              </span>
            </div>
          </form>
        </div>

        <div v-else key="reset-password-form">
          <ResetPasswordForm @voltar="handleVoltar" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { isAuthenticated } from "@/state/auth";
import { toast } from 'vue3-toastify';
import ResetPasswordForm from './ResetPasswordForm.vue';
import { useProfileStore } from "@/stores/ProfileStore";
import { waveform } from "ldrs";
import { usePermissions } from '@/composables/usePermission';

waveform.register();

const { hasPermission } = usePermissions();
const loading = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();
const showResetPassword = ref(false);
const store = useProfileStore();

const handleLogin = async () => {
  try {
    loading.value = true;
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });
    loading.value = false;
    isAuthenticated.value = true;
    localStorage.setItem("token", response.data.token.token);
    store.$patch(response.data.user)


    if (!response.data.user.passwordChanged) {
      localStorage.setItem("userId", response.data.user.id);
      router.push({ name: "ChangePassword" });
    } else {
      localStorage.removeItem("userId");
      isAuthenticated.value = true;
      if(hasPermission('Dashboard', 'Visualizar')) {
        router.push("/");
      } else {
        router.push('/contratos')
      }
    }
  } catch (error) {
    toast("Email ou Senha incorretos!", {
      theme: "colored",
      type: "error",
    });
    loading.value = false;
  }
};

const ChangeResetPasswordForm = () => {
  showResetPassword.value = true;
};

const handleVoltar = () => {
  showResetPassword.value = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: scale(1);
}

.skeleton {
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.2s infinite;
}
</style>
