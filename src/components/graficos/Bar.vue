<template>
  <Bar v-if="isArray(top5)" :data="dataBar" :options="optionsBar" />
  <div v-else>
    <p>Dados não disponíveis ou formato incorreto.</p>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registre os componentes necessários e o plugin ChartDataLabels
ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, ChartDataLabels);

const props = defineProps({
  top5: {
    type: Array,
    required: true,
  },
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

// Função para truncar o nome do cliente
const truncateLabel = (label, maxLength) => {
  if (label.length > maxLength) {
    return label.slice(0, maxLength) + '...';
  }
  return label;
};

// Armazenar os nomes completos e os truncados
const fullLabels = props.top5.map((item) => `${item.nome_cliente}`);
const truncatedLabels = fullLabels.map((label) => truncateLabel(label, 15)); // Limite de 15 caracteres

// Armazenar os valores dos contratos formatados
const contratoValues = props.top5.map((item) => formatValue(item.saldo_contrato));

const dataBar = computed(() => {
  if (!isArray(props.top5)) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const dataUtilizada = props.top5.map((item) => {
    if (item.saldo_contrato === 0) return 0;
    return (item.totalUtilizado / item.saldo_contrato) * 100;
  });
  const dataRestante = props.top5.map((item) => {
    if (item.saldo_contrato === 0) return 0;
    return 100 - (item.totalUtilizado / item.saldo_contrato) * 100;
  });

  return {
    labels: truncatedLabels,
    datasets: [
      {
        label: 'Percentual Utilizado',
        backgroundColor: '#00AFEF66',
        borderColor: '#00AFEF',
        borderWidth: 1,
        data: dataUtilizada,
        barThickness: 20,
      },
      {
        label: 'Percentual Restante',
        backgroundColor: '#57BA5EB2',
        borderColor: '#57BA5E',
        borderWidth: 1,
        data: dataRestante,
        borderRadius: 10,
        barThickness: 20,
        datalabels: {
          anchor: 'end',
          align: 'end',
          color: '#000',
          formatter: function (value, context) {
            if (context.datasetIndex === 1) {
              // Exibir o valor do contrato ao lado direito da barra verde
              const index = context.dataIndex;
              return contratoValues[index]; // Valor do contrato
            }
            return '';
          },
        },
      },
    ],
  };
});

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (context) {
          const index = context[0].dataIndex;
          return fullLabels[index];
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
        },
      },
    },
    datalabels: {
      anchor: 'center', // Centralizado dentro das barras
      align: 'center',
      color: function (context) {
        return context.datasetIndex === 1 ? '#fff' : '#000'; // Branco nas barras verdes, preto nas barras azuis
      },
      formatter: function (value, context) {
        // Se for o segundo dataset (barras verdes), mostrar a porcentagem dentro da barra
        if (context.datasetIndex === 1) {
          return value.toFixed(0) + '%'; // Mostrar porcentagem dentro das barras verdes
        }
        return ''; // Não mostrar nada nas barras azuis
      },
    },
  },
  layout: {
    padding: {
      right: 60,
    },
  },
  scales: {
    x: {
      stacked: true,
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function (value) {
          return value + '%';
        },
      },
    },
    y: {
      stacked: true,
      ticks: {
        callback: function (value, index) {
          return truncatedLabels[index];
        },
      },
    },
  },
  barPercentage: 0.8,
  categoryPercentage: 0.9,
};
</script>
