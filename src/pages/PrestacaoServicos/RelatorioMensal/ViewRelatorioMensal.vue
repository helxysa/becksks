<template>
  <div class="space-y-6">
    <!-- Informações Básicas -->
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-500">Período de Prestação</label>
          <p class="mt-1 text-gray-900">{{ formatDate(relatorio.periodoPrestacao) }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-500">Tipo de Execução</label>
          <p class="mt-1 text-gray-900">{{ relatorio.tipoExecucao }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-500">Horas Executadas</label>
          <p class="mt-1 text-gray-900">{{ relatorio.horasExecutadas }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-500">Status</label>
          <StatusBadge :status="relatorio.status" class="mt-1" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-500">Projetos Vinculados</label>
        <div class="mt-1 space-x-2">
          <span
            v-for="projeto in relatorio.projetos"
            :key="projeto.id"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {{ projeto.nome }}
          </span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-500">Descrição das Tarefas</label>
        <p class="mt-1 text-gray-900 whitespace-pre-line">{{ relatorio.descricaoTarefas }}</p>
      </div>
    </div>

    <!-- Anexos -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900">Anexos</h3>

      <div v-if="relatorio.anexos?.length" class="space-y-2">
        <div
          v-for="anexo in relatorio.anexos"
          :key="anexo.id"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
        >
          <div class="flex items-center space-x-3">
            <Icon
              :icon="anexo.tipoAnexo === 'relatorio_assinado' ? 'mdi:file-document' : 'mdi:file-invoice'"
              class="text-gray-500"
              height="24"
            />
            <span class="text-sm text-gray-900">{{ anexo.fileName }}</span>
          </div>
          <a
            :href="getAnexoUrl(anexo.filePath)"
            target="_blank"
            download
            class="text-blue-600 hover:text-blue-800"
          >
            <Icon icon="mdi:download" height="20" />
          </a>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">Nenhum anexo disponível</p>
    </div>

    <div class="flex justify-end">
      <button
        @click="$emit('close')"
        class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue"
import StatusBadge from '@/components/StatusBadge.vue'

const baseURL = import.meta.env.VITE_API_URL

const props = defineProps({
  relatorio: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR").format(date)
}

// Função para gerar a URL completa do anexo
const getAnexoUrl = (filePath) => {
  return `${baseURL}${filePath}`
}
</script>
