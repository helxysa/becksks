<template>
  <Doughnut :data="data" :options="options"/>
</template>

<script setup>
 import { Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from "chart.js";
 import { Doughnut } from "vue-chartjs";
 import { onMounted, ref, computed } from "vue";
//  ChartJS.register(ArcElement, Tooltip, Legend,
// );

const valorContratado = ref(0)
const aguardandoFaturamento = ref(0)
const   aguardandoPagamento =  ref(0)
const pago = ref(0)
const saldoDisponivel = ref(0)

const props = defineProps({
  valoresTotais: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

onMounted(() => {
  const totalValorContratado = props.valoresTotais.total_valor_contratado;
  aguardandoFaturamento.value = (props.valoresTotais.total_aguardando_faturamento / totalValorContratado * 100).toFixed(2);
  aguardandoPagamento.value = (props.valoresTotais.total_aguardando_pagamento / totalValorContratado * 100).toFixed(2);
  pago.value = (props.valoresTotais.total_pago / totalValorContratado * 100).toFixed(2);
  saldoDisponivel.value = (props.valoresTotais.total_saldo_disponível / totalValorContratado * 100).toFixed(2);
});

 // Definição do plugin para desenhar valores ao lado das fatias
const percentagePlugin = {
  id: 'percentagePlugin',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    if (!chart.chartArea) return;

    const fontSize = 12;
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
        const { x, y, innerRadius, outerRadius, startAngle, endAngle } = segment;
        const value = dataset.data[segment.$context.index] ;
        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0';
        const label = customTexts[segment.$context.index] || (chart.data.labels[segment.$context.index] );

        const angle = (startAngle + endAngle) / 2;
        const radius = (innerRadius + outerRadius) / 2;

        const xOffset = Math.cos(angle) * (radius + 70);
        const yOffset = Math.sin(angle) * (radius + 70);

        const lineX = x + xOffset;
        const lineY = y + yOffset;

        // ctx.strokeStyle = '#000000'; // Cor da linha
        // ctx.beginPath();
        // ctx.moveTo(x, y);
        // ctx.lineTo(lineX, lineY);
        // ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.fillText(`${percentage}%`, lineX, lineY - 10);

        // Adiciona o texto personalizado abaixo da porcentagem
        ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
        ctx.fillText(label, lineX, lineY + 10); // Texto personalizado
      });
    });
  },
};

const data = computed(() => {
  const totalValorContratado = props.valoresTotais.total_valor_contratado;

  return {
    labels: [
      'Aguardando Pagamento',
      'Aguardando Faturamento',
      'Pago',
      'Saldo'
    ],
    datasets: [
      {
        backgroundColor: ['#EF6B26', '#00AFEF', '#FACD36', '#57BA5E'],
        data: [
          (props.valoresTotais.total_aguardando_pagamento / totalValorContratado),
          (props.valoresTotais.total_aguardando_faturamento / totalValorContratado),
          (props.valoresTotais.total_pago / totalValorContratado),
          // (props.valoresTotais.total_saldo_disponível / totalValorContratado * 100)
        ],
        customText: [
          'Aguardando Pagamento',
          'Aguardando Faturamento',
          'Pago',
          // 'Saldo'
        ]
      }
    ]
  };
});

// Opções do gráfico
 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
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
      top: 90,
      bottom: 80,
      left: 50,
      right: 120
    }
  },
  elements: {
    arc: {
      borderWidth: 1,
    }
  }
};

// Registro do plugin
ChartJS.register(ArcElement, Tooltip, Legend, percentagePlugin);
</script>
