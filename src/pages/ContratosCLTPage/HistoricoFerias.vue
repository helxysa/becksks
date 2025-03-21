<template>
  <div class="w-full">
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Histórico de Férias
      </h2>

      <div v-if="loading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        ></div>
      </div>

      <div v-else-if="!historico.length" class="text-center py-8">
        <Icon icon="mdi:calendar-blank" class="text-gray-400 text-4xl mb-2" />
        <p class="text-gray-500 text-lg">
          Nenhum registro de férias encontrado
        </p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Período Aquisitivo
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Período de Gozo
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Data de Retorno
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Abono Pecuniário
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Dias de Abono
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Valor do Abono
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Observações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="ferias in historico"
              :key="ferias.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                {{
                  formatarPeriodo(
                    ferias.periodoAquisitivoInicio,
                    ferias.periodoAquisitivoFim
                  )
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{
                  formatarPeriodo(
                    ferias.periodoGozoInicio,
                    ferias.periodoGozoFim
                  )
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatarData(ferias.dataRetorno) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    ferias.abonoPecuniario
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800',
                  ]"
                >
                  {{ ferias.abonoPecuniario ? "Sim" : "Não" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ ferias.diasAbono || "-" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ ferias.valorAbono ? formatarMoeda(ferias.valorAbono) : "-" }}
              </td>
              <td class="px-6 py-4">
                <span class="line-clamp-2" :title="ferias.observacoes">
                  {{ ferias.observacoes || "-" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { api } from "../../services/api";
import { toast } from "vue3-toastify";

interface Ferias {
  id: number;
  periodoAquisitivoInicio: string;
  periodoAquisitivoFim: string;
  periodoGozoInicio: string;
  periodoGozoFim: string;
  dataRetorno: string;
  abonoPecuniario: boolean;
  diasAbono: number | null;
  valorAbono: number | null;
  observacoes: string | null;
}

const props = defineProps<{
  contratoId: string | number;
}>();

const historico = ref<Ferias[]>([]);
const loading = ref(true);

const carregarHistorico = async () => {
  try {
    loading.value = true;
    const response = await api.get(
      `/relatorio-ferias/contrato/${props.contratoId}`
    );
    historico.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    toast.error("Erro ao carregar histórico de férias");
  } finally {
    loading.value = false;
  }
};

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString("pt-BR");
};

const formatarPeriodo = (inicio: string, fim: string) => {
  return `${formatarData(inicio)} a ${formatarData(fim)}`;
};

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

onMounted(() => {
  carregarHistorico();
});
</script>
