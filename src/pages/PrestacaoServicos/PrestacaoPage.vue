<template>
  <div>
    <div class="flex justify-between mt-12 px-6">
      <h1 class="text-5xl font-medium">Prestação de Serviços</h1>
      <router-link
        to="/cadastro/contratos/pj"
        v-if="hasPermission('contratos', 'Criar')"
        class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
      >
        <Icon icon="la:file-contract" class="text-zinc-50" height="25" />
        Novo contrato
      </router-link>
    </div>
    <ListContratoPJ />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useProfileStore } from '@/stores/ProfileStore';
import { usePermissions } from '@/composables/usePermission';
import ListContratoPJ from './ListContratoPJ.vue'

const { hasPermission } = usePermissions();
const store = useProfileStore()
</script>
