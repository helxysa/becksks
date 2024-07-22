<template>
  <div class="flex flex-row h-screen">
    <section class="bg-blue-500 w-1/2 flex items-center justify-center animate-fadeinright">
      <div class="text-white w-full flex flex-col justify-center items-center bg-blue-600 p-8">
        <div
          class="w-[30rem] h-[30rem] bg-white border-8 border-blue-300 rounded-full flex justify-center items-center text-center p-5 shadow-2xl"
        >
          <div class="flex flex-col items-center gap-8 transition-colors duration-300">
            <span class="text-blue-500 font-bold">BOSS</span>
            <span class="border border-blue-500 w-1/4"></span>
            <img
              src="../assets/imagens/logoMSB.png"
              alt="Logomarca da MSB tecnologia"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="w-1/2 flex flex-col items-center justify-center p-8">
      <h1 class="mb-12 text-5xl font-medium">Login</h1>
      <form @submit.prevent="login" class="w-1/2 flex flex-col gap-6">
        <div class="mb-4">
          <label for="email" class="block text-3xl mb-4 font-medium"
            >E-mail</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="border p-2 w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-3xl mb-4 font-medium"
            >Senha</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="border p-2 w-full"
            required
          />
        </div>
        <div class="flex flex-col items-center gap-4">
          <div class="self-end">
            <span class="text-2xl text-slate-500">Ainda não tem uma conta? </span>
            <span @click="goRegister" class="hover:text-blue-600 text-blue-400 hover:underline cursor-pointer">Cadastre-se</span>
        </div>
          <button type="submit" class="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600 mt-4">
            Login
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { isAuthenticated } from "@/state/auth";
import { toast } from 'vue3-toastify';

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    isAuthenticated.value = true;
    router.push("/");
  } catch (error) {
    console.error(error);
    toast("Email ou  Senha incorretos!", {
        theme: "colored",
        type: "error",
      });
  }
};

const goRegister = () => {
  router.push("/cadastro");
};
</script>
