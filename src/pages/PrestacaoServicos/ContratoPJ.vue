<template>
  <!-- Botão de Voltar -->
  <div class="flex items-center gap-2">
    <span @click="voltarListagem" class="cursor-pointer" title="Voltar" v-if="!hasPermission('prestacao_servico', 'Visualizar Contrato')">
      <Icon
        icon="ic:round-arrow-back"
        height="28"
        class="duration-600 transition-all ease-in-out transform hover:-translate-y-[2px]"
      />
    </span>
    <h1 class="text-3xl font-bold text-gray-800">Detalhes do Contrato</h1>
  </div>

  <div v-if="contrato" class="mt-12 flex flex-col gap-8">
    <!-- Informações do Contrato -->
    <div class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
      <div class="flex items-center gap-2 mb-4 py-4">
        <div class="bg-blue-100 text-blue-500 rounded-full p-2 mr-3">
          <Icon icon="mdi:file-document" class="text-2xl text-blue-400" />
        </div>
        <h2 class="text-3xl font-semibold text-gray-800">Informações do Contrato</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-gray-600"><strong>Razão Social:</strong> {{ contrato.razaoSocial }}</p>
          <p class="text-gray-600"><strong>Nome Fantasia:</strong> {{ contrato.nomeFantasia }}</p>
          <p class="text-gray-600"><strong>CNPJ:</strong> {{ contrato.cnpj }}</p>
          <p class="text-gray-600"><strong>Endereço:</strong> {{ contrato.enderecoCompleto }}</p>
          <p class="text-gray-600"><strong>Cidade:</strong> {{ contrato.cidade }}</p>
          <p class="text-gray-600"><strong>Estado:</strong> {{ contrato.estado }}</p>
        </div>
        <div>
          <p class="text-gray-600"><strong>Telefone da Empresa:</strong> {{ contrato.telefoneEmpresa }}</p>
          <p class="text-gray-600"><strong>Email da Empresa:</strong> {{ contrato.emailEmpresa }}</p>
          <p class="text-gray-600"><strong>Representante Legal:</strong> {{ contrato.representanteLegal }}</p>
          <p class="text-gray-600"><strong>Telefone do Representante:</strong> {{ contrato.telefoneRepresentante }}</p>
          <p class="text-gray-600"><strong>Email do Representante:</strong> {{ contrato.emailRepresentante }}</p>
        </div>
      </div>
    </div>

    <!-- Vigência e Valores -->
    <div class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
      <div class="flex items-center gap-2 mb-4 py-4">
        <div class="bg-blue-100 text-green-500 rounded-full p-2 mr-3">
          <Icon icon="mdi:calendar-clock" class="text-2xl text-green-800" />
        </div>
        <h2 class="text-3xl font-semibold text-gray-800">Vigência e Valores</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-gray-600"><strong>Vigência:</strong> {{ formatDate(contrato.dataInicio) }} - {{ formatDate(contrato.dataFim) }}</p>
          <p v-if="contrato.valorMensal" class="text-gray-600"><strong>Valor Mensal:</strong> {{ formatCurrency(contrato.valorMensal) }}</p>
          <p v-if="contrato.valorHora" class="text-gray-600"><strong>Valor Hora:</strong> {{ formatCurrency(contrato.valorHora) }}</p>
        </div>
        <div>
          <p class="text-gray-600"><strong>Forma de Pagamento:</strong> {{ contrato.formaPagamento }}</p>
          <template v-if="contrato.formaPagamento === 'pix'">
            <p class="text-gray-600"><strong>Chave PIX:</strong> {{ contrato.chavePix }}</p>
          </template>
          <template v-else-if="contrato.formaPagamento === 'transferencia_bancaria'">
            <p class="text-gray-600"><strong>Banco:</strong> {{ contrato.banco }}</p>
            <p class="text-gray-600"><strong>Agência:</strong> {{ contrato.agencia }}</p>
            <p class="text-gray-600"><strong>Número da Conta:</strong> {{ contrato.numeroConta }}</p>
            <p class="text-gray-600"><strong>Tipo de Conta:</strong> {{ contrato.tipoConta }}</p>
            <p class="text-gray-600"><strong>Nome do Titular:</strong> {{ contrato.nomeTitular }}</p>
          </template>
        </div>
      </div>
    </div>

    <!-- Serviço Prestado e Escopo -->
    <div class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
      <div class="flex items-center gap-2 mb-4 py-4">
        <div class="bg-yellow-100 text-yellow-500 rounded-full p-2 mr-3">
          <Icon icon="mdi:briefcase" class="text-2xl text-yellow-600" />
        </div>
        <h2 class="text-3xl font-semibold text-gray-800">Serviço Prestado</h2>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <p class="text-gray-600 mb-4"><strong>Serviço Prestado:</strong> {{ contrato.servicoPrestado }}</p>
        <div>
          <label class="block text-gray-600 mb-6"><strong>Escopo do Trabalho:</strong></label>
          <textarea
            class="w-full p-2 border rounded-md bg-gray-50 resize-none"
            readonly
            rows="6"
          >{{ contrato.escopoTrabalho }}</textarea>
        </div>
        <div>
          <label class="block text-gray-600 mb-6"><strong>Observação:</strong></label>
          <textarea
            class="w-full p-2 border rounded-md bg-gray-50 resize-none"
            readonly
            rows="6"
          >{{ contrato.observacao }}</textarea>
        </div>
      </div>
    </div>

    <!-- Projetos Vinculados -->
    <div class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md">
      <div class="flex items-center gap-2 mb-4 py-4">
        <div class="bg-red-100 text-red-500 rounded-full p-3 mr-3">
          <Icon icon="mdi:file-tree" class="text-2xl text-red-800" />
        </div>
        <h2 class="text-3xl font-semibold text-gray-800">Projetos Vinculados</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="h-24 bg-slate-100 border-1">
            <tr>
              <th class="px-4 py-2 text-center text-gray-800 text-2xl">ID</th>
              <th class="px-4 py-2 text-center text-gray-800 text-2xl">Projeto</th>
              <th class="px-4 py-2 text-center text-gray-800 text-2xl">Serviço Prestado</th>
              <th class="px-4 py-2 text-center text-gray-800 text-2xl">Esforço Estimado</th>
              <th class="px-4 py-2 text-center text-gray-800 text-2xl">Gestor do Projeto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(proj, index) in contrato.projetos" :key="index" class="hover:bg-gray-50">
              <td class="p-4 text-gray-600 text-center">{{ proj.id }}</td>
              <td class="p-4 text-gray-600 text-center">{{ proj.projeto }}</td>
              <td class="p-4 text-gray-600 text-center">{{ proj.servico_prestado }}</td>
              <td class="p-4 text-gray-600 text-center">{{ proj.esforco_estimado }}</td>
              <td class="p-4 text-gray-600 text-center">{{ proj.gestor_projeto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-6">
    <p class="text-gray-600">Carregando contrato...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from "@iconify/vue";
import { api } from '@/services/api';
import { usePermissions } from '@/composables/usePermission';

const { hasPermission } = usePermissions();
const route = useRoute()
const router = useRouter()
const contrato = ref(null)

onMounted(() => {
  fetchContrato()
})

async function fetchContrato() {
  try {
    const contratoId = route.params.id
    const { data } = await api.get(`/contrato/pj/${contratoId}`)
    contrato.value = data
  } catch (error) {
    console.error('Erro ao buscar detalhes do contrato:', error)
  }
}

function formatarVigencia(contrato) {
  if (!contrato.dataFim) {
    return `${formatDate(contrato.dataInicio)} - Indeterminado`
  }
  return `${formatDate(contrato.dataInicio)} - ${contrato.dataFim}`
}

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

function voltarListagem() {
  router.push({ name: 'listagem-contratos-pj' })
}
</script>
