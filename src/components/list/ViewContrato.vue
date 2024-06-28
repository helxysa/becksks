<template>
  <div class="flex items-center justify-between mt-12 ">
    <div class="flex">
      <span @click="voltarListagem" class="cursor-pointer">
        <Icon icon="ic:round-arrow-back" height="30" />
      </span>
      <h1 class="text-5xl font-medium">Visualizar Contrato</h1>

    </div>
    <div class="flex gap-4">
      <button class="btn-edit bg-green-500 rounded-md text-white p-2 w-32">
        <router-link :to="{ name: 'editarcontrato', params: { id: contrato.id } }">
          <router-view>
            Editar
          </router-view>
        </router-link>
      </button>
      <button class="btn-delete bg-red-600 rounded-md text-white p-2 w-32"
      @click="openModalDeleteContrato(contrato)">Excluir</button>
    </div>
  </div>

  <section class="mt-12">
    <div class="w-full flex flex-wrap">
      <div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Nome do cliente:</label>
          <span class="pl-4 font-bold p-2 w-80">{{
            contrato.nomeCliente
          }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Vigência:</label>
          <span class="pl-4 font-bold p-2 w-80">{{
            formatDate(contrato.vigencia)
          }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Saldo Contrato:</label>
          <span class="pl-4 font-bold p-2 w-80">{{
            formatCurrency(contrato.saldoContrato)
          }}</span>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Fiscal:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.fiscal }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Ponto Focal:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.pontoFocal }}</span>
        </div>
        <div class="flex items-center gap-4">
          <label class="font-medium w-60">Cidade:</label>
          <span class="pl-4 font-bold p-2 w-80">{{ contrato.cidade }}</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <label class="font-medium w-60">Objeto do Contrato:</label>
        <span class="pl-4 font-bold p-2 w-80">{{
          contrato.objetoContrato
        }}</span>
      </div>
    </div>
  </section>

  <section>
    <h1 class="text-4xl font-medium mt-12">Itens do Contrato</h1>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-24 bg-slate-100 border-1">
        <tr>
          <th class="text-2xl">Título</th>
          <th class="text-2xl">Unidade de medida</th>
          <th class="text-2xl">Valor Unitário</th>
          <th class="text-2xl">Saldo Quantidade Contratada</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="h-20 text-center"
          v-for="item in contrato.contratoItens"
          :key="item.id"
        >
          <td class="text-2xl">{{ item.titulo }}</td>
          <td class="text-2xl">{{ item.unidadeMedida }}</td>
          <td class="text-2xl">{{ formatCurrency(item.valorUnitario) }}</td>
          <td class="text-2xl">{{ item.saldoQuantidadeContratada }}</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <div class="flex justify-between mt-12">
      <h1 class="text-4xl font-medium">Faturamentos</h1>
      <button class="btn-faturamento" @click="showExibirModalFaturamento">
        Novo Faturamento
      </button>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-24 bg-slate-100 border-1">
        <tr>
          <th class="text-2xl">Criado em</th>
          <!-- <th class="text-2xl">Valor</th> -->
          <th class="text-2xl">Status</th>
          <th class="text-2xl">Saldo Atual</th>
          <th class="text-2xl">Ações</th>
        </tr>
      </thead>
      <tbody v-if="contrato.faturamentos">
        <tr
          class="h-20 text-center"
          v-for="faturamento in faturamentosOrdenados"
          :key="faturamento.id"
        >
          <td class="text-2xl">{{ formatDate(faturamento.createdAt) }}</td>
          <td class="text-2xl">
            <span
            class="border-2 px-6 py-2 rounded-2xl font-bold text-slate-600"
            :class="{
              'bg-green-200 border-green-400': faturamento.status === 'Concluído',
              'bg-yellow-200 border-yellow-400': faturamento.status === 'Aguardando Pagamento',
              'bg-blue-200 border-blue-400': faturamento.status === 'Aguardando Faturamento',
            }"
            >
              {{ faturamento.status }}
          </span>
          </td>
          <td class="text-2xl">{{ formatCurrency(500) }}</td>
          <td class="text-2xl flex justify-center mt-4 gap-3">
            <!-- <span>
              <Icon
                icon="ph:eye"
                height="20"
                class="hover:text-blue-500 hover:rounded-md cursor-pointer"
              />
            </span>
            <span>
              <Icon
                icon="bx:edit"
                height="20"
                class="hover:text-blue-500 hover:rounded-md cursor-pointer"
              />
            </span> -->
            <span @click="deleteFaturamento(faturamento.id)">
              <Icon
                icon="ph:trash"
                height="20"
                class="hover:text-red-500 hover:rounded-md cursor-pointer"
              />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <JetDialogModal
    :show="modalFaturamento"
    :withouHeader="false"
    @close="closeModalFaturamento"
    maxWidth="4xl"
    :modalTitle="'Faturamento'"
  >
    <template #content>
      <form @submit.prevent="saveFaturamento">
        <section class="flex flex-col gap-8">
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Situação:</label>
            <select
            v-model="selectNovoFaturamento"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            required
            >
            <option disabled hidden value="">Selecione a situação</option>
            <option>Aguardando Faturamento</option>
            <option>Aguardando Pagamento</option>
            <option>Pago</option>
          </select>
        </div>
        <div class="flex gap-4 justify-between items-center">
          <label class="font-bold text-3xl">Saldo total do contrato:</label>
          <span class="ml-2 border bg-slate-100 w-[50%] p-4 rounded-lg text-center">{{formatCurrency(contrato.saldoContrato)}}</span>
        </div>
      </section>
        <div class="mt-8">
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-24 bg-slate-100 border-1">
              <tr>
                <th class="text-2xl">Título</th>
                <th class="text-2xl">Valor</th>
                <th class="text-2xl">Quantidade de Itens</th>
                <th class="text-2xl">Saldo Atual</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-20 text-center"
                v-for="item in contrato.contratoItens"
                :key="item.id"
              >
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">
                  {{ formatCurrency(item.valorUnitario) }}
                </td>
                <td>
                  <input
                    type="number"
                    v-model="item.quantidadeItems"
                    class="border-2"
                  />
                </td>
                <td class="text-2xl flex justify-center mt-4 gap-3">
                  <span :class="{'text-red-500': saldoAtualMenor(item)}">{{ formatCurrency(calcularSaldoAtual(item))}}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-9 flex justify-end gap-4">
          <button
            @click="closeModalFaturamento"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            :disabled="isSaldoNegativo"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
            Salvar
          </button>
      </div>
  </form>
