<template>
  <div>
    <div class="flex justify-between mt-12 px-6">
      <h1 class="text-5xl font-medium">Contratos</h1>
      <button class="btn-cadastro relative">
        <router-link to="cadastro/contratos">
          <router-view >
            Novo contrato
          </router-view>
        </router-link>
        <span class="absolute right-[5px] top-[8px]">
          <Icon icon="material-symbols-light:add" class="text-zinc-50" height="25" />
        </span>
      </button>
    </div>
    <ListContratos/>
  </div>
</template>

<script setup>
import ListContratos from "@/components/list/ListContratos.vue";
import { RouterLink } from 'vue-router';
import { Icon } from "@iconify/vue";

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
