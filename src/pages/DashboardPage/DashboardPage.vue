<template>
  <div>
    <div class="mb-10">
      <h1 class="text-5xl font-medium">Dashboard</h1>
    </div>
    <div class="flex items-start w-full justify-between gap-6">
      <section class="w-full h-full border">
        <div class="flex h-full w-full">
          <div class="flex flex-col w-full h-[400px]">
            <span class="font-semibold">Contratos</span>
            <span>por status do pagamento</span>
            <div class="h-full" v-if="valoresTotaisStatus">
              <Doughnut :valoresTotais="valoresTotaisStatus" />
            </div>
            <!-- <div class="w-32 flex flex-col absolute top-72 left-44 items-center">
              <div class="font-semibold text-5xl">68</div>
              <p>contratos</p>
            </div> -->
          </div>
          <div class="h-full w-full">
            <section class="h-full w-full">
              <div class="flex flex-col">
                <span class="font-semibold">Top 5</span>
                <span>Contratos por valor</span>
              </div>
              <div class="h-full mt-36">
                <Bar :top5="top5"/>
              </div>
            </section>
          </div>
        </div>
      </section>
      <!-- stamps -->
      <section class="flex flex-col gap-6">
        <div
          class="w-[350px] h-[96px] flex  justify-between items-center px-4 rounded-lg
          bg-gradient-to-r from-cyan-50 to-cyan-400 "
        >
          <div>
            <p class="font-semibold">R$ 35 Milhões</p>
            <p>valor dos contratos</p>
          </div>
          <span class="cursor-pointer">
            <Icon icon="hugeicons:note-04" height="30" class="text-white" />
          </span>
        </div>
        <div
          class="w-[350px] h-[96px] flex  justify-between items-center px-4 rounded-lg
           bg-gradient-to-r from-blue-300 to-pink-200"
        >
          <div>
            <p class="font-semibold">R$ 7.5 Milhões</p>
            <p>Aguardando Faturamento</p>
          </div>
          <div>
            <p class="font-semibold">R$ 8 Milhões</p>
            <p>Aguardando Pagamento</p>
          </div>
          <span class="cursor-pointer">
            <Icon icon="ph:calculator-thin" height="30" class="text-white" />
          </span>
        </div>
        <div
          class="w-[350px] h-[96px] flex bg-orange-200 justify-between items-center px-4 rounded-lg
           bg-gradient-to-r from-orange-200 to-green-200"
        >
          <div>
            <p class="font-semibold">R$ 11 Milhões</p>
            <p>Pago</p>
          </div>
          <div>
            <p class="font-semibold">R$ 8.5 Milhões</p>
            <p>Saldo</p>
          </div>
          <span class="cursor-pointer">
            <Icon icon="rivet-icons:money" height="30" class="text-white" />
          </span>
        </div>
      </section>
    </div>
    <div class="flex flex-row w-full mt-20">
      <Map v-if="mapLoaded" :markers="map" />
      <div class="w-1/2" v-if="contratosPorVencimento">
        <BarVertical :contratosPorVencimento="contratosPorVencimento"/>
      </div>
    </div>
    <div>
      <table
        class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
      >
        <thead class="h-20 bg-slate-100 border-1">
          <tr>
            <th class="text-xl px-2">Id</th>
            <th class="text-xl">Nome</th>
            <th class="text-xl">Cliente</th>
            <th class="text-xl">Valor</th>
            <th class="text-xl">Data inicial</th>
            <th class="text-xl">Data final</th>
            <th class="text-xl">Status</th>
          </tr>
        </thead>
        <tbody v-if="contratoItemData">
          <tr class="h-24 text-center"  v-for="(contrato, index) in contratoItemData" :key="contrato.id">
            <td class="text-2xl px-2">{{index + 1}}</td>
            <td class="text-2xl">{{contrato.nomeContrato}}</td>
            <td class="text-2xl">{{contrato.nomeCliente}}</td>
            <td class="text-2xl">{{formatCurrency(contrato.saldoContrato)}}</td>
            <td class="text-2xl">{{formatDate(contrato.dataInicio)}}</td>
            <td class="text-2xl">{{formatDate(contrato.dataFim)}}</td>
            <td class="text-2xl">
              {{ verificarVencimentoContratos(contrato) }}
              <div class="flex justify-center">
                <span v-if="statusVencimento === 'a vencer'">
                  <Icon icon="fluent:alert-on-16-filled" height="30" class="text-yellow-300" />
                </span>
                <span v-else-if="statusVencimento === 'ativo'">
                  <Icon icon="line-md:confirm-circle-filled" height="30" class="text-green-300" />
                </span>
                <span v-else>
                  <Icon icon="ri:alert-line" height="30" class="text-red-300" />
                </span>
                <!-- <span
                  class="border-2 py-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                  :class="{
                    'bg-purple-200 border-purple-400 text-purple-400':
                      lancamento.tipoMedicao === 'Estimada',
                    'bg-blue-200 border-blue-400 text-blue-400':
                      lancamento.tipoMedicao === 'Detalhada',
                  }"
                >
                  {{ lancamento.tipoMedicao }}
                </span> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center" v-if="contratoItemData">
        <vue-awesome-paginate
          :total-items="totalContratos"
          :max-pages-shown="5"
          :items-per-page="resultsPerPageContratos"
          v-model="currentPageContratos"
          @click="changePageContratos"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Doughnut from "../../components/graficos/Doughnut.vue";
