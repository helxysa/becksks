<template>
  <div class="space-y-8 text-2xl">
    <!-- Informações da Empresa -->
    <div class="bg-white rounded-lg  space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Informações da Empresa</h3>
      <div class="grid grid-cols-3 gap-6">
        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Razão Social</label>
          <p class="text-2xl text-gray-900">{{ relatorio.contratoPj?.razaoSocial }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Nome Fantasia</label>
          <p class="text-2xl text-gray-900">{{ relatorio.contratoPj?.nomeFantasia }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">CNPJ</label>
          <p class="text-2xl text-gray-900">{{ relatorio.contratoPj?.cnpj }}</p>
        </div>
      </div>
    </div>

    <!-- Informações do Relatório -->
    <div class="bg-white rounded-lg  space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Informações do Relatório</h3>
      <div class="grid grid-cols-3 gap-6">
        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Período de Prestação</label>
          <p class="text-2xl text-gray-900">{{ formatDate(relatorio.periodoPrestacao) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Tipo de Execução</label>
          <p class="text-2xl text-gray-900">{{ formatTipoExecucao(relatorio.tipoExecucao) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-medium text-gray-600">Horas Executadas</label>
          <p class="text-2xl text-gray-900">{{ relatorio.horasExecutadas }}</p>
        </div>
      </div>

      <div class="mt-6">
        <label class="text-2xl font-medium text-gray-600">Situação</label>
        <div class="mt-4">
          <StatusBadge :status="relatorio.status" class="text-2xl" />
        </div>
      </div>
    </div>

    <!-- Projetos Vinculados -->
    <div class="bg-white rounded-lg  space-y-4">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Projetos Vinculados</h3>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="projeto in relatorio.projetos"
          :key="projeto.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <p class="text-2xl text-gray-900">{{ projeto.projeto }}</p>
        </div>
        <p v-if="!relatorio.projetos?.length" class="text-2xl text-gray-500">
          Nenhum projeto vinculado
        </p>
      </div>
    </div>

    <!-- Descrição das Tarefas -->
    <div class="bg-white rounded-lg  space-y-4">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Descrição das Tarefas</h3>
      <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p class="text-2xl text-gray-900 whitespace-pre-line">{{ relatorio.descricaoTarefas }}</p>
      </div>
    </div>

    <!-- Anexos -->
    <div class="bg-white rounded-lg  space-y-6">
      <h3 class="text-3xl font-semibold text-gray-800 mb-4">Anexos</h3>
      <div class="grid grid-cols-2 gap-6">
        <!-- Relatório Assinado -->
        <div class="space-y-4">
          <h4 class="text-2xl font-medium text-gray-700">Relatório Assinado</h4>
          <div class="space-y-2">
            <div
              v-for="anexo in getAnexosPorTipo('relatorio_assinado')"
              :key="anexo.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="24" />
                <span class="text-2xl text-gray-900 truncate">{{ anexo.fileName }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <a
                  :href="getAnexoUrl(anexo.filePath)"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800"
                  title="Visualizar"
                >
                  <Icon icon="mdi:eye" height="24" />
                </a>
                <a
                  :href="getAnexoUrl(anexo.filePath)"
                  download
                  class="text-blue-600 hover:text-blue-800"
                  title="Download"
                >
                  <Icon icon="mdi:download" height="24" />
                </a>
              </div>
            </div>
            <p v-if="!getAnexosPorTipo('relatorio_assinado').length" class="text-2xl text-gray-500">
              Nenhum relatório assinado anexado
            </p>
          </div>
        </div>

        <!-- Nota Fiscal -->
        <div class="space-y-4">
          <h4 class="text-2xl font-medium text-gray-700">Nota Fiscal</h4>
          <div class="space-y-2">
            <div
              v-for="anexo in getAnexosPorTipo('nota_fiscal')"
              :key="anexo.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <Icon icon="mdi:file-invoice" class="text-green-500 flex-shrink-0" height="24" />
                <span class="text-2xl text-gray-900 truncate">{{ anexo.fileName }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <a
                  :href="getAnexoUrl(anexo.filePath)"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800"
                  title="Visualizar"
                >
                  <Icon icon="mdi:eye" height="24" />
                </a>
                <a
                  :href="getAnexoUrl(anexo.filePath)"
                  download
                  class="text-blue-600 hover:text-blue-800"
                  title="Download"
                >
                  <Icon icon="mdi:download" height="24" />
                </a>
              </div>
            </div>
            <p v-if="!getAnexosPorTipo('nota_fiscal').length" class="text-2xl text-gray-500">
              Nenhuma nota fiscal anexada
            </p>
          </div>
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
  relatorio: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const formatDate = (dateString) => {
  if (!dateString) return ""
  const [year, month] = dateString.split('T')[0].split('-')
  const date = new Date(year, month - 1)

  return new Intl.DateTimeFormat("pt-BR", {
    year: 'numeric',
    month: 'long'
  }).format(date).toUpperCase()
}

const getAnexosPorTipo = (tipo) => {
  return props.relatorio.anexos?.filter(anexo => anexo.tipoAnexo === tipo) || []
}

const getAnexoUrl = (filePath) => {
  if (!filePath) return ''
  const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : process.env.NODE_ENV === 'staging'
      ? 'https://api-boss.msbtec.dev'
      : 'https://api-boss.msbtec.app'

  const cleanPath = filePath.replace(/^\/+/, '')
  return `${baseURL}/${cleanPath}`
}

const formatTipoExecucao = (tipo) => {
  const tipos = {
    'mensal': 'Mensal',
    'demanda': 'Demanda',
  }
  return tipos[tipo] || tipo
}
</script>
