<template>
  <div class="flex flex-col gap-12">
    <!-- ITENS DO CONTRATO -->
    <div class="border border-[#3B82F6] rounded-xl p-12">
      <h2 class="text-2xl font-semibold mb-4">Itens</h2>
      <table class="w-full">
        <thead class="bg-[#F5F7FB]">
          <tr class="text-left">
            <th class="p-4">Nome do Item</th>
            <th class="p-4">Unidade</th>
            <th class="p-4">Saldo</th>
            <th class="p-4">Quantidade restante</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in contratoItens"
            :key="item.id"
            class=" border-b"
          >
            <td class="p-4">{{ item.titulo }}</td>
            <td class="p-4">{{ item.unidadeMedida }}</td>
            <td class="p-4">
              {{ formatCurrencySemArrendondar(item.valorUnitario * item.saldoQuantidadeContratada) }}
            </td>
            <td class="p-4">
              {{ calcularItensRestante(item.id, item.saldoQuantidadeContratada).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}
            </td>
          </tr>

          <!-- Mensagem se não houver itens -->
          <tr v-if="contratoItens.length === 0">
            <td colspan="4" class=" py-2">Nenhum item encontrado</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TABELA MEDIÇÕES (Lançamentos) -->
    <div class="border border-[#3B82F6] rounded-xl p-12">
      <h2 class="text-2xl font-semibold mb-4">Medições</h2>
      <table class="w-full">
        <thead class="bg-[#F5F7FB]">
          <tr class="text-left font-thin text-2xl important">
            <th class="p-4 text-2xl">Data</th>
            <th class="p-4 text-2xl">Projeto</th>
            <th class="p-4 text-2xl">Unidade</th>
            <th class="p-4 text-2xl">Medição</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lanc in lancamentos"
            :key="lanc.id"
            class=" border-b"
          >
            <!-- Data da medição -->
            <td class="p-4">{{ formatDatePTBR(lanc.dataMedicao) }}</td>
            <!-- Projeto(s) -->
            <td class="p-4">
              {{ lanc.projetos || '—' }}
            </td>
            <!-- Unidade: vou exibir a unidade do primeiro item -->
            <td class="p-4">
              {{ lanc.lancamentoItens[0]?.unidadeMedida || 'N/A' }}
            </td>
            <!-- Medição -->
            <td class="p-4">
              {{ lanc.lancamentoItens.reduce((total, subitem) => total + parseFloat(subitem.quantidadeItens), 0).toFixed(3) }}
            </td>
          </tr>

          <!-- Mensagem se não houver lancamentos -->
          <tr v-if="lancamentos.length === 0">
            <td colspan="4" class=" py-2">Nenhuma medição encontrada</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TABELA FATURAMENTOS -->
    <div class="border border-[#3B82F6] rounded-xl p-12">
      <h2 class="text-2xl font-semibold mb-4">Faturamentos</h2>
      <table class="w-full">
        <thead class="bg-[#F5F7FB]">
          <tr class="text-left">
            <th class="p-4 text-2xl">Data</th>
            <th class="p-4 text-2xl">Competência</th>
            <th class="p-4 text-2xl">Nota Fiscal</th>
            <th class="p-4 text-2xl">Total</th>
            <th class="p-4 text-2xl">Situação</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="fat in faturamentos"
            :key="fat.id"
            class=" border-b"
          >
            <!-- Data do faturamento -->
            <td class="p-4">{{ formatDatePTBR(fat.dataFaturamento) }} </td>
            <!-- Competência -->
            <td class="p-4">{{ formataMesAno(fat.competencia) }}</td>
            <!-- Nota Fiscal (ou N/A) -->
            <td class="p-4">{{ fat.notaFiscal || 'N/A' }}</td>
            <!-- Total calculado -->
            <td class="p-4">
              {{ formatCurrencySemArrendondar(calcularSaldoFaturamentoItens(fat.faturamentoItens))}}
            </td>
            <!-- Status (situação) -->
            <td class="p-4">{{ fat.status || '—' }}</td>
          </tr>

          <!-- Mensagem se não houver faturamentos -->
          <tr v-if="faturamentos.length === 0">
            <td colspan="5" class=" py-2">Nenhum faturamento encontrado</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { format, formatISO, startOfDay, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';

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

const formatDatePTBR = (isoString) => {
  const [datePart] = isoString.split("T");

  const [ano, mes, dia] = datePart.split("-");

  return `${dia}/${mes}/${ano}`;
};

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

const calcularSaldoFaturamentoItens = (faturamento) => {
  let saldoTotal = 0;

  faturamento.forEach((faturamentoObjeto) => {
    let lancamentoTemDias = faturamentoObjeto.lancamento.dias
    faturamentoObjeto.lancamento.lancamentoItens.forEach(lancamentoItem => {
      if(lancamentoTemDias) {
        saldoTotal += (parseFloat(lancamentoItem.valorUnitario) / 30) * parseFloat(lancamentoTemDias);
      } else {
        saldoTotal += parseFloat(lancamentoItem.valorUnitario) * parseFloat(lancamentoItem.quantidadeItens)
      }
    })
  })
  return saldoTotal;
};

const calcularItensRestante = (idItem, quantidadeContratada) => {
  let quantidadeUtilizada = 0;
  let quantidadeRestante = 0;
  console.log('props', contrato)
  contrato.lancamentos.forEach((lancamento) => {
    if (
      lancamento.status === "Autorizada" ||
      lancamento.status === "Não Autorizada" ||
      lancamento.status === "Cancelada" ||
      lancamento.status === "Não Iniciada" ||
      lancamento.status === "Em Andamento"
    ) {
      return;
    }
    lancamento.lancamentoItens.forEach((lancamentoItem) => {
      if (idItem === lancamentoItem.contratoItemId) {
        quantidadeUtilizada += parseFloat(lancamentoItem.quantidadeItens);
      }
    });
  });
  quantidadeRestante = parseFloat((quantidadeContratada - quantidadeUtilizada).toFixed(3));
  return quantidadeRestante;
};

const formatCurrencySemArrendondar = (value) => {
  // Divide o valor em inteiros e decimais
  const [parteInteira, parteDecimal] = value.toString().split('.');

  // Formata a parte inteira com separador de milhar
  const inteiroFormatado = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Trunca as casas decimais para 2 dígitos, sem arredondar
  const decimalFormatado = (parteDecimal || '00').substring(0, 2).padEnd(2, '0');
  // Garante duas casas decimais, preenchendo com zeros quando necessário
  // const decimalFormatado = (parteDecimal || '00').padEnd(2, '0');

  // Retorna no formato de moeda brasileiro
  return `R$ ${inteiroFormatado},${decimalFormatado}`;
};

const formataMesAno = (competencia, tipo = "caixaAlta") => {
if (!competencia) return '';
  try {
    const date = parseISO(competencia);
    console.log('date', date)
      return format(date, "MMMM yyyy", { locale: ptBR }).toUpperCase();
  } catch (error) {
    console.error('Erro ao formatar competência:', error);
    return competencia;
  }
}

</script>
