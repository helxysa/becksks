<template>
  <div class="p-4">
    <!-- Filtros -->
    <div class="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
      <section class="flex justify-around gap-5 items-center">
        <label>Período</label>
        <input
          v-model="dataInicio"
          type="date"
          class="border rounded px-4 py-1 mr-4"
          placeholder="Data de Início"
          @change="fetchContratos"
        />
        <input
          v-model="dataFim"
          type="date"
          class="border rounded px-4 py-1"
          placeholder="Data de Fim"
          @change="fetchContratos"
        />
        <span @click="resetFilters" class="p-2 rounded-full cursor-pointer transition-transform duration-75 ease-in-out active:scale-125 active:-rotate-180">
          <Icon icon="system-uicons:reset" width="2rem" class="text-slate-800" />
        </span>
      </section>

      <section class="relative w-full max-w-[45%] items-center">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon icon="mdi:magnify" width="2rem" class="text-gray-400" />
        </span>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar por Empresa, Representante ou Serviço Prestado"
          title="Buscar por Empresa, Representante ou Serviço Prestado"
          class="border rounded px-4 p-2 pl-16 mr-4 w-full"
          @input="fetchContratos"
        />
      </section>
    </div>

    <!-- Tabela de Contratos -->
    <table class="w-full border-collapse mt-16">
      <thead>
        <tr class="bg-gray-100 border-b">
          <th class="py-3 px-4 text-left text-2xl font-semibold text-gray-700">Empresa</th>
          <th class="py-3 px-4 text-left text-2xl font-semibold text-gray-700">Representante</th>
          <th class="py-3 px-4 text-left text-2xl font-semibold text-gray-700">Serviço Prestado</th>
          <th class="py-3 px-4 text-left text-2xl font-semibold text-gray-700">Vigência</th>
          <th class="py-3 px-4 text-left text-2xl font-semibold text-gray-700">Situação</th>
          <th class="py-3 px-4 text-center text-2xl font-semibold text-gray-700">Ações</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="contrato in contratos"
          :key="contrato.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="py-3 px-4 text-2xl text-gray-700">
            {{ contrato.nomeFantasia || contrato.razaoSocial }}
          </td>
          <td class="py-3 px-4 text-2xl text-gray-700">
            {{ contrato.representanteLegal }}
          </td>
          <td class="py-3 px-4 text-2xl text-gray-700">
            {{ formatarServicoPrestado(contrato.servicoPrestado) }}
          </td>
          <td class="py-3 px-4 text-2xl text-gray-700">
            {{ formatarVigencia(contrato) }}
          </td>
          <td class="py-3 px-4 text-2xl">
            <span
              class="px-4 py-1 rounded-full text-lg font-semibold"
              :class="{
                'bg-green-100 text-green-800': contrato.status === 'ativo',
                'bg-red-100 text-red-800': contrato.status === 'inativo'
              }"
            >
              {{ contrato.status.charAt(0).toUpperCase() + contrato.status.slice(1) }}
            </span>
          </td>
          <td class="py-3 px-4 text-2xl text-center text-gray-700">
            <button
              class="p-1 rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
              @click="verDetalhes(contrato.id)"
            >
            <Icon icon="ph:eye" width="2rem" class="text-slate-800" />
            </button>
            <button
              class="p-1 rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
              @click="editarContrato(contrato.id)"
            >
              <Icon icon="bx:edit" width="2rem" class="text-slate-800" />
            </button>
            <button
              v-if="contrato.status === 'ativo'"
              class="p-1 rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
              @click="alterarStatusContrato(contrato)"
              title="Encerrar Contrato"
            >
              <Icon
                icon="ph:x-circle-bold"
                width="2rem"
                class="text-red-600 hover:text-red-700"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { Icon } from "@iconify/vue";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

// States
const contratos = ref([])
const searchTerm = ref('')
const dataInicio = ref('')
const dataFim = ref('')

const router = useRouter()

// Carrega contratos ao montar o componente
onMounted(async () => {
  await fetchContratos()
})

// Função para buscar contratos com filtros
async function fetchContratos() {
  try {
    const params = new URLSearchParams()
    if (searchTerm.value) params.append('search', searchTerm.value)
    if (dataInicio.value) params.append('dataInicio', dataInicio.value)
    if (dataFim.value) params.append('dataFim', dataFim.value)

    const { data } = await api.get('/contrato/pj', { params })
    contratos.value = data
  } catch (error) {
    console.error('Erro ao buscar contratos:', error)
  }
}

// Função de formatação da vigência
function formatarVigencia(contrato) {
  if (!contrato.dataFim) {
    return `${formatDate(contrato.dataInicio)} - Indeterminado`
  }
  return `${formatDate(contrato.dataInicio)} - ${contrato.dataFim}`
}

function formatarServicoPrestado(servicoValue){
  const servicoMap = {
    analista_ui_ux: "Analista de UI/UX designer",
    analista_qualidade: "Analista de Qualidade",
    desenvolvedor: "Desenvolvedor",
    analista: "Analista",
    gestor_projeto: "Gestor de projeto",
    devops: "DevOps",
    devsecops: "DevSecOps",
  };
  return servicoMap[servicoValue] || servicoValue;
}

// Navegar para tela de detalhes
function verDetalhes(contratoId) {
  router.push({ name: 'contrato-detalhes', params: { id: contratoId } })
}

// Navegar para edição
function editarContrato(contratoId) {
  router.push({ name: 'contrato-editar', params: { id: contratoId } })
}

// Alterar status do contrato
async function alterarStatusContrato(contrato) {
  Swal.fire({
    title: "Confirmar encerramento",
    text: "Tem certeza que deseja encerrar este contrato? Esta ação não poderá ser desfeita.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Encerrar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/contrato/pj/${contrato.id}`);
        await fetchContratos();
        toast.success("Contrato encerrado com sucesso!");
      } catch (error) {
        console.error("Erro ao encerrar contrato:", error);
        toast.error(error.response?.data?.message || "Erro ao encerrar contrato");
      }
    }
  });
}

const resetFilters = () => {
  dataInicio.value = '';
  dataFim.value = '';
  searchTerm.value = '';

  fetchContratos();
}

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};
</script>
