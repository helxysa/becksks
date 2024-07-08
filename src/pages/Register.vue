<!-- src/components/Register.vue -->
<template>
  <div class="flex flex-row-reverse h-screen">
    <section class="bg-blue-500 w-1/2 flex items-center justify-center">
      <div class="text-white w-full flex flex-col justify-center items-center bg-blue-600 p-8">
        <div
          class="w-[30rem] h-[30rem] bg-white border-8 border-blue-300 rounded-full flex justify-center items-center text-center p-5 shadow-2xl"
        >
        <div class="flex flex-col items-center gap-8">
            <span class="text-blue-500 font-bold">GESTÃO DE CONTRATOS</span>
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
    <h1 class="mb-12 text-5xl font-medium">Cadastrar-se</h1>
    <form @submit.prevent="register" class="w-1/2 flex flex-col gap-8">
      <div class="mb-4">
        <label for="email" class="block text-3xl mb-4 font-medium">E-mail</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="border p-2 w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-3xl mb-4 font-medium">Senha</label>
        <input
          v-model="password"
          type="text"
          id="password"
          class="border p-2 w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-3xl mb-4 font-medium">Confirmar senha</label>
        <input
          v-model="confirmPassword"
          type="text"
          id="confirmPassword"
          class="border p-2 w-full"
          required
        />
      </div>
      <div class="flex gap-8 mt-12">
        <button
          @click="goLogin"
          type="button"
          class="border-blue-500 border-2 text-black p-2 w-full rounded-md hover:bg-blue-500 hover:text-white"
        >
          Voltar
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600"
        >
          Registrar
        </button>
      </div>
    </form>
  </section>
  </div>
</template>
<script setup>
import { ref , watch} from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";

const email = ref("");
const password = ref(null);
const confirmPassword = ref(null);
const router = useRouter();

const register = async () => {
  if(password.value !== confirmPassword.value){
    toast("As senhas devem ser iguais!", {
      theme: "colored",
      type: "error",
    });
    return;
  }
  try {
    await api.post("/register", {
      email: email.value,
      password: password.value,
    });
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};

const goLogin = () => {
  router.push("/login");
}
</script>
