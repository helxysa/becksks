<template>
  <div>
    <div class="flex items-center mt-12 gap-4">
      <span @click="voltarListagem" class="cursor-pointer">
        <Icon
          icon="ic:round-arrow-back"
          height="30"
          class="duration-600 transition-all ease-in-out transform hover:-translate-y-[2px]"
        />
      </span>
      <h1 class="text-5xl font-bold">Cadastro Termo Aditivo</h1>
    </div>

    <section class="">
      <form class="mt-12" @submit.prevent="saveTermoAditive">
        <div class="flex flex-col items-start gap-3">
          <label class="font-semibold">Nome do Termo</label>
          <input
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
            type="text"
            placeholder="Informe o nome do termo  aditivo"
            v-model="contratoForm.nome_termo"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Nome do cliente</label>
          <input
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            disabled
            type="text"
            placeholder="Informe o nome do cliente"
            v-model="contratoForm.nomeCliente"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Vigência</label>
          <div class="flex gap-4 items-center w-full">
            <input
              class="font-sans focus:border-blue-400transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              required
              type="date"
              placeholder="Digite o inicio do contrato"
              v-model="contratoForm.data_inicio"
            />
            <span class="font-sans"> até</span>
            <input
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              required
              type="date"
              placeholder="Digite o fim do  contrato"
              v-model="contratoForm.data_fim"
            />
          </div>
        </div>

        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Ajuste de valor</label>
          <select
            v-model="ajusteValor"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          >
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

        <div v-if="ajusteValor === 'sim'" class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Porcentagem de ajuste (%)</label>
          <input
            type="number"
            v-model="porcentagemAjuste"
            min="1"
            max="25"
            placeholder="Informe a porcentagem de ajuste"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          />
        </div>

        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Valor contratado</label>
          <money3
            v-model="contratoForm.saldo_contrato"
            :disabled="ajusteValor === 'sim'"
            placeholder="Informe o valor contratado"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-bind="moneyConfig"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Fiscal do contrato</label>
          <input
            disabled
            type="text"
            placeholder="Informe o fiscal do contrato"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.fiscal.nome"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Telefone do fiscal</label>
          <input
            disabled
            type="tel"
            placeholder="Informe o telefone do fiscal"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.fiscal.telefone"
            maxlength="15"
            @keyup="handlePhone"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">E-mail do fiscal</label>
          <input
            disabled
            type="email"
            placeholder="Informe o email do fiscal"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.fiscal.email"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Ponto focal</label>
          <input
            disabled
            type="text"
            placeholder="Informe o ponto focal"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.pontoFocal"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="block font-semibold mb-2">Cidade</label>
          <input
            disabled
            type="text"
            placeholder="Informe a cidade do contrato"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.cidade"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="block font-semibold mb-2">Estado</label>
          <input
            disabled
            type="text"
            placeholder="Informe a cidade do contrato"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.estado"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Objeto do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o objeto do contrato"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.objeto_contrato"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Descrição</label>
          <textarea
            v-model="contratoForm.observacoes"
            rows="7"
            placeholder="Descrição..."
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-3 w-full border-gray-300 rounded-md"
          />
        </div>
        <section class="mt-8 flex gap-8 flex-wrap justify-end">
          <!-- <button
            class="flex items-center justify-center px-9 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="button"
            @click="showExibirModalItems"
            v-if="store.profile.permissions.some((item)=> item.name === 'itens_contrato' && item.canCreate === true)"
          >
            <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
            Adicionar Item
          </button> -->
        </section>
        <div class="flex border-b border-gray-200 mb-8 pt-4">
          <TabButton
            v-for="tab in tabs"
            :key="tab"
            :currentTab="currentTab"
            :tab="tab"
            @update:currentTab="currentTab = $event"
          />
        </div>
        <div v-if="currentTab === 'Itens'">
          <table class="mt-8 table-auto border border-slate-200 rounded-2xl w-full">
            <thead class="h-24 bg-slate-100 border-1">
              <tr>
                <th class="text-2xl">Item</th>
                <th class="text-2xl">Unidade de medida</th>
                <th class="text-2xl">Valor unitário</th>
                <th class="text-2xl">Quantidade contratada</th>
                <th class="text-2xl">Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in termoAditivoItens"
                :key="index"
                class="text-center"
              >
                <td class="text-xl p-4">{{ item.titulo }}</td>
                <td class="text-xl p-4">{{ item.unidade_medida }}</td>
                <td class="text-xl p-4">
                  {{ formatCurrency(item.valor_unitario) }}
                </td>
                <td class="text-xl p-4">
                  {{ item.quantidade_contratada }}
                </td>
                <td>
                  <button type="button" @click="openEditModal(index)"
                  v-if="store.profile.permissions.some((item)=> item.name === 'itens_contrato' && item.canEdit === true)">
                    <Icon
                      icon="ph:pencil"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    />
                  </button>
                  <button type="button" @click="removeItem(index)"
                    v-if="store.profile.permissions.some((item)=> item.name === 'itens_contrato' && item.canDelete === true)">
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
        </div>
        <div v-if="currentTab === 'Anexos'">
            <AnexoUpload ref="anexoUploadRef" :resourceId="termoAditivoId" variant="contrato" :localAnexos="localAnexos" />
        </div>
        <div class="mt-8 flex gap-8 justify-end">
          <span @click="voltarListagem" class="cursor-pointer">
            <button
              class="inline-flex items-center justify-center px-4 py-3 rounded-md w-56 text-2xl font-medium text-white bg-gray-500 hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
              type="button"
            >
              Voltar
            </button>
          </span>
          <button
            class="flex items-center justify-center px-8 py-3 rounded-md w-56 text-2xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>

    <!-- Modal adicioanr item -->
    <JetDialogModal
      :show="exibirModal"
      :withouHeader="false"
      @close="closeModal"
      :modalTitle="'Adicionar Item'"
      maxWidth="6xl"
    >
      <template #content>
        <form @submit.prevent="saveItem">
          <section class="flex flex-col gap-8">
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl">Item:</label>
              <input
                v-model="novoItem.titulo"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
                maxlength="50"
                placeholder="Titulo do item"
              />
            </div>
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl"
                >Unidade de Medida:
                <!-- <button
                  type="button"
                  @click="openNewUnitInput"
                  class="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-blue-600 bg-blue-100 hover:bg-blue-200"
                >
                  {{ showNewUnitInput ? "Voltar" : "Adicionar" }}
                </button> -->
              </label>
              <select
                v-if="!showNewUnitInput"
                v-model="novoItem.unidade_medida"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
              >
                <!-- <option disabled hidden value="">Selecione a unidade de medida</option> -->
                <option disabled value="">Selecione a unidade de medida</option>
                <option
                  v-for="unidade in unidadesMedida"
                  :key="unidade.id"
                  :value="unidade.unidadeMedida"
                >
                  {{ unidade.unidadeMedida }}
                </option>
              </select>
              <div
                v-if="showNewUnitInput"
                class="w-[50%] flex items-center justify-between gap-8"
              >
                <input
                  v-model="newUnitName"
                  type="text"
                  class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-md h-14"
                  placeholder="Nova unidade"
                  required
                />
                <button
                  @click="CriarUnidadeMedida"
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-bold text-white bg-green-600 hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl">Valor Unitário:</label>
              <money3
                v-model="novoItem.valor_unitario"
                type="text"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
                placeholder="Informe o valor do item"
                maxlength="20"
                v-bind="moneyConfig"
              />
            </div>
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl">Quantidade Contratada:</label>
              <money3
                v-model="novoItem.quantidade_contratada"
                type="number"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
                min="0"
                v-bind="decimalConfig"
                placeholder="Quantidade contratada"
              />
            </div>
          </section>
          <div class="mt-9 flex justify-end gap-4">
            <button
              type="button"
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
      maxWidth="6xl"
    >
      <template #content>
        <form @submit.prevent="saveEditModal">
          <section class="flex flex-col gap-8">
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl">Item:</label>
              <input
                v-model="editItem.titulo"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
                maxlength="50"
                placeholder="Titulo do item"
              />
            </div>
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl"
                >Unidade de Medida:
                <!-- <button
                  type="button"
                  @click="openNewUnitInput"
                  class="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-blue-600 bg-blue-100 hover:bg-blue-200"
                >
                  {{ showNewUnitInput ? "Voltar" : "Adicionar" }}
                </button> -->
              </label>
              <select
                v-if="!showNewUnitInput"
                :disabled="isItemViewModal"
                v-model="editItem.unidade_medida"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
              >
                <option disabled hidden value="">
                  Selecione a unidade de medida
                </option>
                <option
                  v-for="unidade in unidadesMedida"
                  :key="unidade.id"
                  :value="unidade.unidadeMedida"
                >
                  {{ unidade.unidadeMedida }}
                </option>
              </select>
              <div
                v-if="showNewUnitInput"
                class="w-[50%] flex items-center justify-between gap-8"
              >
                <input
                  v-model="newUnitName"
                  type="text"
                  class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-md h-14"
                  placeholder="Nova unidade"
                  required
                />
                <button
                  @click="CriarUnidadeMedida"
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-bold text-white bg-green-600 hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
            <div class="flex gap-4 justify-between items-center">
              <label class="font-bold text-3xl">Valor Unitário:</label>
              <money3
                v-model="editItem.valor_unitario"
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
              <money3
                v-model="editItem.quantidade_contratada"
                type="number"
                class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
                required
                min="0"
                v-bind="decimalConfig"
                placeholder="Quantidade contratada"
              />
            </div>
          </section>
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
import { reactive, ref, watch, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import ListItems from "../list/ListItems.vue";
import { api } from "@/services/api";
import Swal from "sweetalert2";
import { Money3Component } from "v-money3";
import { ufs } from "../../services/ufs.js";
import AnexoUpload from './AnexoUpload.vue';
import TabButton from '../../components/TabButton.vue';
import { useProfileStore } from '@/stores/ProfileStore';

const anexoUploadRef = ref(null);
const store = useProfileStore()
const tabs = ['Anexos']
const currentTab = ref(tabs[0])
const contratoId = ref(null)
const termoAditivoId = ref(null);
const localAnexos = ref([]);
const router = useRouter();
const route = useRoute();
const exibirModal = ref(false);
const exibirEditModal = ref(false);
const contratoEdit = ref({});
const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};
const decimalConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "",
  masked: false,
};
let editIndex = ref(-1);
const termoAditivoItens = ref([])
let contratoForm = ref({
  nome_cliente: "",
  data_inicio: "",
  data_fim: "",
  saldo_contrato: "",
  fiscal: {
    nome: "",
    telefone: "",
    email: "",
  },
  cidade: "",
  estado: "",
  objeto_contrato: "",
  observacoes: "",
  nome_termo: "",
});
let novoItem = ref({
  titulo: "",
  unidade_medida: "",
  valor_unitario: "",
  quantidade_contratada: "",
});
let editItem = ref({
  titulo: "",
  unidade_medida: "",
  valor_unitario: "",
  quantidade_contratada: "",
});
const ajusteValor = ref("nao");
const porcentagemAjuste = ref(1);
const saldoContratoOriginal = ref();

