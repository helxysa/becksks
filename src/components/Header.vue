<template>
  <header class="bg-white flex justify-between items-center relative border-b border-blue-300 rounded-md">
    <div class="flex items-center justify-end w-full h-full">
      <section
        class="h-full w-48 flex items-center justify-center cursor-pointer transition-all duration-150 group"
        @click="toggleDropdown"
        ref="dropdownWrapper"
        :class="{'bg-blue-100': isDropdownOpen, 'hover:bg-blue-50': !isDropdownOpen }"
      >
        <div class="relative">
          <Icon
            icon="carbon:notification"
            width="3rem"
            class="transition-all duration-300 text-blue-600 group-hover:text-blue-500"
            :class="{'scale-90': isAnimating, 'scale-100': !isAnimating}"
          />
          <span
            v-if="hasMessages"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3"
          ></span>
          <div
            v-if="isDropdownOpen"
            class="z-50 absolute right-0 mt-2 w-full min-w-[40rem] bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <ul>
              <li
                v-for="(mensagem, index) in mensagens"
                :key="index"
                class="p-6 ml-4 mr-4 first:mt-4 last:mb-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 hover:text-blue-500 transition-all duration-300 break-words"
                @click="redirecionarParaContrato(mensagem.id)"
                v-html="mensagem.texto"
              ></li>
              <li v-if="mensagens.length === 0" class="p-2 text-gray-500">
                Sem notificações
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        class="h-full w-48 gap-4 flex items-center justify-center cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-50"
        @click="logout"
      >
        <Icon
          icon="carbon:user-avatar"
          width="3rem"
          class="text-blue-500"
        />
        <p>Sair</p>
      </section>
    </div>
  </header>
</template>


<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated } from "@/state/auth";
import { toast } from "vue3-toastify";

const router = useRouter();
const isDropdownOpen = ref(false);
const dropdownWrapper = ref(null);
const mensagens = ref([]);
const isAnimating = ref(false);

const hasMessages = computed(() => {
  return mensagens.value.length >= 1;
});

const toggleDropdown = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
    isDropdownOpen.value = !isDropdownOpen.value;
  }, 150);
};

const logout = () => {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
  router.push("/login");
};

const redirecionarParaContrato = (id) => {
  window.location.href = `/visualizar/contratos/${id}`;
};

const verificarVencimentoContratos = () => {
  const hoje = new Date();
  const contratos = JSON.parse(localStorage.getItem("notifications"));

  mensagens.value = contratos
    .map((contrato) => {
      const dataFim = new Date(contrato.dataFim);
      const lembreteVencimento = parseInt(contrato.lembreteVencimento, 10);
      const diasParaVencimento = Math.ceil(
        (dataFim - hoje) / (1000 * 60 * 60 * 24)
      );

      let texto = "";

      if (diasParaVencimento === 0) {
        texto = `O contrato <strong>${contrato.nomeContrato}</strong> vence <strong>hoje</strong>.`;
      } else if (diasParaVencimento < 0) {
        texto = `O contrato <strong>${contrato.nomeContrato}</strong> passou da <strong>data de vencimento</strong>.`;
      } else if (diasParaVencimento <= lembreteVencimento) {
        texto = `O contrato <strong>${contrato.nomeContrato}</strong> está prestes a vencer em <strong>${diasParaVencimento} dias</strong>.`;
      }

      return {
        id: contrato.id,
        texto: texto,
      };
    })
    .filter((mensagem) => mensagem.texto.length > 0);
};

const handleClickOutside = (event) => {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  verificarVencimentoContratos();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>
