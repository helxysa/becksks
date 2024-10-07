<template>
  <div>
    <h1 class="text-5xl font-medium mb-10">Dashboard</h1>
    <section class="flex flex-col gap-6">
      <div class="flex w-full">
        <section class="w-full h-full lg:h-[400px] flex flex-col lg:flex-row gap-5 border">
          <!-- Gráfico de Rosca -->
          <div class="flex flex-col w-full h-full p-8">
            <div class="flex flex-col p-2">
              <span class="font-semibold">Contratos</span>
              <span>por status do pagamento</span>
            </div>
            <div class="h-full">
              <div v-if="valoresTotaisStatus">
                <Doughnut
                  :valoresTotais="valoresTotaisStatus"
                  @status-faturamento="handleFiltragemDonuts"
                />
              </div>
              <div v-else class="skeleton h-full w-full"></div>
            </div>
          </div>
          <!-- Gráfico de Barras -->
          <div class="flex flex-col w-full h-full p-8">
            <div class="flex flex-col p-2 items-end">
              <span class="font-semibold">Top 5</span>
              <span>Contratos por valor</span>
            </div>
            <div class="h-full w-full">
              <div v-if="top5" class="w-full h-full">
                <Bar
                  :top5="top5"
                  class="w-full h-full"
                  style="width: 100%; height: 100%"
                />
              </div>
              <div v-else class="skeleton h-full w-full"></div>
            </div>
          </div>
        </section>
        <!-- Stamps -->
        <section class="flex flex-col flex-wrap justify-evenly items-end w-full max-w-[30%]">
          <!-- Primeiro Stamp -->
          <div
            class="w-[350px] h-[96px] flex sm:flex-row justify-between items-center px-4 rounded-lg bg-gradient-to-r from-cyan-100 to-cyan-400"
          >
            <div>
              <p class="font-semibold">
                <span v-if="valoresStamp.total_valor_contratado !== null && valoresStamp.total_valor_contratado !== undefined">
                  {{ formatCurrencyInMillions(valoresStamp.total_valor_contratado) }}
                </span>
                <span v-else class="skeleton w-32 h-6 block"></span>
              </p>
              <p>valor dos contratos</p>
            </div>
            <span>
              <Icon
                icon="fluent:notepad-32-filled"
                height="35"
                class="text-white"
              />
            </span>
          </div>
          <!-- Segundo Stamp -->
          <div
            class="w-[350px] h-[96px] flex justify-between items-center px-4 rounded-lg bg-gradient-to-r from-blue-300 to-pink-200"
          >
            <div>
              <p class="font-semibold">
                <span v-if="valoresStamp.total_aguardando_faturamento !== null && valoresStamp.total_aguardando_faturamento !== undefined">
                  {{ formatCurrencyInMillions(valoresStamp.total_aguardando_faturamento) }}
                </span>
                <span v-else class="skeleton w-32 h-6 block"></span>
              </p>
              <p>Aguardando Faturamento</p>
            </div>
            <div>
              <p class="font-semibold">
                <span v-if="valoresStamp.total_saldo_disponível !== null && valoresStamp.total_saldo_disponível !== undefined">
                  {{ formatCurrencyInMillions(valoresStamp.total_aguardando_pagamento) }}
                </span>
                <span v-else class="skeleton w-32 h-6 block"></span>
              </p>
              <p>Aguardando Pagamento</p>
            </div>
            <span>
              <Icon icon="ph:calculator-fill" height="35" class="text-white" />
            </span>
          </div>
          <!-- Terceiro Stamp -->
          <div
            class="w-[350px] h-[96px] flex bg-orange-200 justify-between items-center px-4 rounded-lg bg-gradient-to-r from-orange-200 to-green-200"
          >
            <div>
              <p class="font-semibold">
                <span v-if="valoresStamp.total_pago !== null && valoresStamp.total_pago !== undefined">
                  {{ formatCurrencyInMillions(valoresStamp.total_pago) }}
                </span>
                <span v-else class="skeleton w-32 h-6 block"></span>
              </p>
              <p>Pago</p>
            </div>
            <div>
              <p class="font-semibold">
                <span v-if="valoresStamp.total_saldo_disponível">{{
                  formatCurrencyInMillions(valoresStamp.total_saldo_disponível)
                }}</span>
                <span v-else class="skeleton w-32 h-6 block"></span>
              </p>
              <p>Saldo</p>
            </div>
            <span>
              <Icon icon="rivet-icons:money" height="35" class="text-white" />
            </span>
          </div>
        </section>
      </div>

      <!-- Mapa e Gráfico Vertical -->
      <div class="w-full h-full lg:h-[400px] flex flex-col lg:flex-row">
        <section class="w-full h-full lg:h-[400px] z-50">
          <div class="w-[95%] h-full lg:h-[400px]" v-if="mapLoaded">
            <Map :markers="map" />
          </div>
          <div v-else class="skeleton h-[377px] w-full"></div>
        </section>
        <section class="w-full relative flex flex-col p-8 border">
          <div v-if="contratosPorVencimento">
            <BarVertical
              :contratosPorVencimento="contratosPorVencimento"
              @valor-vencimento="handleFiltragemBarVertical"
              class="pt-20"
            />
            <div class="title-vencimento pt-2">
              <span class="font-semibold">Contratos</span>
              <p>por vencimento (dias)</p>
            </div>
          </div>
          <div v-else class="skeleton h-[400px] w-full"></div>
        </section>
      </div>
    </section>

    <!-- Tabela -->
    <div>
      <div v-if="contratoItemData && contratoItemData.length">
        <table
          class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
        >
          <!-- Cabeçalho da tabela -->
          <thead class="h-20 bg-slate-100 border-1">
            <tr>
              <th class="text-xl">Id</th>
              <th class="text-xl">Nome</th>
              <th class="text-xl">Cliente</th>
              <th class="text-xl">Valor</th>
              <th class="text-xl">Data inicial</th>
              <th class="text-xl">Data final</th>
              <th class="text-xl">Status</th>
            </tr>
          </thead>
          <tbody v-if="contratoItemData">
            <tr
              class="h-24 text-center"
              v-for="(contrato, index) in contratoItemData"
              :key="contrato.id"
            >
              <td class="text-2xl">{{ index + 1 }}</td>
              <td class="text-2xl">{{ contrato.nomeContrato }}</td>
              <td class="text-2xl">{{ contrato.nomeCliente }}</td>
              <td class="text-2xl">
                {{ formatCurrency(contrato.saldoContrato) }}
              </td>
              <td class="text-2xl">{{ formatDate(contrato.dataInicio) }}</td>
              <td
                class="text-2xl"
                :class="{
                  'text-red-600': contrato.statusVencimento === 'atraso',
                }"
              >
                {{ formatDate(contrato.dataFim) }}
              </td>
              <td class="text-2xl">
                <div class="flex justify-center">
                  <span
                    v-if="contrato.statusVencimento === 'a vencer'"
                    title="Contrato perto de vencer"
                  >
                    <Icon
                      icon="fluent:alert-on-16-filled"
                      height="30"
                      class="text-yellow-300"
                    />
                  </span>
                  <span
                    v-else-if="contrato.statusVencimento === 'ativo'"
                    title="Contrato ativo"
                  >
                    <Icon
                      icon="line-md:confirm-circle-filled"
                      height="30"
                      class="text-green-300"
                    />
                  </span>
                  <span v-else title="Contrato em atraso">
                    <Icon
                      icon="ri:alert-line"
                      height="30"
                      class="text-red-300"
                    />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center">
          <vue-awesome-paginate
            :total-items="totalContratos"
            :max-pages-shown="5"
            :items-per-page="resultsPerPageContratos"
            v-model="currentPageContratos"
            @click="changePageContratos"
          />
        </div>
      </div>
      <div v-else class="skeleton-table mt-8">
        <div class="skeleton h-12 mb-2"></div>
        <div class="skeleton h-12 mb-2"></div>
        <div class="skeleton h-12 mb-2"></div>
      </div>
    </div>

    <!-- Waveform Loading -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
    >
      <l-waveform size="40" stroke="3.5" speed="1" color="white"></l-waveform>
    </div>
  </div>
