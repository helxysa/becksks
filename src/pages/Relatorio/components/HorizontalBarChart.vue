<template>
  <div class="h-[50rem]">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chart = ref(null);
const canvas = ref(null);

onMounted(() => {
  renderChart();
});

watch(
  () => props.data,
  () => {
    if (chart.value) {
      chart.value.destroy();
      renderChart();
    }
  }
);

const renderChart = () => {
  const { projetos, valores, labels, cores, saldoTotal } = props.data;

  chart.value = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: projetos, // Nomes dos projetos no eixo Y
      datasets: valores.map((data, index) => ({
        label: labels[index], // labels: Pago, Aguardando Pagamento, Aguardando Faturamento, Saldo Disponível
        data,
        backgroundColor: cores[index],
        borderWidth: 1,
        barPercentage: 0.2,
      })),
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          max: saldoTotal,
          stacked: true,
          ticks: {
            callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
          },
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const valor = context.raw;
              return `${context.dataset.label}: R$ ${valor.toLocaleString('pt-BR')}`;
            },
          },
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  });
};
</script>
