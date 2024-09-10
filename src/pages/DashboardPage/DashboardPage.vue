<template>
  <div>
    <div class="mb-10">
      <h1 class="text-5xl font-medium">Dashboard</h1>
    </div>
    <div class="flex items-start w-full justify-between gap-6">
      <section class="w-full h-full border ">
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
              <div class="h-full mt-36 ">
                <Bar />
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
    <div class="flex   mt-32">
        <Map />
        <div class="w-1/2 ">
            <BarVertical/>
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
        <tbody>
          <tr class="h-24 text-center">
            <td class="text-2xl px-2">1</td>
            <td class="text-2xl">Contrato 4</td>
            <td class="text-2xl">Laecio</td>
            <td class="text-2xl">15 mil</td>
            <td class="text-2xl">12/05/2024</td>
            <td class="text-2xl">17/09/2024</td>
            <td class="text-2xl">
              <div class="flex justify-center">
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
    </div>
  </div>
</template>

<script setup>
import Doughnut from "../../components/graficos/Doughnut.vue";
import Bar from "../../components/graficos/Bar.vue";
import BarVertical from "@/components/graficos/BarVertical.vue";
import { Icon } from "@iconify/vue";
import Map from "@/components/Map.vue";
import { onMounted, ref } from "vue";
import { api } from "@/services/api";

const valoresTotaisStatus = ref({})
const  contratosPorVencimento = ref({})
const top5 = ref({})

onMounted(()=> {
  console.log('entrei')
  fetchDataDashboard()
})

const fetchDataDashboard = async () => {
 
  try {
    const response = await api.get(`/dashboard`);    
    console.log(response, 'response')
    valoresTotaisStatus.value = response.data.valores_totais_status
    console.log(valoresTotaisStatus.value, 'valores')
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};
</script>

<style scoped></style>
