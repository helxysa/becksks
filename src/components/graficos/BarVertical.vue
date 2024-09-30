<template>
    <div class="h-[300px]" >        
        <Bar :data="dataBarVertical" :options="optionsBarVertical"/>        
    </div>
</template>

<script setup>
 import { Chart as ChartJS, ArcElement, Tooltip,  BarElement, CategoryScale, LinearScale } from "chart.js";
import {  Bar } from "vue-chartjs";
import { onMounted, ref, computed, defineEmits } from "vue";
ChartJS.register(ArcElement, Tooltip,CategoryScale, LinearScale, BarElement);

const props = defineProps({
  contratosPorVencimento: {
    type: Array,
    required: true,
    default: () => ([])
  }
});
const emit = defineEmits(['valor-vencimento']);

const diasVencimentoUltrapassado = ref(0);
const diasVencimento5 = ref(0);
const diasVencimento10 = ref(0);
const diasVencimento15 = ref(0);
const diasVencimento30 = ref(0);
const diasVencimento60 = ref(0);
const diasVencimento90 = ref(0);

onMounted(()=> { 
  props.contratosPorVencimento.forEach((item)=> {
     if (item.dias_restantes <= 0 ) {
      diasVencimentoUltrapassado.value += 1
     } else  if (item.dias_restantes > 0 && item.dias_restantes <= 5  ) {
      diasVencimento5.value += 1
     } else if (item.dias_restantes > 5 && item.dias_restantes <= 10) {
      diasVencimento10.value += 1
     }  else if (item.dias_restantes > 10 && item.dias_restantes <= 15) {
        diasVencimento15.value += 1
     } else if (item.dias_restantes > 15 && item.dias_restantes <= 30){
        diasVencimento30.value += 1
     }  else  if (item.dias_restantes > 30 && item.dias_restantes <= 60) {
       diasVencimento60.value += 1
     } else {
      diasVencimento90.value += 1
     }
  })
})

const handleClick = (event, elements) => {
      if (elements.length > 0) {
        const clickedElement = elements[0];
        const dataIndex = clickedElement.index;
        const label = dataBarVertical.value.labels[dataIndex];
        emit('valor-vencimento', label.replace('d', '').replace('-', ''));
      }
    }

const dataBarVertical = 
computed(()=> {
  return {
  labels: [
    '-0d ',
    '5d',
    '10d',
    '15d',
    '30d',    
    '60d',
    '90d',   
  ],
  datasets: [
    {    
     
      backgroundColor: [ '#f87979', '#add8e6', '#add8e6', '#add8e6', '#add8e6', '#add8e6', '#add8e6'],
      
      data: [
      diasVencimentoUltrapassado.value,
       diasVencimento5.value,
       diasVencimento10.value, 
       diasVencimento15.value,
       diasVencimento30.value , 
       diasVencimento60.value, 
       diasVencimento90.value,
       ],

       customText: [
      'Contratos vencidos', 
      'Contratos com vencimento  em até 5 dias',
      'Contratos com vencimento  em até 10 dias',
      'Contratos com vencimento  em até 15 dias',
      'Contratos com vencimento  em até 30 dias',     
      'Contratos com vencimento  em até 60 dias',
      'Contratos com vencimento  acima 90 dias',
        ]
    }
  ], 


}

})

const optionsBarVertical = {
  responsive: true,
  maintainAspectRatio: false, 
  scales: {
    y: {
      ticks: {
        // Ensures that ticks are integers
        stepSize: 1,
        callback: function(value) {
          return Number.isInteger(value) ? value : '';
        }
      }
    }
  },
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const dataset = context.dataset;
          const customTexts = dataset.customText || [];
          const label = context.label || '';
          const value = context.raw;      

          const customText = customTexts[context.dataIndex] || '';
          return `${customText}`;
        }
      }
    }, 
    legend: {
      display: false
    },  
  },

  onClick: handleClick
}
</script>

<style  scoped>

</style>