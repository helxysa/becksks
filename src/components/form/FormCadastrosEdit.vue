<template>
  <div>
    <div class="flex items-center mt-12 gap-4">
      <span @click="voltarListagem" class="cursor-pointer">
        <Icon icon="ic:round-arrow-back" height="30" />
      </span>
      <h1 class="text-5xl font-bold">Formulário de Contrato</h1>
    </div>

    <section class="">
      <form class="mt-12 " @submit.prevent="saveContrato">
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
              class=" focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="contratoForm.dataFim"
            />
          </div>
        </div>

        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold ">Valor contratado</label>
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
            required
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
            required
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
            required
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
        <div class=" flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Lembrete vencimento:</label>
          <select
            v-model="contratoForm.lembreteVencimento"
            class="focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
          >
            <option disabled value="">Selecione a notificação do vencimento</option>
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
            @click="openModalProjeto"            
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
        <div class="mt-8 flex gap-8 justify-end">
          <span @click="voltarListagem" class="cursor-pointer">
            <button class="inline-flex items-center justify-center px-4 py-3 rounded-md w-56 text-2xl font-medium text-white bg-gray-500 hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]" 
            type="button">
            Voltar
          </button>
          </span>
          <button class="flex items-center justify-center px-8 py-3 rounded-md w-56 text-2xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]" 
            type="submit">
            {{ route.params.id ? "Editar" : "Salvar" }}
          </button>
        </div>
      </form>
    </section>
    <JetDialogModal
    :show="isModalProjetoOpen"
    :withouHeader="false"
    @close="closeModalProjeto"
    :modalTitle="modalTitleProjeto"
    maxWidth="6xl"
  >
    <template #content>
      <form @submit.prevent="handleSubmitProjeto" class="space-y-4">
        <div class="flex gap-4  items-center">
          <label for="nome" class="font-bold text-3xl text-gray-700">Projeto</label>
          <input
            type="text"
            id="nome"
            v-model="newProjeto"
            required
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[100%] border-gray-300 rounded-md h-14"
            placeholder="Nome  do projeto"
          />
        </div>
     
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="closeModalProjeto"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {{ isEditingProjeto ? 'Atualizar' : 'Adicionar' }}
          </button>
        </div>
      </form>
      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-2">Projetos</h3>
        <ul class="divide-y divide-gray-200">          
          <li v-for="item in projetos" :key="item.id" class="py-3 flex justify-between items-center">
            <span>{{ item.projeto }}</span>
            <div>
              <button
                @click="editProjeto(item)"
                class="text-blue-600 hover:text-blue-800 mr-2"
              >
                Editar
              </button>
              <button
                @click="deletarProjeto(item.id, item)"
                class="text-red-600 hover:text-red-800"
              >
                Excluir
              </button>
            </div>
          </li>
        </ul>
      </div>

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

const router = useRouter();
const route = useRoute();
// let contratoForm = ref({});
let contratoForm = ref({
  nomeContrato: '',
  nomeCliente: '',
  dataInicio: '',
  dataFim: '',
  saldoContrato: '',
  fiscal: {
    nome: '',
    telefone: '',
    email: ''
  },
  pontoFocal: '',
  cidade: '',
  objetoContrato: '',
  observacoes: '',
  lembreteVencimento:'',
});

const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

const isModalProjetoOpen = ref(false);
const isEditingProjeto = ref(false);
const modalTitleProjeto = computed(() => isEditingProjeto.value ? 'Editar Projeto' : 'Adicionar Projeto');
const idProjeto = ref("")
const  idContrato =  ref("")

const openModalProjeto = () => {
  isModalProjetoOpen.value = true;
  fetchProjetos(route.params.id);
};

const closeModalProjeto = () => {
  isModalProjetoOpen.value = false;
  resetFormProjeto();
};

const resetFormProjeto = () => {
  newProjeto.value = "" 
  isEditingProjeto.value = false;
};


