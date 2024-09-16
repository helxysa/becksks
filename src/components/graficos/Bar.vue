<template>
  <Bar v-if="isArray(top5)" :data="dataBar" :options="optionsBar" />
  <div v-else>
    <p>Dados não disponíveis ou formato incorreto.</p>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, Tooltip, CategoryScale, LinearScale, Legend } from 'chart.js';

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend);

const props = defineProps({
  top5: {
    type: Array,
    required: true
  }
});

const isArray = (value) => Array.isArray(value);

const dataBar = computed(() => {
  if (!isArray(props.top5)) {
    return {
      labels: [],
      datasets: [
        {
          label: 'Percentual Utilizado',
          backgroundColor: '#f87979',
          data: [],
          barThickness: 20
        }
      ]
    };
  }

  const labels = props.top5.map(item => item.nome_cliente);
  const data = props.top5.map(item => {
    if (item.saldo_contrato === 0) return 0;
    return (item.totalUtilizado / item.saldo_contrato) * 100;
  });

  const dataUtilizada =  props.top5.map(item => {
    if (item.saldo_contrato === 0) return 0;
    return 100 - (item.totalUtilizado / item.saldo_contrato) * 100 ;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Percentual Utilizado',
        backgroundColor: '#00AFEF66',
        borderColor: '#00AFEF',
        borderWidth: 1,
        data,
        barThickness: 20
      }, 

      {
        label: 'Percentual Restante',
        backgroundColor: '#57BA5EB2',
        borderColor: '#57BA5E',
        borderWidth: 1,
        data: dataUtilizada,
        barThickness: 20
      }
    ]
  };
});

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.parsed.x.toFixed(2) + '%';
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function (value) {
          return value + '%';
        }
      }
    }, 

    y: {
            stacked: true
      }
  }
};
</script>
