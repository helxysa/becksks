<template>
    <div class="chart-container ">
        <Doughnut :data="data" :options="options" /> 
    </div>
</template>

<script setup>
 import { Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from "chart.js";
 import { Doughnut } from "vue-chartjs";
//  ChartJS.register(ArcElement, Tooltip, Legend,
// );

 // Definição do plugin para desenhar valores ao lado das fatias
const percentagePlugin = {
  id: 'percentagePlugin',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    if (!chart.chartArea) return;

    const fontSize = 18;
    const fontFamily = 'Arial';
    const fontStyle = 'normal';
    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      const total = dataset.data.reduce((acc, val) => acc + (val), 0);

      // Verifica se 'customText' está definido e é um array
      const customTexts = (dataset).customText || [];

      meta.data.forEach((segment) => {
        const { x, y, innerRadius, outerRadius, startAngle, endAngle } =
          segment;
        const value = dataset.data[segment.$context.index] ;
        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0';
        const label =
          customTexts[segment.$context.index] ||
          (chart.data.labels[segment.$context.index] );

        const angle = (startAngle + endAngle) / 2;
        const radius = (innerRadius + outerRadius) / 2;

        // Ajustar o deslocamento para aumentar a distância
        const xOffset = Math.cos(angle) * (radius + 100); // Aumente o valor para mais distância
        const yOffset = Math.sin(angle) * (radius + 100); // Aumente o valor para mais distância

        const lineX = x + xOffset;
        const lineY = y + yOffset;

        // ctx.strokeStyle = '#000000'; // Cor da linha
        // ctx.beginPath();
        // ctx.moveTo(x, y);
        // ctx.lineTo(lineX, lineY);
        // ctx.stroke();

        ctx.fillStyle = '#000000'; // Cor do texto
        ctx.fillText(`${percentage}%`, lineX, lineY - 10); // Porcentagem

        // Adiciona o texto personalizado abaixo da porcentagem
        ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
        ctx.fillText(label, lineX, lineY + 10); // Texto personalizado
      });
    });
  },
};

// Dados fictícios
 const data = {
  labels: ['Aguardando Pagamento', 'Aguardando Faturamento', 'Pago', 'Saldo'],
  datasets: [
    {
      backgroundColor: ['#EF6B26', '#00AFEF', '#FACD36', '#57BA5E'],
      data: [10, 20, 40, 30],
      customText: [
        'Aguardando Pagamento',
        'Aguardando Faturamento',
        'Pago',
        'Saldo',
      ], // Texto personalizado
    },
  ],
};

// Opções do gráfico
 const options = {
  responsive: true,
  maintainAspectRatio: false, // Permite que o gráfico ajuste seu tamanho ao contêiner
  plugins: {
    tooltip: {
      enabled: true, // Habilita o tooltip se necessário,
      callbacks: {
        label: function(context) {
          const dataset = context.dataset ;
          const customTexts = dataset.customText || [];
          const label = context.label || '';
          const value = context.raw ;
          const percentage = dataset.data.length > 0 ? ((value / dataset.data.reduce((acc, val) => acc + (val ), 0)) * 100).toFixed(2) : '0';
          
          const customText = customTexts[context.dataIndex] || '';
          // return `${label}: ${customText}\n${percentage}%`;
          return `${customText}\n${percentage}%`;
        }
      }
    },
    legend: {
      display: false // Remove as legendas
    }
  },
  layout: {
    padding: {
      top: 200,   // Ajuste conforme necessário
      bottom: 200, // Ajuste conforme necessário
      left: 200,  // Ajuste conforme necessário
      right: 200  // Ajuste conforme necessário
    }
  },
  elements: {
    arc: {
      borderWidth: 1, // Largura da borda dos segmentos
    }
  }
};

// Registro do plugin
ChartJS.register(ArcElement, Tooltip, Legend, percentagePlugin);
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center; 
  height: 100%; /* Ajusta a altura do contêiner para ocupar todo o espaço disponível */
  width: 100%;  /* Ajusta a largura do contêiner para ocupar todo o espaço disponível */
  max-width: 1000px; /* Define um tamanho máximo para o contêiner */
  max-height: 1000px; /* Define um tamanho máximo para o contêiner */
  max-height: 1000px; /* Define um tamanho máximo para o contêiner */
  background-color: lightblue;
  overflow: auto; /* Permite rolar se o conteúdo exceder o tamanho do contêiner */
  }
  
  .chart {
  height: 100%; /* Ajusta a altura do gráfico para preencher o contêiner */
  width: 100%;  /* Ajusta a largura do gráfico para preencher o contêiner */
  }
</style>