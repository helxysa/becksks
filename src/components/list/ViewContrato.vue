<template>
  <div class="flex items-center mt-12 ">
    <span @click="voltarListagem" class="cursor-pointer">
      <Icon icon="ic:round-arrow-back" height="30" />
    </span>
    <h1 class="text-5xl font-medium">Visualizar Contrato</h1>
  </div>

  <section class="mt-12">
    <div class="w-full flex   flex-wrap">
      <div>
        <div class="flex items-center gap-4 ">
          <label class="font-medium w-60">Nome do cliente:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.nomeCliente }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Vigência:</label>
          <span class="pl-4 font-bold p-2 w-80">{{formatDate(contrato.vigencia)}}</span>
        </div>
        <div class="flex items-center gap-4 ">
          <label class="font-medium w-60">Saldo Contrato:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ formatCurrency(contrato.saldoContrato) }}</span>
        </div>

      </div>
      <div>
        <div class="flex items-center gap-4 ">
          <label class="font-medium w-60">Fiscal:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.fiscal }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Ponto Focal:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.pontoFocal }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Cidade:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.cidade }}</span>
        </div>

      </div>
      <div class="flex items-center gap-4 ">
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
    <div class="flex justify-between mt-12" >
      <h1 class="text-4xl font-medium ">Faturamentos</h1>
      <button class="btn-faturamento" @click="showExibirModalFaturamento">
        Novo Faturamento
      
      </button>
    </div>
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
  <JetDialogModal
  :show="modalFaturamento"
  :withouHeader="true"
  @close="closeModalFaturamento"
  maxWidth="4xl"
>
<template #title>
<!-- <h1 class="font-bold text-xl">Gerenciamento do status de vaga</h1> -->
</template>
<template #content>
  <form @submit.prevent="saveFaturamento">
      <div class="mt-8 flex gap-2 items-center ">
          <label  class="font-bold w-60">Título </label>
          <input type="text"  placeholder="Titulo do item"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
          required
         />
      </div>
      <div class="mt-8 flex gap-2 items-center ">
          <label  class="font-bold w-60">Unidade  de medida </label>
          <select
          class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300  rounded-3xl h-14"
          required
      >
          <option value="">
              Selecione a unidade  de  medida
          </option>
          <option>PF</option>
          <option>UST</option>
          <option>Funcionário</option>
      </select>

      </div>
      <div class="mt-8 flex gap-2 items-center ">
          <label  class="font-bold w-60">Valor unitário </label>
          <input type="text"  placeholder="Informe o valor  do item"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
          required
         />
      </div>
      <div class="mt-8 flex gap-2 items-center ">
          <label  class="font-bold w-60">Saldo  </label>
          <input type="text"  placeholder="Saldo  da  quantidade  contratada"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
          required
         />
      </div>
    
      <div class="mt-9 flex justify-end gap-4">
          <button @click="closeModalFaturamento"  class=" ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700  tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40">
              Fechar
          </button>
          <button
              type="submit"
              class="inline-flex ml-3 items-center justify-center px-4 py-2  border border-transparent rounded-md font-bold text-xl text-white  tracking-widest   disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
              Salvar
          </button>
      </div>
  </form>
</template>

</JetDialogModal>
 
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { api } from '@/services/api';
import JetDialogModal from '@/components/modals/DialogModal.vue';

const  router  =  useRouter();
const route = useRoute();
const contrato = ref({});
const faturamentos = ref([]);
const modalFaturamento = ref(false)

const showExibirModalFaturamento = () => {
    modalFaturamento.value = true;
};

const  closeModalFaturamento = () => {
  modalFaturamento.value =  false
}


const  saveFaturamento = () => {

}

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
    console.log(response.data, 'resposta')
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

<style scoped>
.btn-faturamento {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 160px;
  height: 40px;
}

.btn-faturamento:hover {
  background-color:  #0ea5e9;;
}

.btn-save-faturamento {
  background-color: var(--bluePrimary);
}

.btn-save-faturamento:hover {
  background-color: #0ea5e9;
}
</style>
