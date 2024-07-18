<template>
  <div class="">
    <button
      @click="showEditarRenovacao()"
      class="btn-renove bg-blue-400 rounded-md text-white p-2 w-32"
    >
      Editar
    </button>
    <section class="p-8">
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
    </section>

    <section class="p-8 text-[#63696e]">
      <h1 class="font-bold text-4xl mb-8">Renovação</h1>
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
                <th class="p-4"><p>%</p></th>
                <th class="p-4"><p>Valor contratado</p></th>
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
  </div>

  <!-- Modal Renovação -->
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
          >Salvar</button>
        </section>
      </form>
    </template>
  </JetDialogModal>
</template>

<script setup>
import { defineProps, computed, onMounted, ref, defineEmits, watch } from "vue";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from 'vue3-toastify';
import { Icon } from '@iconify/vue';
import { api } from '@/services/api';
import Swal from 'sweetalert2';

const props = defineProps({
  renovacao: Object,
  contrato: Object,
});

// Modal editar renovação
const modalEditRenovacao = ref(false);
const renovacaoData = ref({
  data_inicio: props.renovacao.dataInicio,
  data_fim: props.renovacao.dataFim,
  tipo_renovacao: props.renovacao.tipoRenovacao,
  porcentagem_renovacao: props.renovacao.porcentagemRenovacao,
});
const emit = defineEmits(['renovacaoEditada'])

const showEditarRenovacao = () => {
  modalEditRenovacao.value = true;
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
  const renovacaoId = props.renovacao.id
  let payload = {
    data_inicio: renovacaoData.value.data_inicio,
    data_fim: renovacaoData.value.data_fim,
    tipo_renovacao: renovacaoData.value.tipo_renovacao,
    porcentagem_renovacao: renovacaoData.value.porcentagem_renovacao
  }
  try {
    const response = await api.put(`/renovacao/${renovacaoId}`, payload)
    .then(response => {
      toast("Renovação editada com sucesso!", {
        theme: "colored",
        type: "success",
      });
    });
    emit('renovacaoEditada');
    closeEditRenovacao()
  } catch (error) {
    toast("Não foi possível editar a renovação!", {
        theme: "colored",
        type: "error",
      });
    console.error("Erro ao editar renovação:", error);
  }
}

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
