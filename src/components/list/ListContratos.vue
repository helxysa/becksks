<template>
  <div v-for="contrato in contratos" :key="contrato.id" class="flex flex-col">
    <router-link :to="{ name: 'visualizarContrato', params: { id: contrato.id } }">
      <div class="shadow-lg rounded-lg overflow-hidden cursor-pointer hover:bg-slate-300 mt-12">
        <section class="relative">
          <img class="relative" src="../../assets/imagens/imageCard.png" alt="imagem representativa do contrato" />
        </section>

        <section>
          <p class="flex justify-center font-semibold text-3xl mt-6 max-w-[330px] px-2 ">{{ contrato.nomeContrato }}</p>

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
              </div>
            </div>
          </section>
          <section class="p-6 flex flex-col gap-2 text-2xl">
            <div class="flex gap-2 max-w-[300px]">
              <span class="font-semibold">Nome cliente:</span>
              <span >{{ contrato.nomeCliente }}</span>
            </div>
            <div class="flex gap-2">

              <span class="font-semibold">Vigência:</span>
              <span>{{ formatDate(contrato.dataInicio) }}</span>
              <span>até</span>
              <span>{{ formatDate(contrato.dataFim) }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-semibold">Valor contratado:</span>
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
                <div class="flex gap-2">
                  <span class="font-semibold">Valor pago:</span>
                  {{ formatCurrency(calcularSaldoFaturamentoItens(contrato.faturamentos).valorPago) }}
                  </div>
                  <div class="flex gap-2">
                    <span class="font-semibold">Saldo  disponível:</span>
                    {{ formatCurrency(contrato.saldoContrato  - calcularSaldoFaturamentoItens(contrato.faturamentos).totalUtilizado) }}
                    </div>
          </section>
        </section>
      </div>
    </router-link>
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
    verificarVencimentoContratos();
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
  }
};

const verificarVencimentoContratos = () => {
  const hoje = new Date();
  contratos.value.forEach((contrato) => {
    const dataFim = new Date(contrato.dataFim);
    const lembreteVencimento = parseInt(contrato.lembreteVencimento, 10);
    const diasParaVencimento = Math.ceil(
      (dataFim - hoje) / (1000 * 60 * 60 * 24)
    );

    if (diasParaVencimento == 0) {
      toast.error(`O contrato ${contrato.nomeContrato} vence hoje.`, {
        theme: "colored",
        timeout: 10000
      });
    } else if (diasParaVencimento < 0) {
      toast.error(`O contrato ${contrato.nomeContrato} expirou.`, {
        theme: "colored",
        timeout: 10000
      });
    } else if (diasParaVencimento <= lembreteVencimento) {
      toast.warning(`O contrato ${contrato.nomeContrato} está prestes a vencer em ${diasParaVencimento} dias.`, {
          theme: "colored",
          type: "success",
          timeout: 10000
        });
    }
  });
};

onMounted(() => {
  fetchContratos();
});

// watch(
//   fetchContratos()
// );

</script>
