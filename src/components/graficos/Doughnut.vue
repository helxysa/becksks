<template>
  <div class="relative h-full">
    <Doughnut :data="data" :options="options" />
    <div class="flex flex-col absolute text-white p-4 rounded z-10 bottom-0 right-0 bg-black bg-opacity-70 text-base" :style="annotationStyleSaldoDisponivel">
      <span>Total Contratado: {{ formatCurrency(props.valoresTotais.total_valor_contratado) }}</span>
      <span>Saldo Disponível: {{ formatCurrency(props.valoresTotais.total_saldo_disponível) }}</span>
    </div>
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { onMounted, ref, computed, defineEmits } from "vue";
import { api } from "@/services/api";

const valorContratado = ref(0)
const aguardandoFaturamento = ref(0)
const aguardandoPagamento =  ref(0)
const pago = ref(0)
const saldoDisponivel = ref(0)
const emit = defineEmits(['status-faturamento']);
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

const percentagePlugin = {
  id: 'percentagePlugin',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    if (!chart.chartArea) return;

    const fontSize = 12;
    const fontFamily = 'Arial';
    const fontStyle = 'semibold';
    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const texts = [];

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      const total = dataset.data.reduce((acc, val) => acc + (val), 0);
      const totalValorContratado = props.valoresTotais.total_valor_contratado;

      meta.data.forEach((segment) => {
        const { x, y, innerRadius, outerRadius, startAngle, endAngle } = segment;
        const value = dataset.data[segment.$context.index];
        const percentage = totalValorContratado > 0 ? ((value / totalValorContratado) * 100).toFixed(2) : '0';
        const label = dataset.customText ? dataset.customText[segment.$context.index] : chart.data.labels[segment.$context.index];

        if (parseFloat(percentage) > 0) { // Verifica se a porcentagem é maior que 0
          let angle = (startAngle + endAngle) / 2;
          let radius = (innerRadius + outerRadius) / 2;

          // Inicialização das coordenadas
          let lineX = x + Math.cos(angle) * (radius + 50);
          let lineY = y + Math.sin(angle) * (radius + 50);

          // Ajustar posição se muito perto de outros textos
          const distanceThreshold = 50; // Distância mínima para evitar sobreposição
          let isNear;

          do {
            isNear = texts.some(([prevX, prevY]) => {
              const distance = Math.sqrt(Math.pow(prevX - lineX, 2) + Math.pow(prevY - lineY, 2));
              return distance < distanceThreshold;
            });

            if (isNear) {
              angle += Math.PI / 6; // Ajusta o ângulo para mover o texto
              lineX = x + Math.cos(angle) * (radius + 20);
              lineY = y + Math.sin(angle) * (radius + 20);
            }
          } while (isNear);

          const fontSize = Math.max(10, Math.min(20, (outerRadius - innerRadius) / 2));
          ctx.font = `normal ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillStyle = '#000000';
          ctx.fillText(`${percentage}%`, lineX, lineY - 10);
          ctx.fillText(label, lineX, lineY + 10);

          // Adiciona as coordenadas do texto à lista
          texts.push([lineX, lineY]);
        }
      });
    });
  },
};

const handleClick = (event, elements) => {
      if (elements.length > 0) {
        const clickedElement = elements[0];
        const dataIndex = clickedElement.index;
        const label = data.value.labels[dataIndex];
        emit('status-faturamento', label);
      }
    }

const data = computed(() => {
  return {
    labels: [
      'Aguardando Pagamento',
      'Aguardando Faturamento',
      'Pago',
      // 'Saldo'
    ],
    datasets: [
      {
        backgroundColor: ['#EF6B26', '#00AFEF', '#FACD36', '#57BA5E'],
        data: [
          props.valoresTotais.total_aguardando_pagamento,
          props.valoresTotais.total_aguardando_faturamento,
          props.valoresTotais.total_pago,
          // props.valoresTotais.total_saldo_disponível
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const dataset = context.dataset;
          const customTexts = dataset.customText || [];
          const label = context.label || '';
          const value = context.raw;
          const totalValorContratado = props.valoresTotais.total_valor_contratado;
          const percentage = totalValorContratado > 0 ? ((value / totalValorContratado) * 100).toFixed(2) : '0';

          const customText = customTexts[context.dataIndex] || '';
          return `\nR$ ${value.toFixed(2)}`;
        }
      }
    },
    legend: {
      display: false
    },
   },
  layout: {
    padding: {
      top: 80,
      bottom: 80,
      left: 0,
      right: 50
    }
  },
  elements: {
    arc: {
      borderWidth: 0,
    }
  },

  onClick: handleClick
};


const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

ChartJS.register(ArcElement, Tooltip, Legend, percentagePlugin);
</script>
