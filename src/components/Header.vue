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
          <div class="max-h-[42rem] overflow-x-auto">
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
        </div>
      </section>
      <section
        class="h-full gap-4 flex items-center justify-center cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-50"
        @click="toggleDropdownUser"
      >
        <Icon
          icon="carbon:user-avatar"
          width="3rem"
          class="text-blue-500"
        />
        <span class="font-semibold ">{{ userProfile?.nome || "Usuário" }}</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          width="3rem"
          class="text-blue-500"
        />
      </section>
    <div
        v-if="isDropdownUserOpen"
        class="absolute right-0 top-28 mt-2 w-fit bg-white border border-gray-300 rounded-md shadow-lg z-50"
      >
        <ul>
          <li class="h-full p-4 w-full flex flex-row gap-6 text-gray-700 hover:bg-blue-50">
              <Icon
                icon="carbon:user-avatar"
                width="3rem"
                class="text-blue-500"
              />
            <div class="flex flex-col">
              <span>{{ userProfile?.nome || "Usuário" }}</span>
              <span v-if="userProfile?.cargo" class="text-lg font-extralight text-gray-400 uppercase">{{ userProfile?.cargo || "" }}</span>
              <span v-if="userProfile?.setor" class="text-lg font-extralight text-gray-400 uppercase">{{ userProfile?.setor || "" }}</span>
              <span v-if="userProfile?.email" class="text-lg font-extralight text-gray-400 uppercase">{{ userProfile?.email || "" }}</span>
            </div>
          </li>
          <li class="h-full p-4 w-full flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-50" @click="openSettingsModal">
            <Icon icon="carbon:settings" width="2.8rem" class="hover:text-blue-500" />
            <span>Informações do usuário</span>
          </li>
          <li class="h-full p-4 w-full flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-50" @click="openChangePasswordModal">
            <Icon icon="carbon:password" width="2.8rem" class="hover:text-blue-500" />
            <span>Alterar senha</span>
          </li>
        <li class="h-full p-4 w-full flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-50" @click="logout">
          <Icon icon="material-symbols-light:logout-rounded" width="3rem" class="hover:text-blue-500" />
          <span>Sair</span>
        </li>
        </ul>
      </div>
    </div>

