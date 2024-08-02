<template>
  <div>
    <div class="flex items-center mt-12 gap-4">
      <span @click="voltarListagem" class="cursor-pointer">
        <Icon icon="ic:round-arrow-back" height="30" />
      </span>
      <h1 class="text-5xl font-medium">Formulário de Contrato</h1>
    </div>

    <section class="flex justify-center">
      <form class="mt-12 form-contrato" @submit.prevent="saveContrato">
        <div class="flex items-center justify-between">
          <label class="font-bold w-60">Nome do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o nome do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.nomeContrato"
            maxlength="120"
          />
        </div>
        <div class="flex items-center justify-between mt-8">
          <label class="font-bold w-60">Nome do cliente</label>
          <input
            type="text"
            placeholder="Informe o nome do cliente"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.nomeCliente"
            maxlength="120"
            required
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Vigência</label>
          <div class="flex gap-4 items-center w-3/4">
            <input
              required
              type="date"
              placeholder="Digite o inicio do contrato"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="contratoForm.dataInicio"
            />
            <span> até</span>
            <input
              required
              type="date"
              placeholder="Digite o fim do  contrato"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="contratoForm.dataFim"
            />
          </div>
        </div>

        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Valor contratado</label>
          <money3
            required
            type="text"
            placeholder="Informe o saldo do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.saldoContrato"
            v-bind="moneyConfig"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Fiscal do contrato</label>
          <!-- {{ contratoForm.fiscal.nome }} -->
          <input
            required
            type="text"
            placeholder="Informe o fiscal do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal.nome"
            maxlength="120"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Telefone do fiscal</label>
          <input
            required
            type="tel"
            placeholder="Informe o telefone do  fiscal"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal.telefone"
            maxlength="15"
            @keyup="handlePhone"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">E-mail do fiscal</label>
          <input
            required
            type="email"
            placeholder="Informe o email do  fiscal"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal.email"
            maxlength="120"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Ponto focal</label>
          <input
            required
            type="text"
            placeholder="Informe o ponto focal"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.pontoFocal"
            maxlength="120"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Cidade</label>
          <input
            required
            type="text"
            placeholder="Informe a cidade do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.cidade"
            maxlength="120"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Objeto do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o objeto do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.objetoContrato"
            maxlength="120"
          />
        </div>
        <div class=" flex  justify-between items-center mt-8">       
          <label class="font-bold w-60">Lembrete vencimento:</label>
          <select
            v-model="contratoForm.lembreteVencimento"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl h-14"
            required
          >
            <option disabled hidden value="">Selecione quantidade de dias para receber a  notificação </option>
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
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Observações</label>
          <textarea
           v-model="contratoForm.observacoes"          
            rows="7"
            placeholder="observações"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl text-observacoes"
                      
          />
        </div>

        <div class="mt-8 flex gap-8 justify-end">
          <span @click="voltarListagem" class="cursor-pointer">
            <button class="btn-submit-contrato" type="submit">Voltar</button>
          </span>
          <button class="btn-submit-contrato" type="submit">
            {{ route.params.id ? "Editar" : "Salvar" }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { api } from "@/services/api";
import Swal from "sweetalert2";
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

onMounted(async () => {
  const contratoId = route.params.id;

  fetchContrato(contratoId);
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    const contratoData = response.data;
    console.log(contratoData, 'contrato data')
    Object.assign(contratoForm.value, response.data);

  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

async function saveContrato() {
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
  input.value = phoneMask(input.value)
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
