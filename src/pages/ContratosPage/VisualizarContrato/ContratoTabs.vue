<template>
  <div>
    <div class="flex border-b">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
        :class="['py-2 px-4', { 'border-b-2 border-blue-500': selectedTab === tab }]"
        class="focus:outline-none hover:bg-blue-300 rounded-md"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="selectedTab === 'Contrato'" class="p-4">
       <VisualizarContrato />
    </div>

    <div v-else-if="selectedTab.startsWith('Renovação')" class="p-4">
      <Renovacao :renovacao="selectedRenovacao" :contrato="contrato" />
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

    if (contrato.value.renovacao && contrato.value.renovacao.length > 0) {
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

</script>
