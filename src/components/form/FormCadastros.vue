<template>
  <div>
    <div class="flex items-center mt-12 gap-4">
      <span @click="voltarListagem" class="cursor-pointer">
        <Icon icon="ic:round-arrow-back" height="30" />
      </span>
      <h1 class="text-5xl font-medium">Formulário de Contrato</h1>
    </div>

    <section class="flex justify-center">
      <form class="mt-12 form-contrato" @submit.prevent="saveContrato">
        <div class="flex items-center justify-between">
          <label class="font-bold w-60">Nome do cliente</label>
          <input
            required
            type="text"
            placeholder="Informe o nome do cliente"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.nome_cliente"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Vigência do contrato</label>
          <input
            required
            type="date"
            placeholder="Digite a duração do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.vigencia"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Saldo de contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o saldo do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.saldo_contrato"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Fiscal do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o fiscal do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Ponto focal</label>
          <input
            required
            type="text"
            placeholder="Informe o ponto focal"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.ponto_focal"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Cidade</label>
          <input
            required
            type="text"
            placeholder="Informe a cidade do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.cidade"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Objeto do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o objeto do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.objeto_contrato"
          />
        </div>
        <div class="mt-14 flex justify-center">
          <button
            class="btn-contrato"
            type="button"
            @click="showExibirModalItems"
          >
            Adicionar Item
          </button>
        </div>
        <table
          class="mt-8 table-auto border border-slate-200 rounded-2xl w-full"
        >
          <thead class="h-24 bg-slate-100 border-1">
            <tr class="">
              <th class="text-2xl">Título</th>
              <th class="text-2xl">Unidade de medida</th>
              <th class="text-2xl">Valor unitário</th>
              <th class="text-2xl">Saldo Contrato</th>
              <th class="text-2xl">Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in contratoForm.items"
              :key="index"
              class="text-center"
            >
              <td class="text-xl p-4">{{ item.titulo }}</td>
              <td class="text-xl p-4">{{ item.unidade_medida }}</td>
              <td class="text-xl p-4">{{ item.valor_unitario }}</td>
              <td class="text-xl p-4">
                {{ item.saldo_quantidade_contratada }}
              </td>
              <td>
                <button type="button" @click="openEditModal(index)">
                  <Icon
                    icon="ph:pencil"
                    height="20"
                    class="hover:text-red-500 hover:rounded-md cursor-pointer"
                  />
                </button>
                <button type="button" @click="removeItem(index)">
                  <Icon
                    icon="ph:trash"
                    height="20"
                    class="hover:text-red-500 hover:rounded-md cursor-pointer"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-8 flex gap-8 justify-end">
          <span @click="voltarListagem" class="cursor-pointer">
            <button class="btn-submit-contrato" type="submit">Voltar</button>
          </span>
          <button class="btn-submit-contrato" type="submit">
            {{ route.params.id? 'Editar' : 'Salvar'}}
             
          </button>
        </div>
      </form>
    </section>

    <JetDialogModal
      :show="exibirModal"
      :withouHeader="false"
      @close="closeModal"
      :modalTitle="'Adicionar Item'"
    >
      <template #content>
        <form @submit.prevent="saveItem">
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Título</label>
            <input
              type="text"
              placeholder="Titulo do item"
              v-model="novoItem.titulo"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
              required
            />
          </div>
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Unidade de medida</label>
            <select
              v-model="novoItem.unidade_medida"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl h-14"
              required
            >
              <option value="">Selecione a unidade de medida</option>
              <option>PF</option>
              <option>UST</option>
              <option>Funcionário</option>
            </select>
          </div>
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Valor unitário</label>
            <input
              type="text"
              placeholder="Informe o valor do item"
              v-model="novoItem.valor_unitario"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
              required
            />
          </div>
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Saldo</label>
            <input
              type="text"
              placeholder="Saldo da quantidade contratada"
              v-model="novoItem.saldo_quantidade_contratada"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
              required
            />
          </div>

          <div class="mt-9 flex justify-end gap-4">
            <button
              @click="closeModal"
              class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
            >
              Fechar
            </button>
            <button
              type="submit"
              class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-item w-40"
            >
              Salvar
            </button>
          </div>
        </form>
      </template>
    </JetDialogModal>

    <JetDialogModal
      :show="exibirEditModal"
      :withouHeader="false"
      @close="closeEditModal"
      :modalTitle="'Editar Item'"
    >
      <template #content>
        <form @submit.prevent="saveEditModal">
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Título</label>
            <input
                required
                type="text"
                placeholder="Título do item"
                v-model="editItem.titulo"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
            />
          </div>
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Unidade de medida</label>
            <select
                required
                v-model="editItem.unidade_medida"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl h-14"
            >
              <option value="">Selecione a unidade de medida</option>
              <option>PF</option>
              <option>UST</option>
              <option>Funcionário</option>
            </select>
          </div>
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Valor unitário</label>
            <input
                required
                type="text"
                placeholder="Informe o valor do item"
                v-model="editItem.valor_unitario"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
            />
          </div>
          <div class="mt-8 flex gap-2 items-center">
            <label class="font-bold w-60">Saldo</label>
            <input
                required
                type="text"
                placeholder="Saldo da quantidade contratada"
                v-model="editItem.saldo_quantidade_contratada"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
            />
          </div>

          <div class="mt-9 flex justify-end gap-4">
            <button
              type="button"
              @click="closeEditModal"
              class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
            >
              Fechar
            </button>
            <button
              type="submit"
              class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-item w-40"
            >
              Salvar
            </button>
          </div>
        </form>
      </template>
    </JetDialogModal>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import ListItems from "../list/ListItems.vue";
