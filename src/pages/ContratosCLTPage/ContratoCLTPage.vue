<template>
  <div>
    <div class="flex justify-between mt-12 px-6">
      <h1 class="text-5xl font-medium">Contratos CLT</h1>
      <router-link
        to="/contratos/clt/novo"
        v-if="hasPermission('contratos', 'Criar')"
        class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
      >
        <Icon icon="la:file-contract" class="text-zinc-50" height="25" />
        Novo Contrato
      </router-link>
    </div>

    <div class="mt-8 px-6">
      <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead class="bg-gray-100 h-20">
          <tr>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              Matrícula
            </th>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              Nome
            </th>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              CPF
            </th>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              Cargo
            </th>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              Departamento
            </th>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              Remuneração
            </th>
            <th
              class="px-8 py-4 text-left text-2xl font-semibold text-gray-700"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="contrato in contratos"
            :key="contrato.id"
            class="hover:bg-gray-50"
          >
            <td class="px-8 py-6 text-xl text-gray-900">
              {{ contrato.matricula }}
            </td>
            <td class="px-8 py-6 text-xl text-gray-900">
              {{ contrato.nomeCompleto }}
            </td>
            <td class="px-8 py-6 text-xl text-gray-900">
              {{ contrato.cpf }}
            </td>
            <td class="px-8 py-6 text-xl text-gray-900">
              {{ contrato.cargo }}
            </td>
            <td class="px-8 py-6 text-xl text-gray-900">
              {{ contrato.departamento }}
            </td>
            <td class="px-8 py-6 text-xl text-gray-900">
              {{ formatCurrency(contrato.remuneracao) }}
            </td>
            <td class="px-8 py-6 text-xl text-gray-900">
              <div class="flex gap-4">
                <button
                  @click="openInfoModal(contrato)"
                  class="text-blue-600 hover:text-blue-800"
                  title="Ver detalhes"
                >
                  <Icon icon="mdi:information-outline" height="28" />
                </button>
                <router-link
                  :to="`/contratos/clt/editar/${contrato.id}`"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <Icon icon="mdi:pencil" height="28" />
                </router-link>
                <button
                  @click="excluirContrato(contrato.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Icon icon="mdi:delete" height="28" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Informações -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showModal = false"
    >
      <div
        class="bg-white rounded-lg w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto p-10"
        @click.stop
      >
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-4xl font-bold text-gray-800">Detalhes do Contrato</h2>
          <button
            @click="showModal = false"
            class="text-gray-500 hover:text-gray-700 text-3xl"
          >
            ✕
          </button>
        </div>

        <div v-if="selectedContrato" class="space-y-8">
          <!-- Dados Pessoais -->
          <div class="bg-blue-50 p-8 rounded-lg">
            <h3 class="text-3xl font-bold text-blue-800 mb-6">
              Dados Pessoais
            </h3>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Matrícula</span
                >
                <span class="text-2xl">{{ selectedContrato.matricula }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Nome Completo</span
                >
                <span class="text-2xl">{{
                  selectedContrato.nomeCompleto
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600">CPF</span>
                <span class="text-2xl">{{ selectedContrato.cpf }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600">RG</span>
                <span class="text-2xl">{{ selectedContrato.rg }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600">PIS</span>
                <span class="text-2xl">{{ selectedContrato.pis }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Data de Nascimento</span
                >
                <span class="text-2xl">{{
                  formatDate(selectedContrato.dataNascimento)
                }}</span>
              </div>
              <div class="flex flex-col space-y-2 col-span-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Endereço</span
                >
                <span class="text-2xl">{{
                  selectedContrato.enderecoCompleto
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Telefone</span
                >
                <span class="text-2xl">{{ selectedContrato.telefone }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Email Pessoal</span
                >
                <span class="text-2xl">{{
                  selectedContrato.emailPessoal
                }}</span>
              </div>
            </div>
          </div>

          <!-- Dados Profissionais -->
          <div class="bg-green-50 p-8 rounded-lg">
            <h3 class="text-3xl font-bold text-green-800 mb-6">
              Dados Profissionais
            </h3>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Data de Admissão</span
                >
                <span class="text-2xl">{{
                  formatDate(selectedContrato.dataAdmissao)
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600">Cargo</span>
                <span class="text-2xl">{{ selectedContrato.cargo }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Nível Profissional</span
                >
                <span class="text-2xl">{{
                  selectedContrato.nivelProfissional
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Departamento</span
                >
                <span class="text-2xl">{{
                  selectedContrato.departamento
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Projeto Atual</span
                >
                <span class="text-2xl">{{
                  selectedContrato.projetoAtual || "-"
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Gestor do Projeto</span
                >
                <span class="text-2xl">{{
                  selectedContrato.gestorProjeto || "-"
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Regime de Trabalho</span
                >
                <span class="text-2xl">{{
                  selectedContrato.regimeTrabalho
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Jornada Semanal</span
                >
                <span class="text-2xl"
                  >{{ selectedContrato.jornadaSemanal }}h</span
                >
              </div>
            </div>
          </div>

          <!-- Remuneração e Benefícios -->
          <div class="bg-purple-50 p-8 rounded-lg">
            <h3 class="text-3xl font-bold text-purple-800 mb-6">
              Remuneração e Benefícios
            </h3>
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Remuneração</span
                >
                <span class="text-2xl">{{
                  formatCurrency(selectedContrato.remuneracao)
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Forma de Pagamento</span
                >
                <span class="text-2xl">{{
                  selectedContrato.formaPagamento
                }}</span>
              </div>
              <template v-if="selectedContrato.formaPagamento === 'PIX'">
                <div class="flex flex-col space-y-2">
                  <span class="text-xl font-semibold text-gray-600"
                    >Chave PIX</span
                  >
                  <span class="text-2xl">{{
                    selectedContrato.chavePix || "-"
                  }}</span>
                </div>
              </template>
              <template
                v-if="selectedContrato.formaPagamento === 'Transferência'"
              >
                <div class="flex flex-col space-y-2">
                  <span class="text-xl font-semibold text-gray-600">Banco</span>
                  <span class="text-2xl">{{
                    selectedContrato.banco || "-"
                  }}</span>
                </div>
                <div class="flex flex-col space-y-2">
                  <span class="text-xl font-semibold text-gray-600"
                    >Agência</span
                  >
                  <span class="text-2xl">{{
                    selectedContrato.agencia || "-"
                  }}</span>
                </div>
                <div class="flex flex-col space-y-2">
                  <span class="text-xl font-semibold text-gray-600">Conta</span>
                  <span class="text-2xl">{{
                    selectedContrato.numeroConta || "-"
                  }}</span>
                </div>
              </template>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Vale Transporte</span
                >
                <span class="text-2xl">{{
                  selectedContrato.valeTransporte ? "Sim" : "Não"
                }}</span>
              </div>
              <div
                v-if="selectedContrato.valeTransporte"
                class="flex flex-col space-y-2"
              >
                <span class="text-xl font-semibold text-gray-600"
                  >Valor Vale Transporte</span
                >
                <span class="text-2xl">{{
                  formatCurrency(selectedContrato.valorValeTransporte)
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Vale Alimentação</span
                >
                <span class="text-2xl">{{
                  selectedContrato.valeAlimentacao ? "Sim" : "Não"
                }}</span>
              </div>
              <div
                v-if="selectedContrato.valeAlimentacao"
                class="flex flex-col space-y-2"
              >
                <span class="text-xl font-semibold text-gray-600"
                  >Valor Vale Alimentação</span
                >
                <span class="text-2xl">{{
                  formatCurrency(selectedContrato.valorValeAlimentacao)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Informações Adicionais -->
          <div class="bg-gray-50 p-8 rounded-lg">
            <h3 class="text-3xl font-bold text-gray-800 mb-6">
              Informações Adicionais
            </h3>
            <div class="space-y-6">
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Outros Benefícios</span
                >
                <span class="text-2xl">{{
                  selectedContrato.outrosBeneficios || "-"
                }}</span>
              </div>
              <div class="flex flex-col space-y-2">
                <span class="text-xl font-semibold text-gray-600"
                  >Observações</span
                >
                <span class="text-2xl">{{
                  selectedContrato.observacao || "-"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Adicione esta seção após as informações adicionais -->
          <div class="bg-orange-50 p-8 rounded-lg mt-8">
            <h3 class="text-3xl font-bold text-orange-800 mb-6">
              Documentos Anexados
            </h3>
            <div class="space-y-4">
              <div
                v-if="documentos.length === 0"
                class="text-2xl text-gray-500"
              >
                Nenhum documento anexado
              </div>
              <div v-else class="grid grid-cols-1 gap-4">
                <div
                  v-for="doc in documentos"
                  :key="doc.path"
                  class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <span class="text-xl text-gray-700">{{ doc.nome }}</span>
                  <a
                    :href="doc.url"
                    target="_blank"
                    download
                    class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Icon icon="mdi:download" height="24" />
                    Baixar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ConfirmationModal
      :isOpen="showConfirmationModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita."
      :onConfirm="confirmarExclusao"
      :onCancel="cancelarExclusao"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { usePermissions } from "../../composables/usePermission";
import { toast } from "vue3-toastify";
import { api } from "../../services/api";
import ConfirmationModal from "./modal/ConfirmationModal.vue";

const { hasPermission } = usePermissions();
const contratos = ref([]);

const showModal = ref(false);
const selectedContrato = ref(null);
const documentos = ref<Array<{ path: string; nome: string; url: string }>>([]);
const showConfirmationModal = ref(false);
const contratoParaExcluir = ref<number | null>(null);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("pt-BR");
};

const loadContratos = async () => {
  try {
    const response = await api.get("/contrato-clt");
    contratos.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar contratos:", error);
    toast.error("Erro ao carregar contratos");
  }
};

const excluirContrato = (id: number) => {
  contratoParaExcluir.value = id;
  showConfirmationModal.value = true;
};

const confirmarExclusao = async () => {
  try {
    if (!contratoParaExcluir.value) return;

    await api.delete(`/contrato-clt/${contratoParaExcluir.value}`);
    toast.success("Contrato excluído com sucesso!");
    loadContratos();
  } catch (error) {
    console.error("Erro ao excluir contrato:", error);
    toast.error("Erro ao excluir contrato");
  } finally {
    showConfirmationModal.value = false;
    contratoParaExcluir.value = null;
  }
};

const cancelarExclusao = () => {
  showConfirmationModal.value = false;
  contratoParaExcluir.value = null;
};

const openInfoModal = (contrato: any) => {
  console.log("Dados do contrato:", contrato);
  selectedContrato.value = contrato;
  showModal.value = true;
};

const carregarDocumentos = async (contratoId: number) => {
  try {
    const response = await api.get(`/contrato-clt/${contratoId}/documentos`);
    documentos.value = response.data.documentos;
  } catch (error) {
    console.error("Erro ao carregar documentos:", error);
    toast.error("Erro ao carregar documentos do contrato");
  }
};

// Observar mudanças no contrato selecionado
watch(
  () => selectedContrato.value,
  (novoContrato) => {
    if (novoContrato?.id) {
      carregarDocumentos(novoContrato.id);
    } else {
      documentos.value = [];
    }
  }
);

onMounted(() => {
  loadContratos();
});
</script>

<style scoped>
.input-field {
  @apply focus:border-blue-400 border-[1px] transition-colors ease-in-out duration-300 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md;
}

/* Adicione estes estilos */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Estilização da scrollbar do modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
