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

const formatValue = (value) => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  } else {
    return value.toFixed(2);
  }
};

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

  const labels = props.top5.map(item => `${item.nome_cliente}  ${formatValue(item.saldo_contrato)}`);
  const dataUtilizada = props.top5.map(item => {
    if (item.saldo_contrato === 0) return 0;
    return (item.totalUtilizado / item.saldo_contrato) * 100;
  });
  const dataRestante = props.top5.map(item => {
    if (item.saldo_contrato === 0) return 0;
    return 100 - (item.totalUtilizado / item.saldo_contrato) * 100;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Percentual Utilizado',
        backgroundColor: '#00AFEF66',
        borderColor: '#00AFEF',
        borderWidth: 1,
        data: dataUtilizada,
        barThickness: 20
      },
      {
        label: 'Percentual Restante',
        backgroundColor: '#57BA5EB2',
        borderColor: '#57BA5E',
        borderWidth: 1,
        data: dataRestante,
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
        title: function(context) {
          return context[0].label;
        },
        label: function (context) {
          const item = props.top5[context.dataIndex];
          const percentual = context.parsed.x.toFixed(2) + '%';
          let valor;
          if (context.dataset.label === 'Percentual Utilizado') {
            valor = formatValue(item.totalUtilizado);
          } else {
            valor = formatValue(item.saldo_contrato - item.totalUtilizado);
          }
          return `${context.dataset.label}: ${percentual} (${valor})`;
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
