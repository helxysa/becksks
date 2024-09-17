<template>
  <form @submit.prevent="handleResetPassword">
    <span class="font-sans text-base md:text-lg lg:text-xl text-slate-600 flex justify-center text-center mt-4">
      Insira seu e-mail para receber um link de redefinição de senha.
    </span>
    <div>
      <label for="email" class="block text-lg md:text-xl lg:text-2xl font-medium text-blue-600 mb-2">
        E-mail
      </label>
      <input
        v-model="email"
        type="email"
        id="email"
        class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 placeholder:text-xl md:placeholder:text-2xl placeholder:font-sans"
        placeholder="Digite seu e-mail"
        required
      />
    </div>

    <div class="flex flex-col items-center justify-end gap-6 mt-8">
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg md:text-xl lg:text-2xl hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Enviar
      </button>
      <div class="w-full flex justify-end">
        <span
          @click="voltar"
          class="text-blue-600 hover:underline hover:text-blue-800 cursor-pointer text-base md:text-lg lg:text-xl transition duration-300"
        >
          Voltar para o login
        </span>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";

const email = ref("");
const emit = defineEmits(["voltar"]);

const handleResetPassword = async () => {
  try {
    const response = await api.put("users/esqueci-minha-senha", {
      email: email.value,
    });
    email.value = "";
    toast.success(response.data.message);
  } catch (error) {
    console.error("Erro ao enviar e-mail de redefinição:", error);
    toast.error(error.response.data);
  }
};

const voltar = () => {
  emit("voltar");
};
</script>
