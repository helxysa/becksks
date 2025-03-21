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
    <h1 class="text-4xl font-bold text-gray-800">Detalhes do Contrato</h1>
  </div>

  <div v-if="contrato" class="space-y-8 mb-8">
    <!-- Informações do Contrato -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 transition-all hover:shadow-md">
      <div class="border-b border-blue-100 px-5 py-4 bg-blue-50">
        <div class="flex items-center gap-3">
          <div class="bg-blue-100 text-blue-600 rounded-full p-3">
            <Icon icon="mdi:file-document" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Informações do Contrato</h2>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Razão Social</label>
              <p class="text-2xl text-gray-900 font-medium">{{ contrato.razaoSocial }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Nome Fantasia</label>
              <p class="text-2xl text-gray-900">{{ contrato.nomeFantasia }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">CNPJ</label>
              <p class="text-2xl text-gray-900">{{ contrato.cnpj }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Endereço</label>
              <p class="text-2xl text-gray-900">{{ contrato.enderecoCompleto }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-2xl font-semibold text-gray-500">Cidade</label>
                <p class="text-2xl text-gray-900">{{ contrato.cidade }}</p>
              </div>
              <div class="space-y-2">
                <label class="text-2xl font-semibold text-gray-500">Estado</label>
                <p class="text-2xl text-gray-900">{{ contrato.estado }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Telefone da Empresa</label>
              <p class="text-2xl text-gray-900">{{ contrato.telefoneEmpresa }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Email da Empresa</label>
              <p class="text-2xl text-gray-900">{{ contrato.emailEmpresa }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Representante Legal</label>
              <p class="text-2xl text-gray-900">{{ contrato.representanteLegal }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Telefone do Representante</label>
              <p class="text-2xl text-gray-900">{{ contrato.telefoneRepresentante }}</p>
            </div>
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Email do Representante</label>
              <p class="text-2xl text-gray-900">{{ contrato.emailRepresentante }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vigência e Valores -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100 transition-all hover:shadow-md">
      <div class="border-b border-green-100 px-5 py-4 bg-green-50">
        <div class="flex items-center gap-3">
          <div class="bg-green-100 text-green-600 rounded-full p-3">
            <Icon icon="mdi:calendar-clock" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Vigência e Valores</h2>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Vigência</label>
              <p class="text-2xl text-gray-900 font-medium">{{ formatDate(contrato.dataInicio) }} - {{ formatDate(contrato.dataFim) }}</p>
            </div>
            <div v-if="contrato.valorMensal" class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Valor Mensal</label>
              <p class="text-2xl text-gray-900 font-semibold text-green-700">{{ formatCurrency(contrato.valorMensal) }}</p>
            </div>
            <div v-if="contrato.valorHora" class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Valor Hora</label>
              <p class="text-2xl text-gray-900 font-semibold text-green-700">{{ formatCurrency(contrato.valorHora) }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-2xl font-semibold text-gray-500">Forma de Pagamento</label>
              <p class="text-2xl text-gray-900 font-medium">{{ contrato.formaPagamento }}</p>
            </div>

            <template v-if="contrato.formaPagamento === 'pix'">
              <div class="space-y-2">
                <label class="text-2xl font-semibold text-gray-500">Chave PIX</label>
                <p class="text-2xl text-gray-900">{{ contrato.chavePix }}</p>
              </div>
            </template>

            <template v-else-if="contrato.formaPagamento === 'transferencia_bancaria'">
              <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="grid grid-cols-2 gap-4 mb-3">
                  <div class="space-y-2">
                    <label class="text-2xl font-semibold text-gray-500">Banco</label>
                    <p class="text-2xl text-gray-900">{{ contrato.banco }}</p>
                  </div>
                  <div class="space-y-2">
                    <label class="text-2xl font-semibold text-gray-500">Agência</label>
                    <p class="text-2xl text-gray-900">{{ contrato.agencia }}</p>
                  </div>
                </div>
                <div class="space-y-2 mb-3">
                  <label class="text-2xl font-semibold text-gray-500">Número da Conta</label>
                  <p class="text-2xl text-gray-900">{{ contrato.numeroConta }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-2xl font-semibold text-gray-500">Tipo de Conta</label>
                    <p class="text-2xl text-gray-900">{{ contrato.tipoConta }}</p>
                  </div>
                  <div class="space-y-2">
                    <label class="text-2xl font-semibold text-gray-500">Nome do Titular</label>
                    <p class="text-2xl text-gray-900">{{ contrato.nomeTitular }}</p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Serviço Prestado -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-yellow-100 transition-all hover:shadow-md">
      <div class="border-b border-yellow-100 px-5 py-4 bg-yellow-50">
        <div class="flex items-center gap-3">
          <div class="bg-yellow-100 text-yellow-600 rounded-full p-3">
            <Icon icon="mdi:briefcase" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Serviço Prestado</h2>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <div class="space-y-2">
          <label class="text-2xl font-semibold text-gray-500">Serviço Prestado</label>
          <p class="p-4 text-2xl text-gray-900 font-medium">{{ formatServicoPrestado(contrato.servicoPrestado) }}</p>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-semibold text-gray-500">Escopo do Trabalho</label>
          <div class="p-4 rounded-lg whitespace-pre-line text-2xl text-gray-700">
            {{ contrato.escopoTrabalho }}
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-2xl font-semibold text-gray-500">Observação</label>
          <div class="p-4 whitespace-pre-line text-2xl text-gray-700">
            {{ contrato.observacao || "Sem observações" }}
          </div>
        </div>
      </div>
    </div>

    <!-- Projetos Vinculados -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-red-100 transition-all hover:shadow-md">
      <div class="border-b border-red-100 px-5 py-4 bg-red-50">
        <div class="flex items-center gap-3">
          <div class="bg-red-100 text-red-600 rounded-full p-3">
            <Icon icon="mdi:file-tree" class="text-2xl" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">Projetos Vinculados</h2>
        </div>
      </div>

      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-red-50">
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Projeto</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Serviço Prestado</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Esforço Estimado</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Gestor do Projeto</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="proj in contrato.projetos" :key="proj.id" class="hover:bg-red-50 transition-colors">
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ proj.id }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900 font-medium">{{ proj.projeto }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ proj.servico_prestado }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ proj.esforco_estimado }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ proj.gestor_projeto }}</td>
              </tr>
              <tr v-if="!contrato.projetos || contrato.projetos.length === 0">
                <td colspan="5" class="px-6 py-5 text-center text-2xl text-gray-500">
                  Nenhum projeto vinculado a este contrato
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Relatórios Mensais -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-purple-100 transition-all hover:shadow-md">
      <div class="border-b border-purple-100 px-5 py-4 bg-purple-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 text-purple-600 rounded-full p-3">
              <Icon icon="mdi:file-document-multiple" class="text-2xl" />
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Relatórios Mensais</h2>
          </div>

          <div class="flex items-center gap-3">
            <button
              v-if="hasPermission('prestacao_servico', 'Realizar Pagamento')"
              @click="abrirFormPagamento(relatorioSelecionadoTabela)"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
              :disabled="!relatorioSelecionadoTabela || (relatorioSelecionadoTabela?.status !== 'disponivel_pagamento' && relatorioSelecionadoTabela?.status !== 'aguardando_pagamento')"
              :title="!relatorioSelecionadoTabela ? 'Selecione um relatório mensal para realizar o pagamento' : relatorioSelecionadoTabela?.status === 'pago' ? 'Este relatório já está pago' : relatorioSelecionadoTabela?.status === 'aguardando_pagamento' ? 'Este relatório já está aguardando pagamento, você pode editar o status' : 'Realizar pagamento para o relatório selecionado'"
            >
              <Icon icon="mdi:cash" class="mr-1.5 h-5 w-5" />
              Realizar Pagamento
            </button>

            <button
              v-if="hasPermission('prestacao_servico', 'Criar Relatório Mensal')"
              @click="abrirNovoRelatorio"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Icon icon="mdi:plus" class="mr-1.5 h-5 w-5" />
              Novo Relatório
            </button>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-purple-50">
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Data Inserção</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Competência</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Tipo Execução</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Horas Executadas</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Situação</th>
                <th class="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="relatorio in relatorios"
                :key="relatorio.id"
                class="hover:bg-purple-50 transition-colors cursor-pointer"
                :class="{ 'bg-purple-100': relatorioSelecionadoTabela && relatorioSelecionadoTabela.id === relatorio.id }"
                @click="selecionarRelatorio(relatorio)"
              >
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ formatDate(relatorio.createdAt) }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ formatDate(relatorio.periodoPrestacao) }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ relatorio.tipoExecucao }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ relatorio.horasExecutadas }}</td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <StatusBadge :status="relatorio.status" />
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div class="flex justify-center">
                    <button
                      @click.stop="visualizarRelatorio(relatorio)"
                      class="text-gray-600 hover:text-blue-600 p-1.5 rounded-full transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Visualizar"
                    >
                      <Icon icon="ph:eye" height="20" />
                    </button>
                    <button
                      v-if="isPrestadorServico"
                      @click.stop="editarRelatorio(relatorio)"
                      class="text-gray-600 hover:text-yellow-600 p-1.5 rounded-full transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Editar"
                    >
                      <Icon icon="bx:edit" height="20" />
                    </button>
                    <button
                      v-if="hasPermission('prestacao_servico', 'Deletar')"
                      @click.stop="confirmarExclusao(relatorio)"
                      class="text-gray-600 hover:text-red-600 p-1.5 rounded-full transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Excluir"
                    >
                      <Icon icon="ph:trash" height="20" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!relatorios || relatorios.length === 0">
                <td colspan="6" class="px-6 py-5 text-center text-2xl text-gray-500">
                  Nenhum relatório mensal encontrado para este contrato
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagamentos -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100 transition-all hover:shadow-md">
      <div class="border-b border-green-100 px-5 py-4 bg-green-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 text-green-600 rounded-full p-3">
              <Icon icon="mdi:cash-multiple" class="text-2xl" />
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Pagamentos</h2>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div class="overflow-x-auto">
          <table v-if="pagamentos.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-green-50">
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Data do Pagamento</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Competência</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Situação</th>
                <th class="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="pagamento in pagamentos" :key="pagamento.id" class="hover:bg-green-50 transition-colors">
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ formatDate(pagamento.encaminhadoEm) }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl text-gray-900">{{ formatDate(pagamento.relatorioMensal?.periodoPrestacao) }}</td>
                <td class="px-6 py-3 whitespace-nowrap text-2xl font-medium text-green-700">{{ formatCurrency(pagamento.valorPagamento) }}</td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <StatusBadge :status="pagamento.statusPagamento" />
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-center">
                  <div class="flex justify-center">
                    <button
                      @click="visualizarPagamento(pagamento)"
                      class="text-gray-600 hover:text-blue-600 p-1.5 rounded-full transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Visualizar"
                    >
                      <Icon icon="ph:eye" height="20" />
                    </button>
                    <button
                      v-if="hasPermission('prestacao_servico', 'Realizar Pagamento')"
                      @click="editarPagamento(pagamento)"
                      class="text-gray-600 hover:text-yellow-600 p-1.5 rounded-full transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Editar"
                    >
                      <Icon icon="bx:edit" height="20" />
                    </button>
                    <button
                      v-if="hasPermission('prestacao_servico', 'Realizar Pagamento')"
                      @click="confirmarExclusaoPagamento(pagamento)"
                      class="text-gray-600 hover:text-red-600 p-1.5 rounded-full transition-transform ease-in-out transform hover:-translate-y-[2px]"
                      title="Excluir"
                    >
                      <Icon icon="ph:trash" height="20" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="py-8 text-center">
            <div class="flex flex-col items-center justify-center">
              <Icon icon="ph:money-none" class="h-16 w-16 text-gray-400 mb-3" />
              <p class="text-gray-500 text-2xl">Nenhum pagamento registrado para este contrato.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-64">
    <div class="text-center">
      <Icon icon="mdi:loading" class="text-4xl text-blue-500 animate-spin mb-3" />
      <p class="text-lg text-gray-600">Carregando contrato...</p>
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
        @realizarPagamento="abrirFormPagamento"
      />
    </template>
  </JetDialogModal>

  <!-- Modal para formulário de pagamento -->
  <JetDialogModal
    :show="showFormPagamentoModal"
    :withouHeader="false"
    @close="closeFormPagamentoModal"
    maxWidth="6xl"
    :modalTitle="'Registrar Pagamento'"
  >
    <template #content>
      <FormPagamento
        :relatorio="relatorioSelecionado"
        :pagamento="pagamentoSelecionado"
        @saved="onPagamentoSaved"
        @close="closeFormPagamentoModal"
      />
    </template>
  </JetDialogModal>

  <!-- Modal para visualização de pagamento -->
  <JetDialogModal
    :show="showViewPagamentoModal"
    :withouHeader="false"
    @close="closeViewPagamentoModal"
    maxWidth="6xl"
    :modalTitle="'Detalhes do Pagamento'"
  >
    <template #content>
      <ViewPagamento
        :pagamento="pagamentoSelecionado"
        @close="closeViewPagamentoModal"
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
import FormPagamento from './Pagamento/FormPagamento.vue'
import ViewPagamento from './Pagamento/ViewPagamento.vue'

const { hasPermission } = usePermissions();
const route = useRoute()
const router = useRouter()
const contrato = ref(null)
const relatorios = ref([])
const showFormModal = ref(false)
const showViewModal = ref(false)
const relatorioSelecionado = ref(null)
const relatorioSelecionadoTabela = ref(null)
const modalTitle = ref('')
const pagamentos = ref([])
const showFormPagamentoModal = ref(false)
const showViewPagamentoModal = ref(false)
const pagamentoSelecionado = ref(null)

const isPrestadorServico = computed(() => {
  const user = JSON.parse(localStorage.getItem("profileUser") || "{}");
  return user.prestadorServicos && user.contratoPjId === Number(route.params.id);
});

onMounted(() => {
  fetchContrato()
  carregarRelatorios()
  carregarPagamentos()
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
  relatorioSelecionadoTabela.value = null
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

function selecionarRelatorio(relatorio) {
  if (relatorioSelecionadoTabela.value && relatorioSelecionadoTabela.value.id === relatorio.id) {
    // Se clicar no mesmo relatório novamente, deseleciona
    relatorioSelecionadoTabela.value = null
  } else {
    // Seleciona o relatório
    relatorioSelecionadoTabela.value = relatorio
  }
}

const visualizarRelatorio = async (relatorio) => {
  try {
    // Buscar os detalhes completos do relatório, incluindo anexos
    const { data } = await api.get(`/relatorios-mensais/${relatorio.id}`)

    // Verificar se o status do relatório foi carregado corretamente
    relatorioSelecionado.value = {
      ...data.relatorio,
      projetos: data.relatorio.projetos || [], // Garante que projetos existe
      anexos: data.anexos || [],
      status: data.relatorio.status || relatorio.status // Garantir que o status está presente
    }

    // Mantém o relatório selecionado na tabela
    relatorioSelecionadoTabela.value = relatorio

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
      toast.error(error.response.data.message)
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

const carregarPagamentos = async () => {
  try {
    const response = await api.get('/pagamentos')

    // Filtrar apenas os pagamentos cujo relatório pertence ao contrato atual
    const contratoId = Number(route.params.id)
    pagamentos.value = response.data.filter(
      pagamento => pagamento.relatorioMensal &&
      pagamento.relatorioMensal.contratoPjId === contratoId
    )
  } catch (error) {
    console.error('Erro ao carregar pagamentos:', error)
    toast.error('Erro ao carregar pagamentos')
  }
}

function visualizarPagamento(pagamento) {
  pagamentoSelecionado.value = pagamento
  showViewPagamentoModal.value = true
}

async function editarPagamento(pagamento) {
  try {
    // Primeiro, carregamos os detalhes completos do relatório
    const { data } = await api.get(`/relatorios-mensais/${pagamento.relatorioMensalId}`)

    // Atribuímos o relatório completo
    relatorioSelecionado.value = {
      ...data.relatorio,
      projetos: data.relatorio.projetos || [],
      anexos: data.anexos || [],
      status: data.relatorio.status || pagamento.relatorioMensal?.status
    }

    // Atribuímos o pagamento
    pagamentoSelecionado.value = pagamento

    // Abrimos o modal de edição
    showFormPagamentoModal.value = true
  } catch (error) {
    console.error('Erro ao carregar detalhes do relatório:', error)
    toast.error('Erro ao carregar detalhes para edição do pagamento')
  }
}

async function confirmarExclusaoPagamento(pagamento) {
  try {
    if (confirm('Tem certeza que deseja excluir este pagamento?')) {
      try {
        await api.delete(`/pagamentos/${pagamento.id}`)
        await carregarPagamentos()
        // Atualizar também a lista de relatórios, pois a exclusão afeta o status do relatório
        await carregarRelatorios()
        // Garantir que o modal seja fechado após a exclusão
        closeViewPagamentoModal()
        toast.success('Pagamento excluído com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir pagamento:', error)
        toast.error('Erro ao excluir pagamento')
      }
    }
  } catch (e) {
    console.error('Erro ao processar a exclusão:', e)
    toast.error('Ocorreu um erro ao processar a solicitação')
  }
}

function onPagamentoSaved(dadosPagamento) {
  closeFormPagamentoModal()
  // Sempre atualizar tanto a lista de pagamentos quanto a lista de relatórios
  // porque uma mudança no status do pagamento afeta o status do relatório
  carregarPagamentos()
  carregarRelatorios()
  toast.success('Pagamento salvo com sucesso!')
}

function closeFormPagamentoModal() {
  showFormPagamentoModal.value = false
  pagamentoSelecionado.value = null
  relatorioSelecionadoTabela.value = null
}

function closeViewPagamentoModal() {
  try {
    showViewPagamentoModal.value = false
    pagamentoSelecionado.value = null
  } catch (e) {
    console.error('Erro ao fechar modal:', e)
  }
}

function abrirFormPagamento(relatorio) {
  relatorioSelecionado.value = relatorio
  pagamentoSelecionado.value = null
  showViewModal.value = false
  showFormPagamentoModal.value = true
  // Mantém o relatório selecionado na tabela
  relatorioSelecionadoTabela.value = relatorio
}
</script>