import { api } from "@/services/api";
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const exibirModal = ref(false);
const exibirEditModal = ref(false);
const  contratoEdit = ref({})

let editIndex = ref(-1);
let contratoForm = reactive({
  nome_cliente: "",
  vigencia: "",
  saldo_contrato: "",
  fiscal: "",
  ponto_focal: "",
  cidade: "",
  objeto_contrato: "",
  items: []
});
let novoItem = ref({
  titulo: "",
  unidade_medida: "",
  valor_unitario: "",
  saldo_quantidade_contratada: "",
});
let editItem = ref({
  titulo: "",
  unidade_medida: "",
  valor_unitario: "",
  saldo_quantidade_contratada: "",
});

onMounted(()=>{
  const contratoId = route.params.id;
  console.log(contratoId, 'contratoId')
  if(contratoId){
      fetchContrato(contratoId)
      console.log('edit')
  }
})

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    contratoEdit.value = response.data;
    contratoForm.value =  contratoEdit.value;

   
    console.log(response.data, "form");
    console.log(contratoEdit.value, 'formedit')
    console.log(contratoForm.value, 'vaklor form')
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

const showExibirModalItems = () => {
  exibirModal.value = true;
};
const closeModal = () => {
  exibirModal.value = false;
};
const closeEditModal = () => {
  exibirEditModal.value = false;
  editIndex.value = -1;
};
const saveEditModal = () => {
  if (editIndex.value !== -1) {
    contratoForm.items[editIndex.value] = { ...editItem.value };
    closeEditModal();
  } else {
    console.error("Índice inválido para edição");
  }
};
const openEditModal = (index) => {
  editIndex.value = index;
  editItem.value = { ...contratoForm.items[index] };
  exibirEditModal.value = true;
};
const saveItem = () => {
  contratoForm.items.push({ ...novoItem.value });
  novoItem.value = {
    titulo: "",
    unidade_medida: "",
    valor_unitario: "",
    saldo_quantidade_contratada: "",
  };
  closeModal();
};
const removeItem = (index) => {
    Swal.fire({
        title: 'Confirmar exclusão',
        text: 'Tem certeza que deseja excluir este item do contrato?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if  (result.isConfirmed ){
            contratoForm.items.splice(index, 1);
        }
    })
};
const saveContrato = () => {
if (route.params.id){
   api.put(`/contratos/${route.params.id}`, contratoForm)  
    .then((response) => {
      toast("Contrato editado com sucesso!", {
        theme: "colored",
        type: "success",
      });
      router.push({ name: "Contratos" });
    })
    .catch((error) => {
      toast("Não foi possível editar o contrato!", {
        theme: "colored",
        type: "error",
      });
      console.error("Erro ao editar contrato:", error);
    });
  router.push({ name: "Contratos" });
} else {
  api.post("/contratos", contratoForm)
    .then((response) => {
      toast("Contrato cadastrado com sucesso!", {
        theme: "colored",
        type: "success",
      });
      router.push({ name: "Contratos" });
    })
    .catch((error) => {
      toast("Não foi possível cadastrar o contrato!", {
        theme: "colored",
        type: "error",
      });
      console.error("Erro ao cadastrar contrato:", error);
    });
  router.push({ name: "Contratos" });
}
 
};
const voltarListagem = () => {
    router.push({ name: 'Contratos' });
}

</script>

<style scoped>
.form-contrato {
  width: 70%;
}

.btn-contrato {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 100%;
  height: 40px;
}

.btn-contrato:hover {
  background-color: #0ea5e9;
}

.btn-item {
  background-color: var(--bluePrimary);
}

.btn-item:hover {
  background-color: #0ea5e9;
}

.btn-submit-contrato {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 160px;
  height: 40px;
}

.btn-submit-contrato:hover {
  background-color: #0ea5e9;
}
</style>
