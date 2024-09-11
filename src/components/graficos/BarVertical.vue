<template>
    <div class="h-[300px]" >        
        <Bar :data="dataBarVertical" :options="optionsBarVertical"/>        
    </div>
</template>

<script setup>
 import { Chart as ChartJS, ArcElement, Tooltip,  BarElement, CategoryScale, LinearScale } from "chart.js";
import {  Bar } from "vue-chartjs";
import { onMounted, ref, computed } from "vue";
ChartJS.register(ArcElement, Tooltip,CategoryScale, LinearScale, BarElement);

const props = defineProps({
  contratosPorVencimento: {
    type: Array,
    required: true,
    default: () => ([])
  }
});

onMounted(()=> {
  console.log(props.contratosPorVencimento, 'contratos veb')
})
const dataBarVertical = {
  labels: [
    '-0d ',
    '15d',
    '30d',
    '45d',
    '60d',
    '90d',
    '120d',
    
  ],
  datasets: [
    {
      label: ['Contratos vencidos', 
      'Contratos com vencimento  em até 15 dias',
      'Contratos com vencimento  em até 30 dias',
      'Contratos com vencimento  em até 45 dias',
      'Contratos com vencimento  em até 60 dias',
      'Contratos com vencimento  em até 90 dias',
      'Contratos com vencimento  em até 120 dias',
       ],
      backgroundColor: [ '#f87979', '#add8e6', '#add8e6', '#add8e6', '#add8e6', '#add8e6', '#add8e6'],
      
      data: [40, 20, 12, 39, 10, 87, 95]
    }
  ]
}

const optionsBarVertical = {
  responsive: true,
  maintainAspectRatio: false, 
}
</script>

<style  scoped>

</style>