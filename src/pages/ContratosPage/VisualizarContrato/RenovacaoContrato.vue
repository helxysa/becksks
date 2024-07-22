<template>
  <section class="flex justify-between items-center my-8">
    <h1 class="font-bold text-4xl mb-8">Renovação</h1>

    <div class="flex items-center justify-end gap-4">
      <button
        @click="showEditarRenovacao()"
        class="bg-blue-400 hover:bg-blue-300 rounded-md text-white p-2 w-32"
      >
        Editar
      </button>
      <button
        @click="deletarRenovacao()"
        class="bg-red-500 hover:bg-red-400 rounded-md text-white p-2 w-32"
      >
        Excluir
      </button>
    </div>

    <!-- <section class="p-8">
      <h1 class="font-bold text-4xl mb-4">{{ contrato.nomeCliente }}</h1>
      <div class="flex flex-col">
        <div>
          <span><strong>Data Início: </strong></span>
          <span>{{ formatDate(contrato.dataInicio) }}</span>
        </div>
        <div>
          <span><strong>Data Prevista: </strong></span>
          <span>{{ formatDate(contrato.dataFim) }}</span>
        </div>
      </div>
      <p><strong>Fiscal:</strong> {{ contrato.fiscal }}</p>
      <p><strong>Ponto Focal:</strong> {{ contrato.pontoFocal }}</p>
      <p><strong>Objeto do contrato:</strong> {{ contrato.objetoContrato }}</p>
      <p><strong>Valor Contratado:</strong> R$ {{ contrato.saldoContrato }}</p>
    </section> -->
  </section>

  <section class="mb-12">
    <div class="flex justify-between items-center">
      <aside>
        <div class="flex flex-col gap-8">
          <div>
            <span><strong>Data Início: </strong></span>
            <span>{{ formatDate(renovacao.dataInicio) }}</span>
          </div>
          <div>
            <span><strong>Data Prevista: </strong></span>
            <span>{{ formatDate(renovacao.dataFim) }}</span>
          </div>
        </div>
      </aside>
      <aside>
        <table>
          <thead>
            <tr class="bg-blue-50 border-[#00AFEF] border-b-2">
              <th class="p-4">Tipo</th>
              <th class="p-4">Porcentagem da renovação</th>
              <th class="p-4">Valor contratado</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td class="p-4">{{ renovacao.tipoRenovacao }}</td>
              <td class="p-4">{{ renovacao.porcentagemRenovacao }}%</td>
              <td class="p-4">R$ {{ calcularValorContratadoRenovacao() }}</td>
            </tr>
          </tbody>
        </table>
      </aside>
    </div>
  </section>

  <section class="mb-12">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-4xl mb-8">Itens de contrato</h1>
      <button
        @click="showAddItemModal()"
        class="btn-renove bg-blue-400 hover:bg-blue-300 rounded-md text-white p-4 flex items-center gap-2"
      >
        <span class="text-4xl">+</span> Adicionar item
      </button>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <th class="text-xl">Item</th>
        <th class="text-xl">U.M (Unidade de Medida)</th>
        <th class="text-xl">Quantidade Contratada</th>
        <th class="text-xl">Valor Unitário</th>
        <th class="text-xl">Valor Total (Item)</th>
        <th class="text-xl">Ações</th>
      </thead>
      <tbody>
        <tr
          class="h-20 text-center"
          v-for="item in renovacao.contratoItens"
          :key="item.id"
        >
          <td>{{ item.titulo }}</td>
          <td class="text-2xl">{{ item.unidadeMedida }}</td>
          <td class="text-2xl">{{ item.saldoQuantidadeContratada }}</td>
          <td class="text-2xl">{{ formatCurrency(item.valorUnitario) }}</td>
          <td class="text-2xl">
            {{
              formatCurrency(
                item.valorUnitario * item.saldoQuantidadeContratada
              )
            }}
          </td>
          <td class="flex justify-center mt-6 gap-2">
            <button type="button" @click="showViewItemModal(item)">
              <Icon
                icon="ph:eye"
                height="20"
                class="hover:text-red-500 hover:rounded-md cursor-pointer"
              />
            </button>
            <button type="button" @click="showEditItemModal(item)">
              <Icon
                icon="bx:edit"
                height="20"
                class="hover:text-red-500 hover:rounded-md cursor-pointer"
              />
            </button>
            <button type="button" @click="deleteItem(item.id)">
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
  </section>

  <section>
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-4xl mb-8">Lançamentos</h1>
      <button
        @click="showAddItemModal()"
        class="bg-blue-400 hover:bg-blue-300 rounded-md text-white p-4 flex items-center gap-2"
      >
        <span class="text-4xl">+</span>Novo Lançamento
      </button>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <th class="text-xl">Data</th>
        <th class="text-xl">Projeto</th>
        <th class="text-xl">Quantidade itens</th>
        <th class="text-xl">Total do lançamento</th>
        <th class="text-xl">Itens disponíveis</th>
        <th class="text-xl">Ações</th>
      </thead>
      <tbody>
        <tr
          class="h-20 text-center"
          v-for="lançamento in renovacao.faturamentos"
          :key="lançamento.id"
        >
          <td>data</td>
          <td class="text-2xl">projeto</td>
          <td class="text-2xl">quantidade itens</td>
          <td class="text-2xl">total do lançamento</td>
          <td class="text-2xl">itens disponiveis</td>
          <td class="flex justify-center mt-6 gap-2">
            <button type="button" @click="openItemViewModal(item)">
              <Icon
                icon="ph:eye"
                height="20"
                class="hover:text-red-500 hover:rounded-md cursor-pointer"
              />
            </button>
            <button type="button" @click="openItemEditModal(item)">
              <Icon
                icon="bx:edit"
                height="20"
                class="hover:text-red-500 hover:rounded-md cursor-pointer"
              />
            </button>
            <button type="button" @click="deleteLancamento(item.id)">
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
  </section>

  <!-- Modal Editar Renovação -->
  <JetDialogModal
    :show="modalEditRenovacao"
    :withouHeader="false"
    @close="closeEditRenovacao"
    maxWidth="6xl"
    :modalTitle="'Editar contrato'"
  >
    <template #content>
      <form @submit.prevent="editRenovacao">
        <section>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Vigência:</label>
            <div class="flex gap-4 items-center w-3/4">
              <input
                required
                type="date"
                placeholder="Digite o inicio do contrato"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
                v-model="renovacaoData.data_inicio"
              />
              <span> até</span>
              <input
                required
                type="date"
                placeholder="Digite o fim do  contrato"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
                v-model="renovacaoData.data_fim"
              />
            </div>
          </div>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Tipo de renovação:</label>
            <select
              v-model="renovacaoData.tipo_renovacao"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled value="">Selecione o tipo</option>
              <option value="Acréscimo">Acréscimo</option>
              <option value="Supressão">Supressão</option>
            </select>
          </div>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Porcentagem de renovação:</label>
            <input
              type="number"
              v-model="renovacaoData.porcentagem_renovacao"
              :max="25"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            />
          </div>
        </section>
        <section class="mt-9 flex justify-end gap-4">
          <button
            type="button"
            @click="closeEditRenovacao"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-blue-500 border border-gray-300 rounded-md font-bold text-xl text-white tracking-widest shadow-sm hover:text-slate-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-blue-400 h-14 w-40"
          >
            Salvar
          </button>
        </section>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal Add Item Renovação -->
  <JetDialogModal
    :show="modalAddItem"
    :withouHeader="false"
    @close="closeAddItemModal"
    maxWidth="6xl"
    :modalTitle="'Adicionar item'"
  >
    <template #content>
      <form @submit.prevent="addItemRenovacao">
        <section>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Título:</label>
            <input
              required
              type="text"
              placeholder="Digite o título do item"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="renovacaoItemData.titulo"
            />
          </div>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Unidade de medida:</label>
            <select
              v-model="renovacaoItemData.unidade_medida"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 pl-2 w-1/2 h-[4rem] border-gray-300 rounded-3xl"
              required
            >
              <option disabled value="">Selecione a unidade de medida</option>
              <option>Pontos de Função</option>
              <option>UST(Unidade de Serviço Técnico)</option>
              <option>Funcionário</option>
            </select>
          </div>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Valor unitário:</label>
            <money3
              required
              type="text"
              placeholder="Digite o valor do item"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="renovacaoItemData.valor_unitario"
              v-bind="moneyConfig"
              maxlength="20"
            />
          </div>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Quantidade contratada</label>
            <input
              required
              type="text"
              placeholder="Digite o título do item"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="renovacaoItemData.saldo_quantidade_contratada"
            />
          </div>
        </section>
        <section class="mt-9 flex justify-end gap-4">
          <button
            type="button"
            @click="closeAddItemModal"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-blue-500 border border-gray-300 rounded-md font-bold text-xl text-white tracking-widest shadow-sm hover:text-slate-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-blue-400 h-14 w-40"
          >
            Salvar
          </button>
        </section>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal Editar/View item Renovação -->
  <JetDialogModal
    :show="modalEditItem || modalViewItem"
    :withouHeader="false"
    @close="closeItemModal"
    maxWidth="6xl"
    :modalTitle="modalViewItem ? 'Visualizar Item' : 'Editar Item'"
  >
    <template #content>
      <form @submit.prevent="saveEditedItem">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Item:</label>
            <input
              :disabled="modalViewItem"
              v-model="renovacaoItemData.titulo"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              maxlength="50"
            />
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Unidade de Medida:</label>
            <select
              :disabled="modalViewItem"
              v-model="renovacaoItemData.unidade_medida"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">Selecione a situação</option>
              <option>Pontos de Função</option>
              <option>UST(Unidade de Serviço Técnico)</option>
              <option>Funcionário</option>
            </select>
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Valor Unitário:</label>
            <money3
              :disabled="modalViewItem"
              v-model="renovacaoItemData.valor_unitario"
              type="text"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              v-bind="moneyConfig"
              placeholder="Informe o valor do item"
              maxlength="20"
            />
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Quantidade Contratada:</label>
            <input
              :disabled="modalViewItem"
              v-model="renovacaoItemData.saldo_quantidade_contratada"
              type="number"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              min="0"
              placeholder="Valor da quantidade contratada"
            />
          </div>
        </section>
        <div class="mt-9 flex justify-end gap-4">
          <button
            type="button"
            @click="closeItemModal"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            v-if="modalEditItem"
            type="submit"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-blue-500 border border-gray-300 rounded-md font-bold text-xl text-white tracking-widest shadow-sm hover:text-slate-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-blue-400 h-14 w-40"
          >
            Salvar
          </button>
        </div>
      </form>
    </template>
  </JetDialogModal>