const handleSubmitProjeto = () => {
  if (isEditingProjeto.value) {
    EditarProjeto()
  } else {    
    CriarProjeto()
  }
  closeModalProjeto();
};

const editProjeto = (item) => {
  
  newProjeto.value = item.projeto;
  isEditingProjeto.value = true;
  idProjeto.value = item.id;
  idContrato.value =  item.contratoId;
};

const projetos = ref([]);
const newProjeto = ref("");

const fetchProjetos = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}/projetos`);
    projetos.value = response.data.data;
  } catch (error) {
    console.error("Erro ao contratos:", error);
  }
};

const CriarProjeto = async () => {
  try {
    const response = await api.post(`contratos/${route.params.id}/projetos`, {
      projeto: newProjeto.value,     
    });
    await fetchProjetos(route.params.id);
    toast.success("Projeto criado com sucesso!");   
    newProjeto.value = "";
   
  } catch (error) {
    console.error(
      "Erro ao criar novo projeto:",
      error.response.data.message
    );
    if (
      error.response.data.message ==
      "Já existe um projeto com esse nome."
    ) {
      return toast.error(error.response.data.message);
    } else {
      toast.error("Não foi possível criar o  projeto.");
    }
  }
};

const EditarProjeto = async () => { 
  try {
    const response = await api.put(`projetos/${idProjeto.value}`, {
      projeto: newProjeto.value,
      contrato_id: idContrato.value,
    });
    await fetchProjetos(route.params.id);
    toast.success("Projeto editado com sucesso!");   
    newProjeto.value = "";
   
  } catch (error) {
    console.error(
      "Erro ao editar projeto:",
      error.response.data.message
    );
    if (
      error.response.data.message ==
      "Já existe um projeto com esse nome."
    ) {
      return toast.error(error.response.data.message);
    } else {
      toast.error("Não foi possível editar o  projeto.");
    }
  }
};

const deletarProjeto = (id, projeto) => {
  //Não implementado ainda
  Swal.fire({
    title: "Você tem certeza?",
    text: `Deseja remover o projeto "${projeto.projeto}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, remover!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/projetos/${id}`);
        await fetchProjetos(route.params.id);
        toast.success("Projeto removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover projeto:", error);
        toast.error("Erro ao remover projeto.");
      }
    }
  });
};

onMounted(async () => {
  const contratoId = route.params.id;

  fetchContrato(contratoId);
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    const contratoData = response.data;

    if (contratoData.fiscal === null) {
      contratoData.fiscal = {
        nome: '',
        telefone: '',
        email: ''
      };
    }

    Object.assign(contratoForm.value, response.data);

  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

async function saveContrato() {

  if (contratoForm.value.fiscal.telefone.length < 15) {
    toast("Telefone incompleto! Por favor, preencha o telefone corretamente.", {
        theme: "colored",
        type: "error",
      });
    return
  }

  const payload = {
    nome_cliente: contratoForm.value.nomeCliente,
    data_inicio: contratoForm.value.dataInicio,
    data_fim: contratoForm.value.dataFim,
    saldo_contrato: contratoForm.value.saldoContrato,
    fiscal: {
      nome: contratoForm.value.fiscal.nome,
      telefone: contratoForm.value.fiscal.telefone,
      email: contratoForm.value.fiscal.email,
    },
    ponto_focal: contratoForm.value.pontoFocal,
    cidade: contratoForm.value.cidade,
    objeto_contrato: contratoForm.value.objetoContrato,
    observacoes: contratoForm.value.observacoes,
    lembrete_vencimento: contratoForm.value.lembreteVencimento,
    nome_contrato: contratoForm.value.nomeContrato,

  };
  try {
    const response = await api
      .put(`/contratos/${route.params.id}`, payload)
      .then((response) => {
        toast("Contrato editado com sucesso!", {
          theme: "colored",
          type: "success",
        });
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
  let input = event.target
  contratoForm.value.fiscal.telefone = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}
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
