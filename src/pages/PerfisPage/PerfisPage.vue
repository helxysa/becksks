<template>
    <div class="menu-lateral-perfis">
        <div class="flex justify-between mt-12 px-6">
           <h1 class="text-5xl font-medium">Tipos de Perfil</h1>
           <button @click="$emit('novo-perfil')"  class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]">
            Novo Perfil
          </button>
        </div>
    
      <ul class="space-y-4">
        <li v-for="perfil in perfis" :key="perfil.id" class="border-b pb-2">
          <h4 class="font-medium">{{ perfil.nome }}</h4>
          <p class="text-sm">
            <strong>Permissões:</strong>
            {{ Object.keys(perfil.permissoes).filter(key => perfil.permissoes[key]).join(', ') }}
          </p>
          <p class="text-sm">
            <strong>Ações:</strong>
            <span v-for="(acoes, funcionalidade) in perfil.acoes" :key="funcionalidade">
              {{ funcionalidade }}: 
              {{ Object.keys(acoes).filter(acao => acoes[acao]).join(', ') }};
            </span>
          </p>
        </li>
      </ul>
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'MenuLateralPerfis',
    props: {
      perfis: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>