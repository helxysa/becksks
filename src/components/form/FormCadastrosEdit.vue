<template>
  <div>
    <div class="flex justify-between items-center mt-12">
      <div class="flex items-center gap-4">
        <span @click="voltarListagem" class="cursor-pointer">
          <Icon icon="ic:round-arrow-back" height="30" class="duration-600 transition-all ease-in-out transform hover:-translate-y-[2px]"/>
        </span>
        <h1 class="text-5xl font-bold">Editar Contrato</h1>
      </div>
      <button
        @click="deleteContrato(route.params.id)"
        class="flex items-center justify-center px-7 py-3 rounded-md text-2xl font-normal text-white bg-red-500 hover:bg-red-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        v-if="hasPermission('contratos', 'Deletar')"
      >
        Excluir
      </button>
    </div>

    <section class="">
      <form class="mt-12" @submit.prevent="saveContrato">
        <div class="flex flex-col items-center gap-3 my-8">
          <div class="flex flex-col items-center justify-center w-[30rem] h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
            <label for="file-upload" class="flex flex-col items-center justify-center cursor-pointer">
              <span v-if="!previewFoto" class="text-lg font-semibold text-gray-500">Clique para enviar uma imagem</span>
              <span v-if="!previewFoto" class="text-sm text-gray-400">(JPG, PNG, JPEG)</span>
              <img v-if="previewFoto" :src="previewFoto" alt="Preview da Foto" class="w-[24rem] max-h-[14rem] rounded-md object-cover"/>
            </label>
            <input id="file-upload" type="file" accept="image/*" @change="handleFileChange" class="hidden"/>
          </div>

          <button v-if="previewFoto" @click="removeFoto" type="button" class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Remover Imagem
          </button>
        </div>
        <div class="flex flex-col items-start gap-3">
          <label class="font-semibold">Nome do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o nome do contrato"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.nomeContrato"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Nome do cliente</label>
          <input
            type="text"
            placeholder="Informe o nome do cliente"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.nomeCliente"
            maxlength="120"
            required
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold w-60">Vigência</label>
          <div class="flex gap-4 items-center w-full">
            <input
              required
              type="date"
              placeholder="Digite o inicio do contrato"
              class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="contratoForm.dataInicio"
            />
            <span class="font-sans"> até</span>
            <input
              required
              type="date"
              placeholder="Digite o fim do  contrato"
              class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="contratoForm.dataFim"
            />
          </div>
        </div>

        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Valor contratado</label>
          <money3
            required
            type="text"
            placeholder="Informe o saldo do contrato"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.saldoContrato"
            v-bind="moneyConfig"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Nome do Fiscal</label>
          <input
            type="text"
            placeholder="Informe o nome do fiscal do contrato"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.fiscal.nome"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Telefone do fiscal</label>
          <input
            type="tel"
            placeholder="Informe o telefone do fiscal"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.fiscal.telefone"
            maxlength="15"
            @keyup="handlePhone"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">E-mail do fiscal</label>
          <input
            type="email"
            placeholder="Informe o email do fiscal"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.fiscal.email"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Ponto focal</label>
          <input
            required
            type="text"
            placeholder="Informe o ponto focal"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.pontoFocal"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Cidade</label>
          <input
            required
            type="text"
            placeholder="Informe a cidade do contrato"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.cidade"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="block font-semibold mb-2">Estado</label>
          <select
            required
            v-model="contratoForm.estado"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          >
            <option value="" disabled selected>Selecione o estado</option>
            <option v-for="uf in ufs" :key="uf.sigla" :value="uf.sigla">
              {{ uf.nome }}
            </option>
          </select>
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Objeto do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o objeto do contrato"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.objetoContrato"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Lembrete vencimento:</label>
          <select
            v-model="contratoForm.lembreteVencimento"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
          >
            <option disabled value="">
              Selecione a notificação do vencimento
            </option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
            <option>45</option>
            <option>60</option>
            <option>90</option>
            <option>120</option>
          </select>
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Observações</label>
          <textarea
            v-model="contratoForm.observacoes"
            rows="7"
            placeholder="Observações..."
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-3 w-full border-gray-300 rounded-md"
          />
        </div>
        <div class="mt-8 flex gap-8 flex-wrap justify-end">
          <button
            class="flex items-center justify-center px-5 py-3 rounded-md text-xl font-normal text-white bg-green-600 hover:bg-green-700 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="button"
            @click="abrirModalProjetos"
          >
            <span class="mr-2">
              <Icon
                icon="ant-design:project-outlined"
                height="20"
                class="text-zinc-50"
              />
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
                <th class="text-2xl">Analista Responsável</th>
                <th class="text-2xl">Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(projeto, index) in projetos"
                :key="index"
                class="text-center"
              >
                <td class="text-xl p-4">{{ projeto.projeto }}</td>
                <td class="text-xl p-4">{{ projeto.situacao }}</td>
                <td class="text-xl p-4">{{ formatarData(projeto.dataInicio) }}</td>
                <td class="text-xl p-4">{{ formatarData(projeto.dataPrevista) }}</td>
                <td class="text-xl p-4">{{ projeto.nomeGestor }}</td>
                <td class="text-xl p-4">{{ projeto.analistaResponsavel }}</td>
                <td>
                  <button
                    type="button"
                    @click="editarProjeto(index)"
                    v-if="hasPermission('projetos', 'Editar')"
                  >
                    <Icon
                      icon="ph:pencil"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
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
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-8 flex gap-8 justify-end">
          <span @click="voltarListagem" class="cursor-pointer">
            <button
              class="inline-flex items-center justify-center px-4 py-3 rounded-md w-56 text-2xl font-medium text-white bg-gray-500 hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
              type="button"
            >
              Voltar
            </button>
          </span>
          <button
            class="flex items-center justify-center px-8 py-3 rounded-md w-56 text-2xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="submit"
          >
            {{ route.params.id ? "Editar" : "Salvar" }}
          </button>
        </div>
      </form>
    </section>
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
          </section>

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
        </form>
      </template>
    </JetDialogModal>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
