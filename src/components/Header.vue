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

              >
              <section class="flex items-center justify-between border-b border-gray-200 ml-4 mr-4">
                <div @click="redirecionarParaContrato(mensagem.id, mensagem.contratoId, mensagem.tipo)" class="p-6 first:mt-4 last:mb-4 hover:bg-blue-50 rounded-lg mb-2 mr-2">
                  <span v-html="mensagem.texto" class="mr-2 cursor-pointer text-2xl hover:text-blue-500 break-words transition-all duration-300"></span>
                </div>
                <Icon
                  @click.stop="marcarComoLida(mensagem.id)"
                  icon="carbon:close"
                  width="3rem"
                  class="text-blue-400 hover:bg-blue-50 rounded-lg hover:text-blue-500 transition-all duration-300"
                />
              </section>
              </li>
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
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated } from "@/state/auth";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
import { useProfileStore } from '@/stores/ProfileStore';
import socket, { notificacoes } from '../../websocket.js';


const store = useProfileStore()

const router = useRouter();
const isDropdownOpen = ref(false);
const dropdownWrapper = ref(null);
const mensagens = ref([]);
const isAnimating = ref(false);
const contratos = ref([]);
const hasNotificationPermission = store.profile.permissions.some((item) => item.name === 'notificar');
const hasMessages = computed(() => mensagens.value.length > 0);

const getCurrentDateString = () => new Date().toISOString().split('T')[0];

const toggleDropdown = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
    isDropdownOpen.value = !isDropdownOpen.value;
  }, 150);
};

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem('profileUser');
  isAuthenticated.value = false;
  try {
    const response = await api.delete("/logout");
    toast.sucess(response.message)
  } catch (error) {
    console.error(error.message);
  }
  router.push("/login");
};

const redirecionarParaContrato = (id, contratoId, tipo) => {
  if (tipo === 'medicao' && contratoId) {
    window.location.href = `/visualizar/contratos/${contratoId}`;
  } else {
    window.location.href = `/visualizar/contratos/${id}`;
  }
};

const marcarComoLida = (id) => {
  const notificacoesLidas = JSON.parse(localStorage.getItem("notificacoesLidas")) || {};
  const hoje = getCurrentDateString();

  notificacoesLidas[id] = hoje;
  localStorage.setItem("notificacoesLidas", JSON.stringify(notificacoesLidas));

  mensagens.value = mensagens.value.filter(mensagem => mensagem.id !== id);
  notificacoes.value = notificacoes.value.filter((notificacao) => notificacao.id !== id);
};

const verificarVencimentoContratos = () => {
  const hoje = getCurrentDateString();
  const contratos = JSON.parse(localStorage.getItem("notifications")) || [];
  const notificacoesLidas = JSON.parse(localStorage.getItem("notificacoesLidas")) || {};

  mensagens.value = [];

  contratos.forEach((contrato) => {
    if (!contrato.dataFim || !contrato.nomeContrato || !contrato.lembreteVencimento) return;

    const dataFim = new Date(contrato.dataFim);
    const lembreteVencimento = parseInt(contrato.lembreteVencimento, 10);
    const diasParaVencimento = Math.ceil((dataFim - new Date()) / (1000 * 60 * 60 * 24));

    if (diasParaVencimento <= lembreteVencimento && diasParaVencimento <= 20) {
      exibirToastNotificacao(contrato, diasParaVencimento, hoje);
      adicionarNotificacaoSino(contrato, diasParaVencimento, notificacoesLidas, hoje);
    } else if (diasParaVencimento > 90) {
      adicionarNotificacaoSino(contrato, diasParaVencimento, notificacoesLidas, hoje);
    }
  });
};

const exibirToastNotificacao = (contrato, diasParaVencimento, hoje) => {
  let mensagem = '';
  if (diasParaVencimento === 0 ) {
    mensagem = `Lembrete: O contrato ${contrato.nomeContrato} vence hoje.`
  } else if (diasParaVencimento < 0) {
    mensagem = `Lembrete: O contrato ${contrato.nomeContrato} passou da data de vencimento.`;
  } else if (diasParaVencimento <= 20) {
    mensagem = `Lembrete: O contrato ${contrato.nomeContrato} tem ${diasParaVencimento} dia(s) até o vencimento.`;
  }

  if (localStorage.getItem(`toast_${contrato.id}_${hoje}`) !== hoje) {
    toast.info(mensagem, { html: true, autoClose: 5000 });
    localStorage.setItem(`toast_${contrato.id}_${hoje}`, hoje);
  }
};

const adicionarNotificacaoSino = (contrato, diasParaVencimento, notificacoesLidas, hoje) => {
  let mensagem = '';

  if (diasParaVencimento === 0 ) {
    mensagem = `O contrato <strong>${contrato.nomeContrato}</strong> vence <strong>hoje.</strong>`
  } else if (diasParaVencimento < 0) {
    mensagem = `O contrato <strong>${contrato.nomeContrato}</strong> passou da <strong>data de vencimento.</strong>`;
  } else if (diasParaVencimento <= 20) {
    mensagem = `O contrato <strong>${contrato.nomeContrato}</strong> tem <strong>${diasParaVencimento} dia(s)</strong> até o vencimento.`;
  } else {
    mensagem = `O contrato <strong>${contrato.nomeContrato}</strong> tem vencimento em <strong>${diasParaVencimento} dia(s)</strong>.`;
  }
  if (notificacoesLidas[contrato.id] !== hoje) {
    mensagens.value.push({
      id: contrato.id,
      // texto: `O contrato <strong>${contrato.nomeContrato}</strong> tem vencimento em <strong>${diasParaVencimento} dias</strong>.`,
      texto: mensagem,
      tipo: 'sino'
    });
  }
};

const handleClickOutside = (event) => {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

const fetchContratos = async () => {
  try {
    const response = await api.get("/contratos");
    contratos.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const notificationsContratosData = contratos.value.map(contrato => ({
      id: contrato.id,
      nomeContrato: contrato.nomeContrato,
      dataFim: contrato.dataFim,
      lembreteVencimento: contrato.lembreteVencimento,
    }));

    localStorage.setItem("notifications", JSON.stringify(notificationsContratosData));
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
  }
};

  onMounted(() => {
    fetchContratos();
    verificarVencimentoContratos();
    document.addEventListener('click', handleClickOutside);

    // Atualizar mensagens com notificações recebidas via WebSocket
    if (!hasNotificationPermission) {
      notificacoes.value.forEach((notificacao) => {
        if (!mensagens.value.some((msg) => msg.id === notificacao.id)) {
          mensagens.value.push(notificacao);
        }
      });
      socket.on('medicao:update', (data) => {
        if (!mensagens.value.some((msg) => msg.id === data.id)) {
          mensagens.value.push({
            id: data.id,
            texto: `O status da medição ${data.id} foi alterado para: <strong>${data.status}</strong>.`,
            tipo: 'medicao',
            contratoId: data.contratoId
          });
          toast.info(data.message, { timeout: 5000, closeOnClick: true });
        }
      });
    }
  });

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
