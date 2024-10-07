<template>
  <!-- <div class="flex gap-4 cursor-pointer mb-12 hover:text-gray-500 ease-out" @click="voltarListagem">
    <Icon icon="ic:round-arrow-back" height="20" />
    <h1 class="text-3xl font-medium">Voltar</h1>
  </div> -->
  <div>
    <!-- <div class="tabs-scroll flex border-b overflow-x-auto whitespace-nowrap pb-4">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
        :class="['py-2 px-4', { 'border-b-2 border-[#00AFEF]': selectedTab === tab }]"
        class="focus:outline-none hover:bg-[#f1f8fe] hover:text-[#0091d4] rounded-t-md"
      >
        {{ tab }}
      </button>
    </div> -->

    <div v-if="selectedTab === 'Contrato'">
       <VisualizarContrato @renovacaoCriada="handleRenovacaoCriada"/>
    </div>

    <div v-else-if="selectedTab.startsWith('Renovação')" class="p-4">
      <Renovacao :renovacao="selectedRenovacao" :contrato="contrato" @renovacaoEditada="handleRenovacaoEditada" @renovacaoDeletada="handleRenovacaoDeletada"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { api } from '@/services/api';
import { useRoute, useRouter,RouterLink } from 'vue-router';
import { Icon } from "@iconify/vue";
import VisualizarContrato from './VisualizarContrato.vue'
import Renovacao from './RenovacaoContrato.vue';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const contrato = ref({});
const tabs = ref(['Contrato'])
const selectedTab = ref('Contrato')
const selectedRenovacao = ref(null);

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    contrato.value = response.data;
    tabs.value = ['Contrato'];

    if (contrato.value.renovacao && contrato.value.renovacao.length > 0) {
      contrato.value.renovacao.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      contrato.value.renovacao.forEach((_, index) => {
        tabs.value.push(`Renovação ${index + 1}`);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

onMounted(() => {
  const contratoId = route.params.id;
  fetchContrato(contratoId);
});

watch(selectedTab, (newTab) => {
  if (newTab.startsWith('Renovação')) {
    const renovacaoIndex = parseInt(newTab.split(' ')[1], 10) - 1;
    selectedRenovacao.value = contrato.value.renovacao[renovacaoIndex];
  } else {
    selectedRenovacao.value = null;
  }
});

const handleRenovacaoCriada = async () => {
  const contratoId = route.params.id;
  await fetchContrato(contratoId);
};

const handleRenovacaoEditada = async () => {
  const contratoId = route.params.id;
  await fetchContrato(contratoId);

  if (selectedTab.value.startsWith('Renovação')) {
    const renovacaoIndex = parseInt(selectedTab.value.split(' ')[1], 10) - 1;
    selectedRenovacao.value = contrato.value.renovacao[renovacaoIndex];
  }
};

const handleRenovacaoDeletada = async (renovacaoId) => {
  const result = await Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir esta renovação?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/renovacao/${renovacaoId}`);
      const contratoId = route.params.id;
      await fetchContrato(contratoId);

      if (selectedTab.value.startsWith('Renovação')) {
        const renovacaoIndex = parseInt(selectedTab.value.split(' ')[1], 10) - 1;
        selectedRenovacao.value = contrato.value.renovacao[renovacaoIndex] || null;
        if (!selectedRenovacao.value) {
          selectedTab.value = 'Contrato';
        }
      }
    } catch (error) {
      console.error('Erro ao deletar renovação:', error);
    }
  }
};

const voltarListagem = () => {
  router.push({ name: "Contratos" });
};

</script>

<style>
.tabs-scroll::-webkit-scrollbar {
  height: 8px;
  padding-top: 20px;
}

.tabs-scroll::-webkit-scrollbar-track {
  background: #dbe8fe;
}

.tabs-scroll::-webkit-scrollbar-thumb {
  background: #00AFEF ;
  border-radius: 10px;
}

.tabs-scroll::-webkit-scrollbar-thumb:hover {
  background: #0091d4 ;
}
</style>