import Swal from "sweetalert2";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { format } from "date-fns";
import { Money3Component } from "v-money3";
import { ufs } from "../../services/ufs.js";
import { useProfileStore } from '@/stores/ProfileStore';
import { usePermissions } from '@/composables/usePermission';

const { hasPermission } = usePermissions();
const store = useProfileStore()
const router = useRouter();
const route = useRoute();
// let contratoForm = ref({});
let contratoForm = ref({
  nomeContrato: "",
  nomeCliente: "",
  dataInicio: "",
  dataFim: "",
  saldoContrato: "",
  fiscal: {
    nome: "",
    telefone: "",
    email: "",
  },
  pontoFocal: "",
  cidade: "",
  estado: "",
  objetoContrato: "",
  observacoes: "",
  lembreteVencimento: "",
  foto: null,
});
const previewFoto = ref(null);

const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

onMounted(async () => {
  const contratoId = route.params.id;
  if (contratoId) {
    await fetchContrato(contratoId);
    await fetchProjetos(contratoId);
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    contratoForm.value.foto = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      previewFoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeFoto = () => {
  previewFoto.value = null;
};

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    const contratoData = response.data;
    console.log('contratoData', contratoData)
    if (contratoData.fiscal === null) {
      contratoData.fiscal = {
        nome: "",
        telefone: "",
        email: "",
      };
    }
    Object.assign(contratoForm.value, response.data);
    if (contratoData.foto) {
      previewFoto.value = `${import.meta.env.VITE_APP_API_URL}/${contratoData.foto}`;
    }
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

async function saveContrato() {
  // if (contratoForm.value.fiscal.telefone.length < 15) {
  //   toast("Telefone incompleto! Por favor, preencha o telefone corretamente.", {
  //     theme: "colored",
  //     type: "error",
  //   });
  //   return;
  // }

  const formData = new FormData();
  formData.append("nome_contrato", contratoForm.value.nomeContrato);
  formData.append("nome_cliente", contratoForm.value.nomeCliente);
  formData.append("data_inicio", contratoForm.value.dataInicio);
  formData.append("data_fim", contratoForm.value.dataFim);
  formData.append("saldo_contrato", contratoForm.value.saldoContrato);
  formData.append("ponto_focal", contratoForm.value.pontoFocal);
  formData.append("cidade", contratoForm.value.cidade);
  formData.append("estado", contratoForm.value.estado);
  formData.append("objeto_contrato", contratoForm.value.objetoContrato);
  formData.append("observacoes", contratoForm.value.observacoes);
  formData.append("lembrete_vencimento", contratoForm.value.lembreteVencimento);
  formData.append("fiscal[nome]", contratoForm.value.fiscal.nome || "");
  formData.append("fiscal[telefone]", contratoForm.value.fiscal.telefone || "");
  formData.append("fiscal[email]", contratoForm.value.fiscal.email || "");

  if (contratoForm.value.foto) {
    formData.append("foto", contratoForm.value.foto);
  } else {
    formData.append("foto", null);
  }

  try {
    const response = await api
    .put(`/contratos/${route.params.id}`, formData, {
      headers: { "Content-type": "multipart/form-data"}
    })
    .then((response) => {
      // toast("Contrato editado com sucesso!", {
        //   theme: "colored",
        //   type: "success",
        // });
        voltarListagem();
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar o contrato. Tente novamente.", {
      position: "top-right",
    });
  }
}

const voltarListagem = () => {
  const contratoId = route.params.id;
  router.push(`/visualizar/contratos/${contratoId}`);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const handlePhone = (event) => {
  let input = event.target;
  contratoForm.value.fiscal.telefone = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

// LÓGICA DE PROJETO
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

const fetchProjetos = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}/projetos`);
    projetos.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    toast.error("Erro ao carregar os projetos do contrato.");
  }
};

function abrirModalProjetos() {
  resetFormProjeto();
  exibirModalProjetos.value = true;
}

function fecharModalProjetos() {
  exibirModalProjetos.value = false;
  resetFormProjeto();
}

function resetFormProjeto() {
  projetoAtual.projeto = "";
  projetoAtual.situacao = "";
  projetoAtual.dataInicio = "";
  projetoAtual.dataPrevista = "";
  projetoAtual.nomeDonoRegra = "";
  projetoAtual.nomeGestor = "";
  projetoAtual.analistaResponsavel = "";
  isEdicaoProjeto.value = false;
  projetoIndexEdicao.value = -1;
}

async function salvarProjeto() {
  try {
    // Convertendo o payload para o formato esperado pelo backend
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
      await api.post(`/contratos/${route.params.id}/projetos`, payload);
      toast.success("Projeto adicionado com sucesso!");
    }
    await fetchProjetos(route.params.id);
    fecharModalProjetos();
  } catch (error) {
    console.error("Erro ao salvar projeto:", error);
    toast.error(error.response?.data?.message || "Erro ao salvar projeto.");
  }
}

function editarProjeto(index) {
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
}

function removerProjeto(index) {
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
        await fetchProjetos(route.params.id);
        toast.success("Projeto removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover projeto:", error);
        toast.error(error.response.data.message);
      }
    }
  });
}

const deleteContrato = async (id) => {
  Swal.fire({
      title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este contrato?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      api.delete(`/contratos/${id}`)
        .then((response) => {
          toast("Contrato deletado com sucesso!", {
            theme: "colored",
            type: "success",
          });
          router.push('/contratos')
        })
        .catch((error) => {
          toast("Não foi possível deletar o contrato!", {
            theme: "colored",
            type: "error",
          });
          console.error("Erro ao deletar contrato:", error);
        });
    }
  });
};

const formatarData = (data) => {
  if (!data) return '';
  return format(new Date(data), 'dd/MM/yyyy');
};

</script>

<style scoped>
.form-contrato {
  width: 70%;
}

.btn-contrato {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 100%;
  height: 40px;
}

.btn-contrato:hover {
  background-color: #0ea5e9;
}

.btn-unidade {
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 200px;
  height: 40px;
}

.btn-projeto {
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 200px;
  height: 40px;
}

.btn-item {
  background-color: var(--bluePrimary);
}

.btn-item:hover {
  background-color: #0ea5e9;
}

.btn-submit-contrato {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 160px;
  height: 40px;
}

.btn-submit-contrato:hover {
  background-color: #0ea5e9;
}
</style>
