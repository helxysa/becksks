<template>
  <div class="space-y-8 text-2xl">
    <!-- Informações da Empresa -->
    <div class="bg-white rounded-lg space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Informações da Empresa</h3>
      <div class="grid grid-cols-3 gap-6">
        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Razão Social</label>
          <p class="text-2xl text-gray-900">{{ pagamento.relatorioMensal?.contratoPj?.razaoSocial }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Nome Fantasia</label>
          <p class="text-2xl text-gray-900">{{ pagamento.relatorioMensal?.contratoPj?.nomeFantasia }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">CNPJ</label>
          <p class="text-2xl text-gray-900">{{ pagamento.relatorioMensal?.contratoPj?.cnpj }}</p>
        </div>
      </div>
    </div>

    <!-- Informações do Relatório -->
    <div class="bg-white rounded-lg space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Informações do Relatório</h3>
      <div class="grid grid-cols-3 gap-6">
        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Período de Prestação</label>
          <p class="text-2xl text-gray-900">{{ formatDate(pagamento.relatorioMensal?.periodoPrestacao) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Tipo de Execução</label>
          <p class="text-2xl text-gray-900">{{ formatTipoExecucao(pagamento.relatorioMensal?.tipoExecucao) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Horas Executadas</label>
          <p class="text-2xl text-gray-900">{{ pagamento.relatorioMensal?.horasExecutadas }}</p>
        </div>
      </div>
    </div>

    <!-- Projetos Vinculados -->
    <div class="bg-white rounded-lg space-y-4">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Projetos Vinculados</h3>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="projeto in pagamento.relatorioMensal?.projetos"
          :key="projeto.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <p class="text-2xl text-gray-900">{{ projeto.projeto }}</p>
        </div>
        <p v-if="!pagamento.relatorioMensal?.projetos?.length" class="text-2xl text-gray-500">
          Nenhum projeto vinculado
        </p>
      </div>
    </div>

    <!-- Detalhes do Pagamento -->
    <div class="bg-white rounded-lg space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Detalhes do Pagamento</h3>
      <div class="grid grid-cols-3 gap-6">
        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Encaminhado em</label>
          <p class="text-2xl text-gray-900">{{ formatDate(pagamento.encaminhadoEm) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Valor do Pagamento</label>
          <p class="text-2xl text-gray-900">{{ formatCurrency(pagamento.valorPagamento) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Status do Pagamento</label>
          <div class="mt-1">
            <StatusBadge :status="pagamento.statusPagamento" />
          </div>
        </div>
      </div>
    </div>

    <!-- Anexos -->
    <div class="bg-white rounded-lg space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Anexos</h3>

      <!-- Anexos do Relatório -->
      <div class="space-y-4">
        <h4 class="text-2xl font-medium text-gray-700">Anexos do Pagamento</h4>
        <div class="space-y-2">
          <div
            v-for="anexo in pagamento.anexos"
            :key="anexo.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="24" />
              <span class="text-2xl text-gray-900 truncate">{{ anexo.fileName }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <a
                :href="anexo.filePath"
                target="_blank"
                class="text-blue-600 hover:text-blue-800"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="24" />
              </a>
              <a
                :href="anexo.filePath"
                download
                class="text-blue-600 hover:text-blue-800"
                title="Download"
              >
                <Icon icon="mdi:download" height="24" />
              </a>
            </div>
          </div>
          <p v-if="!pagamento.anexos?.length" class="text-2xl text-gray-500">
            Nenhum anexo disponível
          </p>
        </div>
      </div>
    </div>

    <!-- Botão de Fechar -->
    <div class="flex justify-end">
      <button
        @click="$emit('close')"
        class="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-2xl"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue"
import StatusBadge from '@/components/StatusBadge.vue'

const props = defineProps({
  pagamento: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date)
}

const formatCurrency = (value) => {
  if (!value && value !== 0) return ""
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

const formatTipoExecucao = (tipo) => {
  const tipos = {
    'mensal': 'Mensal',
    'demanda': 'Demanda',
  }
  return tipos[tipo] || tipo
}
</script>
