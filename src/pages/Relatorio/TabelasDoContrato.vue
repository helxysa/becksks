<template>
  <div>
    <!-- ITENS DO CONTRATO -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Itens do Contrato</h2>
      <table class="w-full bg-white rounded-lg shadow-md">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="px-4 py-2">Nome do Item</th>
            <th class="px-4 py-2">Unidade</th>
            <th class="px-4 py-2">Valor Total</th>
            <th class="px-4 py-2">Saldo Atual</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in contratoItens"
            :key="item.id"
            class="text-center border-b"
          >
            <td class="px-4 py-2">{{ item.titulo }}</td>
            <td class="px-4 py-2">{{ item.unidadeMedida }}</td>
            <td class="px-4 py-2">
              R$ {{ (Number(item.valorUnitario) * Number(item.saldoQuantidadeContratada)).toFixed(2) }}
            </td>
            <td class="px-4 py-2">
              R$ {{ Number(item.saldoQuantidadeContratada).toFixed(2) }}
            </td>
          </tr>

          <!-- Mensagem se não houver itens -->
          <tr v-if="contratoItens.length === 0">
            <td colspan="4" class="text-center py-2">Nenhum item encontrado</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TABELA MEDIÇÕES (Lançamentos) -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Medições</h2>
      <table class="w-full bg-white rounded-lg shadow-md">
        <thead class="bg-green-500 text-white">
          <tr>
            <th class="px-4 py-2">Data</th>
            <th class="px-4 py-2">Projeto</th>
            <th class="px-4 py-2">Unidade</th>
            <th class="px-4 py-2">Medição (ID)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lanc in lancamentos"
            :key="lanc.id"
            class="text-center border-b"
          >
            <!-- Data da medição -->
            <td class="px-4 py-2">{{ formatDate(lanc.dataMedicao) }}</td>
            <!-- Projeto(s) -->
            <td class="px-4 py-2">
              {{ lanc.projetos || '—' }}
            </td>
            <!-- Unidade: vou exibir a unidade do primeiro item -->
            <td class="px-4 py-2">
              {{ lanc.lancamentoItens[0]?.unidadeMedida || 'N/A' }}
            </td>
            <!-- Medição (ID do próprio lançamento) -->
            <td class="px-4 py-2">
              {{ lanc.id }}
            </td>
          </tr>

          <!-- Mensagem se não houver lancamentos -->
          <tr v-if="lancamentos.length === 0">
            <td colspan="4" class="text-center py-2">Nenhuma medição encontrada</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TABELA FATURAMENTOS -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Faturamentos</h2>
      <table class="w-full bg-white rounded-lg shadow-md">
        <thead class="bg-yellow-500 text-white">
          <tr>
            <th class="px-4 py-2">Data</th>
            <th class="px-4 py-2">Competência</th>
            <th class="px-4 py-2">Nota Fiscal</th>
            <th class="px-4 py-2">Total</th>
            <th class="px-4 py-2">Situação</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="fat in faturamentos"
            :key="fat.id"
            class="text-center border-b"
          >
            <!-- Data do faturamento -->
            <td class="px-4 py-2">{{ formatDate(fat.dataFaturamento) }}</td>
            <!-- Competência -->
            <td class="px-4 py-2">{{ fat.competencia || '—' }}</td>
            <!-- Nota Fiscal (ou N/A) -->
            <td class="px-4 py-2">{{ fat.notaFiscal || 'N/A' }}</td>
            <!-- Total calculado -->
            <td class="px-4 py-2">
              R$ {{ calculateFaturamentoTotal(fat).toFixed(2) }}
            </td>
            <!-- Status (situação) -->
            <td class="px-4 py-2">{{ fat.status || '—' }}</td>
          </tr>

          <!-- Mensagem se não houver faturamentos -->
          <tr v-if="faturamentos.length === 0">
            <td colspan="5" class="text-center py-2">Nenhum faturamento encontrado</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';

// 1) Recebe a prop "contrato"
const { contrato } = defineProps({
  contrato: {
    type: Object,
    required: true
  }
});

// 2) Computed para itens do contrato
const contratoItens = computed(() => {
  return contrato?.contratoItens || [];
});

// 3) Computed para MEDIÇÕES (lancamentos)
const lancamentos = computed(() => {
  return contrato?.lancamentos || [];
});

// 4) Computed para FATURAMENTOS
const faturamentos = computed(() => {
  return contrato?.faturamentos || [];
});

// Função para formatar data (exibir no padrão local, por exemplo)
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

// Função para calcular o total de um faturamento
// Exemplo: somar todos os lancamentos -> todos os lancamentoItens -> valorUnitario * quantidadeItens
function calculateFaturamentoTotal(faturamento) {
  if (!faturamento?.faturamentoItens) return 0;

  // Somamos a soma de cada lançamento presente em faturamentoItens
  return faturamento.faturamentoItens.reduce((accFatur, fatItem) => {
    // Cada fatItem tem 'lancamento' dentro. Vamos somar seus lancamentoItens:
    const lancamento = fatItem.lancamento;
    if (!lancamento || !lancamento.lancamentoItens) return accFatur;

    // Soma todos os "valorUnitario * quantidadeItens" do array lancamentoItens
    const somaLancamento = lancamento.lancamentoItens.reduce((accLanc, lancItem) => {
      const valor = Number(lancItem.valorUnitario || 0) * Number(lancItem.quantidadeItens || 0);
      return accLanc + valor;
    }, 0);

    return accFatur + somaLancamento;
  }, 0);
}
</script>

<style scoped>
/* Exemplo de estilização adicional, se quiser */
</style>
