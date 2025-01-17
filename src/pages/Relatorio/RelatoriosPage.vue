<template>
  <div class="p-4 border-lg bg-[#F1F8FE] min-h-screen">
    <div class="bg-white p-12 exclude-from-pdf w-full max-w-[1920px] flex flex-col">
      <h1 class="text-4xl mb-12">RELATÓRIO</h1>
      <section class="flex gap-8 items-center">
        <!-- Contrato Input -->
        <div class="mb-4">
          <label for="contratoSelect" class="block text-gray-700 font-medium mb-2 text-3xl">Contrato</label>
          <select
            id="contratoSelect"
            v-model="selectedContratoId"
            @change="fetchProjetos"
            class="block w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Escolha um contrato</option>
            <option v-for="contrato in contratos" :key="contrato.id" :value="contrato.id">
              {{ contrato.nome }}
            </option>
          </select>
        </div>

        <!-- Projeto Input -->
        <div class="mb-4">
          <label for="projeto" class="block text-gray-700 font-medium mb-2 text-3xl">Projeto</label>
          <select
            id="projeto"
            v-model="selectedProjeto"
            :disabled="!projetos.length"
            class="block w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            <option value="">Escolha um projeto</option>
            <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.nome">
              {{ projeto.nome }}
            </option>
          </select>
        </div>

           <!-- Data Início -->
          <div class="mb-4">
            <label for="dataInicio" class="block text-gray-700 font-medium mb-2 text-3xl">Data Início</label>
            <input
              :disabled="!selectedContratoId"
              id="dataInicio"
              type="date"
              v-model="dataInicio"
              class="block h-[52px] w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>

          <!-- Data Fim -->
          <div class="mb-4">
            <label for="dataFim" class="block text-gray-700 font-medium mb-2 text-3xl">Data Fim</label>
            <input
             :disabled="!dataInicio"
              id="dataFim"
              type="date"
              v-model="dataFim"
              class="block h-[52px] w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>

          <span @click="resetFilters" class="mt-6 p-2 rounded-full cursor-pointer transition-transform duration-75 ease-in-out active:scale-125 active:-rotate-180">
            <Icon icon="system-uicons:reset" width="2.5rem" class="text-blue-800" />
          </span>
      </section>
      <!-- Botão Filtrar -->
       <div class="flex justify-end">
        <button
          @click="fetchRelatorio"
          :disabled="!selectedContratoId"
          class="w-full sm:w-auto bg-blue-500 text-white px-20 py-4 rounded-lg text-3xl  hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          Filtrar
        </button>
      </div>
    </div>

    <div class="bg-white w-full max-w-[1920px] flex flex-col justify-center">
    <!-- Pagina 1 -->
    <section id="page1">

    <!-- Exibição do Relatório -->
    <div v-if="relatorio" class="mt-6 bg-white px-12 pt-12 rounded-lg">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-4xl font-bold text-gray-700">
          {{ relatorio.contrato.nomeContrato }}
        </h2>
        <button
          @click="downloadPdf"
          class="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed exclude-from-pdf"
        >
          Baixar Relatório em PDF
        </button>
      </div>

    <!-- Contêiner Principal -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Card 1: Cliente -->
      <div class="p-4 border border-[#3B82F6] rounded-lg col-span-2">
        <p class="text-gray-500">Cliente:   {{ relatorio.contrato.nomeCliente }}</p>
        <p class="text-gray-500 mt-2">Período de vigência: xxxxxxxxx</p>
        <p class="text-gray-500 mt-2">Total de projetos: {{ relatorio.totalProjetos}}</p>
      </div>

      <!-- Wrapper para Cards 2 e 3 -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Card 2: Valor Total -->
        <div class="p-4 border border-[#3B82F6] rounded-lg grid place-items-start">
          <p class="text-gray-500">Valor total</p>
          <p class="font-medium text-gray-700">
            R$ {{ relatorio.saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </p>
        </div>
        <!-- Card 3: Saldo Atual -->
        <div class="p-4 border border-[#3B82F6] rounded-lg grid place-items-start">
          <p class="text-gray-500">Saldo Atual</p>
          <p class="font-medium text-gray-700">
            R$ {{ relatorio.saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </p>
        </div>
    </div>
  </div>
</div>

<div v-if="loading" class="flex justify-center items-center h-[400px]">
  <p class="text-lg text-gray-500">Carregando gráficos...</p>
</div>
<div v-else class="px-12 pb-12" id="graph">
    <!-- Gráficos -->
    <div v-if="relatorio" class="bg-white mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Série Histórica Mensal -->
      <div class="p-12 rounded-xl max-h-[400px]" :class="{ 'border border-[#3B82F6]': !noBorder }">
        <h2 class="text-2xl font-bold mb-8 text-[#63696E]">Série Histórica Mensal</h2>
        <SerieHistoricaMensal :data="serieHistoricaMensalData" />
      </div>

      <!-- Distribuição de Valores -->
      <div class="p-12 rounded-xl max-h-[400px]" :class="{ 'border border-[#3B82F6]': !noBorder }">
        <h2 class="text-2xl font-bold mb-8 text-[#63696E]">Distribuição de Valores</h2>
        <DonutChart :data="chartData" />
      </div>
    </div>


    <!-- Distribuição por Projeto -->
    <div
      v-if="relatorio && selectedProjeto === ''"
      class="mt-6 p-12 bg-white rounded-xl w-full"
      :class="{ 'border border-[#3B82F6]': !noBorder }"
    >
      <h2 class="text-2xl font-bold mb-12 text-[#63696E]">Distribuição por Projeto</h2>
      <HorizontalBarChart :data="horizontalBarChartData" />
    </div>
  </div>

  </section>

  <!-- Página 2 -->
  <section id="page2" class="px-12">
    <TabelasDoContrato :contrato="relatorio.contrato" v-if="relatorio" />
  </section>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { api } from "@/services/api";
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logoBase64 from '../../assets/imagens/logoBase64.js'
import TabelasDoContrato from './TabelasDoContrato.vue'
import DonutChart from './components/DonutsChart.vue';
import HorizontalBarChart from './components/HorizontalBarChart.vue';
import SerieHistoricaMensal from './components/SerieHistoricaMensal.vue';

// Dados do Contrato e Relatório
const contratos = ref([]);
const projetos = ref([]);
const selectedContratoId = ref('');
const selectedProjeto = ref('');
const dataInicio = ref('');
const dataFim = ref('');
const relatorio = ref(null);
const noBorder = ref(false);
const loading = ref(false);
// Dados para o gráfico donuts
const chartData = computed(() => {
  if (!relatorio.value) return null;

  const { saldoAtual, distribuicaoPorStatus, saldoTotal } = relatorio.value;
  const pago = distribuicaoPorStatus?.Pago?.total || 0;
  const aguardandoPagamento = distribuicaoPorStatus?.['Aguardando Pagamento']?.total || 0;
  const aguardandoFaturamento = distribuicaoPorStatus?.['Aguardando Faturamento']?.total || 0;
  const saldoDisponivel = saldoAtual || 0;

  const labels = ['Pago', 'Aguardando Pagamento', 'Aguardando Faturamento', 'Saldo Disponível'];
  const values = [pago, aguardandoPagamento, aguardandoFaturamento, saldoDisponivel];
  const colors = ['#27AEE5', '#3B82F6', '#0E1F4D', '#7BB600'];

  return { labels, values, colors, saldoTotal };
});

// Dados para o gráfico de barras horizontais empilhadas
const horizontalBarChartData = computed(() => {
  if (!relatorio.value) return null;

  const { saldoAtual, saldoTotal } = relatorio.value;
  const distribuicao = relatorio.value.distribuicaoPorProjeto;
  const projetos = Object.keys(distribuicao);

  const valores = [
    projetos.map((projeto) => distribuicao[projeto]?.pago || 0),
    projetos.map((projeto) => distribuicao[projeto]?.aguardandoPagamento || 0),
    projetos.map((projeto) => distribuicao[projeto]?.aguardandoFaturamento || 0),
    projetos.map((projeto) => {
      const totalProjeto = distribuicao[projeto]?.total || 0;
      const saldoProjeto = saldoAtual - totalProjeto;
      return saldoProjeto > 0 ? saldoProjeto : 0;
    }),
  ];

  const labels = ['Pago', 'Aguardando Pagamento', 'Aguardando Faturamento', 'Saldo Disponível'];
  const cores = ['#27AEE5', '#3B82F6', '#0E1F4D', '#7BB600'];

  return {
    projetos,
    valores,
    labels,
    cores,
    saldoTotal
  };
});

// Dados para o gráfico de serie historica mensal
const serieHistoricaMensalData = computed(() => {
  if (!relatorio.value || !relatorio.value.serieHistorica) {
    return { months: [], pagamentos: [], valorContrato: 0 }; // Valores padrão
  }

  return {
    months: relatorio.value.serieHistorica.months,
    pagamentos: relatorio.value.serieHistorica.pagamentos,
    valorContrato: relatorio.value.saldoTotal,
  };
});

// Fetch Contratos
const fetchContratos = async () => {
  try {
    const response = await api.get('/contratos');
    contratos.value = response.data.map((contrato) => ({
      id: contrato.id,
      nome: contrato.nomeContrato,
    }));
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
  }
};

// Fetch Projetos
const fetchProjetos = async () => {
  if (!selectedContratoId.value) return;
  try {
    const response = await api.get(`/contratos/${selectedContratoId.value}/projetos`);
    projetos.value = response.data.data.map((projeto) => ({
      id: projeto.id,
      nome: projeto.projeto,
    }));
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
  }
};

// Fetch Relatório
const fetchRelatorio = async () => {
  if (!selectedContratoId.value) return;

  if (dataInicio.value && !dataFim.value) {
    toast.error('Selecione o inicio e o fim do período.');
    return;
  }

  const projetosToSend = selectedProjeto.value ? [selectedProjeto.value] : [];
  relatorio.value = null;
  try {
    const response = await api.post(`/contratos/${selectedContratoId.value}/relatorio`, {
      projetos: projetosToSend,
      dataInicio: dataInicio.value || null,
      dataFim: dataFim.value || null,
    });
    relatorio.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
  }
};

const addHeader = (doc, pageNumber) => {
  const imgWidth = 40; // Largura da imagem
  const imgHeight = 20; // Altura da imagem
  doc.addImage(logoBase64, 'PNG', 10, 10, imgWidth, imgHeight); // Adiciona a imagem no topo
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Relatório de Contratos', 50, 20); // Ajuste a posição do texto conforme necessário
  doc.setFontSize(10);
  doc.text(`Página ${pageNumber}`, 190, 20, { align: 'right' }); // Ajuste a posição do número da página
};

// Gerar pdf
const generatePDF = async () => {
  const excludeElements = document.querySelectorAll('.exclude-from-pdf');
  const graficos = document.querySelector('#page1');
  const tabelas = document.querySelector('#page2');
  excludeElements.forEach((el) => (el.style.display = 'none'));

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Renderiza os gráficos
    const graficosCanvas = await html2canvas(graficos, {
      scale: 3,
      useCORS: true,
      logging: false,
      allowTaint: false,
    });


    // Ajuste o DPI temporariamente
    const originalRatio = window.devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', {
      get: () => 3, // Aumente o DPI
    });

    // Restaura o DPI original
    Object.defineProperty(window, 'devicePixelRatio', {
      get: () => originalRatio,
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeightGraficos = (graficosCanvas.height * imgWidth) / graficosCanvas.width;
    pdf.addImage(graficosCanvas.toDataURL('image/png', 1.0), 'PNG', 3, 35, imgWidth - 5, imgHeightGraficos);
    addHeader(pdf, 1);

    pdf.addPage();
    // Renderiza as tabelas
    const tabelasCanvas = await html2canvas(tabelas, { scale: 3, useCORS: true });
    const imgHeightTabelas = (tabelasCanvas.height * imgWidth) / tabelasCanvas.width;
    pdf.addImage(tabelasCanvas.toDataURL('image/png', 1.0), 'PNG', 3, 35, imgWidth - 5, imgHeightTabelas);
    addHeader(pdf, 2);

    // Salva o PDF
    pdf.save('relatorio.pdf');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  } finally {
    excludeElements.forEach((el) => (el.style.display = 'block'));
  }
};

async function urlToBlob(url) {
  const response = await fetch(url);  // Fazendo a requisição para a URL
  const blob = await response.blob();  // Convertendo a resposta em Blob
  const objectURL = URL.createObjectURL(blob);  // Criando um objeto URL a partir do Blob
  return objectURL;  // Retorna o objeto URL
}

const downloadPdf = async () => {
  if (!selectedContratoId.value) {
    console.error('Nenhum contrato selecionado!');
    return;
  }

  try {
    // Captura os gráficos como imagens base64
    const graficos = document.querySelector('#graph');

    if (!graficos) {
      console.error('Elementos de gráficos não encontrados.');
      return;
    }
    noBorder.value = true;

    // Aplica uma classe temporária para ajustar o CSS
    const originalClass = graficos.className; // Salva a classe original
    graficos.className += ' print-resolution'; // Adiciona uma classe temporária

    // Aguarda um ciclo de renderização para aplicar o novo estilo
    await new Promise((resolve) => setTimeout(resolve, 100));
    loading.value = true;

    const graficosCanvas = await html2canvas(graficos, {
      scale: 2,
      useCORS: true,
    });

    // Restaura a classe original
    graficos.className = originalClass;

    // Converte os gráficos para Base64 e faz o download
    const graficoBase64 = graficosCanvas.toDataURL('image/png', 1.0);

    // Envia os gráficos ao back-end junto com a requisição para gerar o PDF
    const response = await api.post(`/contratos/${selectedContratoId.value}/relatorio/pdf`, {
      projetos: selectedProjeto.value ? [selectedProjeto.value] : [],
      grafico: graficoBase64,
    });
    noBorder.value = false;
    loading.value = false;
    if (response.data.url) {
      const fileURL =  await urlToBlob(response.data.url)
      window.open(fileURL, '_blank');
      // Faz o download do PDF gerado
      // const link = document.createElement('a');
      // link.href = response.data.url;
      // link.setAttribute('download', `relatorio-${selectedContratoId.value}.pdf`);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } else {
      console.error('Erro ao gerar o PDF no back-end.');
    }
  } catch (error) {
    console.error('Erro ao baixar o PDF:', error);
  }
};

const resetFilters = () => {
  selectedContratoId.value = '';
  selectedProjeto.value = '';
  dataInicio.value = '';
  dataFim.value = '';
  projetos.value = [];
  relatorio.value = null;
};

// Inicializa Contratos
fetchContratos();

</script>


<style>
.print-resolution {
  width: 1218px !important;
  height: auto !important;
  display: block;
}

.print-resolution canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
