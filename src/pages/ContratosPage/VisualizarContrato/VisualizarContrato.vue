<template>
  <div class="flex justify-end gap-4 mb-20">
    <button
      @click="showRenovacaoModal()"
      class="btn-renove bg-blue-400 rounded-md text-white p-2 w-32"
      v-if="
        calcularSaldoDisponivel(contrato.faturamentos).totalUtilizado >=
          contrato.saldoContrato || formatDate(contrato.dataFim) <= new Date()
      "
    >
      Renovar
    </button>
    <button class="btn-edit bg-green-500 rounded-md text-white p-2 w-32">
      <router-link
        :to="{ name: 'editarcontrato', params: { id: contrato.id } }"
      >
        <router-view> Editar </router-view>
      </router-link>
    </button>
    <button
      class="btn-delete bg-red-600 rounded-md text-white p-2 w-32"
      @click="deleteContrato(contrato)"
    >
      Excluir
    </button>
  </div>

  <section class="mb-4">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex items-center gap-4">
        <label class="font-semibold dark:text-white">Cliente:</label>
        <span class="pl-4 p-2 underline underline-offset-4">{{
          contrato.nomeCliente
        }}</span>
      </div>
      <div class="flex items-center gap-4">
        <span
          ><strong>Vigência:</strong>
          <span class="underline underline-offset-4 pl-4"
            >{{ formatDate(contrato.dataInicio) }} até
            {{ formatDate(contrato.dataFim) }}</span
          ></span
        >
      </div>

      <div class="flex items-center gap-4">
        <label class="font-semibold ">Fiscal:</label>
        <span class="pl-4 p-2 underline underline-offset-4">{{
          contrato.fiscal
        }}</span>
      </div>
      <div class="flex items-center gap-4">
        <label class="font-semibold ">Ponto Focal:</label>
        <span class="pl-4 p-2 underline underline-offset-4">{{
          contrato.pontoFocal
        }}</span>
      </div>
      <div class="flex items-center gap-4">
        <label class="font-semibold">Cidade:</label>
        <span class="pl-4 p-2 underline underline-offset-4">{{
          contrato.cidade
        }}</span>
      </div>
      <div class="flex items-center gap-4">
        <label class="font-semibold">Objeto do Contrato:</label>
        <span class="pl-4 p-2 underline underline-offset-4">{{
          contrato.objetoContrato
        }}</span>
      </div>
    </div>
  </section>

  <section class="flex items-center gap-4">
    <label class="font-semibold">Observações:</label>
    <span class="underline underline-offset-4 text-justify">{{
      contrato.observacoes
    }}</span>
  </section>
  <section class="flex gap-3 mt-6 flex-wrap 2xl:gap-x-24">
    <div
      class="shadow-lg rounded-lg overflow-hidden w-1/6 min-w-[230px] h-[120px]"
    >
      <p class="w-full bg-blue-800 h-4"></p>
      <div class="flex flex-col items-center h-full justify-center">
        <p class="text-4xl font-semibold">
          {{ formatCurrency(contrato.saldoContrato) }}
        </p>
        <p>Valor contratado</p>
      </div>
    </div>
    <div
      class="shadow-lg rounded-lg overflow-hidden w-1/6 min-w-[230px] h-[120px]"
    >
      <p class="w-full bg-yellow-300 h-4"></p>
      <div class="flex flex-col items-center h-full justify-center">
        <p class="text-4xl font-semibold">
          {{
            formatCurrency(
              calcularSaldoDisponivel(contrato.faturamentos)
                .aguardandoFaturamento
            )
          }}
        </p>
        <p>Valor aguardando faturamento</p>
      </div>
    </div>
    <div
      class="shadow-lg rounded-lg overflow-hidden w-1/6 min-w-[230px] h-[120px]"
    >
      <p class="w-full bg-gray-300 h-4"></p>
      <div class="flex flex-col items-center h-full justify-center">
        <p class="text-4xl font-semibold">
          {{
            formatCurrency(
              calcularSaldoDisponivel(contrato.faturamentos).aguardandoPagamento
            )
          }}
        </p>
        <p>Valor aguardando pagamento</p>
      </div>
    </div>
    <div
      class="shadow-lg rounded-lg overflow-hidden w-1/6 min-w-[230px] h-[120px]"
    >
      <p class="w-full bg-red-800 h-4"></p>
      <div class="flex flex-col items-center h-full justify-center">
        <p class="text-4xl font-semibold">
          {{
            formatCurrency(
              calcularSaldoDisponivel(contrato.faturamentos).valorPago
            )
          }}
        </p>
        <p>Valor pago</p>
      </div>
    </div>
    <div
      class="shadow-lg rounded-lg overflow-hidden w-1/6 min-w-[230px] h-[120px]"
    >
      <p class="w-full bg-green-600 h-4"></p>
      <div class="flex flex-col items-center h-full justify-center">
        <p class="text-4xl font-semibold">
          {{
            formatCurrency(
              contrato.saldoContrato -
                calcularSaldoDisponivel(contrato.faturamentos).totalUtilizado
            )
          }}
        </p>
        <p>Saldo disponível</p>
      </div>
    </div>
  </section>

  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-medium mt-12">Itens do Contrato</h1>
      <button @click="openCreateItemModal" class="btn-item relative">
        Adicionar Item
        <span class="absolute right-[3px]">
          <Icon
            icon="material-symbols-light:add"
            height="25"
            class="text-zinc-50"
          />
        </span>
      </button>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th class="text-xl">Item</th>
          <th class="text-xl">U.M (Unidade de Medida)</th>
          <th class="text-xl">Quantidade Contratada</th>
          <th class="text-xl">Valor Unitário</th>
          <th class="text-xl">Valor Total (Item)</th>
          <th class="text-xl">Quantidade de itens disponíveis</th>
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="h-24 text-center"
          v-for="item in contrato.contratoItens"
          :key="item.id"
        >
          <td class="text-2xl">{{ item.titulo }}</td>
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
          <!-- {{ (contrato?.faturamentos?.faturamentoItens) }} -->
          <td class="text-2xl">
            {{ calcularItensRestante(item.id, item.saldoQuantidadeContratada) }}
          </td>
          <td class="flex justify-center mt-4 gap-2">
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
    <div class="flex justify-between mt-12">
      <h1 class="text-4xl font-medium">Lançamentos</h1>
      <button class="btn-faturamento relative" @click="ExibirModalFaturamento">
        Novo Lançamento
        <span class="absolute right-[3px]">
          <Icon
            icon="material-symbols-light:add"
            height="25"
            class="text-zinc-50"
          />
        </span>
      </button>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th class="text-xl">Data</th>
          <th class="text-xl">Projeto</th>

          <th class="text-xl">Quantidade itens</th>
          <th class="text-xl">Total do Lançamento</th>
          <!-- <th class="text-xl">Itens disponíveis</th> -->
          <!-- <th class="text-xl">Situação</th> -->
          <!-- <th class="text-xl">Saldo Atual do Contrato</th> -->
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody v-if="contrato.faturamentos">
        <tr
          class="h-28 text-center"
          v-for="faturamento in faturamentosOrdenados"
          :key="faturamento.id"
        >
          <td class="text-2xl">{{ formatDate(faturamento.createdAt) }}</td>
          <td class="text-2xl">{{ faturamento.projetos }}</td>
          <td class="text-2xl">
            {{ calcularQuantidadeItens(faturamento.faturamentoItens) }}
          </td>
          <td class="text-2xl">
            {{
              formatCurrency(
                calcularSaldoFaturamentoItens(faturamento.faturamentoItens)
              )
            }}
          </td>
          <td class="text-2xl">
            <div class="flex justify-center items-center gap-2">
              <span @click="openViewFaturamentoModal(faturamento)">
                <Icon
                  icon="ph:eye"
                  height="20"
                  class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <span @click="openEditFaturamentoModal(faturamento)">
                <Icon
                  icon="bx:edit"
                  height="20"
                  class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <span @click="deleteFaturamento(faturamento.id)">
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
  </section>

  <!-- Modal criar Faturamento -->
  <JetDialogModal
    :show="modalFaturamento"
    :withouHeader="false"
    @close="closeModalFaturamento"
    maxWidth="6xl"
    :modalTitle="' Criar Lançamento'"
  >
    <template #content>
      <form @submit.prevent="createFaturamento">
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
            <label class="font-bold text-3xl">Projeto:</label>
            <input
              type="text"
              placeholder="Informe o nome do  projeto"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="projetos"
            />
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Valor contratado:</label>
            <span
              class="ml-2 border bg-slate-100 w-[50%] p-4 rounded-lg text-center"
              >{{ formatCurrency(contrato.saldoContrato) }}</span
            >
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Saldo atual:</label>
            <span
              class="ml-2 border bg-slate-100 w-[50%] p-4 rounded-lg text-center"
              >{{ formatCurrency(calcularSaldoAtual()) }}</span
            >
          </div>
        </section>
        <div class="mt-8">
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">Data</th>
                <th class="text-xl">Item</th>
                <th class="text-xl">Valor unitário</th>
                <th class="text-xl">Quantidade contratada</th>
                <th class="text-xl">Quantidade disponível</th>
                <th class="text-xl">Quantidade a ser lançada</th>
                <th class="text-xl">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-24 text-center"
                v-for="item in contrato.contratoItens"
                :key="item.id"
              >
                <td class="text-2xl">{{ formatDate(item.createdAt) }}</td>
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">
                  {{ formatCurrency(item.valorUnitario) }}
                </td>
                <td>
                  <span>
                    {{ item.saldoQuantidadeContratada }}
                  </span>
                </td>
                <td>
                  {{
                    calcularItensRestante(
                      item.id,
                      item.saldoQuantidadeContratada
                    )
                  }}
                </td>
                <td>
                  <input
                    type="number"
                    v-model="item.quantidadeItens"
                    class="border-2 text-center max-w-60"
                    min="0"
                    max="Number(item.saldoQuantidadeContratada)"
                  />
                </td>
                <td class="text-2xl flex justify-center mt-4 gap-3 w-full">
                  <span
                    class="max-w-60"
                    :class="{ 'text-red-500': saldoMaiorQueContrato(item) }"
                  >
                    {{ formatCurrency(calcularSaldoItem(item) || 0) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="flex justify-end mt-2">
            <div class="flex">
                <p class="font-semibold">Total Faturado:</p>
                <p>{{totalFaturado}}</p>
            </div>

          </div> -->
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

  <!-- Modal editar faturamento-->
  <JetDialogModal
    :show="modalEditFaturamento"
    :withouHeader="false"
    @close="closeEditFaturamentoModal"
    maxWidth="6xl"
    :modalTitle="
      isFaturamentoViewModal ? 'Visualizar Lançamento' : 'Editar Lançamento'
    "
  >
    <template #content>
      <form @submit.prevent="saveEditedFaturamento">
        <section class="flex flex-col gap-8">
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Situação:</label>
            <select
              :disabled="isFaturamentoViewModal"
              v-model="editingFaturamento.status"
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
            <label class="font-bold text-3xl">Projeto:</label>
            <input
              type="text"
              placeholder="Informe o nome do projeto"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              :disabled="isFaturamentoViewModal"
              v-model="editingFaturamento.projetos"
            />
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Valor contratado:</label>
            <span
              class="ml-2 border bg-slate-100 w-[50%] p-4 rounded-lg text-center"
              >{{ formatCurrency(contrato.saldoContrato) }}</span
            >
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Saldo atual:</label>
            <span
              class="ml-2 border bg-slate-100 w-[50%] p-4 rounded-lg text-center"
              >{{ formatCurrency(calcularSaldoAtual()) }}</span
            >
          </div>
        </section>
        <div class="mt-8">
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">Data</th>
                <th class="text-xl">Item</th>
                <th class="text-xl">Valor unitário</th>
                <th class="text-xl">Quantidade contratada</th>
                <th class="text-xl">Disponível</th>
                <th class="text-xl">Quantidade a ser lançada</th>
                <th class="text-xl">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-24 text-center"
                v-for="item in editingFaturamento.faturamentoItens"
                :key="item.id"
              >
                <td class="text-2xl">{{ formatDate(item.createdAt) }}</td>
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">
                  {{ formatCurrency(item.valorUnitario) }}
                </td>
                <td>
                  <span>
                    {{ item.saldoQuantidadeContratada }}
                  </span>
                </td>
                <td>
                  {{
                    calcularItensRestante(
                      item.contratoItemId,
                      item.saldoQuantidadeContratada
                    )
                  }}
                </td>
                <td>
                  <input
                    :disabled="isFaturamentoViewModal"
                    type="number"
                    v-model="item.quantidadeItens"
                    class="border-2 text-center max-w-60"
                    min="0"
                  />
                </td>
                <td class="text-2xl flex justify-center mt-4 gap-3 w-full">
                  <span
                    class="max-w-60"
                    :class="{
                      'text-red-500':
                        saldoMaiorQueContratoEditFaturamento(item),
                    }"
                  >
                    {{ formatCurrency(calcularSaldoItem(item) || 0) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-9 flex justify-end gap-4">
          <button
            @click="closeEditFaturamentoModal"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            v-if="!isFaturamentoViewModal"
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

  <!-- Modal criar item -->
  <JetDialogModal
    :show="modalCreateItem"
    :withouHeader="false"
    @close="closeModalCreateItem"
    maxWidth="6xl"
    :modalTitle="'Criar Novo Item do Contrato'"
  >
    <template #content>
      <form @submit.prevent="createNewItem">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Item:</label>
            <input
              v-model="newItem.titulo"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              maxlength="50"
              placeholder="Titulo do item"
            />
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Unidade de Medida:</label>
            <select
              v-model="newItem.unidade_medida"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">
                Selecione a unidade de medida
              </option>
              <option>Pontos de Função</option>
              <option>UST(Unidade de Serviço Técnico)</option>
              <option>Funcionário</option>
            </select>
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Valor Unitário:</label>
            <money3
              v-model="newItem.valor_unitario"
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
              v-model="newItem.saldo_quantidade_contratada"
              type="number"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              min="0"
              placeholder="Quantidade contratada"
            />
          </div>
        </section>
        <div class="mt-9 flex justify-end gap-4">
          <button
            type="button"
            @click="closeModalCreateItem"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
            Criar
          </button>
        </div>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal editar item -->
  <JetDialogModal
    :show="modalEditItem"
    :withouHeader="false"
    @close="closeModalEditItem"
    maxWidth="6xl"
    :modalTitle="isItemViewModal ? 'Visualizar Item' : 'Editar Item'"
  >
    <template #content>
      <form @submit.prevent="saveEditedItem">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Item:</label>
            <input
              :disabled="isItemViewModal"
              v-model="editingItem.titulo"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              maxlength="50"
            />
          </div>
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Unidade de Medida:</label>
            <select
              :disabled="isItemViewModal"
              v-model="editingItem.unidadeMedida"
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
              :disabled="isItemViewModal"
              v-model="editingItem.valorUnitario"
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
              :disabled="isItemViewModal"
              v-model="editingItem.saldoQuantidadeContratada"
              type="number"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              min="0"
              placeholder="Saldo da quantidade contratada"
            />
          </div>
        </section>
        <div class="mt-9 flex justify-end gap-4">
          <button
            type="button"
            @click="closeModalEditItem"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            v-if="!isItemViewModal"
            type="submit"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
            Salvar
          </button>
        </div>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal Renovação -->
  <JetDialogModal
    :show="modalRenovacao"
    :withouHeader="false"
    @close="closeModalRenovacao"
    maxWidth="6xl"
    :modalTitle="'Renovar contrato'"
  >
    <template #content>
      <form @submit.prevent="createRenovacao">
        <section>
          <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Nova vigência:</label>
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
            @click="closeModalRenovacao"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
            Salvar
          </button>
        </section>
      </form>
    </template>
  </JetDialogModal>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { api } from "@/services/api";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { Money3Component } from "v-money3";

const router = useRouter();
const route = useRoute();
const contrato = ref({});
const faturamentos = ref([]);
const modalFaturamento = ref(false);
const selectNovoFaturamento = ref(null);
const modalCreateItem = ref(false);
let totalFaturado = 0;
const newItem = ref({
  titulo: "",
  unidadeMedida: "",
  valorUnitario: "",
  saldoQuantidadeContratada: "",
});
const modalEditItem = ref(false);
const editingItem = ref({});
const modalEditFaturamento = ref(false);
const editingFaturamento = ref({});
const isFaturamentoViewModal = ref(false);
const isItemViewModal = ref(false);
const projetos = ref("");

// Renovação de contrato
const modalRenovacao = ref(false);
const renovacaoData = ref({
  data_inicio: "",
  data_fim: "",
  tipo_renovacao: "",
  porcentagem_renovacao: "",
});
const emit = defineEmits(["renovacaoCriada"]);

const showRenovacaoModal = () => {
  modalRenovacao.value = true;
};

const closeModalRenovacao = () => {
  modalRenovacao.value = false;
  renovacaoData.value = {
    data_inicio: "",
    data_fim: "",
    tipo_renovacao: "",
    porcentagem_renovacao: "",
  };
};

const createRenovacao = async () => {
  const contratoId = route.params.id;
  let payload = {
    data_inicio: renovacaoData.value.data_inicio,
    data_fim: renovacaoData.value.data_fim,
    tipo_renovacao: renovacaoData.value.tipo_renovacao,
    porcentagem_renovacao: renovacaoData.value.porcentagem_renovacao,
  };
  try {
    const response = await api
      .post(`/contratos/${contratoId}/renovar`, payload)
      .then((response) => {
        toast("Renovação criada com sucesso!", {
          theme: "colored",
          type: "success",
        });
      });
    emit("renovacaoCriada");
    closeModalRenovacao();
  } catch (error) {
    toast("Não foi possível criar a renovação!", {
      theme: "colored",
      type: "error",
    });
    console.error("Erro ao criar renovação:", error);
  }
};

const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

const deleteContrato = (contratoAtual) => {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este contrato?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      api
        .delete(`/contratos/${contratoAtual.id}`)
        .then((response) => {
          toast("Contrato deletado com sucesso!", {
            theme: "colored",
            type: "success",
          });
          voltarListagem();
        })
        .catch((error) => {
          toast("Não foi possível deletar o contrato!", {
            theme: "colored",
            type: "error",
          });
          console.error("Erro ao deletar contrato:", error);
        });
    }
  });
};