import Bar from "../../components/graficos/Bar.vue";
import BarVertical from "@/components/graficos/BarVertical.vue";
import { Icon } from "@iconify/vue";
import Map from "../../components/Map.vue";
import { onMounted, ref, watch } from "vue";
import { api } from "@/services/api";

const currentPageContratos = ref(1);
const valoresTotaisStatus = ref()
const  contratosPorVencimento = ref()
const top5 = ref()
const map = ref([]);
const mapLoaded = ref(false);
const totalContratos = ref(0)
const resultsPerPageContratos= ref()
let contratoItemData =  ref([]);
let contratoItemMeta = ref({});
let statusVencimento = ref('')

onMounted(()=> {
  fetchDataDashboard()
})

const getCurrentDateString = () => new Date().toISOString().split('T')[0];

const verificarVencimentoContratos = (contrato) => {
    const hoje = getCurrentDateString();
    const dataFim = contrato.dataFim;
    const lembreteVencimento = parseInt(contrato.lembreteVencimento, 10);
    const  diferenca =  new Date(dataFim) - new Date(hoje)
    const diasParaVencimento = diferenca / (1000 * 60 * 60 * 24);


      if ((diasParaVencimento <= lembreteVencimento)  && diasParaVencimento > 0) {
         statusVencimento.value = 'a vencer'
      } else if ( (diasParaVencimento > lembreteVencimento) && diasParaVencimento > 0) {
        statusVencimento.value = 'ativo'
      } else if ( diasParaVencimento <= 0) {
        statusVencimento.value = 'atraso'
      } else {
        statusVencimento.value = 'atraso'
      }

  };
const fetchDataDashboard = async () => {
  try {
    const response = await api.get(`/dashboard`);

    valoresTotaisStatus.value = response.data.valores_totais_status
    contratosPorVencimento.value = response.data.contratos_por_vencimento
    map.value = response.data.map;
    mapLoaded.value = true;
    top5.value = response.data.top5;
    fetchContratos(currentPageContratos.value)

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

const fetchContratos = async(page) => {
   try {
    const response = await api.get(`/dashboard?page=${page}`);
    contratoItemData.value = response.data.contratos.data;
    contratoItemMeta.value = response.data.contratos.meta;
    currentPageContratos.value = contratoItemMeta.value.currentPage;
    totalContratos.value = contratoItemMeta.value.total;
    resultsPerPageContratos.value = contratoItemMeta.value.perPage;

   } catch (error) {
    console.error(error);
   }
}
const changePageContratos = (page) => {
    currentPageContratos.value = page;
  };

  const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};

watch(()=> currentPageContratos.value, ()=> fetchContratos(currentPageContratos.value));
</script>

<style>
.pagination-container {
  display: flex;
  padding-top: 5px;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px ;

  width: 40px ;

  border-radius: 20px ;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217) ;

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8 ;
}

.active-page {
  background-color: #3498db ;

  border: 1px solid #3498db ;

  color: white ;
}

.active-page:hover {
  background-color: #2988c8 ;
}
</style>
