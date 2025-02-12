<template>
  <div class="px-6 py-8 2xl:max-w-[2000px] 2xl:mx-auto">
    <!-- Filtragem -->
    <div class="flex mb-12 gap-4 justify-between">
      <section class="flex justify-around gap-5 items-center">
        <label>Período</label>
        <input
          v-model="dataInicio"
          type="date"
          class="border rounded px-4 py-1 mr-4"
          placeholder="Data de Início"
        />
        <input
          v-model="dataFim"
          type="date"
          class="border rounded px-4 py-1"
          placeholder="Data de Fim"
        />
        <span @click="resetFilters" class="p-2 rounded-full cursor-pointer transition-transform duration-75 ease-in-out active:scale-125 active:-rotate-180">
          <Icon icon="system-uicons:reset" width="2rem" class="text-slate-800" />
        </span>
      </section>

      <div class="relative w-full max-w-[20%] items-center">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon icon="mdi:magnify" width="2rem" class="text-gray-400" />
        </span>
        <input
        v-model="filterName"
        type="text"
        placeholder="Pesquisar..."
        class="border rounded px-4 p-2 pl-16 mr-4 w-full"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      <div
        v-for="contrato in contratos"
        :key="contrato.id"
        class="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl"
        >
        <section>
          <router-link :to="{ name: 'visualizarContrato', params: { id: contrato.id } }">
            <div class="relative">
              <img :src="contrato.foto ? `${baseURL}${contrato.foto}` : imagemPadrao" alt="imagem representativa do contrato" class="w-full h-[20rem] rounded-md object-center">
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center truncate" :title="contrato.nomeContrato">{{ contrato.nomeContrato }}</h2>

              <div class="mb-4">
                <div class="flex justify-between text-xl mb-1">
                  <span class="text-gray-600">Progresso:</span>
                  <span class="font-semibold text-msb-blue">
                    <!-- {{ (calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado / parseFloat(contrato.saldoContrato).toFixed(2) * 100).toFixed(0) }}% -->
                      {{calcularProgresso(contrato) }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-[#0066cc] h-2.5 rounded-full" :style="{ width: `${calcularProgresso(contrato)}%` }">
                  </div>
                </div>
              </div>

              <div class="space-y-2 text-xl">
                <div class="mb-3">
                  <p class="text-gray-600 font-semibold whitespace-nowrap">Nome cliente:</p>
                  <p class="text-gray-800 break-words truncate" :title="contrato.nomeCliente">{{ contrato.nomeCliente }}</p>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Vigência:</span>
                  <span class="text-gray-800">{{ formatDate(contrato.dataInicio) }} até {{ formatDate(contrato.dataFim) }}</span>
                </div>
                <section v-if="hasPermission('contratos', 'Visualizar Finanças')">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Valor contratado:</span>
                    <span class="font-semibold text-msb-blue">{{ formatCurrency(contrato.saldoContrato) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Aguardando faturamento:</span>
                    <span class="font-semibold text-yellow-600">
                      {{ formatCurrency(calcularSaldoFaturamentoItens(contrato.faturamentos).aguardandoFaturamento) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Aguardando pagamento:</span>
                    <span class="font-semibold text-orange-600">
                      {{ formatCurrency(calcularSaldoFaturamentoItens(contrato.faturamentos).aguardandoPagamento) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Valor pago:</span>
                    <span class="font-semibold text-green-600">
                      {{ formatCurrency(calcularSaldoFaturamentoItens(contrato.faturamentos).valorPago) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Saldo disponível:</span>
                    <span class="font-semibold text-msb-blue">
                      {{ formatCurrency(contrato.saldoContrato - calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado) }}
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </router-link>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch,  } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";
import { Icon } from "@iconify/vue";
import imagemPadrao from '../../assets/imagens/imageCard.png'
import { usePermissions } from '@/composables/usePermission';

const { hasPermission } = usePermissions();

const baseURL = import.meta.env.VITE_APP_API_URL.replace(/\/$/, "");
const route = useRoute();
const router = useRouter();
const contratos = ref([]);
const faturamentos = ref([]);
const itens = ref([]);
const medicoes = ref([]);
const filterName = ref('');
const filterType = ref('Todos');
const dataInicio = ref('');
const dataFim = ref('');

const resetFilters = () => {
  dataInicio.value = '';
  dataFim.value = '';
  filterType.value = 'Todos';
  filterName.value = '';

  // Após resetar os valores, chamamos a função para buscar os dados novamente
  // fetchContratos();
};

const calcularSaldoFaturamentoItens = (faturamento) => {
    let saldoTotal = 0;
    let valorAguardandoFaturamento = 0;
    let valorAguardandoPagamento = 0;
    let valorPago = 0;

    faturamento?.forEach((item) => {
        item.faturamentoItens?.forEach((subItem) => {
            const lancamento = subItem.lancamento;

            lancamento?.lancamentoItens?.forEach((itemLancamento) => {
                const quantidadeItens = parseFloat(itemLancamento.quantidadeItens) || 0;
                const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;

                let valorTotalItem;

                // Lógica idêntica à função calcularSaldoDisponível
                if (lancamento.dias) {
                    valorTotalItem = parseFloat(((valorUnitario / 30) * lancamento.dias).toFixed(2));
                } else {
                    valorTotalItem = parseFloat((quantidadeItens * valorUnitario).toFixed(2));
                }

                // Atualização dos valores baseada no status do item original
                if (item.status === "Aguardando Faturamento") {
                    valorAguardandoFaturamento = parseFloat((valorAguardandoFaturamento + valorTotalItem).toFixed(2));
                    saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(2));
                } else if (item.status === "Aguardando Pagamento") {
                    valorAguardandoPagamento = parseFloat((valorAguardandoPagamento + valorTotalItem).toFixed(2));
                    saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(2));
                } else if (item.status === "Pago") {
                    valorPago = parseFloat((valorPago + valorTotalItem).toFixed(2));
                    saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(2));
                }
            });
        });
    });

    return {
        aguardandoFaturamento: parseFloat(valorAguardandoFaturamento.toFixed(2)),
        aguardandoPagamento: parseFloat(valorAguardandoPagamento.toFixed(2)),
        totalUtilizado: parseFloat(saldoTotal.toFixed(2)),
        valorPago: parseFloat(valorPago.toFixed(2))
    };
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};

const fetchContratos = async () => {
  try {
    const params = {
      search: filterName.value,
      tipo: 'Contratos',
      dataInicio: dataInicio.value,
      dataFim: dataFim.value,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      limit: 500,
    };

    const response = await api.get("/contratos-e-termos", { params });
    contratos.value = response.data.data.map((contrato) => {
      const termoAditivoMaisRecente = contrato.termosAditivos && contrato.termosAditivos.length > 0
        ? contrato.termosAditivos[0]
        : null;

      return {
        ...contrato,
        dataInicio: termoAditivoMaisRecente ? termoAditivoMaisRecente.dataInicio : contrato.dataInicio,
        dataFim: termoAditivoMaisRecente ? termoAditivoMaisRecente.dataFim : contrato.dataFim,
        saldoContrato: termoAditivoMaisRecente ? termoAditivoMaisRecente.saldoContrato : contrato.saldoContrato,
        faturamentos: termoAditivoMaisRecente ? termoAditivoMaisRecente.faturamentos : contrato.faturamentos,
        lancamentos: termoAditivoMaisRecente ? termoAditivoMaisRecente.lancamentos : contrato.lancamentos,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
  }
};

const calcularProgresso = (contrato) => {
  const faturamentosCalculados = calcularSaldoFaturamentoItens(contrato.faturamentos);
  const valorTotalUtilizado = faturamentosCalculados.aguardandoFaturamento + faturamentosCalculados.aguardandoPagamento + faturamentosCalculados.valorPago; 
  const saldoContrato = parseFloat(contrato.saldoContrato);
  const saldoDisponivel = saldoContrato - valorTotalUtilizado;

  if (saldoDisponivel <= 1) {
    return 100;
  }

  return Number(((valorTotalUtilizado / saldoContrato) * 100).toFixed(2));
};


watch([filterName, filterType, dataInicio, dataFim], () => {
  fetchContratos();
});

onMounted(() => {
  fetchContratos();
});

</script>

<style scoped>
  .text-msb-blue {
    color: #0066cc;
  }
  .bg-msb-light-blue {
    background-color: #e6f2ff;
  }
  .hover\:text-msb-dark-blue:hover {
    color: #004c99;
  }
  </style>