watch([ajusteValor, porcentagemAjuste], ([novoAjusteValor, novaPorcentagem]) => {
  if (novaPorcentagem > 25) {
    porcentagemAjuste.value = 25;
  } else if (novaPorcentagem < 1 && novoAjusteValor === 'sim') {
    porcentagemAjuste.value = 1;
  }

  if (novoAjusteValor === 'sim' && novaPorcentagem >= 1) {
    contratoForm.value.saldo_contrato = (
      parseFloat(saldoContratoOriginal.value) * (Math.min(novaPorcentagem, 25) / 100)
    ).toFixed(2);
  } else if (novoAjusteValor === 'sim' && novaPorcentagem === 0) {
    contratoForm.value.saldo_contrato = 0;
  } else if (novoAjusteValor === 'nao') {
    contratoForm.value.saldo_contrato = saldoContratoOriginal.value;
  }
});

onMounted(() => {
  const contratoId = route.params.id;
  if (contratoId) {
    fetchContrato(contratoId).then(() => {
      saldoContratoOriginal.value = contratoForm.value.saldoContrato || 0;
    });
  }
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    if (response.data) {
      contratoForm.value = {
        ...response.data,
        saldo_contrato: '',
        nome_termo: '',
        data_inicio: '',
        data_fim: '',
        observacoes: '',
      };
      saldoContratoOriginal.value = response.data.saldo_contrato || 0;
    }
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

const showExibirModalItems = () => {
  exibirModal.value = true;
  fetchUnidadesMedida();
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
    termoAditivoItens.value[editIndex.value] = { ...editItem.value };
    closeEditModal();
  } else {
    console.error("Índice inválido para edição");
  }
};
const openEditModal = (index) => {
  editIndex.value = index;
  editItem.value = { ...termoAditivoItens.value[index] };
  exibirEditModal.value = true;
  fetchUnidadesMedida();
};
const saveItem = () => {
  termoAditivoItens.value.push({ ...novoItem.value });
  novoItem.value = {
    titulo: "",
    unidade_medida: "",
    valor_unitario: "",
    quantidade_contratada: "",
  };
  closeModal();
};
const removeItem = (index) => {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este item do termo  aditivo?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      termoAditivoItens.value.splice(index, 1);
    }
  });
};

