<template>
  <div>
    <div class="mt-8 flex gap-8 flex-wrap justify-end">
      <button
        class="flex items-center justify-center px-5 py-3 rounded-md text-xl font-normal text-white bg-green-600 hover:bg-green-700 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        type="button"
        @click="abrirModalProjetos"
      >
        <span class="mr-2">
          <Icon icon="ant-design:project-outlined" height="20" class="text-zinc-50" />
        </span>
        Adicionar Projeto
      </button>
    </div>

    <div class="mt-8">
      <table class="mt-8 table-auto border border-slate-200 rounded-2xl w-full">
        <thead class="h-24 bg-slate-100 border-1">
          <tr>
            <th class="text-2xl">Projeto</th>
            <th class="text-2xl">Situação</th>
            <th class="text-2xl">Data de Início</th>
            <th class="text-2xl">Data Prevista</th>
            <th class="text-2xl">Gestor</th>
            <th class="text-2xl">Dono da Regra</th>
            <th class="text-2xl">Analista Responsável</th>
            <th class="text-2xl">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(projeto, index) in projetos" :key="index" class="text-center">
            <td class="text-xl p-4">{{ projeto.projeto }}</td>
            <td class="text-xl p-4">{{ projeto.situacao }}</td>
            <td class="text-xl p-4">{{ formatarData(projeto.dataInicio) }}</td>
            <td class="text-xl p-4">{{ formatarData(projeto.dataPrevista) }}</td>
            <td class="text-xl p-4">{{ projeto.nomeGestor }}</td>
            <td class="text-xl p-4">{{ projeto.nomeDonoRegra }}</td>
            <td class="text-xl p-4">{{ projeto.analistaResponsavel }}</td>
            <td>
              <button
                type="button"
                @click="editarProjeto(index)"
                v-if="hasPermission('projetos', 'Editar')"
              >
                <Icon
                  icon="bx:edit"
                  height="20"
                  class="hover:text-yellow-900 hover:rounded-md cursor-pointer rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
                />
              </button>
              <button
                type="button"
                @click="removerProjeto(index)"
                v-if="hasPermission('projetos', 'Deletar')"
              >
                <Icon
                  icon="ph:trash"
                  height="20"
                  class="hover:text-red-500 hover:rounded-md cursor-pointer rounded transition-transform ease-in-out transform hover:-translate-y-[2px]"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <JetDialogModal
      :show="exibirModalProjetos"
      :withouHeader="false"
      @close="fecharModalProjetos"
      :modalTitle="isEdicaoProjeto ? 'Editar Projeto' : 'Adicionar Projeto'"
      maxWidth="6xl"
    >
      <template #content>
        <form @submit.prevent="salvarProjeto">
          <section class="flex flex-col gap-6">
            <!-- Campos do formulário -->
            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Projeto:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="text"
                v-model="projetoAtual.projeto"
                required
                placeholder="Nome do projeto"
              />
            </div>

            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Situação:</label>
              <select
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                v-model="projetoAtual.situacao"
                required
              >
                <option disabled hidden value="">Selecione a situação</option>
                <option>Aguardando Autorização</option>
                <option>Em Desenvolvimento</option>
                <option>Em Sustentação</option>
                <option>Parado</option>
                <option>Finalizado</option>
              </select>
            </div>

            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Data de Início:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="date"
                v-model="projetoAtual.dataInicio"
                required
              />
            </div>

            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Data Prevista:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="date"
                v-model="projetoAtual.dataPrevista"
                required
              />
            </div>

            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Dono da Regra:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="text"
                v-model="projetoAtual.nomeDonoRegra"
                required
                placeholder="Nome do dono da regra"
              />
            </div>

            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Gestor:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="text"
                v-model="projetoAtual.nomeGestor"
                required
                placeholder="Nome do gestor"
              />
            </div>

            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Analista Responsável:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="text"
                v-model="projetoAtual.analistaResponsavel"
                required
                placeholder="Nome do analista"
              />
            </div>

            <div class="mt-9 flex justify-end gap-4">
              <button
                type="button"
                @click="fecharModalProjetos"
                class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 hover:bg-gray-100 transition h-14 w-40"
              >
                Fechar
              </button>
              <button
                type="submit"
                class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest transition h-14 bg-blue-500 hover:bg-blue-600 w-40"
              >
                Salvar
              </button>
            </div>
          </section>
        </form>
      </template>
    </JetDialogModal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