</template>

<script setup>
import { defineProps, computed, onMounted, ref, defineEmits, watch } from "vue";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from "vue3-toastify";
import { Icon } from "@iconify/vue";
import { api } from "@/services/api";
import Swal from "sweetalert2";
import { Money3Component } from "v-money3";

const props = defineProps({
  renovacao: Object,
  contrato: Object,
});
const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

// Modal visualizar item
const modalViewItem = ref(false);
const modalEditItem = ref(false);

const showViewItemModal = (item) => {
  modalViewItem.value = true;
  renovacaoItemData.value = {
    titulo: item.titulo,
    unidade_medida: item.unidadeMedida,
    valor_unitario: item.valorUnitario,
    saldo_quantidade_contratada: item.saldoQuantidadeContratada,
  };
};

const showEditItemModal = (item) => {
  modalEditItem.value = true;
  renovacaoItemData.value = {
    id: item.id,
    titulo: item.titulo,
    unidade_medida: item.unidadeMedida,
    valor_unitario: item.valorUnitario,
    saldo_quantidade_contratada: item.saldoQuantidadeContratada,
  };
};

const closeItemModal = () => {
  modalViewItem.value = false;
  modalEditItem.value = false;
  renovacaoItemData.value = {
    titulo: "",
    unidade_medida: "",
    valor_unitario: "",
    saldo_quantidade_contratada: "",
  };
};

