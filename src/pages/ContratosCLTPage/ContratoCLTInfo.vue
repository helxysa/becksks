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

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Bloco 1: Informações Principais -->
      <div class="space-y-8 shadow-xl">
        <div
          class=" rounded-xl  p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 class="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            Informações Principais
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Campos de informação com estilo atualizado -->
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Nome Completo</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.nomeCompleto }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">CPF</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.cpf }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">RG</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.rg }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Data de Nascimento</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ formatarData(contrato?.dataNascimento) }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Telefone</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.telefone }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Email Pessoal</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.emailPessoal }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Endereço</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.enderecoCompleto }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">PIS</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.pis }}
              </p>
            </div>

            <!-- Informações do Contrato -->
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Matrícula</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.matricula }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Cargo</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.cargo }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Departamento</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.departamento }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Data de Admissão</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ formatarData(contrato?.dataAdmissao) }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Salário</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ formatarMoeda(contrato?.remuneracao) }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Nível Profissional</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.nivelProfissional }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Regime de Trabalho</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.regimeTrabalho }}
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Jornada Semanal</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.jornadaSemanal }} horas
              </p>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Horário de Trabalho</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.horarioTrabalho }}
              </p>
            </div>

            <!-- Projeto e Gestão -->
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Projetos Atuais</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span 
                  v-for="(projeto, index) in projetosArray" 
                  :key="index"
                  class="inline-flex items-center px-3 py-1 rounded-full text-lg font-medium bg-blue-100 text-blue-800"
                >
                  {{ projeto }}
                </span>
                <span v-if="projetosArray.length === 0" class="text-2xl font-semibold text-gray-800">
                  Nenhum projeto atribuído
                </span>
              </div>
            </div>
            <div class="group">
              <p class="text-lg text-gray-500 mb-1">Gestor do Projeto</p>
              <p
                class="text-2xl font-semibold text-gray-800 group-"
              >
                {{ contrato?.gestorProjeto }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bloco 2: Informações Complementares -->
      <div class="space-y-8">
        <div
          class="bg-white rounded-xl  p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 class="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
            Informações Complementares
          </h2>

          <div class="space-y-10">
            <!-- Benefícios -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="group">
                <p class="text-lg text-gray-500 mb-1">Vale Transporte</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.valeTransporte ? "Sim" : "Não" }}
                  {{
                    contrato?.valeTransporte
                      ? `(${formatarMoeda(contrato?.valorValeTransporte)})`
                      : ""
                  }}
                </p>
              </div>
              <div class="group">
                <p class="text-lg text-gray-500 mb-1">Vale Alimentação</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.valeAlimentacao ? "Sim" : "Não" }}
                  {{
                    contrato?.valeAlimentacao
                      ? `(${formatarMoeda(contrato?.valorValeAlimentacao)})`
                      : ""
                  }}
                </p>
              </div>
              <div class="group">
                <p class="text-lg text-gray-500 mb-1">Plano de Saúde</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.planoSaude ? "Sim" : "Não" }}
                  {{
                    contrato?.planoSaude && contrato?.empresaPlanoSaude
                      ? `(${contrato?.empresaPlanoSaude})`
                      : ""
                  }}
                </p>
              </div>
              <div class="group">
                <p class="text-lg text-gray-500 mb-1">Outros Benefícios</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.outrosBeneficios || "Nenhum" }}
                </p>
              </div>
            </div>

            <!-- Dados Bancários -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="group">
                <p class="text-lg text-gray-500 mb-1">Forma de Pagamento</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.formaPagamento }}
                </p>
              </div>
              <div v-if="contrato?.formaPagamento === 'PIX'" class="group">
                <p class="text-lg text-gray-500 mb-1">Chave PIX</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.chavePix }}
                </p>
              </div>
              <div
                v-if="contrato?.formaPagamento === 'CONTA_BANCARIA'"
                class="group"
              >
                <p class="text-lg text-gray-500 mb-1">Banco</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.banco || "-" }}
                </p>
              </div>
              <div
                v-if="contrato?.formaPagamento === 'CONTA_BANCARIA'"
                class="group"
              >
                <p class="text-lg text-gray-500 mb-1">Agência</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.agencia || "-" }}
                </p>
              </div>
              <div
                v-if="contrato?.formaPagamento === 'CONTA_BANCARIA'"
                class="group"
              >
                <p class="text-lg text-gray-500 mb-1">Número da Conta</p>
                <p
                  class="text-2xl font-semibold text-gray-800 group-"
                >
                  {{ contrato?.numeroConta || "-" }}
                </p>
              </div>
            </div>

            <!-- Documentos com novo estilo -->
            <div v-if="documentosAtuais.length > 0" class="mt-8">
              <p class="text-lg text-gray-500 mb-4">Documentos</p>
              <div class="space-y-4">
                <div
                  v-for="doc in documentosAtuais"
                  :key="doc.path"
                  class="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <Icon
                      icon="mdi:file-document-outline"
                      class="text-blue-600 text-2xl"
                    />
                    <span class="text-lg font-medium text-gray-700">{{
                      doc.nome
                    }}</span>
                  </div>
                  <a
                    :href="`${api.defaults.baseURL}/download/contrato-clt/${contratoId}/documento/${doc.nome}`"
                    download
                    class="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
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
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import { api } from "../../services/api";

const route = useRoute();
const router = useRouter();
const contratoId = route.params.id;

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
