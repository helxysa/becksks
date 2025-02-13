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
        <select
          v-model="formData.projetos"
          multiple
          required
          class="mt-1 block w-full rounded-md border border-gray-300"
        >
          <option v-for="projeto in projetosContrato" :key="projeto.id" :value="projeto.id">
            {{ projeto.projeto }}
          </option>
        </select>
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

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Relatório Mensal Assinado</label>
        <input
          type="file"
          @change="handleFileUpload($event, 'relatoriosAssinados')"
          accept=".pdf"
          class="mt-1 block w-full"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Nota Fiscal</label>
        <input
          type="file"
          @change="handleFileUpload($event, 'notasFiscais')"
          accept=".pdf"
          class="mt-1 block w-full"
        >
      </div>
    </div>

    <div class="flex justify-end gap-4">
      <button
        type="button"
        @click="$emit('cancel')"
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
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { api } from '@/services/api'

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

const emit = defineEmits(['saved', 'cancel'])

const projetosContrato = ref([])
const formData = ref({
  periodoPrestacao: '',
  tipoExecucao: '',
  horasExecutadas: '',
  projetos: [],
  descricaoTarefas: '',
})

const files = ref({
  relatoriosAssinados: null,
  notasFiscais: null,
})

watch(() => props.relatorio, (newVal) => {
  if (newVal) {
    formData.value = {
      periodoPrestacao: newVal.periodoPrestacao,
      tipoExecucao: newVal.tipoExecucao,
      horasExecutadas: newVal.horasExecutadas,
      projetos: newVal.projetos.map(p => p.id),
      descricaoTarefas: newVal.descricaoTarefas,
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
    formDataObj.append('contratoPjId', props.contratoId)

    Object.entries(formData.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formDataObj.append(`${key}[]`, v))
      } else {
        formDataObj.append(key, value)
      }
    })

    if (files.value.relatoriosAssinados) {
      formDataObj.append('relatoriosAssinados', files.value.relatoriosAssinados)
    }
    if (files.value.notasFiscais) {
      formDataObj.append('notasFiscais', files.value.notasFiscais)
    }

    if (props.relatorio) {
      await api.put(`/relatorios-mensais/${props.relatorio.id}`, formDataObj)
    } else {
      await api.post('/relatorios-mensais', formDataObj)
    }

    emit('saved')
  } catch (error) {
    console.error('Erro ao salvar relatório:', error)
  }
}
</script>
