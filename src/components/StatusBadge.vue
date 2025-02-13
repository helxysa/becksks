<template>
  <span :class="badgeClass" class="px-3 py-1 rounded-full text-sm font-medium">
    {{ statusText }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  const classes = {
    'pendente': 'bg-yellow-100 text-yellow-800',
    'disponivel_pagamento': 'bg-green-100 text-green-800'
  }
  return classes[props.status] || 'bg-gray-100 text-gray-800'
})

const statusText = computed(() => {
  const texts = {
    'pendente': 'Pendente',
    'disponivel_pagamento': 'Disponível para Pagamento'
  }
  return texts[props.status] || props.status
})
</script>
