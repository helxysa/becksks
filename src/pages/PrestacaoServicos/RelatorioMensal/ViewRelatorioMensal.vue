<template>
  <div class="space-y-8">
    <!-- Informações da Empresa -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Razão Social</label>
        <p class="mt-1">
          {{ relatorio.contratoPj?.razaoSocial }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Nome Fantasia</label>
        <p class="mt-1">
          {{ relatorio.contratoPj?.nomeFantasia }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">CNPJ</label>
        <p class="mt-1">
          {{ relatorio.contratoPj?.cnpj }}
        </p>
      </div>
    </div>
    <!-- Informações Básicas -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Período de Prestação</label>
        <p class="mt-1 p-2 bg-gray-50 rounded-md border border-gray-200">
          {{ formatDate(relatorio.periodoPrestacao) }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Tipo de Execução</label>
        <p class="mt-1 p-2 bg-gray-50 rounded-md border border-gray-200">
          {{ relatorio.tipoExecucao }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Horas Executadas</label>
        <p class="mt-1 p-2 bg-gray-50 rounded-md border border-gray-200">
          {{ relatorio.horasExecutadas }}
        </p>
      </div>
    </div>

    <!-- Status -->
    <div>
      <label class="block text-xl font-bold text-gray-700">Status</label>
      <div class="mt-1">
        <StatusBadge :status="relatorio.status" />
      </div>
    </div>

    <!-- Projetos Vinculados -->
    <div>
      <label class="block text-xl font-bold text-gray-700 mb-2">Projetos Vinculados</label>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="projeto in relatorio.projetos"
          :key="projeto.id"
          class="p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <span class="text-sm text-gray-900">{{ projeto.projeto }}</span>
        </div>
        <p v-if="!relatorio.projetos?.length" class="text-sm text-gray-500">
          Nenhum projeto vinculado
        </p>
      </div>
    </div>

    <!-- Descrição das Tarefas -->
    <div>
      <label class="block text-xl font-bold text-gray-700 mb-2">Descrição das Tarefas</label>
      <div class="p-3 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line">
        {{ relatorio.descricaoTarefas }}
      </div>
    </div>

    <!-- Anexos -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Relatório Assinado -->
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-gray-700">Relatório Assinado</h3>
        <div class="space-y-2">
          <div
            v-for="anexo in getAnexosPorTipo('relatorio_assinado')"
            :key="anexo.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate block">{{ anexo.fileName }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-gray-400 hover:text-blue-500"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="18" />
              </a>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                download
                class="text-gray-400 hover:text-blue-500"
                title="Download"
              >
                <Icon icon="mdi:download" height="18" />
              </a>
            </div>
          </div>
          <p v-if="!getAnexosPorTipo('relatorio_assinado').length" class="text-sm text-gray-500">
            Nenhum relatório assinado anexado
          </p>
        </div>
      </div>

      <!-- Nota Fiscal -->
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-gray-700">Nota Fiscal</h3>
        <div class="space-y-2">
          <div
            v-for="anexo in getAnexosPorTipo('nota_fiscal')"
            :key="anexo.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-invoice" class="text-green-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate block">{{ anexo.fileName }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-gray-400 hover:text-blue-500"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="18" />
              </a>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                download
                class="text-gray-400 hover:text-blue-500"
                title="Download"
              >
                <Icon icon="mdi:download" height="18" />
              </a>
            </div>
          </div>
          <p v-if="!getAnexosPorTipo('nota_fiscal').length" class="text-sm text-gray-500">
            Nenhuma nota fiscal anexada
          </p>
        </div>
      </div>
    </div>

    <!-- Botão de Fechar -->
    <div class="flex justify-end">
      <button
        @click="$emit('close')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
</script>
