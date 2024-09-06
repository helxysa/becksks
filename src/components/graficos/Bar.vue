<template>
    <div class="h-[300px]">
        <Bar :data="dataBar" :options="optionsBar" />
    </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip,  BarElement } from "chart.js";
import {  Bar } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, BarElement);

const dataBar = {
  labels: [
    'Contrato 1',
    'Contrato  2',
    'Contrato 3',
    'Contrato 4',
    'Contrato 5',
    
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      
      data: [40, 20, 12, 39, 10]
    }
  ]
}

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
}
</script>

<style>

</style>