const createTermoAditivo = async (contratoId) => {
  try {
    // termoAditivoItens.value = termoAditivoItens.value.map((item)=> {
    //     return {
    //       ...item,
    //       valor_unitario: parseFloat(item.valor_unitario),
    //       quantidade_contratada: parseFloat(item.quantidade_contratada)
    //     }
    // })

    let payload = {
      contrato_original_id: Number(contratoId),
      nome_contrato: contratoForm.value.nome_termo,
      data_inicio: contratoForm.value.data_inicio,
      data_fim: contratoForm.value.data_fim,
      saldo_contrato: contratoForm.value.saldo_contrato,
      objeto_contrato: contratoForm.value.objeto_contrato,
      ponto_focal: contratoForm.value.ponto_focal,
      observacoes: contratoForm.value.observacoes,
      porcentagem_ajuste: porcentagemAjuste.value,
      // termo_aditivo_itens: termoAditivoItens.value,
    }
    const response = await api.post("/termo-aditivo", payload);
    termoAditivoId.value = response.data.id;
    toast("Termo aditivo cadastrado com  sucesso!", {
      theme: "colored",
      type: "success",
    });
    return response.data.id;
  } catch (error) {
    toast("Não foi possível cadastrar o termo  aditivo!", {
      theme: "colored",
      type: "error",
    });
    return null;
  }
};

const saveTermoAditive = async () => {
  contratoId.value =  route.params.id
  await createTermoAditivo(contratoId.value)
  if (anexoUploadRef.value && localAnexos.value.length > 0) {
    await anexoUploadRef.value.uploadAnexosPendentes();
  }
  voltarListagem()
};

const voltarListagem = () => {
  const contratoId = route.params.id;
  router.push(`/visualizar/contratos/${contratoId}`);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

const handlePhone = (event) => {
  let input = event.target;
  contratoForm.fiscal.telefone = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

// UNIDADE DE MEDIDA
const unidadesMedida = ref([]);
const newUnidade = ref("");
const isModalUnidadeOpen = ref(false);
const isEditingUnidade = ref(false);
const modalTitleUnidade = "Adicionar Unidade";

const fetchUnidadesMedida = async () => {
  try {
    const response = await api.get("/unidade_medida");
    unidadesMedida.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar unidades de medida:", error);
  }
};
</script>

<style scoped>
.btn-item {
  background-color: var(--bluePrimary);
}

.btn-item:hover {
  background-color: #0ea5e9;
}
</style>
