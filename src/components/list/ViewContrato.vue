<template>
  <div class="flex items-center mt-12 ">
    <span @click="voltarListagem" class="cursor-pointer">
      <Icon icon="ic:round-arrow-back" height="30" />
    </span>
    <h1 class="text-5xl font-medium">Visualizar Contrato</h1>
  </div>

  <section class="mt-12">
    <div class="w-full flex flex-col gap-10">
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Nome do cliente:</label>
        <span class="pl-4 font-bold p-2 w-80">{{ contrato.nomeCliente }}</span>
      </div>
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Vigência:</label>
        <span class="pl-4 font-bold p-2 w-80">{{formatDate(contrato.vigencia)}}</span>
      </div>
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Saldo Contrato:</label>
        <span class="pl-4 font-bold p-2 w-80">{{ formatCurrency(contrato.saldoContrato) }}</span>
      </div>
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Fiscal:</label>
        <span class="pl-4 font-bold p-2 w-80">{{ contrato.fiscal }}</span>
      </div>
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Ponto Focal:</label>
        <span class="pl-4 font-bold p-2 w-80">{{ contrato.pontoFocal }}</span>
      </div>
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Cidade:</label>
        <span class="pl-4 font-bold p-2 w-80">{{ contrato.cidade }}</span>
      </div>
      <div class="flex items-center gap-4 w-3/4">
        <label class="font-medium w-60">Objeto do Contrato:</label>
        <span class="pl-4 font-bold p-2 w-80">{{ contrato.objetoContrato }}</span>
      </div>
    </div>
  </section>

  <section>
    <h1 class="text-4xl font-medium mt-12">Itens do Contrato</h1>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-24 bg-slate-100 border-1">
        <tr>
          <th class="text-2xl">Título</th>
          <th class="text-2xl">Unidade de medida</th>
          <th class="text-2xl">Valor Unitário</th>
          <th class="text-2xl">Saldo Quantidade Contratada</th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-20 text-center" v-for="item in contrato.contratoItens" :key="item.id">
          <td class="text-2xl">{{ item.titulo }}</td>
          <td class="text-2xl">{{ item.unidadeMedida }}</td>
          <td class="text-2xl">{{ formatCurrency(item.valorUnitario) }}</td>
          <td class="text-2xl">{{ item.saldoQuantidadeContratada }}</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h1 class="text-4xl font-medium mt-12">Faturamentos</h1>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-24 bg-slate-100 border-1">
        <tr>
          <th class="text-2xl">Título</th>
          <th class="text-2xl">Valor</th>
          <th class="text-2xl">Status</th>
          <th class="text-2xl">Saldo Atual</th>
          <th class="text-2xl">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-20 text-center" v-for="faturamento in faturamentos" :key="faturamento.id">
          <td class="text-2xl">{{ faturamento.titulo }}</td>
          <td class="text-2xl">{{ formatCurrency(faturamento.valor) }}</td>
          <td class="text-2xl">{{ faturamento.status }}</td>
          <td class="text-2xl">{{ formatCurrency(faturamento.saldo) }}</td>
          <td class="text-2xl flex justify-center mt-4 gap-3">
            <span>
              <Icon icon="ph:eye" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer" />
            </span>
            <span>
              <Icon icon="bx:edit" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer" />
            </span>
            <span>
              <Icon icon="ph:trash" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer" />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { api } from '@/services/api';

const  router  =  useRouter();
const route = useRoute();
const contrato = ref({});
const faturamentos = ref([]);

const voltarListagem = () => {
    router.push({ name: 'Contratos' });
}

onMounted(() => {
  const contratoId = route.params.id;
  fetchContrato(contratoId)
})

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    contrato.value = response.data;
    faturamentos.value = response.data.faturamentos || [];
  } catch (error) {
    console.error('Erro ao buscar contrato:', error);
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date) ? '' : new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
};

</script>

<style>

</style>
