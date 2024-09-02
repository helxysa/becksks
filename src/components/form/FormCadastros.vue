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
          <label class="font-bold w-60">Nome do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o nome do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.nome_contrato"
            maxlength="120"
          />
        </div>
        <div class="flex items-center justify-between mt-8">
          <label class="font-bold w-60">Nome do cliente</label>
          <input
            required
            type="text"
            placeholder="Informe o nome do cliente"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.nome_cliente"
            maxlength="120"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Vigência</label>
          <div class="flex gap-4 items-center w-3/4">
            <input
              required
              type="date"
              placeholder="Digite o inicio do contrato"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="contratoForm.data_inicio"
            />
            <span> até</span>
            <input
              required
              type="date"
              placeholder="Digite o fim do  contrato"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl"
              v-model="contratoForm.data_fim"
            />
          </div>
        </div>

        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Valor contratado</label>
          <money3
            required
            type="text"
            placeholder="Informe o valor contratado"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.saldo_contrato"
            v-bind="moneyConfig"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Fiscal do contrato</label>
          <input
            required
            type="text"
            placeholder="Informe o fiscal do contrato"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal.nome"
            maxlength="120"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Telefone do fiscal</label>
          <input
            required
            type="tel"
            placeholder="Informe o telefone do  fiscal"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal.telefone"
            maxlength="15"
            @keyup="handlePhone"
          />
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">E-mail do fiscal</label>
          <input
            required
            type="email"
            placeholder="Informe o email do  fiscal"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
            v-model="contratoForm.fiscal.email"
            maxlength="120"
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
            maxlength="120"
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
            maxlength="120"
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
            maxlength="120"
          />
        </div>
        <div class="flex justify-between items-center mt-8">
          <label class="font-bold w-60">Lembrete vencimento:</label>
          <select
            v-model="contratoForm.lembrete_vencimento"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl h-14"
            required
          >
            <option disabled hidden value="">
              Selecione quantidade de dias para receber a notificação
            </option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
            <option>45</option>
            <option>60</option>
            <option>90</option>
            <option>120</option>
          </select>
        </div>
        <div class="mt-8 flex items-center justify-between">
          <label class="font-bold w-60">Observações</label>
          <textarea
            v-model="contratoForm.observacoes"
            rows="7"
            placeholder="observações"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl text-observacoes"
          />
        </div>
        <div class="mt-14 flex gap-8 flex-wrap">
          <button
            class="btn-contrato relative"
            type="button"
            @click="showExibirModalItems"
          >
            Adicionar Item
            <span class="absolute right-[10px]">
              <Icon
                icon="material-symbols-light:add"
                height="25"
                class="text-zinc-50"
              />
            </span>
          </button>
          <button
            class="btn-unidade relative bg-orange-500 hover:bg-orange-600"
            type="button"
            @click="openModalUnit"
          >
            Adicionar Unidade
            <span class="absolute right-[10px]">
              <Icon
                icon="material-symbols-light:add"
                height="25"
                class="text-zinc-50"
              />
            </span>
          </button>
          <button
            class="btn-projeto relative bg-green-500 hover:bg-green-600"
            type="button"
            @click="openModalProjeto()"
          >
            Adicionar Projeto
            <span class="absolute right-[10px]">
              <Icon
                icon="material-symbols-light:add"
                height="25"
                class="text-zinc-50"
              />
            </span>
          </button>
        </div>
        <table
          class="mt-8 table-auto border border-slate-200 rounded-2xl w-full"
        >
          <thead class="h-24 bg-slate-100 border-1">
            <tr class="">
              <th class="text-2xl">Item</th>
              <th class="text-2xl">Unidade de medida</th>
              <th class="text-2xl">Valor unitário</th>
              <th class="text-2xl">Quantidade contratada</th>
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
              <td class="text-xl p-4">
                {{ formatCurrency(item.valor_unitario) }}
              </td>
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
            {{ route.params.id ? "Editar" : "Salvar" }}
          </button>
        </div>
      </form>
    </section>

    <JetDialogModal
      :show="isModalOpen"
      :withouHeader="false"
      @close="closeModalUnit"
      :modalTitle="modalTitle"
      maxWidth="6xl"
    >
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="flex gap-4 items-center">
            <label for="nome" class="font-bold text-3xl text-gray-700"
              >Unidade</label
            >
            <input
              type="text"
              id="nome"
              v-model="newUnitName"
              required
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[100%] border-gray-300 rounded-md h-14"
              placeholder="Nome  da   unidade"
            />
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModalUnit"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {{ isEditing ? "Atualizar" : "Adicionar" }}
            </button>
          </div>
        </form>
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-2">Unidades</h3>
          <ul class="divide-y divide-gray-200">
            <li
              v-for="item in unidadesMedida"
              :key="item.id"
              class="py-3 flex justify-between items-center"
            >
              <span>{{ item.unidadeMedida }}</span>
              <div>
                <button
                  @click="editUnidade(item)"
                  class="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Editar
                </button>
                <button
                  @click="deletarUnidadeMedida(item.id, item)"
                  class="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </JetDialogModal>

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
                v-model="novoItem.saldo_quantidade_contratada"
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
                v-model="editItem.saldo_quantidade_contratada"
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
    <JetDialogModal
      :show="isModalProjetoOpen"
      :withouHeader="false"
      @close="closeModalProjeto"
      :modalTitle="modalTitleProjeto"
      maxWidth="6xl"
    >
      <template #content>
        <form @submit.prevent="handleSubmitProjeto" class="space-y-4">
          <div class="flex gap-4 items-center">
            <label for="nome" class="font-bold text-3xl text-gray-700"
              >Nome:</label
            >
            <input
              type="text"
              id="nome"
              v-model="newProjeto"
              required
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[100%] border-gray-300 rounded-md h-14"
              placeholder="Nome do projeto"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="handleSubmitProjeto"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {{ isEditingProjeto ? "Atualizar" : "Adicionar" }}
            </button>
          </div>
        </form>
        <div class="mt-6">
          <h3 class="font-semibold mb-2">Projetos</h3>
          <ul class="divide-y divide-gray-200">
            <li
              v-for="item in projetos"
              :key="item.id"
              class="py-3 flex items-center"
            >
              <div
                v-if="!item.isEditing"
                class="flex justify-between items-center w-full"
              >
                <span>{{ item.projeto }}</span>
                <div class="ml-auto">
                  <button
                    @click="editProjeto(item)"
                    class="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    @click="deletarProjeto(item.id)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <div v-else class="flex justify-between items-center w-full">
                <input type="text" v-model="item.projeto" class="w-full" />
                <div class="ml-auto text-nowrap">
                  <button
                    @click="saveProjeto(item)"
                    class="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Salvar
                  </button>
                  <button
                    @click="cancelEdit(item)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModalProjeto"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
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
let contratoForm = reactive({
  nome_cliente: "",
  data_inicio: "",
  data_fim: "",
  saldo_contrato: "",
  fiscal: {
    nome: "",
    telefone: "",
    email: "",
  },
  ponto_focal: "",
  cidade: "",
  objeto_contrato: "",
  items: [],
  observacoes: "",
  nome_contrato: "",
  lembrete_vencimento: "",
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

const isModalOpen = ref(false);
const isEditing = ref(false);
const modalTitle = computed(() =>
  isEditing.value ? "Editar Unidade" : "Adicionar Unidade"
);
const idUnidade = ref("");
const idContrato = ref("");

const openModalUnit = () => {
  isModalOpen.value = true;
  fetchUnidadesMedida();
};

const closeModalUnit = () => {
  isModalOpen.value = false;
  resetForm();
};

const resetForm = () => {
  newUnitName.value = "";
  isEditing.value = false;
};

const handleSubmit = () => {
  if (isEditing.value) {
    EditarUnidade();
  } else {
    CriarUnidadeMedida();
  }
  closeModalUnit();
};

const editUnidade = (item) => {
  newUnitName.value = item.unidadeMedida;
  isEditing.value = true;
  idUnidade.value = item.id;
};

const unidadesMedida = ref([]);
const showNewUnitInput = ref(false);
const newUnitName = ref("");

const EditarUnidade = async () => {
  try {
    const response = await api.put(`unidade_medida/${idUnidade.value}`, {
      unidade_medida: newUnitName.value,
    });
    await fetchUnidadesMedida();
    toast.success("Unidade editada com sucesso!");
    newUnitName.value = "";
  } catch (error) {
    console.error("Erro ao editar unidade:", error.response.data.message);
    if (error.response.data.message == "Já existe uma unidade com esse nome.") {
      return toast.error(error.response.data.message);
    } else {
      toast.error("Não foi possível editar a  unidade.");
    }
  }
};

const openNewUnitInput = () => {
  showNewUnitInput.value = !showNewUnitInput.value;
};

const fetchUnidadesMedida = async () => {
  try {
    const response = await api.get("/unidade_medida");
    unidadesMedida.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar unidades de medida:", error);
  }
};

const CriarUnidadeMedida = async () => {
  try {
    const response = await api.post("/unidade_medida", {
      unidade_medida: newUnitName.value,
    });
    await fetchUnidadesMedida();
    toast.success("Unidade de medida criada com sucesso!");
    newItem.value.unidade_medida = newUnitName.value;
    newUnitName.value = "";
    showNewUnitInput.value = false;
  } catch (error) {
    console.error(
      "Erro ao criar nova unidade de medida:",
      error.response.data.message
    );
    if (
      error.response.data.message ==
      "Já existe uma unidade de medida com esse nome."
    ) {
      return toast.error(error.response.data.message);
    } else {
      toast.error("Não foi possível criar a unidade de medida.");
    }
  }
};

const deletarUnidadeMedida = (id, unidadeMedida) => {
  //Não implementado ainda
  Swal.fire({
    title: "Você tem certeza?",
    text: `Deseja remover a unidade de medida "${unidadeMedida.unidadeMedida}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, remover!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/unidade_medida/${id}`);
        await fetchUnidadesMedida();
        toast.success("Unidade de medida removida com sucesso!");
      } catch (error) {
        console.error("Erro ao remover unidade de medida:", error);
        toast.error("Erro ao remover unidade de medida.");
      }
    }
  });
};

