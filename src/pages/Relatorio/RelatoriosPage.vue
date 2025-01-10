<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Relatório de Contratos</h1>

    <!-- Contrato Input -->
    <div class="mb-4">
      <label for="contratoSelect" class="block text-gray-700 font-medium mb-2">Selecione um Contrato:</label>
      <select
        id="contratoSelect"
        v-model="selectedContratoId"
        @change="fetchProjetos"
        class="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Escolha um contrato</option>
        <option v-for="contrato in contratos" :key="contrato.id" :value="contrato.id">
          {{ contrato.nome }}
        </option>
      </select>
    </div>

    <!-- Projeto Input -->
    <div v-if="projetos.length > 0" class="mb-4">
      <label for="projeto" class="block text-gray-700 font-medium mb-2">Selecione um Projeto:</label>
      <select
        id="projeto"
        v-model="selectedProjeto"
        class="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Escolha um projeto</option>
        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.nome">
          {{ projeto.nome }}
        </option>
      </select>
    </div>

    <!-- Botão Filtrar -->
    <button
      @click="fetchRelatorio"
      :disabled="!selectedContratoId || !selectedProjeto"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Filtrar
    </button>

    <!-- Exibição do Relatório -->
    <div v-if="relatorio" class="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Relatório</h2>
      <p class="mb-2"><strong>Saldo Total:</strong> R$ {{ relatorio.saldoTotal.toFixed(2) }}</p>
      <p class="mb-2"><strong>Saldo Atual:</strong> R$ {{ relatorio.saldoAtual.toFixed(2) }}</p>
      <p class="mb-4"><strong>Total de Projetos:</strong> {{ relatorio.totalProjetos }}</p>

      <section>
        <h3 class="text-lg font-medium mb-2">Distribuição por Projeto:</h3>
        <ul>
          <li
            v-for="(data, projeto) in relatorio.distribuicaoPorProjeto"
            :key="projeto"
            class="mb-2"
          >
            <strong>{{ projeto }}</strong>:
            <div class="ml-4">
              <p>Total: R$ {{ data.total.toFixed(2) }}</p>
              <p>Pago: R$ {{ data.pago.toFixed(2) }}</p>
              <p>Aguardando Pagamento: R$ {{ data.aguardandoPagamento.toFixed(2) }}</p>
              <p>Aguardando Faturamento: R$ {{ data.aguardandoFaturamento.toFixed(2) }}</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <TabelasDoContrato :contrato="relatorio.contrato" v-if="relatorio" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { api } from "@/services/api";
import TabelasDoContrato from './TabelasDoContrato.vue'

// Dados do Contrato e Relatório
const contratos = ref([]);
const projetos = ref([]);
const selectedContratoId = ref('');
const selectedProjeto = ref('');
const relatorio = ref(null);

// Fetch Contratos
const fetchContratos = async () => {
  try {
    const response = await api.get('/contratos');
    contratos.value = response.data.map((contrato) => ({
      id: contrato.id,
      nome: contrato.nomeContrato,
    }));
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
  }
};

// Fetch Projetos
const fetchProjetos = async () => {
  if (!selectedContratoId.value) return;
  try {
    const response = await api.get(`/contratos/${selectedContratoId.value}/projetos`);
    projetos.value = response.data.data.map((projeto) => ({
      id: projeto.id,
      nome: projeto.projeto,
    }));
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
  }
};

// Fetch Relatório
const fetchRelatorio = async () => {
  if (!selectedContratoId.value || !selectedProjeto.value) return;
  try {
    const response = await api.post(`/contratos/relatorio/${selectedContratoId.value}`, {
      projetos: [selectedProjeto.value],
    });
    relatorio.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
  }
};

// Inicializa Contratos
fetchContratos();

watch(
  () => relatorio.value,
  (newVal) => {
    console.log('contrato.contratoItens mudou:', newVal);
  },
  { immediate: true }
);
</script>