</template>

</JetDialogModal>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter,RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import { api } from '@/services/api';
import JetDialogModal from '@/components/modals/DialogModal.vue';
import { toast } from 'vue3-toastify';

const router = useRouter();
const route = useRoute();
const contrato = ref({});
const faturamentos = ref([]);
const modalFaturamento = ref(false)
const excluirModal = ref(false);

const openModalDeleteContrato = (contratoExcluido) => {
  console.log(contratoExcluido,'contrato')
  contrato.value = contratoExcluido;
  excluirModal.value = true;
};

const deleteContrato = () => {
  api.delete(`/contratos/${contrato.value.id}`).then((response) => {
    closeModal();
    // toast("Contrato deletado com sucesso!", {
    //   theme: "colored",
    //   type: "success"
    // });
    voltarListagem()
    // fetchContratos();
  }).catch((error) => {
    closeModal();
    toast("Não foi possível deletar o contrato!", {
      theme: "colored",
      type: "error"
    });
    console.error('Erro ao deletar contrato:', error);
  });
};

const closeModal = () => {
  excluirModal.value = false;
};



const showExibirModalFaturamento = () => {
  modalFaturamento.value = true;
};
const isSaldoNegativo = computed(() => {
  return contrato.value.contratoItens.some(item => calcularSaldoAtual(item) < 0);
});

const closeModalFaturamento = () => {
  modalFaturamento.value = false;
};

const resetForm = () => {
  selectNovoFaturamento.value = "";
  contrato.value.contratoItens.forEach((item) => {
    item.quantidadeItems = null;
  });
  closeModalFaturamento();
};

const saveFaturamento = async () => {
  let itensQuantidadePreenchida = contrato.value.contratoItens
    .filter((item) => item.quantidadeItems)
    .map((item) => ({
      id_item: item.id,
      quantidade_itens: item.quantidadeItems,
    }));

  let payload = {
    status: selectNovoFaturamento.value,
    itens: itensQuantidadePreenchida,
  };
  try {
    const response = await api.post(
      `/contratos/${contrato.value.id}/faturamentos`,
      payload
    );
    resetForm();
    fetchContrato(route.params.id);
  } catch (error) {
    console.error("Erro ao criar faturamento:", error);
  }
};

const voltarListagem = () => {
  router.push({ name: "Contratos" });
};

onMounted(() => {
  const contratoId = route.params.id;
  fetchContrato(contratoId);
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    contrato.value = response.data;
    if (!contrato.value.quantidadeItems) {
    }
    console.log(response.data, "resposta");
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

const deleteFaturamento = (faturamentoId) => {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este faturamento?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      api
        .delete(`/faturamentos/${faturamentoId}`)
        .then((response) => {
          toast("Faturamento deletado com sucesso!", {
            theme: "colored",
            type: "success",
          });
          fetchContrato(route.params.id);
        })
        .catch((error) => {
          toast("Não foi possível deletar o faturamento!", {
            theme: "colored",
            type: "error",
          });
          console.error("Erro ao deletar faturamento:", error);
        });
    }
  });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date)
    ? ""
    : new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
};

const faturamentosOrdenados = computed(() => {
  return contrato.value.faturamentos.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
});

const calcularSaldoAtual = () => {
  let saldoTotal = contrato.value.saldoContrato;

  contrato.value.contratoItens.forEach((item) => {
    const valorTotalItem = item.quantidadeItems ? item.quantidadeItems * item.valorUnitario : 0;

    saldoTotal -= valorTotalItem;
  });

  return saldoTotal;
};

const saldoAtualMenor = (item) => {
  const saldoAtual = calcularSaldoAtual(item);

  return saldoAtual < 0;
};
</script>

<style scoped>
.btn-faturamento {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 160px;
  height: 40px;
}

.btn-faturamento:hover {
  background-color: #0ea5e9;
}

.btn-save-faturamento {
  background-color: var(--bluePrimary);
}

.btn-save-faturamento:hover {
  background-color: #0ea5e9;
}

.btn-item {
  background-color: var(--bluePrimary);
}

.btn-item:hover {
  background-color: #0ea5e9;
}


</style>
