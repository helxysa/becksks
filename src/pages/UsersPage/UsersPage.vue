<template>
    <div>
        <div class="flex justify-between mt-12 px-6 mb-8">
            <h1 class="text-5xl font-medium">Usuários</h1>
              <button
                @click="openModal"
                class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
              >
                <Icon
                  icon="la:file-contract"
                  class="text-zinc-50"
                  height="25"
                />
                <span>Novo Usuário</span>                            
              </button>
          </div>
   
      <div v-if="!loading">
        <table class="table-auto border border-slate-200 rounded-2xl w-full">
          <thead class="h-20 bg-slate-100 border-1">
            <tr>
              <th class="text-xl px-2">ID</th>
              <th class="text-xl">Nome</th>
              <th class="text-xl">Cargo</th>
              <th class="text-xl">Setor</th>
              <th class="text-xl">E-mail</th>
              <th class="text-xl">Perfil</th>
              <th class="text-xl">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="h-24 text-center">
              <td class="text-2xl px-2">{{ user.id }}</td>
              <td class="text-2xl">{{ user.name }}</td>
              <td class="text-2xl">{{ user.cargo }}</td>
              <td class="text-2xl">{{ user.setor }}</td>
              <td class="text-2xl">{{ user.email }}</td>
              <td class="text-2xl">{{ user.role }}</td>
              <td>
                <div class="flex justify-center items-center gap-2">
                  <!-- <span >
                    <Icon
                      icon="ph:eye"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    />
                  </span> -->
                  <span>
                    <Icon
                      icon="bx:edit"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                      @click="openUserEditModal(user)"
                    />
                  </span>
                  <span >
                    <Icon
                      icon="ph:trash"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="flex justify-center items-center h-[50vh]">
        <l-tailspin size="200" stroke="5" speed="0.9" color="rgb(28, 125, 62)" />
      </div>

        <!-- Modal para adicionar novo usuário -->
    <JetDialogModal
      :show="showModal"
      :withouHeader="false"
      @close="closeModal"
      maxWidth="6xl"
      :modalTitle="'Adicionar Novo Usuário'"
    >
      <template #content>
     <div>
      <div class="bg-white rounded-lg p-8 ">
      
        <form @submit.prevent="addUser">
          <div class="mb-4">
            <label for="name" class="font-bold text-3xl mb-2">Nome</label>
            <input v-model="newUser.name" id="name" type="text" class="w-full p-2  focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required
            placeholder="Informe o nome do usuário">
          </div>
          <div class="mb-4">
            <label for="cargo" class="font-bold text-3xl mb-2">Cargo</label>
            <input v-model="newUser.cargo" id="cargo" type="text" class="w-full p-2  rounded focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300  h-16" required
            placeholder="Informe o cargo">
          </div>
          <div class="mb-4">
            <label for="setor" class="font-bold text-3xl mb-2">Setor</label>
            <input v-model="newUser.setor" id="setor" type="text" class="w-full p-2   focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md  h-16" required
            placeholder="Informe o setor">
          </div>
          <div class="mb-4">
            <label for="email" class="font-bold text-3xl mb-2">E-mail</label>
            <input v-model="newUser.email" id="email" type="email" class="w-full p-2  focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required
            placeholder="Informe o email">
          </div>
          <div class="mb-4">
            <label for="confirmEmail" class="font-bold text-3xl mb-2">Confirmação de E-mail</label>
            <input v-model="newUser.confirmEmail" id="confirmEmail" type="email" class="w-full p-2 focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required
            placeholder="Confirme o email">
          </div>
          <div class="mb-4">
            <label for="role" class="font-bold text-3xl mb-2">Perfil</label>
            <select v-model="newUser.role" id="role" class="w-full p-2  focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required>
              <option value="">Selecione um perfil</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuário</option>
            </select>
          </div>
          <p class="text-xl text-gray-600 mb-6">Uma senha padrão será encaminhada para o email cadastrado.</p>
          <div class="flex justify-end gap-4">
            <button type="button" @click="closeModal" class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40">Cancelar</button>
            <button type="submit" class="  bg-blue-500 hover:bg-blue-600
            inline-flex ml-3 items-center justify-center px-4 py-4 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14  w-40">
            Salvar
          </button>
          </div>
        </form>
      </div>
    </div>
      </template>
    </JetDialogModal>
       <!-- Modal para editar usuário -->
       <JetDialogModal
       :show="modalEditUser"
       :withouHeader="false"
       @close="closeModalEditUser"
       maxWidth="6xl"
       :modalTitle="'Editar Usuário'"
     >
       <template #content>
      <div>
       <div class="bg-white rounded-lg p-8 ">
       
         <form @submit.prevent="addUser">
           <div class="mb-4">
             <label for="name" class="font-bold text-3xl mb-2">Nome</label>
             <input v-model="editUser.name" id="name" type="text" class="w-full p-2  focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required
             placeholder="Informe o nome do usuário">
           </div>
           <div class="mb-4">
             <label for="cargo" class="font-bold text-3xl mb-2">Cargo</label>
             <input v-model="editUser.cargo" id="cargo" type="text" class="w-full p-2  rounded focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300  h-16" required
             placeholder="Informe o cargo">
           </div>
           <div class="mb-4">
             <label for="setor" class="font-bold text-3xl mb-2">Setor</label>
             <input v-model="editUser.setor" id="setor" type="text" class="w-full p-2   focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md  h-16" required
             placeholder="Informe o setor">
           </div>
           <div class="mb-4">
             <label for="email" class="font-bold text-3xl mb-2">E-mail</label>
             <input v-model="editUser.email" id="email" type="email" class="w-full p-2  focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required
             placeholder="Informe o email">
           </div>
           <div class="mb-4">
             <label for="confirmEmail" class="font-bold text-3xl mb-2">Confirmação de E-mail</label>
             <input v-model="editUser.confirmEmail" id="confirmEmail" type="email" class="w-full p-2 focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required
             placeholder="Confirme o email">
           </div>
           <div class="mb-4">
             <label for="role" class="font-bold text-3xl mb-2">Perfil</label>
             <select v-model="editUser.role" id="role" class="w-full p-2  focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2  border-gray-300 rounded-md h-16" required>
               <option value="">Selecione um perfil</option>
               <option value="admin">Administrador</option>
               <option value="user">Usuário</option>
             </select>
           </div>
           <p class="text-xl text-gray-600 mb-6">Uma senha padrão será encaminhada para o email cadastrado.</p>
           <div class="flex justify-end gap-4">
             <button type="button" @click="closeModalEditUser" class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40">Cancelar</button>
             <button type="submit" class="  bg-blue-500 hover:bg-blue-600
             inline-flex ml-3 items-center justify-center px-4 py-4 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14  w-40">
             Salvar
           </button>
           </div>
         </form>
       </div>
     </div>
       </template>
     </JetDialogModal>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { api } from '@/services/api';
  import { tailspin } from 'ldrs';
  import { Icon } from "@iconify/vue";
  import JetDialogModal from "@/components/modals/DialogModal.vue";
  
  tailspin.register();
  
  const users = ref([]);
  const loading = ref(true);
  const showModal = ref(false);
  const modalEditUser = ref(false);
  const newUser = ref({
    name: '',
    cargo: '',
    setor: '',
    email: '',
    confirmEmail: '',
    role: ''
  });

  const editUser = ref({});

  const openModal = () => {
    showModal.value = true;
  };

  const openUserEditModal = (item) => {
  editUser.value = { ...item };
  modalEditUser.value = true;  
};
  
  const closeModalEditUser = () => {
    modalEditUser.value = false;
    editUser.value = {};
  };

  const closeModal = () => {
    showModal.value = false;
    resetNewUser();
  };

  const resetNewUser = () => {
    newUser.value = {
      name: '',
      cargo: '',
      setor: '',
      email: '',
      confirmEmail: '',
      role: ''
    };
  };

  const addUser = async () => {
    if (newUser.value.email !== newUser.value.confirmEmail) {
      alert('Os e-mails não coincidem. Por favor, verifique.');
      return;
    }

    try {
      const response = await api.post('/users', newUser.value);
      users.value.push(response.data);
      closeModal();
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Ocorreu um erro ao adicionar o usuário. Por favor, tente novamente.');
    }
  };

  const fetchUsers = async () => {
    try {
      loading.value = true;
      const response = await api.get('/users');
      users.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchUsers();
  });
  </script>