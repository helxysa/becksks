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
          <label class="font-bold w-60">Vigência do contrato</label>
          <input
            required
            type="date"
            placeholder="Digite a duração do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.vigencia"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Saldo de contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o saldo do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.saldoContrato"
             v-money3="money"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Fiscal do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o fiscal do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal"
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

        <div class="mt-8 flex gap-8 justify-end">
          <span @click="voltarListagem" class="cursor-pointer">
            <button class="btn-submit-contrato" type="submit">Voltar</button>
          </span>
          <button class="btn-submit-contrato" type="submit">
            {{ route.params.id? 'Editar' : 'Salvar'}}
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
import Swal from 'sweetalert2';
import {format} from 'date-fns';
import money from 'v-money3'

const router = useRouter();
const route = useRoute();
let contratoForm = ref({});

onMounted(async () => {
  const contratoId = route.params.id

  fetchContrato(contratoId)
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    const contratoData = response.data;
    contratoData.vigencia = format(new Date(contratoData.vigencia), 'yyyy-MM-dd');
    Object.assign(contratoForm.value, response.data);
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

async function saveContrato() {
  const payload = {
    nome_cliente: contratoForm.value.nomeCliente,
    vigencia: contratoForm.value.vigencia,
    saldo_contrato: contratoForm.value.saldoContrato,
    fiscal: contratoForm.value.fiscal,
    ponto_focal: contratoForm.value.pontoFocal,
    cidade: contratoForm.value.cidade,
    objeto_contrato: contratoForm.value.objetoContrato,
  };
  try {
    const response = await api.put(`/contratos/${route.params.id}`, payload).then(response => {
      toast("Contrato editado com sucesso!", {
        theme: "colored",
        type: "success",
      });
      voltarListagem();

    })
  } catch (error) {
    toast.error("Ocorreu um erro ao salvar o contrato. Tente novamente.", { position: "top-right" });
  }
}

const voltarListagem = () => {
  const contratoId = route.params.id;
  router.push(`/visualizar/contratos/${contratoId}`);
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
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
