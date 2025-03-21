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

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- Card Período Aquisitivo -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Período Aquisitivo
        </h2>
        <div v-if="periodoAquisitivo">
          <div class="space-y-2">
            <p class="text-lg text-gray-600">
              Início: {{ formatarData(periodoAquisitivo.inicio) }}
            </p>
            <p class="text-lg text-gray-600">
              Fim: {{ formatarData(periodoAquisitivo.fim) }}
            </p>
            <p class="text-lg text-gray-600">
              Dias decorridos: {{ diasDecorridos }} dias
            </p>
            <div
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium inline-block',
                {
                  'bg-yellow-100 text-yellow-800':
                    periodoAquisitivo.status === 'em_andamento',
                  'bg-green-100 text-green-800':
                    periodoAquisitivo.status === 'disponivel',
                  'bg-red-100 text-red-800':
                    periodoAquisitivo.status === 'vencido',
                },
              ]"
            >
              {{ getStatusLabel(periodoAquisitivo.status) }}
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 italic">
          Nenhum período aquisitivo encontrado
        </div>
      </div>

      <!-- Card Período Concessivo -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Período Concessivo
        </h2>
        <div v-if="periodoConcessivo">
          <div class="space-y-2">
            <p class="text-lg text-gray-600">
              Início: {{ formatarData(periodoConcessivo.inicio) }}
            </p>
            <p class="text-lg text-gray-600">
              Fim: {{ formatarData(periodoConcessivo.fim) }}
            </p>
            <p class="text-lg text-gray-600">
              Dias restantes: {{ diasRestantesConcessivo }} dias
            </p>
            <div
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium inline-block',
                {
                  'bg-yellow-100 text-yellow-800':
                    periodoConcessivo.status === 'em_andamento',
                  'bg-green-100 text-green-800':
                    periodoConcessivo.status === 'disponivel',
                  'bg-red-100 text-red-800':
                    periodoConcessivo.status === 'vencido',
                },
              ]"
            >
              {{ getStatusLabel(periodoConcessivo.status) }}
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 italic">
          Nenhum período concessivo disponível
        </div>
      </div>

      <!-- Card Saldo de Férias -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Saldo de Férias
        </h2>
        <div class="text-center">
          <p class="text-4xl font-bold text-gray-800 mb-2">
            {{ totalDiasDisponiveis }}
          </p>
          <p class="text-lg text-gray-600">dias disponíveis</p>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-blue-600 h-2.5 rounded-full"
                :style="{
                  width: `${(totalDiasDisponiveis / 30) * 100}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Dias Gozados -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Dias Gozados</h2>
        <div class="text-center">
          <p class="text-4xl font-bold text-gray-800 mb-2">
            {{ diasGozados }}
          </p>
          <p class="text-lg text-gray-600">dias gozados</p>
          <p class="text-sm text-gray-500 mt-2">
            {{ ultimoPeriodoGozado }}
          </p>
        </div>
      </div>
    </div>

    <!-- Períodos Solicitados -->
    <div
      v-if="periodosGozados.length > 0"
      class="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Períodos Solicitados
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data Início
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data Fim
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dias
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Abono
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(periodo, index) in periodosGozados" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatarData(new Date(periodo.periodoGozoInicio)) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatarData(new Date(periodo.periodoGozoFim)) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ periodo.diasGozados }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ periodo.abonoPecuniario ? "Sim" : "Não" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
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
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Solicitar Férias
      </h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2">
              Data Início
            </label>
            <input
              v-model="formData.periodoGozoInicio"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              @change="calcularDiasSolicitados"
            />
          </div>
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-2">
              Data Fim
            </label>
            <input
              v-model="formData.periodoGozoFim"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              @change="calcularDiasSolicitados"
            />
          </div>
        </div>

        <div v-if="diasSolicitados > 0" class="bg-blue-50 p-4 rounded-md">
          <p class="text-blue-800">
            Você está solicitando <strong>{{ diasSolicitados }}</strong> dias de
            férias.
            <span
              v-if="diasSolicitados > totalDiasDisponiveis"
              class="text-red-600"
            >
              (Excede o limite disponível de {{ totalDiasDisponiveis }} dias)
            </span>
          </p>
        </div>

        <div class="flex items-center">
          <input
            v-model="formData.abonoPecuniario"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label class="ml-2 text-lg text-gray-700">Abono Pecuniário</label>
        </div>

        <div v-if="formData.abonoPecuniario">
          <label class="block text-lg font-medium text-gray-700 mb-2">
            Dias de Abono
          </label>
          <input
            v-model="formData.diasAbono"
            type="number"
            max="10"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            Observações
          </label>
          <textarea
            v-model="formData.observacoes"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="
              !formValido || loading || diasSolicitados > totalDiasDisponiveis
            "
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? "Enviando..." : "Solicitar Férias" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { api } from "../../services/api";
import { Icon } from "@iconify/vue";

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
const formValido = ref(true);
const periodos = ref<Periodo[]>([]);
const periodosGozados = ref<PeriodoGozado[]>([]);
const diasGozados = ref(0);
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

// Computed properties para obter os períodos específicos
const periodoAquisitivo = computed(() => {
  return periodos.value.find((p) => p.tipo === "aquisitivo");
});

const periodoConcessivo = computed(() => {
  return periodos.value.find((p) => p.tipo === "concessivo");
});

// Dias decorridos no período aquisitivo
const diasDecorridos = computed(() => {
  if (!periodoAquisitivo.value) return 0;

  const inicio = new Date(periodoAquisitivo.value.inicio);
  const hoje = new Date();
  const fim = new Date(periodoAquisitivo.value.fim);

  // Se já passou do fim do período, retorna o total de dias do período
  if (hoje > fim) {
    return Math.ceil(
      (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return Math.ceil((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
});

// Dias restantes no período concessivo
const diasRestantesConcessivo = computed(() => {
  if (!periodoConcessivo.value) return 0;

  const hoje = new Date();
  const fim = new Date(periodoConcessivo.value.fim);

  if (hoje > fim) return 0;

  return Math.ceil((fim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
});

// Total de dias disponíveis para férias
const totalDiasDisponiveis = computed(() => {
  let total = 0;

  if (
    periodoAquisitivo.value &&
    periodoAquisitivo.value.status === "disponivel"
  ) {
    total += periodoAquisitivo.value.diasDisponiveis;
  }

  if (
    periodoConcessivo.value &&
    periodoConcessivo.value.status === "disponivel"
  ) {
    total += periodoConcessivo.value.diasDisponiveis;
  }

  // Subtrair dias já gozados
  total = Math.max(0, total - diasGozados.value);

  // Limitar a 30 dias
  return Math.min(30, total);
});

// Último período gozado
const ultimoPeriodoGozado = computed(() => {
  if (periodosGozados.value.length === 0) {
    return "Nenhum período gozado";
  }

  const ultimo = periodosGozados.value[0]; // Assumindo que estão ordenados por data
  return `Último: ${formatarData(
    new Date(ultimo.periodoGozoInicio)
  )} a ${formatarData(new Date(ultimo.periodoGozoFim))}`;
});

const formatarData = (data: Date): string => {
  return data.toLocaleDateString("pt-BR");
};

const getStatusLabel = (status: string): string => {
  const labels = {
    em_andamento: "Em Andamento",
    disponivel: "Disponível",
    vencido: "Vencido",
  };
  return labels[status as keyof typeof labels] || status;
};

const calcularDiasSolicitados = () => {
  if (formData.value.periodoGozoInicio && formData.value.periodoGozoFim) {
    const inicio = new Date(formData.value.periodoGozoInicio);
    const fim = new Date(formData.value.periodoGozoFim);

    if (inicio > fim) {
      toast.error("Data de início não pode ser posterior à data de fim");
      diasSolicitados.value = 0;
      return;
    }

    const diffTime = Math.abs(fim.getTime() - inicio.getTime());
    diasSolicitados.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
};

const carregarPeriodos = async () => {
  try {
    loading.value = true;
    const response = await api.get(
      `/relatorio-ferias/contrato/${props.contratoId}`
    );

    if (response.data.periodos) {
      periodos.value = response.data.periodos.map((p: any) => ({
        ...p,
        inicio: new Date(p.inicio),
        fim: new Date(p.fim),
      }));
    }

    // Carregar dias gozados
    if (response.data.diasGozados !== undefined) {
      diasGozados.value = response.data.diasGozados;
    }

    // Carregar períodos gozados
    if (
      response.data.periodosGozados &&
      Array.isArray(response.data.periodosGozados)
    ) {
      periodosGozados.value = response.data.periodosGozados.map((h: any) => ({
        periodoGozoInicio: h.periodoGozoInicio,
        periodoGozoFim: h.periodoGozoFim,
        diasGozados:
          Math.ceil(
            (new Date(h.periodoGozoFim).getTime() -
              new Date(h.periodoGozoInicio).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1,
        abonoPecuniario: h.abonoPecuniario,
        status: "Aprovado",
      }));
    }

    console.log("Dados carregados:", {
      periodos: periodos.value,
      diasGozados: diasGozados.value,
      periodosGozados: periodosGozados.value,
    });
  } catch (error) {
    toast.error("Erro ao carregar períodos de férias");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const submitForm = async () => {
  if (diasSolicitados.value > totalDiasDisponiveis.value) {
    toast.error(
      `Você só pode solicitar até ${totalDiasDisponiveis.value} dias de férias`
    );
    return;
  }

  try {
    loading.value = true;
    await api.post("/relatorio-ferias", formData.value);
    toast.success("Solicitação de férias enviada com sucesso");

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

    // Recarregar dados
    await carregarPeriodos();
  } catch (error) {
    toast.error("Erro ao enviar solicitação de férias");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

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
