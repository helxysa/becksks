<template>
  <form @submit.prevent="salvarRelatorio" class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Período de Prestação</label>
        <input
          type="month"
          v-model="formData.periodoPrestacao"
          required
          class="mt-1 block w-full rounded-md border border-gray-300"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Tipo de Execução</label>
        <select
          v-model="formData.tipoExecucao"
          required
          class="mt-1 block w-full rounded-md border border-gray-300"
        >
          <option value="demanda">Demanda</option>
          <option value="mensal">Mensal</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Horas Executadas</label>
        <input
          type="number"
          v-model="formData.horasExecutadas"
          required
          class="mt-1 block w-full rounded-md border border-gray-300"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Projetos</label>
        <div class="mt-1 flex flex-col gap-2">
          <button
            type="button"
            @click="abrirModalProjetos"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Icon icon="heroicons-outline:plus" class="mr-2 h-5 w-5" />
            Selecionar Projetos
          </button>

          <!-- Lista de projetos selecionados -->
          <div v-if="formData.projetos.length > 0" class="space-y-2">
            <div
              v-for="projetoId in formData.projetos"
              :key="projetoId"
              class="flex items-center justify-between p-2 bg-gray-50 rounded-md"
            >
              <span>{{ getProjeto(projetoId)?.projeto }}</span>
              <button
                type="button"
                @click="removerProjeto(projetoId)"
                class="text-red-600 hover:text-red-800"
              >
                <Icon icon="heroicons-outline:x" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Anexos Existentes -->
      <div class="col-span-2" v-if="formData.anexos?.length">
        <label class="block text-sm font-medium text-gray-700 mb-2">Anexos Existentes</label>
        <div class="space-y-2">
          <div
            v-for="anexo in formData.anexos"
            :key="anexo.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div class="flex items-center space-x-3">
              <Icon
                :icon="anexo.tipoAnexo === 'relatorio_assinado' ? 'mdi:file-document' : 'mdi:file-invoice'"
                class="text-gray-500"
                height="24"
              />
              <div class="flex items-center gap-2">
                <input
                  v-if="anexo.editando"
                  type="text"
                  v-model="anexo.novoNome"
                  class="text-sm border rounded px-2 py-1"
                  @keyup.enter="salvarNovoNome(anexo)"
                  @keyup.esc="cancelarEdicao(anexo)"
                />
                <span v-else class="text-sm text-gray-900">{{ anexo.fileName }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <!-- Botões de ação -->
              <button
                v-if="!anexo.editando"
                type="button"
                @click="iniciarEdicao(anexo)"
                class="text-blue-600 hover:text-blue-800"
                title="Renomear"
              >
                <Icon icon="mdi:pencil" height="20" />
              </button>
              <button
                v-if="anexo.editando"
                type="button"
                @click="salvarNovoNome(anexo)"
                class="text-green-600 hover:text-green-800"
                title="Salvar"
              >
                <Icon icon="mdi:check" height="20" />
              </button>
              <button
                v-if="anexo.editando"
                type="button"
                @click="cancelarEdicao(anexo)"
                class="text-gray-600 hover:text-gray-800"
                title="Cancelar"
              >
                <Icon icon="mdi:close" height="20" />
              </button>
              <a
                :href="getAnexoUrl(anexo.filePath)"
                target="_blank"
                class="text-blue-600 hover:text-blue-800"
                title="Visualizar"
              >
                <Icon icon="mdi:eye" height="20" />
              </a>
              <button
                type="button"
                @click="excluirAnexo(anexo)"
                class="text-red-600 hover:text-red-800"
                title="Excluir"
              >
                <Icon icon="mdi:delete" height="20" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload de Novos Anexos -->
      <div class="col-span-2 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Relatório Assinado</label>
          <input
            type="file"
            @change="handleFileUpload($event, 'relatoriosAssinados')"
            class="mt-1 block w-full"
            accept=".pdf,.doc,.docx"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Nota Fiscal</label>
          <input
            type="file"
            @change="handleFileUpload($event, 'notasFiscais')"
            class="mt-1 block w-full"
            accept=".pdf,.jpg,.jpeg,.png"
          >
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Descrição das Tarefas</label>
      <textarea
        v-model="formData.descricaoTarefas"
        rows="4"
        required
        class="mt-1 block w-full rounded-md border border-gray-300"
      ></textarea>
    </div>

    <div class="flex justify-end gap-4">
      <button
        type="button"
        @click="emit('close')"
        class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
  anexos: []
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

watch(() => props.relatorio, (newVal) => {
  if (newVal) {
    const dataFormatada = newVal.periodoPrestacao ? new Date(newVal.periodoPrestacao).toISOString().slice(0, 7) : ''

    formData.value = {
      periodoPrestacao: dataFormatada,
      tipoExecucao: newVal.tipoExecucao,
      horasExecutadas: newVal.horasExecutadas,
      projetos: newVal.projetos?.map(p => p.id) || [],
      descricaoTarefas: newVal.descricaoTarefas,
      anexos: newVal.anexos || []
    }
  }
}, { immediate: true })

onMounted(async () => {
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

function handleFileUpload(event, fileType) {
  files.value[fileType] = event.target.files[0]
}

async function salvarRelatorio() {
  try {
    const formDataObj = new FormData()

    // Adiciona o dia 01 ao período de prestação
    const periodoPrestacaoCompleto = `${formData.value.periodoPrestacao}-01`
    formDataObj.append('periodoPrestacao', periodoPrestacaoCompleto)

    // Adicionar campos básicos
    Object.keys(formData.value).forEach(key => {
      if (key !== 'anexos' && key !== 'periodoPrestacao') {
        formDataObj.append(key, formData.value[key])
      }
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
</script>