import Swal from "sweetalert2";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { format } from "date-fns";
import { usePermissions } from '@/composables/usePermission';

const props = defineProps({
  contratoId: {
    type: [String, Number],
    required: true
  }
});

const { hasPermission } = usePermissions();
const exibirModalProjetos = ref(false);
const isEdicaoProjeto = ref(false);
const projetoIndexEdicao = ref(-1);
const projetos = ref([]);

const projetoAtual = reactive({
  projeto: "",
  situacao: "",
  dataInicio: "",
  dataPrevista: "",
  nomeDonoRegra: "",
  nomeGestor: "",
  analistaResponsavel: "",
});

onMounted(async () => {
  await fetchProjetos();
});

const fetchProjetos = async () => {
  try {
    const response = await api.get(`/contratos/${props.contratoId}/projetos`);
    projetos.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    toast.error("Erro ao carregar os projetos do contrato.");
  }
};

const abrirModalProjetos = () => {
  resetFormProjeto();
  exibirModalProjetos.value = true;
};

const fecharModalProjetos = () => {
  exibirModalProjetos.value = false;
  resetFormProjeto();
};

const resetFormProjeto = () => {
  projetoAtual.projeto = "";
  projetoAtual.situacao = "";
  projetoAtual.dataInicio = "";
  projetoAtual.dataPrevista = "";
  projetoAtual.nomeDonoRegra = "";
  projetoAtual.nomeGestor = "";
  projetoAtual.analistaResponsavel = "";
  isEdicaoProjeto.value = false;
  projetoIndexEdicao.value = -1;
};

const salvarProjeto = async () => {
  try {
    const payload = {
      projeto: projetoAtual.projeto,
      situacao: projetoAtual.situacao,
      data_inicio: projetoAtual.dataInicio,
      data_prevista: projetoAtual.dataPrevista,
      nome_dono_regra: projetoAtual.nomeDonoRegra,
      nome_gestor: projetoAtual.nomeGestor,
      analista_responsavel: projetoAtual.analistaResponsavel
    };

    if (isEdicaoProjeto.value) {
      await api.put(`/projetos/${projetos.value[projetoIndexEdicao.value].id}`, payload);
      toast.success("Projeto atualizado com sucesso!");
    } else {
      await api.post(`/contratos/${props.contratoId}/projetos`, payload);
      toast.success("Projeto adicionado com sucesso!");
    }
    await fetchProjetos();
    fecharModalProjetos();
  } catch (error) {
    console.error("Erro ao salvar projeto:", error);
    toast.error(error.response?.data?.message || "Erro ao salvar projeto.");
  }
};

const editarProjeto = (index) => {
  const projeto = projetos.value[index];

  projetoAtual.projeto = projeto.projeto;
  projetoAtual.situacao = projeto.situacao;
  projetoAtual.dataInicio = projeto.dataInicio;
  projetoAtual.dataPrevista = projeto.dataPrevista;
  projetoAtual.nomeDonoRegra = projeto.nomeDonoRegra;
  projetoAtual.nomeGestor = projeto.nomeGestor;
  projetoAtual.analistaResponsavel = projeto.analistaResponsavel;

  projetoIndexEdicao.value = index;
  isEdicaoProjeto.value = true;
  exibirModalProjetos.value = true;
};

const removerProjeto = (index) => {
  const projeto = projetos.value[index];
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja remover este projeto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/projetos/${projeto.id}`);
        await fetchProjetos();
        toast.success("Projeto removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover projeto:", error);
        toast.error(error.response?.data?.message || "Erro ao remover projeto");
      }
    }
  });
};

const formatarData = (data) => {
  if (!data) return '';
  return format(new Date(data), 'dd/MM/yyyy');
};
</script>
