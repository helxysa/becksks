<template>
  <div>
    <div class="flex justify-between mt-12 ">
      <h1 class="text-5xl font-medium">Contratos</h1>
      <button class="btn-cadastro">
        <router-link to="cadastro/contratos">
          <router-view>
            Novo contrato
          </router-view>
        </router-link>
      </button>
    </div>
    <div class="flex gap-8 flex-wrap">
      <ListContratos/>

    </div>
    <!-- <table class="mt-16 table-auto border border-slate-200 rounded-2xl w-full">
      <thead class="h-24 bg-slate-100 border-1">
        <tr class="">
          <th class="text-2xl">Nome</th>
          <th class="text-2xl">Vigência</th>
          <th class="text-2xl">Objeto contrato</th>
          <th class="text-2xl">Opções</th>
        </tr>
      </thead>
      <tbody>
        <ListContratos />
      </tbody>
    </table> -->
  </div>
</template>

<script setup>
import ListContratos from "@/components/list/ListContratos.vue";
import { RouterLink } from 'vue-router';

</script>

<style  scoped>
.btn-cadastro {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 160px;
  height: 40px;
}

.btn-cadastro:hover {
  background-color:  #0ea5e9;;
}
</style>