</template>

<script setup>
import Doughnut from "../../components/graficos/Doughnut.vue";
import Bar from "../../components/graficos/Bar.vue";
import BarVertical from "@/components/graficos/BarVertical.vue";
import { Icon } from "@iconify/vue";
import Map from "../../components/Map.vue";
import { onMounted, ref, watch } from "vue";
import { api } from "@/services/api";
import { waveform } from "ldrs";

waveform.register();
const currentPageContratos = ref(1);
const statusAtual = ref("");
const valoresTotaisStatus = ref();
const valoresStamp = ref({});
const contratosPorVencimento = ref();
const diasVencimento = ref(0);
const top5 = ref();
const map = ref([]);
const mapLoaded = ref(false);
const totalContratos = ref(0);
const resultsPerPageContratos = ref();
let contratoItemData = ref([]);
let contratoItemMeta = ref({});
let statusVencimento = ref("");
const loading = ref(false);

onMounted(() => {
  fetchDashboardData();
});

const getCurrentDateString = () => new Date().toISOString().split("T")[0];

const fetchDashboardData = async (status, page, vencimento) => {
  const validStatuses = [
    "Aguardando Pagamento",
    "Aguardando Faturamento",
    "Pago",
  ];
  const statusFat = validStatuses.includes(status) ? status : "";
  const vencimentoFat = vencimento ? vencimento : 0;
  const pageAtual = page ? page : 1;
  // console.log(typeof vencimentoFat, 'pageAtual')
  try {
    if (!vencimentoFat) {
      loading.value = true;
      const response = await api.get("/dashboard", {
        params: {
          statusFaturamento: statusFat,
          page: pageAtual,
        },
      });
      loading.value = false;
      valoresTotaisStatus.value = response.data.valores_totais_status;
      valoresStamp.value = response.data.valores_totais_status;
      contratosPorVencimento.value = response.data.contratos_por_vencimento;
      map.value = response.data.map;
      mapLoaded.value = true;
      top5.value = response.data.top5;

      const contratos = response.data.contratos.data;
      const meta = response.data.contratos.meta;

      contratoItemMeta.value = meta;
      currentPageContratos.value = meta.currentPage;
      totalContratos.value = meta.total;
      resultsPerPageContratos.value = meta.perPage;
      contratoItemData.value = adicionarStatusVencimento(contratos);
    } else {
      // console.log(vencimentoFat, 'vencimentoFat');
      loading.value = true;
      const response = await api.get("/dashboard", {
        params: {
          page: pageAtual,
          lembreteVencimento: vencimentoFat,
        },
      });
      loading.value = false;
      valoresTotaisStatus.value = response.data.valores_totais_status;
      valoresStamp.value = response.data.valores_totais_status;
      contratosPorVencimento.value = response.data.contratos_por_vencimento;
      map.value = response.data.map;
      mapLoaded.value = true;
      top5.value = response.data.top5;

      const contratos = response.data.contratos.data;
      const meta = response.data.contratos.meta;

      contratoItemMeta.value = meta;
      currentPageContratos.value = meta.currentPage;
      totalContratos.value = meta.total;
      resultsPerPageContratos.value = meta.perPage;
      contratoItemData.value = adicionarStatusVencimento(contratos);
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

const adicionarStatusVencimento = (contratos) => {
  const hoje = getCurrentDateString();

  return contratos.map((contrato) => {
    const dataFim = contrato.dataFim;
    const lembreteVencimento = parseInt(contrato.lembreteVencimento, 10);
    const diferenca = new Date(dataFim) - new Date(hoje);
    const diasParaVencimento = diferenca / (1000 * 60 * 60 * 24);

    let statusVencimento = "atraso";
    if (diasParaVencimento <= lembreteVencimento && diasParaVencimento > 0) {
      statusVencimento = "a vencer";
    } else if (
      diasParaVencimento > lembreteVencimento &&
      diasParaVencimento > 0
    ) {
      statusVencimento = "ativo";
    }

    return {
      ...contrato,
      statusVencimento,
    };
  });
};

const changePageContratos = (page) => {
  currentPageContratos.value = page;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const handleFiltragemDonuts = (status) => {
  statusAtual.value = status;
  fetchDashboardData(statusAtual.value, currentPageContratos.value);
};

const handleFiltragemBarVertical = (vencimento) => {
  // statusAtual.value = status;
  diasVencimento.value = vencimento;
  fetchDashboardData(
    statusAtual.value,
    currentPageContratos.value,
    diasVencimento.value
  );
};

const formatCurrencyInMillions = (value) => {
  if (value === null || value === undefined) return "R$ 0,00";

  const valueInThousands = value / 1000;
  const valueInMillions = value / 1000000;

  if (valueInMillions >= 1) {
    return (
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(valueInMillions) + " Milhões"
    );
  } else if (valueInThousands >= 1) {
    return (
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 1,
      }).format(valueInThousands) + " Mil"
    );
  } else {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};

watch(
  () => [statusAtual.value, currentPageContratos.value, diasVencimento.value],
  ([status, page, vencimento]) => {
    fetchDashboardData(status, page, vencimento);
  }
);
</script>

<style>
.skeleton {
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.2s infinite;
}

.pagination-container {
  display: flex;
  padding-top: 5px;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}

.title-vencimento {
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 1000;
}
</style>