const deleteItem = async (itemId) => {
  const result = await Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  });
  if (result.isConfirmed) {
    try {
      await api.delete(`/renovacao/item/${itemId}`);
      emit("renovacaoEditada");
    } catch (error) {
      console.error('Erro ao deletar renovação:', error);
    }
  }
}

const saveEditedItem = async (item) => {
  let itemId = renovacaoItemData.value.id;
  let payload = {
    titulo: renovacaoItemData.value.titulo,
    unidade_medida: renovacaoItemData.value.unidade_medida,
    valor_unitario: renovacaoItemData.value.valor_unitario,
    saldo_quantidade_contratada: renovacaoItemData.value.saldo_quantidade_contratada
  };
  try {
    const response = await api.put(`/renovacao/items/${itemId}`, payload)
    emit("renovacaoEditada");
    closeItemModal();
  } catch (error) {
    toast("Não foi possível editar item!", {
        theme: "colored",
        type: "error",
      });
      console.error("Erro ao editar item", error);
  }
};

// Modal Adicionar Item
const modalAddItem = ref(false);
const renovacaoItemData = ref({
  titulo: "",
  unidade_medida: "",
  valor_unitario: "",
  saldo_quantidade_contratada: "",
});
const showAddItemModal = () => {
  modalAddItem.value = true;
};