<JetDialogModal
  :show="isSettingsModalOpen"
  :withouHeader="false"
  @close="closeSettingsModal"
  maxWidth="4xl"
  centered
  :modalTitle="'Informações do usuário'"
  >
    <template #content>
      <form @submit.prevent="saveSettings">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label for="nome" class="block text-3xl font-semibold mb-2 text-gray-700">Nome</label>
            <input
              id="nome"
              v-model="newUser.nome"
              type="text"
             class="text-2xl font-sans pl-4 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="cargo" class="block text-3xl font-semibold mb-2 text-gray-700">Cargo</label>
            <input
              id="cargo"
              v-model="newUser.cargo"
              type="text"
             class="text-2xl font-sans pl-4 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label for="setor" class="block text-3xl font-semibold mb-2 text-gray-700">Setor</label>
            <input
              id="setor"
              v-model="newUser.setor"
              type="text"
             class="text-2xl font-sans pl-4 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
        <footer class="mt-6 flex justify-end gap-4">
          <button
            @click="closeSettingsModal"
            type="button"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            :disabled="isSaveDisabled || isSubmitting"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save hover:bg-[#0ea5e9] bg-[#00AFEF] w-40"
          >
            Salvar
          </button>
        </footer>
      </form>
    </template>
  </JetDialogModal>

  <JetDialogModal
  :show="isChangePasswordModalOpen"
  :withouHeader="false"
  @close="closeChangePasswordModal"
  maxWidth="4xl"
  centered
  :modalTitle="'Alterar senha'"
  >
    <template #content>
      <form @submit.prevent="handleChangePassword">
        <div class="grid grid-cols-1 gap-6">
          <div class="font-sans">
            <label for="newPassword" class="block text-3xl font-semibold mb-2 text-gray-700">Nova Senha</label>
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              class="text-2xl font-sans pl-4 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              placeholder="Digite sua nova senha"
            />
            <p v-if="errors?.newPassword" class="text-red-500 mt-2">{{ errors?.newPassword }}</p>
          </div>

          <div class="font-sans">
            <label for="confirmPassword" class="block text-3xl font-semibold mb-2 text-gray-700">Confirmar Senha</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="text-2xl font-sans pl-4 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              placeholder="Confirme sua senha"
            />
            <p v-if="errors?.confirmPassword" class="text-red-500 mt-2">{{ errors?.confirmPassword }}</p>
          </div>
        </div>
        <footer class="mt-6 flex justify-end gap-4">
          <button
            @click="closeChangePasswordModal"
            type="button"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            :disabled="isSaveChangePasswordDisabled || isSubmitting"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save hover:bg-[#0ea5e9] bg-[#00AFEF] w-40"
          >
            Salvar
          </button>
        </footer>
      </form>
    </template>
  </JetDialogModal>
</header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated } from "@/state/auth";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
import { useProfileStore } from '@/stores/ProfileStore';
import socket, { notificacoes } from '../../websocket.js';
import { usePermissions } from '@/composables/usePermission';
import JetDialogModal from "@/components/modals/DialogModal.vue";

const store = useProfileStore();
const { hasPermission } = usePermissions();
const router = useRouter();
const isDropdownOpen = ref(false);
const dropdownWrapper = ref(null);
const mensagens = ref([]);
const isAnimating = ref(false);
const contratos = ref([]);
const hasMessages = computed(() => mensagens.value.length > 0);
const getCurrentDateString = () => new Date().toISOString().split('T')[0];

const toggleDropdown = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
    isDropdownOpen.value = !isDropdownOpen.value;
  }, 150);
};

// configurações, alteração de senha e dropdown usuario
const userProfile = ref(JSON.parse(localStorage.getItem("profileUser")) || {});
const newUser = ref({ ...userProfile.value });
const isDropdownUserOpen = ref(false);
const isSettingsModalOpen = ref(false);
const isSubmitting = ref(false);

const isSaveDisabled = computed(() => {
  const isUserUnchanged = JSON.stringify(newUser.value) === JSON.stringify(userProfile.value);
  return isUserUnchanged
});

const toggleDropdownUser = () => {
  isDropdownUserOpen.value = !isDropdownUserOpen.value;
};
const openSettingsModal = () => {
  isSettingsModalOpen.value = true;
  isDropdownUserOpen.value = false;
};

const closeSettingsModal = () => {
  isSettingsModalOpen.value = false;
};

const saveSettings = async () => {
  isSubmitting.value = true;

  const userData = {
    nome: newUser.value.nome,
    cargo: newUser.value.cargo,
    setor: newUser.value.setor,
  }

  try {
    const response = await api.put(`/users/update/${newUser.value.id}`, userData);
    toast.success("Informações atualizadas com sucesso!", { theme: "colored" });

    // Atualiza o perfil do usuário no localStorage
    localStorage.setItem("profileUser", JSON.stringify(newUser.value));
    userProfile.value = { ...newUser.value };

    closeSettingsModal();
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Erro ao salvar alterações. Tente novamente.";
    toast.error(errorMessage, { theme: "colored" });
  } finally {
    isSubmitting.value = false;
  }
};

// Alteração de senha do usuário
const errors = ref({});
const isChangePasswordModalOpen = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');

const isSaveChangePasswordDisabled = computed(()=>{
  const isPasswordUnchanged = !newPassword.value && !confirmPassword.value;
  return isPasswordUnchanged
})

const openChangePasswordModal = () => {
  isChangePasswordModalOpen.value = true;
  isDropdownUserOpen.value = false;
};

