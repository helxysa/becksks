<template>
  <form @submit.prevent="salvarPagamento" class="space-y-8">
    <!-- Informações da Empresa -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Razão Social</label>
        <p class="mt-1">
          {{ relatorio?.contratoPj?.razaoSocial || 'Não disponível' }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Nome Fantasia</label>
        <p class="mt-1">
          {{ relatorio?.contratoPj?.nomeFantasia || 'Não disponível' }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">CNPJ</label>
        <p class="mt-1">
          {{ relatorio?.contratoPj?.cnpj || 'Não disponível' }}
        </p>
      </div>
    </div>

    <!-- Informações do Relatório -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Competência</label>
        <p class="mt-1">{{ formatDate(relatorio?.periodoPrestacao) || 'Não disponível' }}</p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Tipo de Execução</label>
        <p class="mt-1">{{ formatTipoExecucao(relatorio?.tipoExecucao) || 'Não disponível' }}</p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Horas Executadas</label>
        <p class="mt-1">{{ relatorio?.horasExecutadas || 'Não disponível' }}</p>
      </div>
    </div>

    <!-- Projetos -->
    <div>
      <label class="block text-xl font-bold text-gray-700 mb-2">Projetos Vinculados</label>
      <div class="bg-gray-50 rounded-lg p-4">
        <div
          v-for="projeto in relatorio?.projetos || []"
          :key="projeto.id"
          class="mb-2 p-2 border-b border-gray-200"
        >
          {{ projeto.projeto }}
        </div>
        <p v-if="!relatorio?.projetos?.length" class="text-gray-500">
          Nenhum projeto vinculado a este relatório.
        </p>
      </div>
    </div>

    <!-- Informações do Pagamento -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Encaminhado em</label>
        <input
          type="date"
          v-model="formData.encaminhadoEm"
          class="h-12 mt-2 px-3 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-2xl"
          required
        >
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Valor do Pagamento</label>
        <div class="relative mt-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-2xl">R$</span>
          <input
            type="number"
            step="0.01"
            v-model="formData.valorPagamento"
            class="h-12 pl-10 px-3 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-2xl"
            required
          >
        </div>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Status do Pagamento</label>
        <select
          v-model="formData.statusPagamento"
          class="h-12 mt-2 px-3 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-2xl"
        >
          <option value="aguardando_pagamento">Aguardando Pagamento</option>
          <option value="pago">Pago</option>
        </select>
      </div>
    </div>

    <!-- Anexos de Documentos -->
    <div>
      <label class="block text-xl font-bold text-gray-700 mb-2">Anexos do Relatório</label>

      <!-- Anexos do Relatório Mensal -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="space-y-2">
          <h4 class="text-lg font-medium text-gray-700">Relatório Mensal Assinado</h4>
          <div class="space-y-2">
            <div
              v-for="anexo in getAnexosPorTipo('relatorio_assinado')"
              :key="anexo.id"
              class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate">{{ anexo.fileName }}</span>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 ml-auto"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="18" />
              </a>
            </div>
            <p v-if="!getAnexosPorTipo('relatorio_assinado').length" class="text-sm text-gray-500">
              Nenhum relatório assinado anexado
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-lg font-medium text-gray-700">Nota Fiscal</h4>
          <div class="space-y-2">
            <div
              v-for="anexo in getAnexosPorTipo('nota_fiscal')"
              :key="anexo.id"
              class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <Icon icon="mdi:file-invoice" class="text-green-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate">{{ anexo.fileName }}</span>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 ml-auto"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="18" />
              </a>
            </div>
            <p v-if="!getAnexosPorTipo('nota_fiscal').length" class="text-sm text-gray-500">
              Nenhuma nota fiscal anexada
            </p>
          </div>
        </div>
      </div>

      <!-- Anexos do Pagamento -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium text-gray-700">Anexar Comprovante de Pagamento</h4>
        <div>
          <input
            type="file"
            @change="handleFileUpload"
            class="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            id="anexo-pagamento"
          >
          <label
            for="anexo-pagamento"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <Icon icon="heroicons-outline:upload" class="mr-2 h-5 w-5 text-gray-500" />
            Adicionar Anexo
          </label>
        </div>
        <!-- Mostrar anexos existentes do pagamento quando estiver editando -->
        <div v-if="pagamento?.anexos?.length" class="mb-4">
          <h4 class="text-lg font-medium text-gray-700 mb-2">Anexos do Pagamento</h4>
          <div class="space-y-2">
            <div
              v-for="anexo in anexos"
              :key="anexo.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div class="flex items-center space-x-3">
                <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="20" />
                <span class="text-sm text-gray-900 truncate">{{ anexo.fileName }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <a
                  :href="getAnexoUrl(anexo.filePath)"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800"
                  title="Visualizar"
                >
                  <Icon icon="mdi:eye" height="18" />
                </a>
                <button
                  @click="excluirAnexo(anexo)"
                  type="button"
                  class="text-red-500 hover:text-red-700"
                  title="Excluir anexo"
                >
                  <Icon icon="mdi:delete" height="18" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Lista de anexos -->
        <div v-if="formData.anexosTemp?.length" class="space-y-2">
          <div
            v-for="(anexo, index) in formData.anexosTemp"
            :key="index"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3">
              <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate">{{ anexo.name }}</span>
            </div>
            <button
              type="button"
              @click="removerAnexoTemp(index)"
              class="text-gray-400 hover:text-red-500"
              title="Remover"
            >
              <Icon icon="mdi:delete" height="18" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de Ação -->
    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="emit('close')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ pagamento ? 'Atualizar' : 'Salvar' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from '@/services/api'
import { Icon } from '@iconify/vue'
import { toast } from "vue3-toastify"

const props = defineProps({
  relatorio: {
    type: Object,
    required: true
  },
  pagamento: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['saved', 'close'])

const anexos = ref(props.pagamento?.anexos || [])
const anexosParaExcluir = ref([])

const formData = ref({
  encaminhadoEm: props.pagamento?.encaminhadoEm ? new Date(props.pagamento.encaminhadoEm).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  valorPagamento: props.pagamento?.valorPagamento || '',
  statusPagamento: props.pagamento?.statusPagamento || 'aguardando_pagamento',
  anexosTemp: []
})

// Formatação de data
const formatDate = (dateString) => {
  if (!dateString) return ""
  const [year, month] = dateString.split('T')[0].split('-')
  const date = new Date(year, month - 1)

  return new Intl.DateTimeFormat("pt-BR", {
    year: 'numeric',
    month: 'long'
  }).format(date).toUpperCase()
}

// Formatação de tipo de execução
const formatTipoExecucao = (tipo) => {
  const tipos = {
    'mensal': 'Mensal',
    'demanda': 'Demanda',
  }
  return tipos[tipo] || tipo
}

// Filtrar anexos por tipo
const getAnexosPorTipo = (tipo) => {
  return props.relatorio?.anexos?.filter(anexo => anexo.tipoAnexo === tipo) || []
}

// Obter URL do anexo para visualização
const getAnexoUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;

  const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : process.env.NODE_ENV === 'staging'
      ? 'https://api-boss.msbtec.dev'
      : 'https://api-boss.msbtec.app';

  const cleanPath = filePath.replace(/^\/+/, '');
  return `${baseURL}/${cleanPath}`;
}

// Manipulação de arquivos
const handleFileUpload = (event) => {
  const files = event.target.files
  if (!files.length) return

  Array.from(files).forEach(file => {
    formData.value.anexosTemp.push(file)
  })

  // Resetar input
  event.target.value = ''
}

const removerAnexoTemp = (index) => {
  formData.value.anexosTemp.splice(index, 1)
}

// Excluir anexo existente
const excluirAnexo = (anexo) => {
  if (confirm(`Deseja realmente excluir o anexo "${anexo.fileName}"?`)) {
    // Se estiver criando um novo pagamento, remover diretamente da lista
    if (!props.pagamento) {
      const index = anexos.value.findIndex(a => a.id === anexo.id)
      if (index !== -1) {
        anexos.value.splice(index, 1)
      }
    } else {
      // Se estiver editando, adicionar o ID à lista de anexos para excluir
      anexosParaExcluir.value.push(anexo.id)
      // Remover da lista de exibição
      anexos.value = anexos.value.filter(a => a.id !== anexo.id)
    }
  }
}

// Salvar pagamento
const salvarPagamento = async () => {
  try {
    const formDataObj = new FormData()

    if (props.pagamento) {
      formDataObj.append('id', props.pagamento.id)
    }

    if (props.relatorio?.id) {
      formDataObj.append('relatorioMensalId', props.relatorio.id)
    } else {
      toast.error('Relatório não encontrado. Impossível salvar o pagamento.')
      return
    }

    // Adicionar campos básicos
    formDataObj.append('encaminhadoEm', formData.value.encaminhadoEm)
    formDataObj.append('valorPagamento', formData.value.valorPagamento)
    formDataObj.append('statusPagamento', formData.value.statusPagamento)

    // Adicionar anexos para excluir
    if (anexosParaExcluir.value.length > 0) {
      anexosParaExcluir.value.forEach((anexoId, index) => {
        formDataObj.append(`anexosParaExcluir[${index}]`, anexoId)
      })
    }

    // Adicionar anexos
    if (formData.value.anexosTemp.length > 0) {
      for (const arquivo of formData.value.anexosTemp) {
        formDataObj.append('anexos', arquivo)
      }
    }

    let response
    if (props.pagamento) {
      // Atualizar pagamento existente
      response = await api.put(`/pagamentos/${props.pagamento.id}`, formDataObj)
      toast.success('Pagamento atualizado com sucesso!')
    } else {
      // Criar novo pagamento
      response = await api.post('/pagamentos', formDataObj)
      toast.success('Pagamento registrado com sucesso!')
    }

    // Passar os dados de resposta para o evento 'saved'
    emit('saved', response.data)
  } catch (error) {
    console.error('Erro ao salvar pagamento:', error)
    toast.error(error.response?.data?.message || 'Erro ao salvar pagamento')
  }
}
</script>
