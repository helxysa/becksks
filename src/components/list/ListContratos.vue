<template>
  <div v-for="contrato in contratos" :key="contrato.id" class="flex flex-col">
    <router-link :to="{ name: 'visualizarContrato', params: { id: contrato.id } }">
      <Card style="width: 35rem; overflow: hidden" class="cursor-pointer hover:bg-slate-300">
        <template #title>
          <div class="flex justify-end ">
            <div v-if="contrato?.faturamentos?.length">
              <span class=" border-2 p-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center"
              :class="{
                'bg-green-200 border-green-400': contrato.faturamentos[contrato.faturamentos.length - 1].status === 'Faturamento Pago',
                'bg-yellow-200 border-yellow-400': contrato.faturamentos[contrato.faturamentos.length - 1].status === 'Aguardando Pagamento',
                'bg-blue-200 border-blue-400': contrato.faturamentos[contrato.faturamentos.length - 1].status === 'Aguardando Faturamento',
              }">     
              {{  contrato.faturamentos[contrato.faturamentos.length - 1].status  }}         
              </span>

            </div>
            <div v-else class="mt-12">
                <!-- <button class="hidden">Aguardando pagamento</button> -->
            </div>

          
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
            {{formatCurrency(calcularSaldoFaturamentoItens(contrato.faturamentos)) }}
            <!-- <span>{{contrato.saldoContrato}}</span> -->
          </div>
          <div class="flex gap-2">
            <span class="font-semibold">Valor aguard. pagamento:</span>
          </div>
        </template>
      </Card>
    </router-link>   
  </div>

 
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


const calcularSaldoFaturamentoItens = (faturamento) => {
  console.log(faturamento,  'fat')
  console.log(faturamento.faturamentoItens,  'itens')
  let saldoTotal = 0;

  faturamento?.faturamentoItens?.forEach(item => {
    console.log(item,  'item')
    const quantidadeItens = parseFloat(item.quantidadeItens) || 0;
    const valorUnitario = parseFloat(item.valorUnitario) || 0;
    const valorTotalItem = quantidadeItens * valorUnitario;
   
    saldoTotal += valorTotalItem;
  });

  console.log(saldoTotal, 'saldo')

  return parseFloat(saldoTotal.toFixed(2));
}

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
