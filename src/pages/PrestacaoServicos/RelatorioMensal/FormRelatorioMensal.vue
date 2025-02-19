<template>
  <form @submit.prevent="salvarRelatorio" class="space-y-8">
    <!-- Informações da Empresa -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Razão Social</label>
        <p class="mt-1">
          {{ contratoPJ?.razaoSocial }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Nome Fantasia</label>
        <p class="mt-1">
          {{ contratoPJ?.nomeFantasia }}
        </p>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">CNPJ</label>
        <p class="mt-1">
          {{ contratoPJ?.cnpj }}
        </p>
      </div>
    </div>

    <!-- Informações Básicas -->
    <div class="grid grid-cols-3 gap-6">
      <div>
        <label class="block text-xl font-bold text-gray-700">Período de Prestação</label>
        <input
          type="month"
          v-model="formData.periodoPrestacao"
          class="h-12 mt-2 px-3 py-2 w-3/4 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-2xl"
        >
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Tipo de Execução</label>
        <select
          v-model="formData.tipoExecucao"
          class="h-12 mt-2 px-3 py-2 w-3/4 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-2xl"
        >
          <option value="demanda">Demanda</option>
          <option value="mensal">Mensal</option>
        </select>
      </div>

      <div>
        <label class="block text-xl font-bold text-gray-700">Horas Executadas</label>
        <input
          type="number"
          v-model="formData.horasExecutadas"
          class="h-12 mt-2 px-3 py-2 w-3/4 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-2xl"
        >
      </div>
    </div>

    <!-- Projetos -->
    <div>
      <label class="block text-xl font-bold text-gray-700 mb-2">Projetos</label>
      <div class="space-y-4">
        <button
          type="button"
          @click="abrirModalProjetos"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Icon icon="heroicons-outline:plus" class="mr-2 h-5 w-5 text-gray-500" />
          Selecionar Projetos
        </button>

        <!-- Lista de projetos selecionados -->
        <div v-if="formData.projetos.length > 0" class="grid grid-cols-2 gap-3">
          <div
            v-for="projetoId in formData.projetos"
            :key="projetoId"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <span class="text-sm text-gray-900">{{ getProjeto(projetoId)?.projeto }}</span>
            <button
              type="button"
              @click="removerProjeto(projetoId)"
              class="text-gray-400 hover:text-red-500"
            >
              <Icon icon="heroicons-outline:x" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Descrição das Tarefas -->
    <div class="col-span-full">
      <label class="block text-xl font-bold text-gray-700 mb-2">Descrição das Tarefas</label>
      <textarea
        v-model="formData.descricaoTarefas"
        rows="4"
        class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-2"
      ></textarea>
    </div>

    <!-- Anexos -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Relatório Assinado -->
      <div class="space-y-4">
        <div>
          <label class="block text-xl font-bold text-gray-700 mb-2">Relatório Assinado</label>
          <div class="flex items-center">
            <input
              type="file"
              @change="handleFileUpload($event, 'relatoriosAssinados')"
              class="hidden"
              accept=".pdf,.doc,.docx"
              id="relatorio-assinado"
            >
            <label
              for="relatorio-assinado"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              <Icon icon="heroicons-outline:upload" class="mr-2 h-5 w-5 text-gray-500" />
              Adicionar Relatório
            </label>
          </div>
        </div>

        <!-- Lista de anexos existentes para Relatório Assinado -->
        <div v-if="formData.anexos?.length || formData.anexosTemp?.relatoriosAssinados" class="space-y-2">
          <!-- Anexos existentes -->
          <div
            v-for="anexo in formData.anexos?.filter(a => a.tipoAnexo === 'relatorio_assinado')"
            :key="anexo.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="20" />
              <div class="flex-1 min-w-0">
                <input
                  v-if="anexo.editando"
                  type="text"
                  v-model="anexo.novoNome"
                  class="w-full text-sm border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  @keyup.enter="salvarNovoNome(anexo)"
                  @keyup.esc="cancelarEdicao(anexo)"
                />
                <span v-else class="text-sm text-gray-900 truncate block">{{ anexo.fileName }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="!anexo.editando"
                type="button"
                @click="iniciarEdicao(anexo)"
                class="text-gray-400 hover:text-blue-500"
                title="Renomear"
              >
                <Icon icon="mdi:pencil" height="18" />
              </button>
              <button
                v-if="anexo.editando"
                type="button"
                @click="salvarNovoNome(anexo)"
                class="text-gray-400 hover:text-green-500"
                title="Salvar"
              >
                <Icon icon="mdi:check" height="18" />
              </button>
              <button
                v-if="anexo.editando"
                type="button"
                @click="cancelarEdicao(anexo)"
                class="text-gray-400 hover:text-gray-600"
                title="Cancelar"
              >
                <Icon icon="mdi:close" height="18" />
              </button>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-gray-400 hover:text-blue-500"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="18" />
              </a>
              <button
                type="button"
                @click="excluirAnexo(anexo)"
                class="text-gray-400 hover:text-red-500"
                title="Excluir"
              >
                <Icon icon="mdi:delete" height="18" />
              </button>
            </div>
          </div>

          <!-- Anexo temporário -->
          <div
            v-if="formData.anexosTemp?.relatoriosAssinados"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-document" class="text-blue-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate block">
                {{ formData.anexosTemp.relatoriosAssinados.name }}
              </span>
            </div>
            <button
              type="button"
              @click="removerAnexoTemp('relatoriosAssinados')"
              class="text-gray-400 hover:text-red-500"
              title="Remover"
            >
              <Icon icon="mdi:delete" height="18" />
            </button>
          </div>
        </div>
      </div>

      <!-- Nota Fiscal -->
      <div class="space-y-4">
        <div>
          <label class="block text-xl font-bold text-gray-700 mb-2">Nota Fiscal</label>
          <div class="flex items-center">
            <input
              type="file"
              @change="handleFileUpload($event, 'notasFiscais')"
              class="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              id="nota-fiscal"
            >
            <label
              for="nota-fiscal"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              <Icon icon="heroicons-outline:upload" class="mr-2 h-5 w-5 text-gray-500" />
              Adicionar Nota Fiscal
            </label>
          </div>
        </div>

        <!-- Lista de anexos existentes para Nota Fiscal -->
        <div v-if="formData.anexos?.length || formData.anexosTemp?.notasFiscais" class="space-y-2">
          <!-- Anexos existentes -->
          <div
            v-for="anexo in formData.anexos?.filter(a => a.tipoAnexo === 'nota_fiscal')"
            :key="anexo.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-invoice" class="text-green-500 flex-shrink-0" height="20" />
              <div class="flex-1 min-w-0">
                <input
                  v-if="anexo.editando"
                  type="text"
                  v-model="anexo.novoNome"
                  class="w-full text-sm border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  @keyup.enter="salvarNovoNome(anexo)"
                  @keyup.esc="cancelarEdicao(anexo)"
                />
                <span v-else class="text-sm text-gray-900 truncate block">{{ anexo.fileName }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="!anexo.editando"
                type="button"
                @click="iniciarEdicao(anexo)"
                class="text-gray-400 hover:text-blue-500"
                title="Renomear"
              >
                <Icon icon="mdi:pencil" height="18" />
              </button>
              <button
                v-if="anexo.editando"
                type="button"
                @click="salvarNovoNome(anexo)"
                class="text-gray-400 hover:text-green-500"
                title="Salvar"
              >
                <Icon icon="mdi:check" height="18" />
              </button>
              <button
                v-if="anexo.editando"
                type="button"
                @click="cancelarEdicao(anexo)"
                class="text-gray-400 hover:text-gray-600"
                title="Cancelar"
              >
                <Icon icon="mdi:close" height="18" />
              </button>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-gray-400 hover:text-blue-500"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="18" />
              </a>
              <button
                type="button"
                @click="excluirAnexo(anexo)"
                class="text-gray-400 hover:text-red-500"
                title="Excluir"
              >
                <Icon icon="mdi:delete" height="18" />
              </button>
            </div>
          </div>

          <!-- Anexo temporário -->
          <div
            v-if="formData.anexosTemp?.notasFiscais"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <Icon icon="mdi:file-invoice" class="text-green-500 flex-shrink-0" height="20" />
              <span class="text-sm text-gray-900 truncate block">
                {{ formData.anexosTemp.notasFiscais.name }}
              </span>
            </div>
            <button
              type="button"
              @click="removerAnexoTemp('notasFiscais')"
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
        {{ relatorio ? 'Atualizar' : 'Salvar' }}
      </button>
    </div>
  </form>

  <!-- Modal de seleção de projetos -->
  <JetDialogModal
    :show="modalProjetos"
    @close="fecharModalProjetos"
    :modalTitle="'Selecionar Projetos'"
    maxWidth="4xl"
  >
    <template #content>
      <div class="space-y-4">
        <!-- Campo de busca -->
        <div class="flex gap-2">
          <input
            type="text"
            v-model="searchProjeto"
            placeholder="Buscar projetos..."
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Tabela de projetos -->
        <div class="max-h-[400px] overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    :checked="selectAll"
                    @change="toggleSelectAll"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projeto
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Situação
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gestor
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="projeto in projetosFiltrados" :key="projeto.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :value="projeto.id"
                    v-model="projetosSelecionados"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ projeto.projeto }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusBadge :status="projeto.situacao" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ projeto.nomeGestor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer class="flex justify-end mt-12">
        <button
          @click="fecharModalProjetos"
          class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="confirmarSelecaoProjetos"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Confirmar Seleção
        </button>
      </footer>
    </template>
  </JetDialogModal>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { api } from '@/services/api'
import { Icon } from '@iconify/vue'
import JetDialogModal from '@/components/modals/DialogModal.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { toast } from "vue3-toastify";

const props = defineProps({
  contratoId: {
    type: String,
    required: true
  },
  relatorio: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['saved', 'cancel', 'close'])

const projetosContrato = ref([])
const formData = ref({
  periodoPrestacao: '',
  tipoExecucao: '',
  horasExecutadas: '',
  projetos: [],
  descricaoTarefas: '',
  anexos: [],
  anexosTemp: {}
})

const files = ref({
  relatoriosAssinados: null,
  notasFiscais: null,
})

const modalProjetos = ref(false)
const searchProjeto = ref('')
const selectAll = ref(false)
const projetosSelecionados = ref([])

const anexosParaExcluir = ref([])

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3333'
  : process.env.NODE_ENV === 'staging'
    ? 'https://api-boss.msbtec.dev'
    : 'https://api-boss.msbtec.app'

const projetosFiltrados = computed(() => {
  return projetosContrato.value.filter(projeto =>
    projeto.projeto.toLowerCase().includes(searchProjeto.value.toLowerCase()) ||
    projeto.situacao.toLowerCase().includes(searchProjeto.value.toLowerCase()) ||
    (projeto.nomeGestor?.toLowerCase() || '').includes(searchProjeto.value.toLowerCase())
  )
})

const contratoPJ = ref(null)

watch(() => props.relatorio, (newVal) => {
  if (newVal) {
    const dataFormatada = newVal.periodoPrestacao ? new Date(newVal.periodoPrestacao).toISOString().slice(0, 7) : ''

    formData.value = {
      periodoPrestacao: dataFormatada,
      tipoExecucao: newVal.tipoExecucao,
      horasExecutadas: newVal.horasExecutadas,
      projetos: newVal.projetos?.map(p => p.id) || [],
      descricaoTarefas: newVal.descricaoTarefas,
      anexos: newVal.anexos || [],
      anexosTemp: {}
    }
  }
}, { immediate: true })

onMounted(async () => {
  try {
    const { data } = await api.get(`/contrato/pj/${props.contratoId}`)
    contratoPJ.value = data
  } catch (error) {
    console.error('Erro ao carregar dados do contrato:', error)
  }

  await carregarProjetosContrato()
})

async function carregarProjetosContrato() {
  try {
    const { data } = await api.get(`/contrato/pj/${props.contratoId}`)
    if (data && data.projetos) {
      projetosContrato.value = data.projetos
    }
  } catch (error) {
    console.error('Erro ao carregar projetos do contrato:', error)
  }
}

async function handleFileUpload(event, tipo) {
  const files = event.target.files
  if (!files.length) return

  try {
    const formDataObj = new FormData()

    // Adiciona o arquivo ao FormData com o nome correto do campo
    Array.from(files).forEach(file => {
      formDataObj.append(tipo, file)
    })

    // Se estiver editando um relatório existente
    if (props.relatorio) {
      const response = await api.put(`/relatorios-mensais/${props.relatorio.id}`, formDataObj)

      // Atualiza a lista de anexos com os novos anexos retornados
      formData.value.anexos = response.data.anexos
    } else {
      // Se for um novo relatório, armazena temporariamente
      if (!formData.value.anexosTemp) {
        formData.value.anexosTemp = {}
      }
      formData.value.anexosTemp[tipo] = files[0]
    }

    // Limpa o input de arquivo
    event.target.value = ''

    toast.success('Arquivo anexado com sucesso!')
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    toast.error('Erro ao anexar arquivo')
  }
}

async function salvarRelatorio() {
  try {
    const formDataObj = new FormData()

    // Adiciona o dia 01 ao período de prestação
    const periodoPrestacaoCompleto = `${formData.value.periodoPrestacao}-01`
    formDataObj.append('periodoPrestacao', periodoPrestacaoCompleto)

    // Adicionar campos básicos exceto anexos
    Object.keys(formData.value).forEach(key => {
      if (key !== 'anexos' && key !== 'periodoPrestacao' && key !== 'projetos') {
        formDataObj.append(key, formData.value[key])
      }
    })

    // Adicionar projetos como array (sem JSON.stringify)
    formData.value.projetos.forEach(projetoId => {
      formDataObj.append('projetos[]', projetoId)
    })

    // Adicionar anexos para exclusão
    if (anexosParaExcluir.value.length > 0) {
      formDataObj.append('anexosParaExcluir', JSON.stringify(anexosParaExcluir.value))
    }

    // Adicionar novos arquivos
    if (files.value.relatoriosAssinados) {
      formDataObj.append('relatoriosAssinados', files.value.relatoriosAssinados)
    }
    if (files.value.notasFiscais) {
      formDataObj.append('notasFiscais', files.value.notasFiscais)
    }

    if (props.relatorio) {
      await api.put(`/relatorios-mensais/${props.relatorio.id}`, formDataObj)
    } else {
      formDataObj.append('contratoPjId', props.contratoId)
      await api.post('/relatorios-mensais', formDataObj)
    }

    emit('saved')
  } catch (error) {
    console.error('Erro ao salvar relatório:', error)
  }
}

function abrirModalProjetos() {
  modalProjetos.value = true
  projetosSelecionados.value = [...formData.value.projetos]
}

function fecharModalProjetos() {
  modalProjetos.value = false
  searchProjeto.value = ''
}

function toggleSelectAll() {
  selectAll.value = !selectAll.value
  if (selectAll.value) {
    projetosSelecionados.value = projetosFiltrados.value.map(p => p.id)
  } else {
    projetosSelecionados.value = []
  }
}

function confirmarSelecaoProjetos() {
  formData.value.projetos = [...projetosSelecionados.value]
  fecharModalProjetos()
}

function removerProjeto(projetoId) {
  formData.value.projetos = formData.value.projetos.filter(id => id !== projetoId)
}

function getProjeto(projetoId) {
  return projetosContrato.value.find(p => p.id === projetoId)
}

const getAnexoUrl = (filePath) => {
  if (!filePath) return ''
  const cleanPath = filePath.replace(/^\/+/, '')
  return `${baseURL}/${cleanPath}`
}

const removerAnexo = (anexoId) => {
  anexosParaExcluir.value.push(anexoId)
  formData.value.anexos = formData.value.anexos.filter(a => a.id !== anexoId)
}

// Função para iniciar edição do nome do anexo
const iniciarEdicao = (anexo) => {
  anexo.editando = true
  anexo.novoNome = anexo.fileName
}

// Função para cancelar edição
const cancelarEdicao = (anexo) => {
  anexo.editando = false
  delete anexo.novoNome
}

// Função para salvar novo nome do anexo
const salvarNovoNome = async (anexo) => {
  try {
    const { data } = await api.put(`/relatorios-mensais/anexos/${anexo.id}`, {
      fileName: anexo.novoNome
    })

    // Atualizar o nome do anexo na lista
    anexo.fileName = anexo.novoNome
    anexo.editando = false
    delete anexo.novoNome

    toast.success('Nome do anexo atualizado com sucesso!')
  } catch (error) {
    console.error('Erro ao renomear anexo:', error)
    toast.error('Erro ao renomear anexo')
  }
}

// Função para excluir anexo
const excluirAnexo = async (anexo) => {
  try {
    if (!confirm('Tem certeza que deseja excluir este anexo?')) {
      return
    }

    await api.delete(`/relatorios-mensais/anexos/${anexo.id}`)

    // Remover anexo da lista
    formData.value.anexos = formData.value.anexos.filter(a => a.id !== anexo.id)

    toast.success('Anexo excluído com sucesso!')
  } catch (error) {
    console.error('Erro ao excluir anexo:', error)
    toast.error('Erro ao excluir anexo')
  }
}

function removerAnexoTemp(tipo) {
  if (formData.value.anexosTemp) {
    delete formData.value.anexosTemp[tipo]
  }
}
</script>
