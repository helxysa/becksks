<template>
    <div class="menu-lateral-perfis">
        <div class="flex justify-between mt-12 px-6">
           <h1 class="text-5xl font-medium">Tipos de Perfil</h1>
           <button   class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
           @click="openModal">
            <Icon
            icon="la:file-contract"
            class="text-zinc-50"
            height="25"
          />
          <span>Novo Perfil</span> 
          </button>
        </div>
    
      <div v-if="carregando" class="flex justify-center items-center mt-8">
        <l-tailspin size="200" stroke="5" speed="0.9" color="rgb(28, 125, 62)" />
      </div>

      <table v-else class="w-full mt-8 table-auto border border-slate-200 rounded-2xl">
        <thead class="h-20 bg-slate-100 border-1">
          <tr >
            <th class="text-xl">ID</th>
            <th class="text-xl">Nome</th>
            <th class="text-xl">Permissões</th>
            <th class="text-xl">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perfil in perfis" :key="perfil.id" class="border-b">
            <td class="px-4 py-2">{{ perfil.id }}</td>
            <td class="px-4 py-2">{{ perfil.nome }}</td>
            <td class="px-4 py-2">
              {{ Object.keys(perfil.permissoes).filter(key => perfil.permissoes[key]).join(', ') }}
            </td>
            <td class="px-4 py-2">
              <span v-for="(acoes, funcionalidade) in perfil.acoes" :key="funcionalidade">
                {{ funcionalidade }}: 
                {{ Object.keys(acoes).filter(acao => acoes[acao]).join(', ') }};
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    
    </div>
    <JetDialogModal
    :show="showModal"
    :withouHeader="false"
    @close="closeModal"
    maxWidth="6xl"
    :modalTitle="'Adicionar Novo Perfil'"
    >
     <template #content>
      <form @submit.prevent="salvarPerfil">
        <div class="mb-4">
          <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
          <input type="text" id="nome" v-model="novoPerfil.nome" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-medium text-gray-700 mb-2">Permissões</h3>
          <div v-for="(permissao, index) in permissoes" :key="index" class="mb-2">
            <div class="flex items-center justify-between p-4 bg-gray-100 rounded-md">
              <span class="text-sm font-medium text-gray-700">{{ permissao.nome }}</span>
              <label class="switch">
                <input type="checkbox" v-model="novoPerfil.permissoes[permissao.chave]">
                <span class="slider round"></span>
              </label>
            </div>
            <div v-if="novoPerfil.permissoes[permissao.chave]" class="mt-2 ml-4">
              <label v-for="acao in acoes" :key="acao" class="flex items-center">
                <input type="checkbox" v-model="novoPerfil.acoes[permissao.chave][acao]" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-600">{{ acao }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Salvar</button>
        </div>
      </form>
    </template>
    </JetDialogModal>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Icon } from "@iconify/vue";
  import JetDialogModal from "@/components/modals/DialogModal.vue";
  import { tailspin } from 'ldrs';
  import { api } from '@/services/api';

  tailspin.register();

  const perfis = ref([]);
  const carregando = ref(true);
  const showModal = ref(false);

  const buscarPerfis = async () => {
    try {
      const resposta = await api.get('/perfil');
      console.log(resposta.data, 'resposta')
      perfis.value = resposta.data;
      carregando.value = false;
    } catch (erro) {
      console.error('Erro ao buscar perfis:', erro);
      carregando.value = false;
    }
  };

  const openModal = () => {
    showModal.value = true;
  };
  const closeModal = () => {
    showModal.value = false;
  };

  const novoPerfil = ref({
    nome: '',
    permissoes: {},
    acoes: {}
  });

  const permissoes = [
    { nome: 'Usuários', chave: 'usuarios' },
    { nome: 'Produtos', chave: 'produtos' },
    // Adicione mais permissões conforme necessário
  ];

  const acoes = ['Criar', 'Visualizar', 'Editar', 'Deletar'];

  permissoes.forEach(permissao => {
    novoPerfil.value.permissoes[permissao.chave] = false;
    novoPerfil.value.acoes[permissao.chave] = {
      Criar: false,
      Visualizar: false,
      Editar: false,
      Deletar: false
    };
  });

  const salvarPerfil = async () => {
    try {
      await api.post('/perfil', novoPerfil.value);
      closeModal();
      buscarPerfis();
    } catch (erro) {
      console.error('Erro ao salvar perfil:', erro);
    }
  };

  onMounted(() => {
    buscarPerfis();
  });
  
  </script>
  
  <style scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  </style>