const closeAddItemModal = () => {
  modalAddItem.value = false;
};

const resetItemData = () => {
  renovacaoItemData.value = {
    titulo: "",
    unidade_medida: "",
    valor_unitario: "",
    saldo_quantidade_contratada: "",
  };
};

const addItemRenovacao = async () => {
  const renovacaoId = props.renovacao.id;
  let payload = {
    contrato_itens: [
      {
        titulo: renovacaoItemData.value.titulo,
        unidade_medida: renovacaoItemData.value.unidade_medida,
        valor_unitario: renovacaoItemData.value.valor_unitario,
        saldo_quantidade_contratada:
          renovacaoItemData.value.saldo_quantidade_contratada,
      },
    ],
  };
  try {
    const response = await api
      .post(`/renovacao/${renovacaoId}/item`, payload)
      .then((response) => {
        toast("Item adicionado com sucesso!", {
          theme: "colored",
          type: "success",
        });
      });
    resetItemData();
    emit("renovacaoEditada");
    closeAddItemModal();
  } catch (error) {
    toast("Não foi possível adicionar item!", {
      theme: "colored",
      type: "error",
    });
    console.error("Erro ao adicionar item", error);
  }
};

// Modal editar renovação
const modalEditRenovacao = ref(false);
const renovacaoData = ref({
  data_inicio: props.renovacao.dataInicio,
  data_fim: props.renovacao.dataFim,
  tipo_renovacao: props.renovacao.tipoRenovacao,
  porcentagem_renovacao: props.renovacao.porcentagemRenovacao,
});
const emit = defineEmits(["renovacaoEditada", "renovacaoDeletada"]);

const showEditarRenovacao = () => {
  modalEditRenovacao.value = true;
};

const deletarRenovacao = () => {
  emit("renovacaoDeletada", props.renovacao.id);
};

const closeEditRenovacao = () => {
  modalEditRenovacao.value = false;
  renovacaoData.value = {
    data_inicio: "",
    data_fim: "",
    tipo_renovacao: "",
    porcentagem_renovacao: "",
  };
};

const editRenovacao = async () => {
  const renovacaoId = props.renovacao.id;
  let payload = {
    data_inicio: renovacaoData.value.data_inicio,
    data_fim: renovacaoData.value.data_fim,
    tipo_renovacao: renovacaoData.value.tipo_renovacao,
    porcentagem_renovacao: renovacaoData.value.porcentagem_renovacao,
  };
  try {
    const response = await api
      .put(`/renovacao/${renovacaoId}`, payload)
      .then((response) => {
        toast("Renovação editada com sucesso!", {
          theme: "colored",
          type: "success",
        });
      });
    emit("renovacaoEditada");
    closeEditRenovacao();
  } catch (error) {
    toast("Não foi possível editar a renovação!", {
      theme: "colored",
      type: "error",
    });
    console.error("Erro ao editar renovação:", error);
  }
};

const calcularValorContratadoRenovacao = () => {
  const valorContratado = parseInt(props.contrato.saldoContrato);
  const porcentagem = props.renovacao.porcentagemRenovacao / 100;
  let valorRenovado = parseInt(props.contrato.saldoContrato);

  if (props.renovacao.tipoRenovacao === "Acréscimo") {
    valorRenovado += valorContratado * porcentagem;
  } else if (props.renovacao.tipoRenovacao === "Supressão") {
    valorRenovado -= valorContratado * porcentagem;
  }

  return valorRenovado;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

watch(
  () => props.renovacao,
  (newRenovacao) => {
    renovacaoData.value = {
      data_inicio: newRenovacao.dataInicio,
      data_fim: newRenovacao.dataFim,
      tipo_renovacao: newRenovacao.tipoRenovacao,
      porcentagem_renovacao: newRenovacao.porcentagemRenovacao,
    };
  },
  { immediate: true }
);
</script>

<style>
select,
select option {
  color: #000000;
}
select:invalid,
select option[value=""] {
  font: bold;
  color: #9ea5b1;
}

select:disabled {
  background-color: #fafafa;
  border-color: #d1d5db !important;
  opacity: 1;
}
</style>
