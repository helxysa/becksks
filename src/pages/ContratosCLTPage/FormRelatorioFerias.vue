<template>
  <div class="p-8">
    <div class="flex items-center mb-8">
      <router-link
        to="/contratos/clt"
        class="flex items-center text-blue-600 hover:text-blue-800"
      >
        <Icon icon="mdi:arrow-left" height="35" />
      </router-link>
      <h1 class="text-4xl font-medium ml-8">Relatório de Férias</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Período Aquisitivo -->
      <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Período Aquisitivo
        </h2>
        <div v-if="periodoAquisitivo">
          <div class="space-y-2">
            <span class="text-lg font-medium text-gray-600">Início:</span>
            <p class="text-xl text-gray-900">
              {{ formatDate(periodoAquisitivo.inicio) }}
            </p>
          </div>
          <div class="space-y-2 mt-4">
            <span class="text-lg font-medium text-gray-600">Fim:</span>
            <p class="text-xl text-gray-900">
              {{ formatDate(periodoAquisitivo.fim) }}
            </p>
          </div>
          <div class="space-y-2 mt-4">
            <span class="text-lg font-medium text-gray-600">Dias decorridos:</span>
            <p class="text-xl text-gray-900">
              {{ diasDecorridos }} dias
            </p>
          </div>
          <div
            class="mt-4 py-2 px-4 rounded-full text-sm font-medium inline-block"
            :class="{
              'bg-yellow-100 text-yellow-800': periodoAquisitivo.status === 'em_andamento',
              'bg-green-100 text-green-800': periodoAquisitivo.status === 'disponivel',
              'bg-red-100 text-red-800': periodoAquisitivo.status === 'vencido',
            }"
          >
            {{ statusPeriodo(periodoAquisitivo.status) }}
          </div>
        </div>
        <div v-else class="text-gray-500 italic">
          Nenhum período aquisitivo disponível
        </div>
      </div>

      <!-- Período Concessivo -->
      <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Período Concessivo
        </h2>
        <div v-if="periodoConcessivo">
          <div class="space-y-2">
            <span class="text-lg font-medium text-gray-600">Início:</span>
            <p class="text-xl text-gray-900">
              {{ formatDate(periodoConcessivo.inicio) }}
            </p>
          </div>
          <div class="space-y-2 mt-4">
            <span class="text-lg font-medium text-gray-600">Fim:</span>
            <p class="text-xl text-gray-900">
              {{ formatDate(periodoConcessivo.fim) }}
            </p>
          </div>
          <div class="space-y-2 mt-4">
            <span class="text-lg font-medium text-gray-600">Dias restantes:</span>
            <p class="text-xl text-gray-900">
              {{ diasRestantes }} dias
            </p>
          </div>
          <div
            class="mt-4 py-2 px-4 rounded-full text-sm font-medium inline-block"
            :class="{
              'bg-yellow-100 text-yellow-800': periodoConcessivo.status === 'em_andamento',
              'bg-green-100 text-green-800': periodoConcessivo.status === 'disponivel',
              'bg-red-100 text-red-800': periodoConcessivo.status === 'vencido',
            }"
          >
            {{ statusPeriodo(periodoConcessivo.status) }}
          </div>
        </div>
        <div v-else class="text-gray-500 italic">
          Nenhum período concessivo disponível
        </div>
      </div>

      <!-- Saldo de Férias -->
      <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Saldo de Férias
        </h2>
        <div class="text-center">
          <p class="text-5xl font-bold text-gray-800 mb-4">
            {{ totalDiasDisponiveis }}
          </p>
          <p class="text-xl text-gray-600">dias disponíveis</p>
          <div class="mt-6">
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                class="bg-blue-600 h-3 rounded-full"
                :style="{
                  width: `${(totalDiasDisponiveis / 30) * 100}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dias Gozados -->
      <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Dias Gozados
        </h2>
        <div class="text-center">
          <p class="text-5xl font-bold text-gray-800 mb-4">
            {{ diasGozados }}
          </p>
          <p class="text-xl text-gray-600">dias gozados</p>
          <p v-if="ultimoPeriodoGozado" class="text-sm text-gray-500 mt-6">
            Último: {{ formatDate(ultimoPeriodoGozado.periodoGozoInicio) }} a
            {{ formatDate(ultimoPeriodoGozado.periodoGozoFim) }}
          </p>
          <p v-else class="text-sm text-gray-500 mt-6">
            Nenhum período gozado
          </p>
        </div>
      </div>
    </div>

    <!-- Períodos Solicitados -->
    <div v-if="periodosGozados.length > 0" class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">
        Períodos Solicitados
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider"
              >
                Data Início
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider"
              >
                Data Fim
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider"
              >
                Dias
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider"
              >
                Abono
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="periodo in periodosGozados" :key="periodo.id">
              <td class="px-6 py-5 whitespace-nowrap text-lg text-gray-800">
                {{ formatDate(periodo.periodoGozoInicio) }}
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-lg text-gray-800">
                {{ formatDate(periodo.periodoGozoFim) }}
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-lg text-gray-800">
                {{ periodo.diasGozados }}
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-lg text-gray-800">
                {{ periodo.abonoPecuniario ? "Sim" : "Não" }}
              </td>
              <td class="px-6 py-5 whitespace-nowrap">
                <span
                  class="px-4 py-2 inline-flex text-base leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  Aprovado
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Formulário de Solicitação -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">
        Solicitar Férias
      </h2>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              for="dataInicio"
              class="block text-lg font-medium text-gray-700 mb-2"
            >
              Data Início
            </label>
            <input
              type="date"
              id="dataInicio"
              v-model="formData.periodoGozoInicio"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3"
              required
              @change="calcularDiasSolicitados"
            />
          </div>
          <div>
            <label
              for="dataFim"
              class="block text-lg font-medium text-gray-700 mb-2"
            >
              Data Fim
            </label>
            <input
              type="date"
              id="dataFim"
              v-model="formData.periodoGozoFim"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3"
              required
              @change="calcularDiasSolicitados"
            />
          </div>
        </div>

        <div v-if="diasSolicitados > 0" class="mb-6">
          <div 
            class="p-4 rounded-md text-lg" 
            :class="{
              'bg-blue-50 text-blue-700': diasSolicitados <= totalDiasDisponiveis,
              'bg-red-50 text-red-700': diasSolicitados > totalDiasDisponiveis
            }"
          >
            <p>
              Você está solicitando {{ diasSolicitados }} dias de férias.
              <span v-if="diasSolicitados > totalDiasDisponiveis" class="font-bold">
                (Excede o limite disponível de {{ totalDiasDisponiveis }} dias)
              </span>
            </p>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex items-center">
            <input
              id="abonoPecuniario"
              type="checkbox"
              v-model="formData.abonoPecuniario"
              class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              for="abonoPecuniario"
              class="ml-2 block text-lg text-gray-700"
            >
              Abono Pecuniário
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label
            for="observacoes"
            class="block text-lg font-medium text-gray-700 mb-2"
          >
            Observações
          </label>
          <textarea
            id="observacoes"
            v-model="formData.observacoes"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="loading || diasSolicitados > totalDiasDisponiveis || diasSolicitados <= 0"
          >
            Solicitar Férias
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";
import { api } from "../../services/api";
import { Icon } from "@iconify/vue";
import { format, differenceInDays, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Periodo {
  inicio: Date;
  fim: Date;
  tipo: "aquisitivo" | "concessivo";
  diasDisponiveis: number;
  status: "em_andamento" | "disponivel" | "vencido";
}

interface PeriodoGozado {
  periodoGozoInicio: string;
  periodoGozoFim: string;
  diasGozados: number;
  abonoPecuniario: boolean;
  status: string;
}

interface FormData {
  contratoId: number;
  periodoGozoInicio: string;
  periodoGozoFim: string;
  abonoPecuniario: boolean;
  diasAbono: number;
  valorAbono: number;
  observacoes: string;
}

const props = defineProps<{
  contratoId: number;
}>();

const loading = ref(false);
const periodos = ref<Periodo[]>([]);
const periodosGozados = ref<PeriodoGozado[]>([]);
const diasGozados = ref(0);
const totalDiasDisponiveis = ref(0);
const diasSolicitados = ref(0);

const formData = ref<FormData>({
  contratoId: props.contratoId,
  periodoGozoInicio: "",
  periodoGozoFim: "",
  abonoPecuniario: false,
  diasAbono: 0,
  valorAbono: 0,
  observacoes: "",
});

const periodoAquisitivo = computed(() => {
  return periodos.value.find((p) => p.tipo === "aquisitivo");
});

const periodoConcessivo = computed(() => {
  return periodos.value.find((p) => p.tipo === "concessivo");
});

const diasDecorridos = computed(() => {
  if (!periodoAquisitivo.value) return 0;
  return differenceInDays(
    new Date(),
    new Date(periodoAquisitivo.value.inicio)
  );
});

const diasRestantes = computed(() => {
  if (!periodoConcessivo.value) return 0;
  return differenceInDays(
    new Date(periodoConcessivo.value.fim),
    new Date()
  );
});

const ultimoPeriodoGozado = computed(() => {
  if (periodosGozados.value.length === 0) return null;
  return periodosGozados.value[0];
});

const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
};

const statusPeriodo = (status) => {
  switch (status) {
    case "em_andamento":
      return "Em Andamento";
    case "disponivel":
      return "Disponível";
    case "vencido":
      return "Vencido";
    default:
      return status;
  }
};

const calcularDiasSolicitados = () => {
  if (formData.value.periodoGozoInicio && formData.value.periodoGozoFim) {
    const inicio = new Date(formData.value.periodoGozoInicio);
    const fim = new Date(formData.value.periodoGozoFim);
    
    if (fim >= inicio) {
      // Adicionar 1 porque o cálculo de diferença não inclui o último dia
      diasSolicitados.value = differenceInDays(fim, inicio) + 1;
    } else {
      diasSolicitados.value = 0;
      toast.error("A data final deve ser posterior à data inicial");
    }
  } else {
    diasSolicitados.value = 0;
  }
};

const carregarPeriodos = async () => {
  try {
    loading.value = true;
    const response = await api.get(
      `/relatorio-ferias/contrato/${props.contratoId}`
    );
    
    console.log("Resposta completa da API:", response.data);

    if (response.data.periodos) {
      periodos.value = response.data.periodos.map((p) => ({
        ...p,
        inicio: new Date(p.inicio),
        fim: new Date(p.fim),
      }));
    }

    // Carregar dias gozados
    if (response.data.diasGozados !== undefined) {
      diasGozados.value = response.data.diasGozados;
    }

    // Carregar dias disponíveis diretamente da API
    if (response.data.diasDisponiveis !== undefined) {
      console.log("Dias disponíveis recebidos da API:", response.data.diasDisponiveis);
      totalDiasDisponiveis.value = response.data.diasDisponiveis;
    } else {
      console.log("Dias disponíveis não encontrados na resposta da API");
    }

    // Carregar períodos gozados
    if (response.data.periodosGozados) {
      periodosGozados.value = response.data.periodosGozados;
    }
  } catch (error) {
    toast.error("Erro ao carregar períodos de férias");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const submitForm = async () => {
  try {
    // Verificar se os dias solicitados excedem os disponíveis
    if (diasSolicitados.value > totalDiasDisponiveis.value) {
      toast.error(
        `Você só pode solicitar até ${totalDiasDisponiveis.value} dias de férias`
      );
      return;
    }

    loading.value = true;
    const response = await api.post("/relatorio-ferias", formData.value);
    toast.success("Solicitação de férias enviada com sucesso");

    // Atualizar o saldo de férias e dias gozados com os valores retornados pela API
    if (response.data.saldoFeriasAtual !== undefined) {
      totalDiasDisponiveis.value = response.data.saldoFeriasAtual;
    }
    
    if (response.data.diasGozados !== undefined) {
      diasGozados.value = response.data.diasGozados;
    }

    // Limpar formulário
    formData.value = {
      contratoId: props.contratoId,
      periodoGozoInicio: "",
      periodoGozoFim: "",
      abonoPecuniario: false,
      diasAbono: 0,
      valorAbono: 0,
      observacoes: "",
    };
    
    diasSolicitados.value = 0;

    // Recarregar dados para atualizar o saldo e períodos
    await carregarPeriodos();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Erro ao enviar solicitação de férias");
    }
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// Observar mudanças nas datas para calcular dias solicitados
watch(
  () => [formData.value.periodoGozoInicio, formData.value.periodoGozoFim],
  () => {
    calcularDiasSolicitados();
  }
);

onMounted(() => {
  carregarPeriodos();
});
</script>

<style scoped>
.relatorio-ferias-container {
  padding: 20px;
}

.periodo-card {
  height: 100%;
}

.periodo-info,
.saldo-info,
.dias-gozados-info {
  padding: 10px;
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--v-primary-base);
}

.text-h5 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-subtitle-1 {
  color: var(--v-secondary-base);
}
</style>
