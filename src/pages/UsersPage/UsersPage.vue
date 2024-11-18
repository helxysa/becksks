<template>
  <div>
    <div class="flex justify-between mt-12 px-6 mb-8">
      <h1 class="text-5xl font-medium">Usuários</h1>
      <button
        @click="openModal"
        class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        v-if="hasPermission('usuarios', 'Criar')"
      >
        <Icon icon="la:file-contract" class="text-zinc-50" height="25" />
        <span>Novo Usuário</span>
      </button>
    </div>
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
    >
      <l-waveform size="40" stroke="3.5" speed="1" color="white"></l-waveform>
    </div>
    <div v-else>
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
            <td class="text-2xl">{{ user.nome }}</td>
            <td class="text-2xl">{{ user.cargo }}</td>
            <td class="text-2xl">{{ user.setor }}</td>
            <td class="text-2xl">{{ user.email }}</td>
            <td class="text-2xl">{{ user?.profile?.name }}</td>
            <td>
              <div class="flex justify-center items-center gap-2">
                <span v-if="hasPermission('usuarios', 'Visualizar')">
                  <Icon
                    icon="ph:eye"
                    height="20"
                    class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    @click="viewUser(user)"
                  />
                </span>
                <span v-if="hasPermission('usuarios', 'Editar')">
                  <Icon
                    icon="bx:edit"
                    height="20"
                    class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    @click="editUser(user)"
                  />
                </span>
                <span v-if="hasPermission('usuarios', 'Visualizar')">
                  <Icon
                    icon="ph:trash"
                    height="20"
                    class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    @click="deleteUser(user.id)"
                  />
                </span>
              </div>
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
      :modalTitle="isEditing ? 'Editar Usuário' : 'Criar Novo Usuário'"
    >
      <template #content>
        <div class="bg-white rounded-lg p-8">
          <form @submit.prevent="salvarUsuario">
            <div class="mb-4">
              <label for="name" class="font-bold text-3xl mb-2">Nome</label>
              <input
                v-model="newUser.nome"
                id="name"
                type="text"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Informe o nome do usuário"
              />
            </div>
            <div class="mb-4">
              <label for="cargo" class="font-bold text-3xl mb-2">Cargo</label>
              <input
                v-model="newUser.cargo"
                id="cargo"
                type="text"
                class="w-full p-2 rounded focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 h-16"
                required
                placeholder="Informe o cargo"
              />
            </div>
            <div class="mb-4">
              <label for="setor" class="font-bold text-3xl mb-2">Setor</label>
              <input
                v-model="newUser.setor"
                id="setor"
                type="text"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Informe o setor"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="font-bold text-3xl mb-2">E-mail</label>
              <input
                v-model="newUser.email"
                id="email"
                type="email"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Informe o email"
              />
            </div>
            <div class="mb-4">
              <label for="confirmEmail" class="font-bold text-3xl mb-2">Confirmação de E-mail</label>
              <input
                v-model="confirmEmail"
                id="confirmEmail"
                type="email"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Confirme o email"
              />
            </div>
            <div class="mb-4">
              <label for="role" class="font-bold text-3xl mb-2">Perfil</label>
              <select
                v-model=" newUser.profileId"
                id="role"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
              >
                <option value="" disabled hidden>Selecione um perfil</option>
                <option v-for="perfil in perfis" :key="perfil.id" :value="perfil.id">
                  {{ perfil.name }}
                </option>
              </select>
            </div>
            <div class="mb-4 flex justify-between" >
              <button
              v-if="isEditing"
              type="button"
              @click="resetPassword"
              class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-red-500 border border-gray-300 rounded-md font-bold text-xl text-gray-100 tracking-widest shadow-sm  focus:outline-none hover:bg-red-700 h-16 w-50"
            >
              Resetar Senha
            </button>
              <p class="text-xl text-gray-600 mb-6">Uma senha padrão será encaminhada para o email cadastrado.</p>
            </div>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="closeModal"
                class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none hover:bg-gray-100 h-14 w-40"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 inline-flex ml-3 items-center justify-center px-4 py-4 border border-transparent rounded-md font-bold text-xl text-white tracking-widest transition h-14 w-40"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </template>
    </JetDialogModal>

    <JetDialogModal
      :show="showViewModal"
      :withouHeader="false"
      @close="closeViewModal"
      maxWidth="6xl"
      :modalTitle="'Visualizar Usuário'"
    >
      <template #content>
        <div class="bg-white rounded-lg p-8">
          <div>
            <div class="mb-4">
              <label for="name" class="font-bold text-3xl mb-2">Nome</label>
              <input
                v-model="userVisualizado.nome"
                id="name"
                type="text"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Informe o nome do usuário"
                disabled
              />
            </div>
            <div class="mb-4">
              <label for="cargo" class="font-bold text-3xl mb-2">Cargo</label>
              <input
                v-model="userVisualizado.cargo"
                id="cargo"
                type="text"
                class="w-full p-2 rounded focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 h-16"
                required
                placeholder="Informe o cargo"
                disabled
              />
            </div>
            <div class="mb-4">
              <label for="setor" class="font-bold text-3xl mb-2">Setor</label>
              <input
                v-model="userVisualizado.setor"
                id="setor"
                type="text"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Informe o setor"
                disabled
              />
            </div>
            <div class="mb-4">
              <label for="email" class="font-bold text-3xl mb-2">E-mail</label>
              <input
                v-model="userVisualizado.email"
                id="email"
                type="email"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Informe o email"
                disabled
              />
            </div>
            <!-- <div class="mb-4">
              <label for="confirmEmail" class="font-bold text-3xl mb-2">Confirmação de E-mail</label>
              <input
                v-model="userVisualizado.confirmEmail"
                id="confirmEmail"
                type="email"
                class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
                required
                placeholder="Confirme o email"
                disabled
              />
            </div> -->
            <div class="mb-4">
              <label for="role" class="font-bold text-3xl mb-2">Perfil</label>
              <input
              v-model="userVisualizado.profile.name"
              id="perfil"
              type="text"
              class="w-full p-2 focus:border-[#FF6600] border-2 focus:outline-none px-4 py-2 border-gray-300 rounded-md h-16"
              required
              placeholder="Informe o email"
              disabled
            />
            </div>
            <p class="text-xl text-gray-600 mb-6">Uma senha padrão será encaminhada para o email cadastrado.</p>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="closeViewModal"
                class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none hover:bg-gray-100 h-14 w-40"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </template>
    </JetDialogModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { Icon } from "@iconify/vue";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from "vue3-toastify";
