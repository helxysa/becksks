<template>
  <div>
    <div class="flex justify-between mt-12 px-6 mb-8">
      <h1 class="text-5xl font-medium">Registros de Ações</h1>
    </div>
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
    >
      <l-waveform size="40" stroke="3.5" speed="1" color="white"></l-waveform>
    </div>
    <div v-else>
      <table class="table-auto border border-slate-200 rounded-2xl w-full">
        <thead class="h-20 bg-slate-100 border-1">
          <tr>
            <th class="text-xl px-2">ID Usuário</th>
            <th class="text-xl">Nome</th>
            <th class="text-xl">Ação</th>
            <th class="text-xl">Área</th>
            <th class="text-xl">Data</th>
            <th class="text-xl">Hora</th>
            <th class="text-xl">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id" class="h-24 text-center">
            <td class="text-2xl">{{ log.userId }}</td>
            <td class="text-2xl">{{ log.name }}</td>
            <td class="text-2xl">{{ log.action }}</td>
            <td class="text-2xl">{{ log.model }}</td>
            <td class="text-2xl">{{ formatDate(log.createdAt).date }}</td>
            <td class="text-2xl">{{ formatDate(log.createdAt).time }}</td>
            <td class="text-2xl">{{ log.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { Icon } from "@iconify/vue";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from "vue3-toastify";
import { waveform } from "ldrs";
import Swal from "sweetalert2";

waveform.register();

const logs = ref([]);
const loading = ref(true);

const getLogs = async () => {
  try {
    const response = await api.get('/logs');
    logs.value = response.data;
    loading.value = false;

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    loading.value = false;
  }
};

const formatDate = (dateTimeString) => {
  const dateObj = new Date(dateTimeString);
  const date = dateObj.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { date, time };
};

onMounted(() => {
  getLogs();
});
</script>
