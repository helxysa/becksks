<template>
  <div class="relative" ref="componentRoot">
    <div
      class="cursor-pointer flex items-center justify-center gap-2 hover:text-blue-600"
      @click.stop="toggleStatusFilterMenu"
    >
      <span>Status</span>
      <span>
        <Icon icon="mdi:filter" />
      </span>
    </div>
    <transition name="fade">
      <div
        v-if="showStatusFilterMenu"
        class="absolute left-0 bottom-8 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-10"
        @click.stop
      >
        <div class="p-4">
          <div class="flex items-center mb-4">
            <input
              type="checkbox"
              id="select-all"
              v-model="selectAllStatuses"
              @change="toggleAllStatuses"
              class="form-checkbox h-4 w-4 text-blue-600"
            />
            <label for="select-all" class="ml-2 text-sm text-gray-700 cursor-pointer">
              Todos
            </label>
          </div>
          <div
            v-for="status in allStatuses"
            :key="status"
            class="flex items-center mb-2 hover:text-blue-600"
          >
            <input
              type="checkbox"
              :id="status"
              :value="status"
              v-model="localSelectedStatuses"
              @change="onStatusChange"
              class="form-checkbox h-4 w-4 text-blue-600"
            />
            <label :for="status" class="ml-2 text-sm text-gray-700 cursor-pointer">
              {{ status }}
            </label>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import { Icon } from '@iconify/vue';

  // Desestruturando os props
  const { allStatuses, modelValue } = defineProps({
    allStatuses: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  });

  // Emitir eventos para o componente pai
  const emit = defineEmits(['update:modelValue']);

  // Variáveis reativas
  const showStatusFilterMenu = ref(false);
  const localSelectedStatuses = ref([]);
  const selectAllStatuses = ref(true);
  const statusDropdown = ref(null);
  const componentRoot = ref(null);

  // Inicializa o filtro com os valores recebidos
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    if (modelValue.length > 0) {
      localSelectedStatuses.value = [...modelValue];
    } else {
      localSelectedStatuses.value = [...allStatuses];
    }
    selectAllStatuses.value = localSelectedStatuses.value.length === allStatuses.length;
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  // Observa mudanças em 'localSelectedStatuses' para atualizar 'selectAllStatuses'
  watch(
    () => localSelectedStatuses.value,
    (newVal) => {
      selectAllStatuses.value = newVal.length === allStatuses.length;
    }
  );

  // Funções
  function toggleStatusFilterMenu() {
    showStatusFilterMenu.value = !showStatusFilterMenu.value;
  }

  function onStatusChange() {
    emit('update:modelValue', [...localSelectedStatuses.value]);
  }

  function toggleAllStatuses() {
    if (selectAllStatuses.value) {
      localSelectedStatuses.value = [...allStatuses];
    } else {
      localSelectedStatuses.value = [];
    }
    emit('update:modelValue', [...localSelectedStatuses.value]);
  }

  function handleClickOutside(event) {
    if (componentRoot.value && !componentRoot.value.contains(event.target)) {
      showStatusFilterMenu.value = false;
    }
  }
  </script>
