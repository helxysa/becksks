<template>
  <!-- Cabeçalho -->
  <div class="flex items-center gap-4 mb-8">
    <span
      @click="voltarListagem"
      class="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
      title="Voltar"
      v-if="!hasPermission('prestacao_servico', 'Visualizar Contrato')"
    >
      <Icon icon="ic:round-arrow-back" height="24" class="text-gray-600" />
    </span>
    <h1 class="text-3xl font-bold text-gray-800">Detalhes do Contrato</h1>
  </div>

  <div v-if="contrato" class="space-y-6">
    <!-- Informações do Contrato -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-100 p-6">
        <div class="flex items-center gap-3">
          <div class="bg-blue-50 text-blue-500 rounded-full p-3">
            <Icon icon="mdi:file-document" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Informações do Contrato</h2>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Razão Social</label>
              <p class="text-gray-900">{{ contrato.razaoSocial }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Nome Fantasia</label>
              <p class="text-gray-900">{{ contrato.nomeFantasia }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">CNPJ</label>
              <p class="text-gray-900">{{ contrato.cnpj }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Endereço</label>
              <p class="text-gray-900">{{ contrato.enderecoCompleto }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-2xl font-bold text-gray-500">Cidade</label>
                <p class="text-gray-900">{{ contrato.cidade }}</p>
              </div>
              <div class="space-y-1">
                <label class="text-2xl font-bold text-gray-500">Estado</label>
                <p class="text-gray-900">{{ contrato.estado }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Telefone da Empresa</label>
              <p class="text-gray-900">{{ contrato.telefoneEmpresa }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Email da Empresa</label>
              <p class="text-gray-900">{{ contrato.emailEmpresa }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Representante Legal</label>
              <p class="text-gray-900">{{ contrato.representanteLegal }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Telefone do Representante</label>
              <p class="text-gray-900">{{ contrato.telefoneRepresentante }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Email do Representante</label>
              <p class="text-gray-900">{{ contrato.emailRepresentante }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vigência e Valores -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-100 p-6">
        <div class="flex items-center gap-3">
          <div class="bg-green-50 text-green-500 rounded-full p-3">
            <Icon icon="mdi:calendar-clock" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Vigência e Valores</h2>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Vigência</label>
              <p class="text-gray-900">{{ formatDate(contrato.dataInicio) }} - {{ formatDate(contrato.dataFim) }}</p>
            </div>
            <div v-if="contrato.valorMensal" class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Valor Mensal</label>
              <p class="text-gray-900">{{ formatCurrency(contrato.valorMensal) }}</p>
            </div>
            <div v-if="contrato.valorHora" class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Valor Hora</label>
              <p class="text-gray-900">{{ formatCurrency(contrato.valorHora) }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-1">
              <label class="text-2xl font-bold text-gray-500">Forma de Pagamento</label>
              <p class="text-gray-900">{{ contrato.formaPagamento }}</p>
            </div>

            <template v-if="contrato.formaPagamento === 'pix'">
              <div class="space-y-1">
                <label class="text-2xl font-bold text-gray-500">Chave PIX</label>
                <p class="text-gray-900">{{ contrato.chavePix }}</p>
              </div>
            </template>

            <template v-else-if="contrato.formaPagamento === 'transferencia_bancaria'">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-2xl font-bold text-gray-500">Banco</label>
                    <p class="text-gray-900">{{ contrato.banco }}</p>
                  </div>
                  <div class="space-y-1">
                    <label class="text-2xl font-bold text-gray-500">Agência</label>
                    <p class="text-gray-900">{{ contrato.agencia }}</p>
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="text-2xl font-bold text-gray-500">Número da Conta</label>
                  <p class="text-gray-900">{{ contrato.numeroConta }}</p>
                </div>
                <div class="space-y-1">
                  <label class="text-2xl font-bold text-gray-500">Tipo de Conta</label>
                  <p class="text-gray-900">{{ contrato.tipoConta }}</p>
                </div>
                <div class="space-y-1">
                  <label class="text-2xl font-bold text-gray-500">Nome do Titular</label>
                  <p class="text-gray-900">{{ contrato.nomeTitular }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Serviço Prestado -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-100 p-6">
        <div class="flex items-center gap-3">
          <div class="bg-yellow-50 text-yellow-500 rounded-full p-3">
            <Icon icon="mdi:briefcase" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Serviço Prestado</h2>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <div class="space-y-1">
          <label class="text-2xl font-bold text-gray-500">Serviço Prestado</label>
          <p class="text-gray-900">{{ formatServicoPrestado(contrato.servicoPrestado) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-bold text-gray-500">Escopo do Trabalho</label>
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line">
            {{ contrato.escopoTrabalho }}
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-bold text-gray-500">Observação</label>
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line">
            {{ contrato.observacao }}
          </div>
        </div>
      </div>
    </div>

    <!-- Projetos Vinculados -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-100 p-6">
        <div class="flex items-center gap-3">
          <div class="bg-red-50 text-red-500 rounded-full p-3">
            <Icon icon="mdi:file-tree" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Projetos Vinculados</h2>
        </div>
      </div>

      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Projeto</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Serviço Prestado</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Esforço Estimado</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Gestor do Projeto</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="proj in contrato.projetos" :key="proj.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ proj.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ proj.projeto }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ proj.servico_prestado }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ proj.esforco_estimado }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ proj.gestor_projeto }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Relatórios Mensais -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="border-b border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-purple-50 text-purple-500 rounded-full p-3">
              <Icon icon="mdi:file-document-multiple" class="text-2xl" />
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Relatórios Mensais</h2>
          </div>

          <button
            v-if="hasPermission('prestacao_servico', 'Criar Relatório Mensal')"
            @click="abrirNovoRelatorio"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Icon icon="mdi:plus" class="mr-2 h-5 w-5" />
            Novo Relatório
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Data Inserção</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Competência</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Tipo Execução</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Horas Executadas</th>
                <th class="px-6 py-3 text-left text-2xl font-medium text-gray-500 uppercase tracking-wider">Situação</th>
                <th class="px-6 py-3 text-center text-2xl font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="relatorio in relatorios" :key="relatorio.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ formatDate(relatorio.createdAt) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ formatDate(relatorio.periodoPrestacao) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ relatorio.tipoExecucao }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl text-gray-900">{{ relatorio.horasExecutadas }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusBadge :status="relatorio.status" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex justify-center space-x-2">
                    <button
                      @click="visualizarRelatorio(relatorio)"
                      class="p-1 rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Visualizar"
                    >
                      <Icon icon="ph:eye" height="20" />
                    </button>
                    <button
                      v-if="isPrestadorServico"
                      @click="editarRelatorio(relatorio)"
                      class="p-1 rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Editar"
                    >
                      <Icon icon="bx:edit" height="20" />
                    </button>
                    <button
                      v-if="hasPermission('prestacao_servico', 'Deletar')"
                      @click="confirmarExclusao(relatorio)"
                      class="p-1 rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Excluir"
                    >
                      <Icon icon="ph:trash" height="20" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-64">
    <div class="text-center">
      <Icon icon="mdi:loading" class="text-4xl text-gray-400 animate-spin" />
      <p class="mt-2 text-gray-600">Carregando contrato...</p>
    </div>
  </div>

  <!-- Modais existentes permanecem iguais -->
  <JetDialogModal
    :show="showFormModal"
    :withouHeader="false"
    @close="closeFormModal"
    maxWidth="6xl"
    :modalTitle="modalTitle"
  >
    <template #content>
      <FormRelatorioMensal
        :contrato-id="route.params.id"
        :relatorio="relatorioSelecionado"
        @saved="onRelatorioSaved"
        @close="closeFormModal"
      />
    </template>
  </JetDialogModal>

  <JetDialogModal
    :show="showViewModal"
    :withouHeader="false"
    @close="closeViewModal"
    maxWidth="6xl"
    :modalTitle="'Detalhes do Relatório'"
  >
    <template #content>
      <ViewRelatorioMensal
        :relatorio="relatorioSelecionado"
        @close="closeViewModal"
      />
    </template>
  </JetDialogModal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from "@iconify/vue";
import { api } from '@/services/api';
import { usePermissions } from '@/composables/usePermission';
import StatusBadge from '@/components/StatusBadge.vue'
import JetDialogModal from "@/components/modals/DialogModal.vue";
import FormRelatorioMensal from './RelatorioMensal/FormRelatorioMensal.vue'
import ViewRelatorioMensal from './RelatorioMensal/ViewRelatorioMensal.vue'
import { toast } from 'vue3-toastify'

const { hasPermission } = usePermissions();
const route = useRoute()
const router = useRouter()
const contrato = ref(null)
const relatorios = ref([])
const showFormModal = ref(false)
const showViewModal = ref(false)
const relatorioSelecionado = ref(null)
const modalTitle = ref('')

const isPrestadorServico = computed(() => {
  const user = JSON.parse(localStorage.getItem("profileUser") || "{}");
  return user.prestadorServicos && user.contratoPjId === Number(route.params.id);
});

onMounted(() => {
  fetchContrato()
  carregarRelatorios()
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

const carregarRelatorios = async () => {
  try {
    const { data } = await api.get('/relatorios-mensais', {
      params: { contratoPjId: route.params.id }
    })

    // Garantir que cada relatório tenha a propriedade anexos
    relatorios.value = data.map(relatorio => ({
      ...relatorio,
      anexos: relatorio.anexos || []
    }))
  } catch (error) {
    console.error('Erro ao carregar relatórios:', error)
    toast.error('Erro ao carregar relatórios')
  }
}

function closeFormModal() {
  showFormModal.value = false
  relatorioSelecionado.value = null
}

function closeViewModal() {
  showViewModal.value = false
  relatorioSelecionado.value = null
}

function abrirNovoRelatorio() {
  modalTitle.value = 'Novo Relatório'
  relatorioSelecionado.value = null
  showFormModal.value = true
}

function editarRelatorio(relatorio) {
  modalTitle.value = 'Editar Relatório'
  relatorioSelecionado.value = relatorio
  showFormModal.value = true
}

const visualizarRelatorio = async (relatorio) => {
  try {
    // Buscar os detalhes completos do relatório, incluindo anexos
    const { data } = await api.get(`/relatorios-mensais/${relatorio.id}`)
    console.log('data', data)
    relatorioSelecionado.value = {
      ...data.relatorio,
      projetos: data.relatorio.projetos || [], // Garante que projetos existe
      anexos: data.anexos || []
    }
    console.log('relatorioSelecionado', relatorioSelecionado.value)
    showViewModal.value = true
  } catch (error) {
    console.error('Erro ao carregar detalhes do relatório:', error)
    toast.error('Erro ao carregar detalhes do relatório')
  }
}

async function confirmarExclusao(relatorio) {
  if (confirm('Tem certeza que deseja excluir este relatório?')) {
    try {
      await api.delete(`/relatorios-mensais/${relatorio.id}`)
      await carregarRelatorios()
      toast.success('Relatório excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir relatório:', error)
      toast.error('Erro ao excluir relatório')
    }
  }
}

function onRelatorioSaved() {
  closeFormModal()
  carregarRelatorios()
  toast.success('Relatório salvo com sucesso!')
}

const formatServicoPrestado = (servico) => {
  const servicosMap = {
    'analista_ui_ux': 'Analista de UI/UX designer',
    'analista_qualidade': 'Analista de Qualidade',
    'desenvolvedor': 'Desenvolvedor',
    'analista': 'Analista',
    'gestor_projeto': 'Gestor de projeto',
    'devops': 'DevOps',
    'devsecops': 'DevSecOps'
  }

  return servicosMap[servico] || servico
}
</script>
