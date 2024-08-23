<template>
  <div class="px-6 py-8 2xl:max-w-[2000px] 2xl:mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      <div
        v-for="contrato in contratos"
        :key="contrato.id"
        class="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl"
        >
        <router-link :to="{ name: 'visualizarContrato', params: { id: contrato.id } }">
          <img src="../../assets/imagens/imageCard.png" alt="imagem representativa do contrato" class="w-full h-72 rounded-md object-cover">
          <div class="p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center truncate" :title="contrato.nomeContrato">{{ contrato.nomeContrato }}</h2>

            <div class="mb-4">
              <div class="flex justify-between text-xl mb-1">
                <span class="text-gray-600">Progresso:</span>
                <span class="font-semibold text-msb-blue">
                  {{ (calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado / parseFloat(contrato.saldoContrato).toFixed(2) * 100).toFixed(0) }}%
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  class="bg-[#0066cc] h-2.5 rounded-full"
                  :style="{ width: `${(calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado / parseFloat(contrato.saldoContrato).toFixed(2) * 100).toFixed(0)}%` }"
                >
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
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch,  } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "@/services/api";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const contratos = ref([]);
const faturamentos = ref([]);
const itens = ref([]);
const medicoes = ref([]);

const calcularSaldoFaturamentoItens = (faturamento) => {
  let saldoTotal = 0;
  let valorAguardandoFaturamento = 0;
  let valorAguardandoPagamento = 0;
  let valorPago = 0;

  faturamento?.forEach((item) => {
    if (item.status === "Aguardando Faturamento") {
      item.faturamentoItens.forEach((subItem) => {
        subItem.lancamento.lancamentoItens.forEach((itemLancamento) => {
          const quantidadeItens =
            parseFloat(itemLancamento.quantidadeItens) || 0;
          const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;
          const valorTotalItem = quantidadeItens * valorUnitario;
          valorAguardandoFaturamento += valorTotalItem;
          saldoTotal += valorTotalItem;
        });
      });
    } else if (item.status === "Aguardando Pagamento") {
      item.faturamentoItens.forEach((subItem) => {
        subItem.lancamento.lancamentoItens.forEach((itemLancamento) => {
          const quantidadeItens =
            parseFloat(itemLancamento.quantidadeItens) || 0;
          const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;
          const valorTotalItem = quantidadeItens * valorUnitario;
          valorAguardandoPagamento += valorTotalItem;
          saldoTotal += valorTotalItem;
        });
      });
    } else if (item.status === "Pago") {
      item.faturamentoItens.forEach((subItem) => {
        subItem.lancamento.lancamentoItens.forEach((itemLancamento) => {
          const quantidadeItens =
            parseFloat(itemLancamento.quantidadeItens) || 0;
          const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;
          const valorTotalItem = quantidadeItens * valorUnitario;
          valorPago += valorTotalItem;
          saldoTotal += valorTotalItem;
        });
      });
    }
  });

  return {
    aguardandoFaturamento: parseFloat(valorAguardandoFaturamento.toFixed(2)),
    aguardandoPagamento: parseFloat(valorAguardandoPagamento.toFixed(2)),
    totalUtilizado: parseFloat(saldoTotal.toFixed(2)),
    valorPago: parseFloat(valorPago.toFixed(2)),
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
    const response = await api.get("/contratos");
    contratos.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
  }
};

onMounted(() => {
  fetchContratos();
});

</script>

<style scoped>
  /* Adicione estas classes ao seu arquivo Tailwind ou inclua-as aqui se necessário */
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
