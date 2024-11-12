<template>
  <div class="min-h-screen ">
    <div v-if="!mounted" class="flex justify-center items-center min-h-[400px]">
      <div class="text-center">
        <p class="text-lg">Carregando...</p>
      </div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center min-h-[400px]">
      <div class="text-center">
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="voltarListagem"
          class="mt-4 px-4 py-2 bg-gray-200 rounded-md"
        >
          Voltar
        </button>
      </div>
    </div>

    <div v-else >
      <div class="flex items-center mt-12 gap-4">
        <span @click="voltarListagem" class="cursor-pointer">
          <Icon icon="ic:round-arrow-back" height="30" />
        </span>

        <h2 class="text-5xl font-bold">Editar Termo Aditivo</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-12 flex flex-col gap-6">
        <div class="flex flex-col items-start gap-3">
          <label class="font-semibold ">Nome do Termo</label>
          <input
            v-model="formData.nomeContrato"
            class="focus:border-blue-400 border-[1px] transition-colors ease-in-out duration-600 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md "
            required
          />
        </div>
        <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">Nome do cliente</label>
            <input
              disabled
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              type="text"
              placeholder="Informe o nome do cliente"
              v-model="formData.contrato.nomeCliente"
              maxlength="120"
            />
        </div>
        <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">Vigência</label>
            <div class="flex gap-4 items-center w-full">
              <input
                class="font-sans focus:border-blue-400  transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
                required
                type="date"
                placeholder="Digite o inicio do contrato"
                v-model="formData.dataInicio"
              />
              <span class="font-sans"> até</span>
              <input
                class="font-sans focus:border-blue-400  transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
                required
                type="date"
                placeholder="Digite o fim do  contrato"
                v-model="formData.dataFim"
              />
            </div>
        </div>
        <div class="flex flex-col items-start gap-3">
          <label class="font-semibold ">Valor Contratado</label>
          <money3
                required
                type="text"
                placeholder="Informe o valor contratado"
                class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
                v-model="formData.saldoContrato"
                v-bind="moneyConfig"
              />
        </div>
          <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">Fiscal do contrato</label>
            <input
              disabled
              type="text"
              placeholder="Informe o fiscal do contrato"
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="formData.contrato.fiscal.nome"
              maxlength="120"
            />
          </div>
          <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">Telefone do fiscal</label>
            <input
              disabled
              type="tel"
              placeholder="Informe o telefone do fiscal"
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="formData.contrato.fiscal.telefone"
              maxlength="15"
              @keyup="handlePhone"
            />
          </div>
          <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">E-mail do fiscal</label>
            <input
              disabled
              type="email"
              placeholder="Informe o email do fiscal"
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="formData.contrato.fiscal.email"
              maxlength="120"
            />
          </div>
          <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">Ponto focal</label>
            <input
              disabled
              type="text"
              placeholder="Informe o ponto focal"
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="formData.contrato.pontoFocal"
              maxlength="120"
            />
          </div>
          <div class="flex flex-col items-start gap-3 ">
            <label class="font-semibold">Objeto do contrato</label>
            <input
              required
              type="text"
              placeholder="Informe o objeto do contrato"
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              v-model="formData.objetoContrato"
              maxlength="120"
            />
          </div>
        <div class="flex justify-end gap-4 mt-6">
          <button
            type="button"
            @click="voltarListagem"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/services/api';
import { toast } from 'vue3-toastify';
import { Icon } from "@iconify/vue";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const error = ref(null);
const mounted = ref(false);

const formData = ref({
  nomeContrato: '',
  dataInicio: '',
  dataFim: '',
  saldoContrato: '',
  objetoContrato: ''
});

const loadTermoAditivo = async () => {
  if (!route.params.id) {
    error.value = 'ID não encontrado';
    loading.value = false;
    return;
  }

  try {
    const response = await api.get(`/contratos/${route.params.id}`);

    if (!response.data) {
      throw new Error('Dados não encontrados');
    }

    formData.value = response.data

  } catch (err) {
    console.error('Erro ao carregar:', err);
    error.value = 'Erro ao carregar dados do termo aditivo';
    toast.error('Erro ao carregar dados do termo aditivo');
  } finally {
    loading.value = false;
    mounted.value = true;
  }
};

onMounted(async () => {
  await loadTermoAditivo();
});

const voltarListagem = () => {
  const termoAditivoId = route.params.id;
  router.push(`/visualizar/termoAditivo/${termoAditivoId}`);
};

const handlePhone = (event) => {
  let input = event.target;
  formData.value.contrato.fiscal.telefone = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

const handleSubmit = async () => {
  try {
    let payload = {
    nome_contrato: formData.value.nomeContrato,
    data_inicio: formData.value.dataInicio,
    data_fim: formData.value.dataFim,
    saldo_contrato: formData.value.saldoContrato,
    objeto_contrato: formData.value.objetoContrato
    }
    await api.put(`/termo-aditivo/${route.params.id}`, payload);
    toast.success('Termo aditivo atualizado com sucesso!');
    voltarListagem()
  } catch (error) {
    console.error('Erro ao salvar:', error);
    toast.error('Erro ao atualizar termo aditivo');
  }
};
</script>
