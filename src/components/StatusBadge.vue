<template>
  <span :class="statusClass" class="p-2 text-2xl font-medium rounded-full">
    {{ formatStatus(status) }}
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

const formatStatus = (status) => {
  switch (status) {
    case 'disponivel_pagamento':
      return 'Disponível p/ Pagamento'
    case 'pendente':
      return 'Pendente de Resposta'
    case 'pago':
      return 'Pago'
    case 'aguardando_pagamento':
      return 'Aguardando Pagamento'
    default:
      return status
  }
}

const statusClass = computed(() => {
  const classes = {
    'Aguardando Autorização': 'bg-yellow-100 text-yellow-800',
    'Em Desenvolvimento': 'bg-blue-100 text-blue-800',
    'Em Sustentação': 'bg-green-100 text-green-800',
    'Parado': 'bg-red-100 text-red-800',
    'Finalizado': 'bg-gray-100 text-gray-800',
    'disponivel_pagamento': 'bg-green-100 text-green-800',
    'pendente': 'bg-yellow-100 text-yellow-800',
    'pago': 'bg-green-100 text-green-800',
    'aguardando_pagamento': 'bg-yellow-100 text-yellow-800'
  }
  return classes[props.status] || 'bg-gray-100 text-gray-800'
})
</script>
