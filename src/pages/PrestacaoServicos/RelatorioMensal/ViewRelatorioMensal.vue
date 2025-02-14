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

      <!-- Projetos Vinculados -->
      <div>
        <label class="block text-sm font-medium text-gray-500">Projetos Vinculados</label>
        <div class="mt-1 flex flex-wrap gap-2">
          <span
            v-for="projeto in relatorio.projetos"
            :key="projeto.id"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {{ projeto.projeto }}
          </span>
        </div>
        <p v-if="!relatorio.projetos?.length" class="mt-1 text-sm text-gray-500">
          Nenhum projeto vinculado
        </p>
      </div>

      <!-- Descrição das Tarefas -->
      <div>
        <label class="block text-sm font-medium text-gray-500">Descrição das Tarefas</label>
        <p class="mt-1 text-gray-900 whitespace-pre-line">{{ relatorio.descricaoTarefas }}</p>
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
            <div class="flex gap-2">
              <!-- Botão para visualizar -->
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-blue-600 hover:text-blue-800"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="20" />
              </a>
              <!-- Botão para download -->
              <a
                :href="getAnexoUrl(anexo.filePath)"
                download
                class="text-blue-600 hover:text-blue-800"
                title="Download"
              >
                <Icon icon="mdi:download" height="20" />
              </a>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">Nenhum anexo disponível</p>
      </div>
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

// Altere a definição do baseURL para incluir o ambiente local
const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3333'  // URL local da API AdonisJS
  : process.env.NODE_ENV === 'staging'
    ? 'https://api-boss.msbtec.dev'
    : 'https://api-boss.msbtec.app'

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

// Função atualizada para gerar a URL completa do anexo
const getAnexoUrl = (filePath) => {
  if (!filePath) return ''
  // Remove barras duplicadas e garante o formato correto da URL
  const cleanPath = filePath.replace(/^\/+/, '')
  return `${baseURL}/${cleanPath}`
}

// Adicione um console.log para debug se necessário
console.log('Relatório recebido:', props.relatorio)
</script>
