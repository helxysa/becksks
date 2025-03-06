<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 w-full max-w-3xl shadow-xl mx-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Confirmar Exclusão</h2>
      <p class="text-2xl text-gray-800 mb-8 leading-relaxed">
        Tem certeza que deseja excluir este contrato? Esta ação não pode ser
        desfeita.
      </p>

      <div class="flex justify-end gap-6">
        <button
          @click="onCancel"
          class="px-8 py-4 text-xl font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="onConfirm"
          class="px-8 py-4 text-xl font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

defineProps<Props>();
</script>

<style scoped>
/* Estilos para aumentar o tamanho e melhorar a legibilidade */
.bg-white {
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Garantir que o texto fique bem legível em qualquer tela */
p {
  font-weight: 500;
}

button {
  font-weight: 600;
  min-width: 160px;
}

@media (max-width: 768px) {
  .bg-white {
    min-height: 260px;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.5rem;
  }
}
</style>
