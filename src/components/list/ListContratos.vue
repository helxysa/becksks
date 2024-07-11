<template>
  <div v-for="contrato in contratos" :key="contrato.id" class="flex flex-col">
    <router-link :to="{ name: 'visualizarContrato', params: { id: contrato.id } }">
      <div class="shadow-lg rounded-lg overflow-hidden cursor-pointer hover:bg-slate-300 mt-12">
        <section class="relative">
          <img class="relative" src="../../assets/imagens/imageCard.png" alt="imagem representativa do contrato" />

          <div class="absolute top-0 right-0 mt-4 mr-4">
            <div v-if="contrato?.faturamentos?.length">
              <span
                class="shadow-lg border-2 p-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center"
                :class="{
                  'bg-green-200 border-green-400': contrato.faturamentos[contrato.faturamentos.length - 1].status === 'Faturamento Pago',
                  'bg-yellow-200 border-yellow-400': contrato.faturamentos[contrato.faturamentos.length - 1].status === 'Aguardando Pagamento',
                  'bg-blue-200 border-blue-400': contrato.faturamentos[contrato.faturamentos.length - 1].status === 'Aguardando Faturamento',
                }"
              >
                {{ contrato.faturamentos[contrato.faturamentos.length - 1].status }}
              </span>
            </div>
          </div>
        </section>

        <section>
          <p class="flex justify-center font-semibold text-3xl mt-6">{{ contrato.nomeCliente }}</p>

          <section class="px-8">
            <div class="relative">
              <div class="flex justify-between items-center">
                <span class="mb-2 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progresso
                  {{ (calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado / parseFloat(contrato.saldoContrato).toFixed(2) * 100).toFixed(0) }}%
                </span>
              </div>
              <div class="overflow-hidden h-10 mb-4 text-xs flex rounded bg-blue-200 relative">
                <div
                  :style="{ width: `${(calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado / parseFloat(contrato.saldoContrato).toFixed(2) * 100).toFixed(0)}%` }"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 relative"
                >
              </div>
              <!-- <span class="text-black text-center text-2xl absolute inset-0 flex items-center justify-center">
                {{ (calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado / parseFloat(contrato.saldoContrato).toFixed(2) * 100).toFixed(0) }}%
              </span> -->
              </div>
            </div>
          </section>
          <section class="p-6 flex flex-col gap-2 text-2xl">
            <div class="flex gap-2">
              <span class="font-semibold">Data Início:</span>
              <span>{{ formatDate(contrato.dataInicio) }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-semibold">Data Fim:</span>
              <span>{{ formatDate(contrato.dataFim) }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-semibold">Saldo atual:</span>
              <span>{{ formatCurrency(contrato.saldoContrato) }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-semibold">Valor aguard. faturamento:</span>
              {{
                formatCurrency(
                  calcularSaldoFaturamentoItens(contrato.faturamentos).aguardandoFaturamento
                  )
                }}
              </div>
              <div class="flex gap-2">
                <span class="font-semibold">Valor aguard. pagamento:</span>
                {{ formatCurrency(calcularSaldoFaturamentoItens(contrato.faturamentos).aguardandoPagamento) }}
                </div>
          </section>
        </section>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";


const router = useRouter();
const contratos = ref([]);

const calcularSaldoFaturamentoItens = (faturamento) => {
  let saldoTotal = 0;
  let valorAguardandoFaturamento = 0;
  let valorAguardandoPagamento = 0;
  let valorPago = 0;

  faturamento?.forEach((item) => {
    if (item.status === "Aguardando Faturamento") {
      item.faturamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorAguardandoFaturamento += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    } else if (item.status === "Aguardando Pagamento") {
      item.faturamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorAguardandoPagamento += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    } else if (item.status === "Faturamento Pago") {
      item.faturamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorPago += valorTotalItem;
        saldoTotal += valorTotalItem;
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
    contratos.value = response.data;
    contratos.value.reverse();
    console.log(contratos.value, "contratos");
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
  }
};

onMounted(() => {
  fetchContratos();
});

watchEffect(() => {
  fetchContratos();
});
</script>
