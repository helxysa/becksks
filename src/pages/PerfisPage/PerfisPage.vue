<template>
  <div>
    <div class="flex justify-between mt-12 px-6">
      <h1 class="text-5xl font-medium">Tipos de Perfil</h1>
      <button
        class="flex items-center justify-center gap-2 px-9 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        @click="openModal"
        v-if="hasPermission('perfil', 'Criar')"
      >
        <Icon icon="la:file-contract" class="text-zinc-50" height="25" />
        <span>Novo Perfil</span>
      </button>
    </div>

    <div
      v-if="carregando"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
    >
      <l-waveform size="40" stroke="3.5" speed="1" color="white"></l-waveform>
    </div>

    <table
      v-else
      class="w-full mt-8 table-auto border border-slate-200 rounded-2xl"
    >
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th class="text-xl">ID</th>
          <th class="text-xl">Nome</th>
          <th class="text-xl">Permissões</th>
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="perfil in perfis" :key="perfil.id" class="border-b">
          <td class="p-4">{{ perfil.id }}</td>
          <td class="p-4">{{ perfil.name }}</td>
          <td class="p-4">
            <span
              v-for="permissao in perfil.permissions.filter((p) => p.actions && Object.values(p.actions).some((v) => v === true))"
              :key="permissao.name"
              class="inline-flex items-center mb-2"
            >
              <span class="font-medium">{{ permissoesNomeMap[permissao.name] || permissao.name }}</span>:
              <span class="flex items-center mx-2">
                <span
                  v-for="(isActive, actionName) in permissao.actions"
                  :key="actionName"
                  :title="actionIcons[actionName].title"
                  >
                  <Icon
                  class="transition-transform ease-in-out transform hover:-translate-y-[2px] cursor-pointer"
                    v-if="isActive && actionIcons[actionName]"
                    :icon="actionIcons[actionName].icon"
                    :class="actionIcons[actionName].class"
                    :height="actionIcons[actionName].height"
                  />
                </span>
              </span>
            </span>
          </td>
          <td class="p-4 flex justify-center items-center h-full">
            <span v-if="hasPermission('perfil', 'Visualizar')" @click="viewPerfil(perfil)">
              <Icon
                icon="ph:eye"
                height="20"
                class="text-black cursor-pointer transition-transform ease-in-out transform hover:-translate-y-[2px]"
              />
            </span>
            <span v-if="hasPermission('perfil', 'Editar')" @click="editPerfil(perfil)">
              <Icon
                icon="bx:edit"
                height="18"
                class="text-black cursor-pointer transition-transform ease-in-out transform hover:-translate-y-[2px]"
              />
            </span>
            <span v-if="hasPermission('perfil', 'Deletar')" @click="deletePerfil(perfil.id)">
              <Icon
                icon="ph:trash"
                height="20"
                class="cursor-pointer transition-transform ease-in-out transform hover:-translate-y-[2px]"
              />
            </span>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Modal de criação/edição -->
    <JetDialogModal
      :show="showModal"
      :withouHeader="false"
      @close="closeModal"
      maxWidth="6xl"
      :modalTitle="isEditing.value ? 'Editar Perfil' : 'Criar Novo Perfil'"
    >
      <template #content>
        <form @submit.prevent="salvarPerfil">
          <div class="mb-4 flex items-center gap-4">
            <input
              type="text"
              id="nome"
              v-model="novoPerfil.name"
              class="text-2xl font-sans pl-4 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              placeholder="Digite o nome do perfil"
            />
          </div>

          <div class="mb-4">
            <h3 class="text-2xl font-medium text-gray-700 mb-2">Permissões</h3>
            <div
              v-for="(permissao, index) in permissoes"
              :key="index"
              class="mb-2"
            >
              <div
                class="flex items-center justify-between p-4 bg-gray-100 rounded-md transition-all duration-300"
              >
                <span class="text-md font-medium text-gray-700">{{
                  permissao.nome
                }}</span>
                <label class="flex cursor-pointer select-none items-center">
                  <div class="relative">
                    <input
                      type="checkbox"
                      class="sr-only"
                      v-model="novoPerfil.permissions[permissao.chave].active"
                    />
                    <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
                    <div
                      :class="{
                        'translate-x-full !bg-blue-500':
                          novoPerfil.permissions[permissao.chave].active,
                      }"
                      class="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out"
                    ></div>
                  </div>
                </label>
              </div>

              <div
                v-if="novoPerfil.permissions[permissao.chave].active"
                class="mt-2 ml-4"
              >
                <label
                  v-for="action in permissao.actions"
                  :key="action"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    v-model="novoPerfil.permissions[permissao.chave][action]"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-md text-gray-600">{{ action }}</span>
                </label>
              </div>
            </div>
          </div>

          <footer class="flex justify-end gap-4 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            >
              Fechar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            >
              Salvar
            </button>
          </footer>
        </form>
      </template>
    </JetDialogModal>

    <!-- Modal de visualização -->
    <JetDialogModal
      :show="showViewModal"
      :withouHeader="false"
      @close="closeViewModal"
      maxWidth="6xl"
      modalTitle="Visualizar Perfil"
    >
      <template #content>
        <div class="mb-4 flex gap-4 items-center">
          <label class="font-medium text-gray-700">Nome</label>
          <p class="font-medium text-3xl">{{ perfilVisualizado.name }}</p>
        </div>

        <div class="mb-4">
          <h3 class="font-medium text-gray-700 my-4 text-4xl">Permissões</h3>
          <div
            v-for="(permissao, index) in permissoesAtivas"
            :key="index"
            class="mb-2"
          >
            <p class="text-md font-medium text-gray-700">{{ permissao.nome }}</p>
            <ul class="ml-8 list-disc">
              <li
                v-for="acao in permissao.acoes"
                :key="acao"
                class="text-md text-gray-600"
              >
                {{ acao }}
              </li>
            </ul>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="closeViewModal"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          >
            Fechar
          </button>
        </div>
      </template>
    </JetDialogModal>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { Icon } from "@iconify/vue";
  import JetDialogModal from "@/components/modals/DialogModal.vue";
  import Swal from "sweetalert2";
  import { api } from "@/services/api";
  import { toast } from "vue3-toastify";
  import { useProfileStore } from "@/stores/ProfileStore";
  import { waveform } from "ldrs";
  import { usePermissions } from '@/composables/usePermission';

  waveform.register();
  const { hasPermission } = usePermissions();
  const store = useProfileStore();
  const perfis = ref([]);
  const carregando = ref(true);
  const showModal = ref(false);
  const isEditing = ref(false);

  // Variáveis para visualização
  const showViewModal = ref(false);
  const perfilVisualizado = ref({});
  const permissoesAtivas = ref([]);

  const permissoes = [
    { nome: "Usuários", chave: "usuarios", actions: ["Criar", "Visualizar", "Editar", "Deletar"] },
    { nome: "Perfil", chave: "perfil", actions: ["Criar", "Visualizar", "Editar", "Deletar"] },
    { nome: "Contratos", chave: "contratos", actions: ["Criar", "Visualizar", "Editar", "Deletar", "Visualizar Finanças"] },
    { nome: "Itens de contrato", chave: "itens_contrato", actions: ["Criar", "Visualizar", "Editar", "Deletar"] },
    { nome: "Medições", chave: "medicoes", actions: ["Criar", "Visualizar", "Editar", "Deletar", "Notificar"] },
    { nome: "Faturamentos", chave: "faturamentos", actions: ["Criar", "Visualizar", "Editar", "Deletar"] },
    { nome: "Projetos", chave: "projetos", actions: ["Criar", "Visualizar", "Editar", "Deletar"] },
    { nome: "Dashboard", chave: "dashboard", actions: ["Visualizar"] },
    { nome: "Registros", chave: "registros", actions: ["Visualizar"] },
  ];

  // Mapeamento de chaves para nomes
  const permissoesNomeMap = Object.fromEntries(
    permissoes.map((permissao) => [permissao.chave, permissao.nome])
  );

  // Mapeamento de ícones para as ações
  const actionIcons = {
    Criar: {
      icon: 'octicon:feed-plus-16',
      class: 'text-blue-500',
      height: 16,
      title: 'Criar',
    },
    Editar: {
      icon: 'bx:edit',
      class: 'text-green-500',
      height: 18,
      title: 'Editar',
    },
    Visualizar: {
      icon: 'ph:eye',
      class: 'text-blue-500',
      height: 20,
      title: 'Visualizar',
    },
    Deletar: {
      icon: 'ph:trash',
      class: 'text-red-500',
      height: 20,
      title: 'Deletar',
    },
    'Visualizar Finanças': {
      icon: 'mdi:currency-usd',
      class: 'text-green-600',
      height: 20,
      title: 'Visualizar Finanças',
    },
    Notificar: {
      icon: 'carbon:notification',
      class: 'text-yellow-500',
      height: 20,
      title: 'Notificar',
    },
  };

  const buscarPerfis = async () => {
    try {
      const resposta = await api.get("/perfil");
      perfis.value = resposta.data;
      atualizarUsuarioLogado();
      carregando.value = false;
    } catch (erro) {
      carregando.value = false;
      toast.error("Erro ao carregar os perfis.", { theme: "colored" });
    }
  };

  const atualizarUsuarioLogado = async () => {
    try {
      const profileUser = localStorage.getItem("profileUser");
      const userId = JSON.parse(profileUser).id;

      if (!userId) {
        throw new Error("ID do usuário não encontrado.");
      }
      const response = await api.get(`/users/${userId}`);
      const perfilAtualizado = response.data;
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

  const openModal = () => {
    isEditing.value = false;
    showModal.value = true;

    novoPerfil.value = {
      name: "",
      permissions: {},
    };

    permissoes.forEach((permissao) => {
      novoPerfil.value.permissions[permissao.chave] = {
        active: false,
      };
      permissao.actions.forEach((action) => {
        novoPerfil.value.permissions[permissao.chave][action] = false;
      });
    });
  };

  const closeModal = () => {
    showModal.value = false;
    isEditing.value = false;
  };

  const novoPerfil = ref({
    name: "",
    permissions: {},
  });

  const salvarPerfil = async () => {
    const perfilData = {
      name: novoPerfil.value.name,
      permissions: Object.entries(novoPerfil.value.permissions).map(
        ([key, value]) => {
          const actions = {};
          for (const [actionKey, actionValue] of Object.entries(value)) {
            if (actionKey !== 'active') {
              actions[actionKey] = actionValue;
            }
          }
          return {
            name: key,
            actions,
          };
        }
      ),
    };

    try {
      if (isEditing.value) {
        await api.put(`/perfil/${novoPerfil.value.id}`, perfilData);
        toast.success("Perfil editado com sucesso!", { theme: "colored" });
      } else {
        await api.post("/perfil", perfilData);
        toast.success("Perfil criado com sucesso!", { theme: "colored" });
      }
      closeModal();
      buscarPerfis();
    } catch (erro) {
      const errorMessage =
        erro.response?.data?.message ||
        "Erro ao salvar o perfil. Por favor, tente novamente.";
      toast.error(errorMessage, { theme: "colored" });
    }
  };

  const viewPerfil = (perfil) => {
    perfilVisualizado.value = perfil;
    permissoesAtivas.value = [];

    permissoes.forEach((permissao) => {
      const permData = perfil.permissions.find((p) => p.name === permissao.chave);
      if (permData && permData.actions) {
        const acoesAtivas = [];
        for (const [actionKey, actionValue] of Object.entries(permData.actions)) {
          if (actionValue) {
            acoesAtivas.push(actionKey);
          }
        }

        if (acoesAtivas.length > 0) {
          permissoesAtivas.value.push({
            nome: permissao.nome,
            acoes: acoesAtivas,
          });
        }
      }
    });

    showViewModal.value = true;
  };

  const closeViewModal = () => {
    showViewModal.value = false;
    perfilVisualizado.value = {};
    permissoesAtivas.value = [];
  };

  const editPerfil = (perfil) => {
    isEditing.value = true;
    showModal.value = true;

    novoPerfil.value = {
      id: perfil.id,
      name: perfil.name,
      permissions: {},
    };

    permissoes.forEach((permissao) => {
      const permData = perfil.permissions.find((p) => p.name === permissao.chave);
      if (permData && permData.actions) {
        novoPerfil.value.permissions[permissao.chave] = {
          active: Object.values(permData.actions).some((v) => v === true),
        };
        permissao.actions.forEach((action) => {
          novoPerfil.value.permissions[permissao.chave][action] = permData.actions[action] || false;
        });
      } else {
        novoPerfil.value.permissions[permissao.chave] = {
          active: false,
        };
        permissao.actions.forEach((action) => {
          novoPerfil.value.permissions[permissao.chave][action] = false;
        });
      }
    });
  };

  const deletePerfil = (id) => {
    Swal.fire({
      title: "Confirmar exclusão",
      text: "Tem certeza que deseja excluir este perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/perfil/${id}`)
          .then(() => {
            buscarPerfis();
            toast.success("Perfil deletado com sucesso!", { theme: "colored" });
          })
          .catch((error) => {
            toast.error("Não foi possível deletar o perfil!", { theme: "colored" });
            console.error("Erro ao deletar perfil:", error);
          });
      }
    });
  };

  onMounted(() => {
    buscarPerfis();
  });
  </script>