import { waveform } from "ldrs";
import Swal from "sweetalert2";
import { useProfileStore } from '@/stores/ProfileStore';
import { usePermissions } from '@/composables/usePermission';

const { hasPermission } = usePermissions();
const store = useProfileStore()
waveform.register();
const users = ref([]);
const loading = ref(true);
const showModal = ref(false);
const showViewModal = ref(false);
const isEditing = ref(false);
const userVisualizado = ref({});
const perfis = ref([]);
const newUser = ref({
  nome: '',
  cargo: '',
  setor: '',
  email: '',
  profileId: ''
});
const confirmEmail = ref('');

const buscarPerfis = async () => {
  try {
    const resposta = await api.get("/perfil");
    perfis.value = resposta.data;
  } catch (erro) {
    toast.error("Erro ao carregar os perfis.", { theme: "colored" });
  }
};

const openModal = () => {
  showModal.value = true;
  isEditing.value = false;
  buscarPerfis();
};

const closeViewModal = () => {
  showViewModal.value = false;
  userVisualizado.value = {};
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  resetNewUser();
  confirmEmail.value = '';
};

const viewUser = (user) => {
  userVisualizado.value = user;
  showViewModal.value = true;
};

const editUser = (user) => {
  isEditing.value = true;
  showModal.value = true;
  buscarPerfis();
  newUser.value = {
    nome: user.nome,
    cargo: user.cargo,
    setor: user.setor,
    email: user.email,
    profileId: user.profile ? user.profile.id : '',
    id: user.id
  };
};

const deleteUser = (id) => {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este usuário?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      api.delete(`/users/${id}`)
        .then(() => {
          fetchUsers();
          toast.success("Usuário deletado com sucesso!", { theme: "colored" });
        })
        .catch((error) => {
          toast.error("Não foi possível deletar o usuário!", { theme: "colored" });
          console.error("Erro ao deletar usuário:", error);
        });
    }
  });
};

const resetPassword = () => {
  Swal.fire({
    title: "Confirmar reset de senha",
    text: "Tem certeza que deseja resetar a senha deste usuário?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      api.put(`/users/reset-password`, { email: newUser.value.email })
      .then(() => {
        toast.success("Senha resetada com sucesso!", { theme: "colored" });
        closeModal();
      })
      .catch((error) => {
        toast.error("Não foi possível resetar a senha!", { theme: "colored" });
        console.error("Erro ao resetar senha:", error);
      });

    }
  });
}

const resetNewUser = () => {
  newUser.value = {
    nome: '',
    cargo: '',
    setor: '',
    email: '',
    profileId: ''
  };
};

const salvarUsuario = async () => {
  const userData = {
    nome: newUser.value.nome,
    cargo: newUser.value.cargo,
    setor: newUser.value.setor,
    email: newUser.value.email,
    profileId: newUser.value.profileId
  };
  if (newUser.value.email !== confirmEmail.value) {
    toast.error('Os e-mails não coincidem. Por favor, verifique.', { theme: "colored" });
    return;
  }
  try {
    if (isEditing.value) {
      await api.put(`/users/update/${newUser.value.id}`, userData);
      toast.success("Usuário editado com sucesso!", { theme: "colored" });
    } else {
      await api.post("/register", userData);
      toast.success("Usuário criado com sucesso!", { theme: "colored" });
    }
    closeModal();
    fetchUsers();
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro ao adicionar o usuário. Por favor, tente novamente.";
    toast.error(errorMessage, { theme: "colored" });
  }
};

const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    users.value = response.data;
    loading.value = false;

    await atualizarUsuarioLogado();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    loading.value = false;
  }
};

const atualizarUsuarioLogado = async () => {
  try {
    const profileUser = localStorage.getItem("profileUser");
    const userId = JSON.parse(profileUser).id

    if (!userId) {
      throw new Error("ID do usuário não encontrado.");
    }
    const response = await api.get(`/users/${userId}`);
    const perfilAtualizado = response.data;
    const store = useProfileStore();
    const perfilAtual = store.profile;
    if (JSON.stringify(perfilAtual) !== JSON.stringify(perfilAtualizado)) {
      store.$patch({
        ...perfilAtualizado,
      });
    }
  } catch (error) {
    console.error("Erro ao buscar perfil atualizado:", error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
