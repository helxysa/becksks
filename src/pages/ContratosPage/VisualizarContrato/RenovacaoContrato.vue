<template>
  <div>
    <section class="p-8">
      <h1 class="font-bold text-4xl mb-4">Dados do contrato</h1>
      <p><strong>Cliente:</strong> {{contrato.nomeCliente}}</p>
      <p><strong>Vigência:</strong> {{ contrato.dataInicio }} <strong>até</strong> {{ contrato.dataFim }}</p>
      <p><strong>Fiscal:</strong> {{contrato.fiscal}}</p>
      <p><strong>Ponto Focal:</strong> {{ contrato.pontoFocal }}</p>
      <p><strong>Objeto do contrato:</strong> {{contrato.objetoContrato}}</p>
      <p><strong>Valor Contratado:</strong> R$ {{contrato.saldoContrato}}</p>
    </section>

    <section class="p-8">
      <h1 class="font-bold text-4xl mb-4">Dados da Renovação</h1>
      <p><strong>Vigência:</strong> {{ renovacao.dataInicio }} <strong>até</strong> {{ renovacao.dataFim }}</p>
      <p><strong>Tipo:</strong> {{ renovacao.tipoRenovacao }}</p>
      <p><strong>Porcentagem:</strong> {{ renovacao.porcentagemRenovacao }}%</p>
    </section>


  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  renovacao: Object,
  contrato: Object
});

</script>
