<template>
  <div>
    <h2>Renovação</h2>
    <p><strong>Data de Início:</strong> {{ renovacao.dataInicio }}</p>
    <p><strong>Data de Fim:</strong> {{ renovacao.dataFim }}</p>
    <p><strong>Tipo:</strong> {{ renovacao.tipoRenovacao }}</p>
    <p><strong>Porcentagem:</strong> {{ renovacao.porcentagemRenovacao }}%</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  renovacao: Object
});

</script>
