<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
    <div class="bg-white p-8 h-auto rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4 animate-fadein">
        <transition name="fade" mode="out-in">
          <div v-if="!showResetPassword">
            <img src="../../assets/imagens/logoMSBOSS.jpeg" alt="Logomarca" class="w-60 mx-auto mb-8">
            <h1 key="title" class="text-3xl md:text-4xl lg:text-5xl text-blue-600 text-center font-medium tracking-wide">
              Login
            </h1>
          </div>
          <div v-else>
            <img src="../../assets/imagens/logoMSBOSS.jpeg" alt="Logomarca" class="w-60 mx-auto mb-8">
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

const email = ref("");
const password = ref("");
const router = useRouter();
const showResetPassword = ref(false);
const store = useProfileStore();

const handleLogin = async () => {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });
    isAuthenticated.value = true;
    localStorage.setItem("token", response.data.token.token);   
    store.$patch(response.data.user)
   

    if (!response.data.user.passwordChanged) {
      localStorage.setItem("userId", response.data.user.id);
      isAuthenticated.value = false;
      router.push({ name: 'ChangePassword' });
    } else {
      localStorage.removeItem("userId");
      router.push("/");
    }
  } catch (error) {
    toast("Email ou Senha incorretos!", {
      theme: "colored",
      type: "error",
    });
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
</style>