const closeModal = () => {
  excluirModal.value = false;
};

const ExibirModalFaturamento = () => {
  if (contrato.value.contratoItens.length === 0) {
    toast(
      "Não é possível adicionar um novo faturamento. Não há itens no contrato.",
      {
        theme: "colored",
        type: "error",
      }
    );
    return;
  }
  modalFaturamento.value = true;
};

const isSaldoNegativo = computed(() => {
  console.log(calcularSaldoAtual(), 'saldo')
  console.log( contrato.value.contratoItens, 'itens')

  return contrato.value.contratoItens.some(
    (item) => calcularSaldoAtual(item) < 0
  );
});

const closeModalFaturamento = () => {
  modalFaturamento.value = false;
};

const resetForm = () => {
  selectNovoFaturamento.value = "";
  contrato.value.contratoItens.forEach((item) => {
    item.quantidadeItens = null;
  });
  projetos.value = "";
  closeModalFaturamento();
};

const createFaturamento = async () => {
  let itensQuantidadePreenchida = contrato.value.contratoItens
    // .filter((item) => item.quantidadeItens)
    .map((item) => ({
      id_item: item.id,
      quantidade_itens: item.quantidadeItens,
    }));
  if (itensQuantidadePreenchida.length === 0) {
    toast("Adicione pelo menos um item para criar o faturamento.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  const saldoMaiorQuantidadeContratada = contrato.value.contratoItens.some(
    (item) => {
      return item.quantidadeItens > item.saldoQuantidadeContratada;
    }
  );

  if (saldoMaiorQuantidadeContratada) {
    toast.error(
      "A quantidade dos items não pode ultrapassar a quantidade contratada."
    );
    return;
  }

  const quantidadeExcedida = contrato.value.contratoItens.some((item) => {
    const quantidadeRestante = calcularItensRestante(
      item.id,
      item.saldoQuantidadeContratada
    );
    return item.quantidadeItens > quantidadeRestante;
  });

  if (quantidadeExcedida) {
    toast.error(
      "A quantidade dos itens não pode ultrapassar a quantidade disponível."
    );
    return;
  }

  let novoSaldoContrato =
    calcularSaldoAtualContrato() -
    calcularSaldoFaturamentoItens(itensQuantidadePreenchida);

  if (novoSaldoContrato < 0) {
    toast("O saldo contratado não pode ser excedido.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  let payload = {
    status: selectNovoFaturamento.value,
    itens: itensQuantidadePreenchida,
    projetos: projetos.value,
  };
  try {
    const response = await api
      .post(`/contratos/${contrato.value.id}/faturamentos`, payload)
      .then((response) => {
        toast("Faturamento criado com sucesso!", {
          theme: "colored",
          type: "success",
        });
      });
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
  window.scroll({
    top: 0,
    // left: 100,
    // behavior: "smooth",
  });
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    contrato.value = response.data;
    if (!contrato.value.quantidadeItens) {
    }
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

// Cálculos de saldo
const calcularSaldoAtual = () => {
  let saldoTotal = calcularSaldoAtualContrato();

  contrato.value.contratoItens.forEach((item) => {
    const valorTotalItem = item.quantidadeItens
      ? item.quantidadeItens * item.valorUnitario
      : 0;

    saldoTotal -= valorTotalItem;
  });

  return saldoTotal;
};

const calcularSaldoAtualEditFaturamento = () => {
  let saldoTotal = contrato.value.saldoContrato;

  editingFaturamento.value.faturamentoItens.forEach((item) => {
    const valorTotalItem = item.quantidadeItens
      ? item.quantidadeItens * item.valorUnitario
      : 0;

    saldoTotal -= valorTotalItem;
  });

  return saldoTotal;
};

const calcularSaldoAtualContrato = () => {
  let saldoTotal = contrato.value.saldoContrato;

  contrato.value.faturamentos.forEach((faturamento) => {
    saldoTotal -= calcularSaldoFaturamentoItens(faturamento.faturamentoItens);
  });

  return saldoTotal;
};

const saldoMaiorQueContrato = (item) => {
  const saldoAtual = calcularSaldoAtual(item);

  return saldoAtual < 0;
};

const saldoMaiorQueContratoEditFaturamento = (item) => {
  const saldoAtual = calcularSaldoAtualEditFaturamento(item);

  return saldoAtual < 0;
};

const calcularSaldoItem = (item) => {
  let valor = 0;
  if (!item.quantidadeItens) {
    item.quantidadeItens = 0;
  }

  valor = item.valorUnitario * item.quantidadeItens;

  return valor;
};

const calcularSaldoFaturamentoItens = (faturamento) => {
  let saldoTotal = 0;
  faturamento.forEach((item) => {
    const quantidadeItens = parseFloat(item.quantidadeItens) || 0;
    const valorUnitario = parseFloat(item.valorUnitario) || 0;
    const valorTotalItem = quantidadeItens * valorUnitario;
    saldoTotal += valorTotalItem;
  });
  return saldoTotal;
};

const calcularSaldoDisponivel = (faturamento) => {
  let saldoTotal = 0;
  let valorAguardandoFaturamento = 0;
  let valorAguardandoPagamento = 0;
  let valorPago = 0;

  faturamento?.forEach((item) => {
    if (item.status === "Aguardando Faturamento") {
      item.faturamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorAguardandoFaturamento += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    } else if (item.status === "Aguardando Pagamento") {
      item.faturamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorAguardandoPagamento += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    } else if (item.status === "Pago") {
      item.faturamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorPago += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    }
  });

  return {
    aguardandoFaturamento: parseFloat(valorAguardandoFaturamento.toFixed(2)),
    aguardandoPagamento: parseFloat(valorAguardandoPagamento.toFixed(2)),
    totalUtilizado: parseFloat(saldoTotal.toFixed(2)),
    valorPago: parseFloat(valorPago.toFixed(2)),
  };
};

const calcularItensRestante = (idItem, quantidadeContratada) => {
  let quantidadeUtilizada = 0;
  let quantidadeRestante = 0;

  contrato.value.faturamentos.forEach((faturamento) => {
    faturamento.faturamentoItens.forEach((faturamentoItem) => {
      if (idItem === faturamentoItem.contratoItemId) {
        quantidadeUtilizada += parseFloat(faturamentoItem.quantidadeItens);
      }
    });
  });
  quantidadeRestante = parseFloat(quantidadeContratada) - quantidadeUtilizada;
  return quantidadeRestante;
};

const calcularQuantidadeItens = (faturamentoItens) => {
  let saldoTotal = 0;

  faturamentoItens.forEach((item) => {
    const quantidadeItens = parseFloat(item.quantidadeItens) || 0;
    saldoTotal += quantidadeItens;
  });
  return parseFloat(saldoTotal.toFixed(2));
};

// Editar Item do contrato

const openItemEditModal = (item) => {
  editingItem.value = { ...item };
  modalEditItem.value = true;
};

const openItemViewModal = (item) => {
  isItemViewModal.value = true;
  editingItem.value = { ...item };
  modalEditItem.value = true;
};

const closeModalEditItem = () => {
  isItemViewModal.value = false;
  modalEditItem.value = false;
};

const saveEditedItem = async () => {
  const contratoId = route.params.id;
  const itemIndex = contrato.value.contratoItens.findIndex(
    (i) => i.id === editingItem.value.id
  );
  let itemEditado = { ...editingItem.value };

  let valorTotalItens = 0;
  let valorContratado = parseFloat(contrato.value.saldoContrato) || 0;

  if (contrato.value.contratoItens) {
    contrato.value.contratoItens.forEach((item) => {
      if (item.id !== itemEditado.id) {
        valorTotalItens +=
          parseFloat(item.saldoQuantidadeContratada) *
          parseFloat(item.valorUnitario);
      }
    });
  } else {
    console.warn("Itens de contrato não definidos.");
  }

  let itemEditadoQuantidade = parseFloat(itemEditado.saldoQuantidadeContratada);
  let itemEditadoValorUnitario = parseFloat(itemEditado.valorUnitario);

  valorTotalItens += itemEditadoQuantidade * itemEditadoValorUnitario;

  if (valorTotalItens > valorContratado) {
    toast.error(
      `Valor total do item excedendo o valor contratado em R$ ${
        valorTotalItens - valorContratado
      }`
    );
    return;
  }

  if (itemEditado.saldoQuantidadeContratada == 0) {
    toast.error(`quantidade contratada não pode ser zero.`);
    return;
  } else if (itemEditado.valorUnitario == 0) {
    toast.error(`Valor unitário não pode ser zero.`);
    return;
  }

  let objEditado = {
    titulo: itemEditado.titulo,
    unidade_medida: itemEditado.unidadeMedida,
    valor_unitario: itemEditado.valorUnitario,
    saldo_quantidade_contratada: itemEditado.saldoQuantidadeContratada,
  };

  try {
    const response = await api.put(
      `/contratos/items/${itemEditado.id}`,
      objEditado
    );
    toast("Item alterado com sucesso!", {
      theme: "colored",
      type: "success",
    });
    fetchContrato(contratoId);
    closeModalEditItem();
  } catch (error) {
    toast("Não foi possível alterar o item!", {
      theme: "colored",
      type: "error",
    });
    console.error("Erro ao alterar item", error);
  }
};

// Deletar Item do contrato
const deleteItem = async (itemId) => {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Excluir um item vinculado em um faturamento, irá afetar aquele faturamento. Tem certeza que deseja excluir este item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/contratos/items/${itemId}`);
        fetchContrato(route.params.id);
        toast("Item deletado com sucesso!", {
          theme: "colored",
          type: "success",
        });
      } catch (error) {
        toast("Erro ao deletar item!", { theme: "colored", type: "error" });
        console.error("Erro ao deletar item:", error);
      }
    }
  });
};

// Criar item do contrato

const openCreateItemModal = () => {
  modalCreateItem.value = true;
};

const closeModalCreateItem = () => {
  modalCreateItem.value = false;
  newItem.value = {
    titulo: "",
    unidadeMedida: "",
    valorUnitario: "",
    saldoQuantidadeContratada: "",
  };
};

const createNewItem = async () => {
  const contratoId = route.params.id;
  let valorTotalItens = 0;
  let valorContratado = parseFloat(contrato.value.saldoContrato) || 0;

  if (contrato.value.contratoItens) {
    contrato.value.contratoItens.map((item) => {
      valorTotalItens +=
        parseFloat(item.saldoQuantidadeContratada) *
        parseFloat(item.valorUnitario);
    });
  } else {
    console.warn("itens de contrato não definidos.");
  }

  let novoItemQuantidade = newItem.value.saldo_quantidade_contratada;
  let novoItemValorUnitario = newItem.value.valor_unitario;

  valorTotalItens += novoItemQuantidade * novoItemValorUnitario;

  if (valorTotalItens > valorContratado) {
    toast.error(
      `Valor total do item excedendo o valor contratado em R$ ${
        valorTotalItens - valorContratado
      }`
    );
    return;
  }

  if (newItem.saldoQuantidadeContratada == 0) {
    toast.error(`quantidade contratada não pode ser zero.`);
    return;
  } else if (newItem.valorUnitario == 0) {
    toast.error(`Valor unitário não pode ser zero.`);
    return;
  }

  try {
    const response = await api.post(
      `/contratos/${route.params.id}/items`,
      newItem.value
    );
    toast("Item criado com sucesso!", {
      theme: "colored",
      type: "success",
    });
    fetchContrato(contratoId);
    closeModalCreateItem();
  } catch (error) {
    toast("Erro ao criar item!", {
      theme: "colored",
      type: "error",
    });
    console.error("Erro ao criar item:", error);
  }
};

// Editar faturamento do contrato
const openEditFaturamentoModal = (faturamento) => {
  // editingFaturamento.value = { ...faturamento };
  editingFaturamento.value = JSON.parse(JSON.stringify(faturamento));
  modalEditFaturamento.value = true;
};

const openViewFaturamentoModal = (faturamento) => {
  isFaturamentoViewModal.value = true;
  editingFaturamento.value = { ...faturamento };
  modalEditFaturamento.value = true;
};

const closeEditFaturamentoModal = () => {
  isFaturamentoViewModal.value = false;
  editingFaturamento.value = {};
  modalEditFaturamento.value = false;
};

const saveEditedFaturamento = async () => {
  let itensQuantidadePreenchida = editingFaturamento.value.faturamentoItens
    // .filter((item) => item.quantidadeItens)
    .map((item) => ({
      id: item.id,
      quantidade_itens: item.quantidadeItens.toString(),
    }));

  const todosQuantidadeZero = itensQuantidadePreenchida.every(
    (item) => item.quantidade_itens === "0"
  );

  if (todosQuantidadeZero) {
    toast.error("Adicione pelo menos um item ao faturamento.");
    return;
  }

  if (itensQuantidadePreenchida.length === 0) {
    toast("Adicione pelo menos um item para editar o faturamento.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  const saldoMaiorQuantidadeContratada =
    editingFaturamento.value.faturamentoItens.some((item) => {
      return item.quantidadeItens > item.saldoQuantidadeContratada;
    });

  if (saldoMaiorQuantidadeContratada) {
    toast.error(
      "A quantidade a ser lançada não pode ultrapassar a quantidade contratada."
    );
    return;
  }

  const quantidadeExcedida = editingFaturamento.value.faturamentoItens.some(
    (item) => {
      const quantidadeRestante = calcularItensRestante(
        item.id,
        item.saldoQuantidadeContratada
      );
      return item.quantidadeItens > quantidadeRestante;
    }
  );

  if (quantidadeExcedida) {
    toast.error(
      "A quantidade a ser lançada não pode ultrapassar a quantidade disponível do item."
    );
    return;
  }

  let payload = {
    status: editingFaturamento.value.status,
    itens: itensQuantidadePreenchida,
    projetos: editingFaturamento.value.projetos,
  };

  try {
    const response = await api
      .put(`/faturamentos/${editingFaturamento.value.id}`, payload)
      .then((response) => {
        Object.assign(editingFaturamento.value);
        toast("Faturamento atualizado com sucesso!", {
          theme: "colored",
          type: "success",
        });
        modalEditFaturamento.value = false;
        fetchContrato(route.params.id);
      });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.btn-faturamento {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 185px;
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
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 160px;
  height: 40px;
}

.btn-item:hover {
  background-color: #0ea5e9;
}
</style>
