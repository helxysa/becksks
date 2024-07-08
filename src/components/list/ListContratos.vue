<template>
  <div v-for="contrato in contratos" :key="contrato.id" class="flex flex-col">
    <router-link :to="{ name: 'visualizarContrato', params: { id: contrato.id } }">
      <Card style="width: 35rem; overflow: hidden" class="cursor-pointer hover:bg-slate-300">
        <template #title>
          <div class="flex justify-end ">
            <span class="bg-green-500 text-white text-lg rounded-md p-2">Aguardando pagamento</span>

            <!-- <Button>Aguardando pagamento</Button> -->
          </div>
        </template>

        <template #content>
          <img src="../../assets/imagens/imageCard.png" alt="imagem representativa do contrato" />
          <p class="flex justify-center font-semibold mt-2">{{ contrato.nomeCliente }}</p>
          <div class="flex gap-2">
            <span class="font-semibold">Vigência:</span>
            <span>{{ formatDate(contrato.vigencia) }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold">Saldo atual:</span>
            <span>{{ formatCurrency(contrato.saldoContrato) }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold">Valor aguard. faturamento:</span>
            <!-- <span>{{contrato.saldoContrato}}</span> -->
          </div>
          <div class="flex gap-2">
            <span class="font-semibold">Valor aguard. pagamento:</span>
          </div>
        </template>
      </Card>
    </router-link>

    <!-- <div class="flex justify-end mt-2">
      <router-link :to="{ name: 'editarcontrato', params: { id: contrato.id } }">
        <router-view>
          <Icon icon="bx:edit" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer" />
        </router-view>
      </router-link>
      <Icon icon="ph:trash" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer" @click="openModalDeleteContrato(contrato)" />
    </div> -->
  </div>

  <!-- <JetDialogModal :show="excluirModal" @close="closeModal" :withouHeader="true">
    <template #content>
      <div class="flex justify-center font-semibold">
        <h1>Tem certeza de excluir esse contrato?</h1>
      </div>
      <div class="mt-9 flex justify-end gap-4">
        <button @click="closeModal" class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40">
          Não
        </button>
        <button type="button" class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-item w-40" @click="deleteContrato">
          Sim
        </button>
      </div>
    </template>
  </JetDialogModal> -->
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref, onMounted, watchEffect  } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import JetDialogModal from '@/components/modals/DialogModal.vue';
import { api } from '@/services/api';
import Card from 'primevue/card';
import Button from 'primevue/button';

const router = useRouter();
const contratos = ref([]);
const contrato = ref({});
// const excluirModal = ref(false);

// const openModalDeleteContrato = (contratoExcluido) => {
//   contrato.value = contratoExcluido;
//   excluirModal.value = true;
// };

// const deleteContrato = () => {
//   api.delete(`/contracts/${contrato.value.id}`).then((response) => {
//     closeModal();
//     toast("Contrato deletado com sucesso!", {
//       theme: "colored",
//       type: "success"
//     });
//     fetchContratos();
//   }).catch((error) => {
//     closeModal();
//     toast("Não foi possível deletar o contrato!", {
//       theme: "colored",
//       type: "error"
//     });
//     console.error('Erro ao deletar contrato:', error);
//   });
// };

// const closeModal = () => {
//   excluirModal.value = false;
// };

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

const fetchContratos = async () => {
  try {
    const response = await api.get('/contratos');
    contratos.value = response.data;
    contratos.value.reverse()
    console.log(contratos.value, 'contratos')
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
  }
};

onMounted(() => {
  fetchContratos();
});

watchEffect(() => {
  fetchContratos();
});
</script>

<style scoped>
.btn-item {
  background-color: var(--bluePrimary);
}

.btn-item:hover {
  background-color: #0ea5e9;
}
</style>