const closeChangePasswordModal = () => {
  isChangePasswordModalOpen.value = false;
};

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

  isSubmitting.value = true

  try {
    await api.put(`/users/alterar-senha/${newUser.value.id}`, {
      newPassword: newPassword.value,
    });
    toast.success('Senha alterada com sucesso!', { theme: 'colored' });
    newPassword.value = '';
    confirmPassword.value = '';
    errors.value = {};
    closeChangePasswordModal()
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao alterar a senha. Por favor, tente novamente.';
    toast.error(errorMessage, { theme: 'colored' });
    console.error('Erro ao alterar senha:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const logout = async () => {
  // Reseta o estado da autenticação e limpa o localStorage
  isAuthenticated.value = false;
  localStorage.removeItem("token");

  // Utiliza a ação da store para resetar o perfil
  store.resetProfile();

  try {
    // Tenta fazer a requisição para a API de logout
    await api.delete("/logout");
    toast.success("Logout realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    toast.error("Erro ao fazer logout. Por favor, tente novamente.");
  }

  // Redireciona o usuário para a página de login
  router.push({ name: "Login" });
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
  // notificacoes.value = notificacoes.value.filter((notificacao) => notificacao.id !== id);
  // Atualiza o localStorage após remover a notificação
  saveMedicaoMensagensToLocalStorage();
};

const verificarVencimentoContratos = () => {
  const hoje = getCurrentDateString();
  const contratos = JSON.parse(localStorage.getItem("notifications")) || [];
  const notificacoesLidas = JSON.parse(localStorage.getItem("notificacoesLidas")) || {};

  mensagens.value = mensagens.value.filter(msg => msg.tipo !== 'sino');

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

// Funções para salvar e carregar notificações de medições
const saveMedicaoMensagensToLocalStorage = () => {
  localStorage.setItem('medicaoMensagens', JSON.stringify(mensagens.value.filter(msg => msg.tipo === 'medicao')));
};

const loadMedicaoMensagensFromLocalStorage = () => {
  const storedMensagens = localStorage.getItem('medicaoMensagens');
  if (storedMensagens) {
    const medicaoMensagens = JSON.parse(storedMensagens);
    mensagens.value = [...mensagens.value, ...medicaoMensagens];
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
    const profile = JSON.parse(localStorage.getItem('profileUser'));
    if (profile) {
      userProfile.value = profile;
    } else {
      console.error("Perfil do usuário não encontrado.");
    }
    fetchContratos();
    loadMedicaoMensagensFromLocalStorage();
    verificarVencimentoContratos();
    document.addEventListener('click', handleClickOutside);

    // Atualizar mensagens com notificações recebidas via WebSocket
    if (hasPermission('medicoes', 'Notificar')) {
      notificacoes.value.forEach((notificacao) => {
        if (!mensagens.value.some((msg) => msg.id === notificacao.id)) {
          mensagens.value.push(notificacao);
        }
      });

      socket.on('medicao:update', (data) => {
        const existingMessageIndex = mensagens.value.findIndex((msg) => msg.id === data.id);

        if (data.status === 'Disponível p/ Faturamento' || data.status === 'Finalizada') {
          if (existingMessageIndex !== -1) {
            // Atualiza a mensagem existente com o novo status
            mensagens.value[existingMessageIndex].texto = `O status da medição ${data.id} foi alterado para: <strong>${data.status}</strong>.`;
            mensagens.value[existingMessageIndex].tipo = 'medicao';
            mensagens.value[existingMessageIndex].contratoId = data.contratoId;
          } else {
            // Adiciona uma nova mensagem se não existir
            mensagens.value.push({
              id: data.id,
              texto: `O status da medição ${data.id} foi alterado para: <strong>${data.status}</strong>.`,
              tipo: 'medicao',
              contratoId: data.contratoId,
            });
          }
          // Exibe o toast com a mensagem atualizada
          toast.info(data.message, { timeout: 10000, closeOnClick: true });
        } else {
          // Remove a mensagem se existir
          if (existingMessageIndex !== -1) {
            mensagens.value.splice(existingMessageIndex, 1);
          }
        }
        saveMedicaoMensagensToLocalStorage();
      });
    }
  });

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
