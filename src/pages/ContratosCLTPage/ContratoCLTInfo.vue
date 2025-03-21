<template>
  <div class="w-full px-8 py-10  min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div class="flex items-center gap-4">
        <button
          @click="voltar"
          class="text-gray-700 "
        >
          <Icon icon="ic:round-arrow-back" height="32" />
        </button>
        <h1 class="text-4xl font-bold text-gray-800">
          Detalhes do Contrato CLT
        </h1>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div
        class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"
      ></div>
    </div>

    <div v-else>
      <!-- Abas de navegação -->
      <div class="mb-8 border-b border-gray-200">
  <nav class="flex space-x-16" aria-label="Tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="activeTab = tab.id"
      :class="[
        activeTab === tab.id
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'whitespace-nowrap py-6 px-6 border-b-4 font-bold text-2xl transition-all duration-200'
      ]"
    >
      {{ tab.name }}
    </button>
  </nav>
</div>

      <!-- Conteúdo da aba de Informações -->
      <div v-if="activeTab === 'info'" class="grid grid-cols-1 gap-10">
        <!-- Cartão de informações unificado -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            <!-- Coluna 1: Informações Principais -->
            <div>
              <h2 class="text-3xl font-bold text-blue-700 mb-6 pb-3 border-b-2 border-blue-200">
                Informações Principais
              </h2>
              
              <div class="grid grid-cols-1 gap-y-6">
                <!-- Dados pessoais -->
                <div class="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="group">
                      <p class="text-lg text-blue-700 font-medium mb-1">Nome Completo</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.nomeCompleto }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-blue-700 font-medium mb-1">CPF</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.cpf }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-blue-700 font-medium mb-1">RG</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.rg }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-blue-700 font-medium mb-1">Data de Nascimento</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ formatarData(contrato?.dataNascimento) }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Contato -->
                <div class="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="group">
                      <p class="text-lg text-green-700 font-medium mb-1">Telefone</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.telefone }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-green-700 font-medium mb-1">Email Pessoal</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.emailPessoal }}
                      </p>
                    </div>
                    <div class="group col-span-2">
                      <p class="text-lg text-green-700 font-medium mb-1">Endereço</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.enderecoCompleto }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-green-700 font-medium mb-1">PIS</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.pis }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Informações do Contrato -->
                <div class="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-500">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="group">
                      <p class="text-lg text-purple-700 font-medium mb-1">Matrícula</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.matricula }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-purple-700 font-medium mb-1">Cargo</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.cargo }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-purple-700 font-medium mb-1">Departamento</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.departamento }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-purple-700 font-medium mb-1">Data de Admissão</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ formatarData(contrato?.dataAdmissao) }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Remuneração e Regime -->
                <div class="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="group">
                      <p class="text-lg text-amber-700 font-medium mb-1">Salário</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ formatarMoeda(contrato?.remuneracao) }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-amber-700 font-medium mb-1">Nível Profissional</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.nivelProfissional }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-amber-700 font-medium mb-1">Regime de Trabalho</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.regimeTrabalho }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-amber-700 font-medium mb-1">Jornada Semanal</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.jornadaSemanal }} horas
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-amber-700 font-medium mb-1">Horário de Trabalho</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.horarioTrabalho }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Coluna 2: Informações Complementares -->
            <div>
              <h2 class="text-3xl font-bold text-teal-700 mb-6 pb-3 border-b-2 border-teal-200">
                Informações Complementares
              </h2>
              
              <div class="grid grid-cols-1 gap-y-6">
                <!-- Projetos e Gestão -->
                <div class="bg-teal-50 rounded-lg p-5 border-l-4 border-teal-500">
                  <div class="grid grid-cols-1 gap-5">
                    <div class="group">
                      <p class="text-lg text-teal-700 font-medium mb-1">Projetos Atuais</p>
                      <div class="flex flex-wrap gap-2 mt-2">
                        <span 
                          v-for="(projeto, index) in projetosArray" 
                          :key="index"
                          class="inline-flex items-center px-3 py-1 rounded-full text-lg font-medium bg-teal-100 text-teal-800"
                        >
                          {{ projeto }}
                        </span>
                        <span v-if="projetosArray.length === 0" class="text-2xl font-semibold text-gray-800">
                          Nenhum projeto atribuído
                        </span>
                      </div>
                    </div>
                    <div class="group">
                      <p class="text-lg text-teal-700 font-medium mb-1">Gestor do Projeto</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.gestorProjeto }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Benefícios -->
                <div class="bg-rose-50 rounded-lg p-5 border-l-4 border-rose-500">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="group">
                      <p class="text-lg text-rose-700 font-medium mb-1">Vale Transporte</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.valeTransporte ? "Sim" : "Não" }}
                        {{
                          contrato?.valeTransporte
                            ? `(${formatarMoeda(contrato?.valorValeTransporte)})`
                            : ""
                        }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-rose-700 font-medium mb-1">Vale Alimentação</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.valeAlimentacao ? "Sim" : "Não" }}
                        {{
                          contrato?.valeAlimentacao
                            ? `(${formatarMoeda(contrato?.valorValeAlimentacao)})`
                            : ""
                        }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-rose-700 font-medium mb-1">Plano de Saúde</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.planoSaude ? "Sim" : "Não" }}
                        {{
                          contrato?.planoSaude && contrato?.empresaPlanoSaude
                            ? `(${contrato?.empresaPlanoSaude})`
                            : ""
                        }}
                      </p>
                    </div>
                    <div class="group">
                      <p class="text-lg text-rose-700 font-medium mb-1">Outros Benefícios</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.outrosBeneficios || "Nenhum" }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Dados Bancários -->
                <div class="bg-indigo-50 rounded-lg p-5 border-l-4 border-indigo-500">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="group">
                      <p class="text-lg text-indigo-700 font-medium mb-1">Forma de Pagamento</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.formaPagamento }}
                      </p>
                    </div>
                    <div v-if="contrato?.formaPagamento === 'PIX'" class="group">
                      <p class="text-lg text-indigo-700 font-medium mb-1">Chave PIX</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.chavePix }}
                      </p>
                    </div>
                    <div
                      v-if="contrato?.formaPagamento === 'CONTA_BANCARIA'"
                      class="group"
                    >
                      <p class="text-lg text-indigo-700 font-medium mb-1">Banco</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.banco || "-" }}
                      </p>
                    </div>
                    <div
                      v-if="contrato?.formaPagamento === 'CONTA_BANCARIA'"
                      class="group"
                    >
                      <p class="text-lg text-indigo-700 font-medium mb-1">Agência</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.agencia || "-" }}
                      </p>
                    </div>
                    <div
                      v-if="contrato?.formaPagamento === 'CONTA_BANCARIA'"
                      class="group"
                    >
                      <p class="text-lg text-indigo-700 font-medium mb-1">Número da Conta</p>
                      <p class="text-2xl font-semibold text-gray-800">
                        {{ contrato?.numeroConta || "-" }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Documentos -->
                <div v-if="documentosAtuais.length > 0" class="bg-cyan-50 rounded-lg p-5 border-l-4 border-cyan-500">
                  <p class="text-lg text-cyan-700 font-medium mb-4">Documentos</p>
                  <div class="space-y-3">
                    <div
                      v-for="doc in documentosAtuais"
                      :key="doc.path"
                      class="flex items-center justify-between bg-white p-3 rounded-lg border border-cyan-200 hover:bg-cyan-100 transition-colors"
                    >
                      <div class="flex items-center gap-3">
                        <Icon
                          icon="mdi:file-document-outline"
                          class="text-cyan-600 text-2xl"
                        />
                        <span class="text-lg font-medium text-gray-700">{{
                          doc.nome
                        }}</span>
                      </div>
                      <a
                        :href="`${api.defaults.baseURL}/download/contrato-clt/${contratoId}/documento/${doc.nome}`"
                        download
                        class="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all transform hover:scale-105"
                      >
                        <Icon icon="mdi:download" height="20" />
                        Baixar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo da aba de Relatório de Férias -->
      <div v-if="activeTab === 'ferias'">
        <FormRelatorioFerias :contratoId="Number(contratoId)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import { api } from "../../services/api";
import FormRelatorioFerias from "./FormRelatorioFerias.vue";

const route = useRoute();
const router = useRouter();
const contratoId = route.params.id;
const activeTab = ref('info');

const tabs = [
  { id: 'info', name: 'Informações do Contrato' },
  { id: 'ferias', name: 'Relatório de Férias' }
];

interface ContratoCLT {
  id: number;
  matricula: string;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  remuneracao: string;
  status?: string;
  telefone?: string;
  emailPessoal?: string;
  enderecoCompleto?: string;
  pis?: string;
  nivelProfissional?: string;
  regimeTrabalho?: string;
  jornadaSemanal?: number;
  horarioTrabalho?: string;
  projetoAtual?: string;
  gestorProjeto?: string;
  valeTransporte?: boolean;
  valorValeTransporte?: string;
  valeAlimentacao?: boolean;
  valorValeAlimentacao?: string;
  planoSaude?: boolean;
  empresaPlanoSaude?: string;
  outrosBeneficios?: string;
  formaPagamento?: string;
  chavePix?: string;
  banco?: string;
  agencia?: string;
  numeroConta?: string;
  documentos?: string;
  observacao?: string;
}

const contrato = ref<ContratoCLT | null>(null);
const loading = ref(true);

interface Documento {
  path: string;
  nome: string;
  url: string;
}

const documentosAtuais = ref<Documento[]>([]);

const carregarContrato = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/contrato-clt/${contratoId}`);
    contrato.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar contrato:", error);
    toast.error("Erro ao carregar informações do contrato");
    router.push("/contratos/clt");
  } finally {
    loading.value = false;
  }
};

const carregarDocumentos = async (contratoId: number) => {
  try {
    const response = await api.get(`/contrato-clt/${contratoId}/documentos`);

    // Se não houver documentos, inicializa array vazio
    if (!response.data.documentos || response.data.documentos.length === 0) {
      documentosAtuais.value = [];
      return;
    }

    // Se for string (documentos existentes), faz o split
    if (typeof response.data.documentos === "string") {
      const docs = response.data.documentos.split(",").map((path: string) => {
        const nome = path.split("/").pop();
        return {
          path: path,
          nome: nome,
          url: `/download/contrato-clt/${contratoId}/documento/${nome}`,
        };
      });
      documentosAtuais.value = docs;
    } else {
      // Se já for array, usa diretamente
      documentosAtuais.value = response.data.documentos;
    }
  } catch (error) {
    console.error("Erro ao carregar documentos:", error);
    documentosAtuais.value = []; // Inicializa como array vazio em caso de erro
  }
};

const formatarData = (data?: string) => {
  if (!data) return "-";
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString("pt-BR");
};

const formatarMoeda = (valor?: string) => {
  if (!valor) return "-";
  return parseFloat(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const voltar = () => {
  router.back();
};

const projetosArray = computed(() => {
  if (!contrato.value?.projetoAtual) return [];
  return contrato.value.projetoAtual.split(',').filter(p => p.trim() !== '');
});

onMounted(() => {
  carregarContrato();
  if (contratoId) {
    carregarDocumentos(Number(contratoId));
  }
});
</script>
