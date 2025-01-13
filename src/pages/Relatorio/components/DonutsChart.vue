<template>
  <div class="h-fit max-h-[40rem] flex items-center justify-center">
    <canvas ref="canvas" class="w-[350px] h-[350px]"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Registra os componentes do Chart.js necessários
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

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
  const { labels, values, colors, saldoTotal } = props.data;

  chart.value = new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const valorFatias = context.raw;
              const percentage = ((valorFatias / saldoTotal) * 100).toFixed(2);
              return `${context.label}: R$ ${valorFatias.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${percentage}%)`;
            },
          },
        },
        legend: {
          position: 'top',
        },
      },
    },
  });
};
</script>
