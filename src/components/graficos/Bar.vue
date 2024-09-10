<template>
  <Bar :data="dataBar" :options="optionsBar" />
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, BarElement, CategoryScale, LinearScale, Legend } from "chart.js";
import { Bar } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, BarElement, CategoryScale, LinearScale, Legend);

const dataBar = {
  labels: [
    "Contrato 1",
    "Contrato  2",
    "Contrato 3",
    "Contrato 4",
    "Contrato 5",
  ],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10],
      barThickness: 20,
    },
  ],
};

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.x + '%'
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%'
              }
            }
          },         

         
        },
};
</script>
