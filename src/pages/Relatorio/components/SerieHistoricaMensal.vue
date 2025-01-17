<template>
  <div class="h-[90%] flex items-center justify-center">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registra os componentes do Chart.js necessários
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

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
  const { months, pagamentos } = props.data;
  const valorContrato = new Array(months.length).fill(props.data.valorContrato); // Linha reta

  chart.value = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Valor do Contrato',
          data: valorContrato,
          borderColor: '#3B82F6',
          backgroundColor: '#3B82F6',
          borderWidth: 5,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: 'Pagamentos',
          data: pagamentos,
          borderColor: '#27AEE5',
          backgroundColor: '#27AEE5',
          borderWidth: 5,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw;
              return `${context.dataset.label}: R$ ${value.toLocaleString('pt-BR')}`;
            },
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            padding: 30,
            boxWidth: 10,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `${value.toLocaleString('pt-BR')}`,
          },
        },
      },
    },
  });
};

</script>