onMounted(() => {
  const contratoId = route.params.id;
  if (contratoId) {
    fetchContrato(contratoId);
  }
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    contratoEdit.value = response.data;
    contratoForm.value = contratoEdit.value;
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
  fetchUnidadesMedida();
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
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este item do contrato?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      contratoForm.items.splice(index, 1);
    }
  });
};

const createContrato = async () => {
  if (contratoForm.fiscal.telefone.length < 15) {
    toast("Telefone incompleto! Por favor, preencha o telefone corretamente.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  try {
    const response = await api.post("/contratos", contratoForm);
    return response.data.id;
  } catch (error) {
    toast("Não foi possível cadastrar o contrato!", {
      theme: "colored",
      type: "error",
    });
    console.error("Erro ao cadastrar contrato:", error);
    return null;
  }
};

const createProjetos = async (contratoId) => {
  try {
    const projetosArray = projetos.value.map(p => p.projeto);

    if (projetosArray.length > 0) {
      await api.post(`/contratos/${contratoId}/projetos/multiplos`, { projetos: projetosArray });
    } else {
      toast.info("Nenhum projeto para adicionar.");
  }
  } catch (error) {
    console.log("Erro ao criar projetos:", error);
    toast("Não foi possível criar os projetos associados.", {
      theme: "colored",
      type: "error",
    });
    return 'error';
  }
};

const deleteContrato = async (contratoId) => {
  try {
    await api.delete(`/contratos/${contratoId}`);
    toast("Não foi possível salvar o contrato devido à falha na criação dos projetos.", {
      theme: "colored",
      type: "info",
    });
  } catch (error) {
    console.error("Erro ao deletar contrato:", error);
    toast("Não foi possível deletar o contrato após falha na criação dos projetos.", {
      theme: "colored",
      type: "error",
    });
  }
};

const saveContrato = async () => {
  const contratoId = await createContrato();

  if (contratoId) {
    const projetosCriados = await createProjetos(contratoId);
    if (projetosCriados === 'error') {
      await deleteContrato(contratoId);
    } else {
      voltarListagem();
    }
  }
};

const voltarListagem = () => {
  router.push({ name: "Contratos" });
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

// Projeto
const projetos = ref([]);
const newProjeto = ref("");
const isModalProjetoOpen = ref(false);
const isEditingProjeto = ref(false);
const currentProjetoId = ref(null);
const modalTitleProjeto = computed(() => isEditingProjeto.value ? "Atualizar Projeto" : "Adicionar Projeto");
const originalProjetoValue = ref('');


const openModalProjeto = (projeto = null) => {
  if (projeto) {
    newProjeto.value = projeto.projeto;
    currentProjetoId.value = projeto.id;
    isEditingProjeto.value = true;
    modalTitleProjeto.value = "Editar Projeto";
  } else {
    newProjeto.value = "";
    isEditingProjeto.value = false;
    modalTitleProjeto.value = "Adicionar Projeto";
  }
  isModalProjetoOpen.value = true;
};

const handleSubmitProjeto = () => {
  const projetoNome = newProjeto.value.trim();

  if (projetoNome === '') {
    toast.error("O nome do projeto não pode estar vazio.");
    return;
  }

  if (isDuplicateProjeto(projetoNome, isEditingProjeto.value ? currentProjetoId.value : null)) {
    toast.error("Já existe um projeto com esse nome.");
    return;
  }

  if (isEditingProjeto.value) {
    const index = projetos.value.findIndex(p => p.id === currentProjetoId.value);
    if (index !== -1) {
      projetos.value[index].projeto = projetoNome;
    }
    isEditingProjeto.value = false;
    currentProjetoId.value = null;
  } else {
    projetos.value.push({
      id: Date.now(),
      projeto: projetoNome,
      isEditing: false,
    });
  }
  newProjeto.value = "";
};


const editProjeto = (item) => {
  item.isEditing = true;
  originalProjetoValue.value = item.projeto;
};

const saveProjeto = (item) => {
  const projetoNome = item.projeto.trim();

  if (projetoNome === '') {
    toast.error("O nome do projeto não pode estar vazio.");
    return;
  }

  if (isDuplicateProjeto(projetoNome, item.id)) {
    toast.error("Já existe um projeto com esse nome.");
    return;
  }

  item.isEditing = false;
};

const cancelEdit = (item) => {
  item.projeto = originalProjetoValue.value;
  item.isEditing = false;
};

const deletarProjeto = (id) => {
  projetos.value = projetos.value.filter((p) => p.id !== id);
};

const closeModalProjeto = () => {
  restoreOriginalValues();
  newProjeto.value = "";
  isEditingProjeto.value = false;
  currentProjetoId.value = null;
  isModalProjetoOpen.value = false;
};

const restoreOriginalValues = () => {
  projetos.value.forEach(item => {
    if (item.isEditing) {
      item.projeto = originalProjetoValue.value;
      item.isEditing = false;
    }
  });
};

const isDuplicateProjeto = (nome, excludeId = null) => {
  return projetos.value.some(p => p.projeto.toLowerCase() === nome.toLowerCase() && p.id !== excludeId);
};

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
  width: 200px;
  height: 40px;
}

.btn-contrato:hover {
  background-color: #0ea5e9;
}

.btn-unidade {
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 200px;
  height: 40px;
}

.btn-projeto {
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 200px;
  height: 40px;
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

.text-observacoes {
  resize: none;
}
</style>
