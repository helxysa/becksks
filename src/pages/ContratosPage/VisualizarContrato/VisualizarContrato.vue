<template>
  <div class="flex justify-end gap-4 mb-20">
    <button
      @click="showRenovacaoModal()"
      class="btn-renove bg-blue-400 rounded-md text-white p-2 w-32"
      v-if="
        calcularSaldoDisponivel(contrato.lancamentos).totalUtilizado >=
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
        <label class="font-semibold">Fiscal:</label>
        <span class="pl-4 p-2 underline underline-offset-4">{{
          contrato.fiscal
        }}</span>
      </div>
      <div class="flex items-center gap-4">
        <label class="font-semibold">Ponto Focal:</label>
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
              calcularSaldoDisponivel(contrato.lancamentos).aguardandoLancamento
            )
          }}
        </p>
        <p>Valor aguardando lançamento</p>
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
              calcularSaldoDisponivel(contrato.lancamentos).aguardandoPagamento
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
              calcularSaldoDisponivel(contrato.lancamentos).valorPago
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
                calcularSaldoDisponivel(contrato.lancamentos).totalUtilizado
            )
          }}
        </p>
        <p>Saldo disponível</p>
      </div>
    </div>
  </section>

  <section class="mt-16">
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
          <!-- {{ (contrato?.lancamentos?.lancamentoItens) }} -->
          <td class="text-2xl">
            {{ calcularItensRestante(item.id, item.saldoQuantidadeContratada).toFixed(2)}}
          </td>
          <td>
            <div class="flex justify-center items-center gap-2">
              <span @click="openItemViewModal(item)">
                <Icon
                  icon="ph:eye"
                  height="20"
                  class="hover:text-red-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <span @click="openItemEditModal(item)">
                <Icon
                  icon="bx:edit"
                  height="20"
                  class="hover:text-red-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <span @click="deleteItem(item.id)">
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

  <section>
    <div class="flex justify-between mt-12">
      <h1 class="text-4xl font-medium">Lançamentos</h1>
      <div class="flex gap-4">
        <button class="btn-lancamento relative" @click="ExibirModalLancamento">
          Novo Lançamento
          <span class="absolute right-[3px]">
            <Icon
              icon="material-symbols-light:add"
              height="25"
              class="text-zinc-50"
            />
          </span>
        </button>
        <button
          class="bg-orange-500 text-zinc-50 rounded-lg w-[200px]"
          @click="ExibirModalPedidoFaturamento"
        >
          Novo pedido faturamento
        </button>

      </div>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th>
            <input
              type="checkbox"
              class="w-6 h-6"
              :checked="areAllSelected"
              @change="toggleSelectAll"
            />
          </th>
          <th class="text-xl">Data</th>
          <th class="text-xl">Projeto</th>
          <!-- <th class="text-xl">Quantidade itens</th> -->
          <th class="text-xl">Total do Lançamento</th>
          <!-- <th class="text-xl">Itens disponíveis</th> -->
          <!-- <th class="text-xl">Situação</th> -->
          <!-- <th class="text-xl">Saldo Atual do Contrato</th> -->
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody v-if="contrato.lancamentos">
        <tr
          class="h-24 text-center"
          v-for="lancamento in lancamentosOrdenados"
          :key="lancamento.id"
        >
          <td>
            <input
              type="checkbox"
              class="w-6 h-6"
              v-model="pedidosFaturamento"
              :value="lancamento.id"
              @change="changePedido"
            />
          </td>
          <td class="text-2xl">{{ formatDate(lancamento.createdAt) }}</td>
          <td class="text-2xl">{{ lancamento.projetos }}</td>
          <!-- <td class="text-2xl">
            {{ calcularQuantidadeItens(lancamento.lancamentoItens) }}
          </td> -->
          <td class="text-2xl">
            {{
              formatCurrency(
                calcularSaldoLancamentoItens(lancamento.lancamentoItens)
              )
            }}
          </td>
          <td class="text-2xl">
            <div class="flex justify-center items-center gap-2">
              <span @click="openViewLancamentoModal(lancamento)">
                <Icon
                  icon="ph:eye"
                  height="20"
                  class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <span @click="openEditLancamentoModal(lancamento)">
                <Icon
                  icon="bx:edit"
                  height="20"
                  class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <span @click="deleteLancamento(lancamento.id)">
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

  <!-- Tabela Faturamentos-->
  <section>
    <div class="flex justify-between mt-12">
      <h1 class="text-4xl font-medium">Faturamentos</h1>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th class="text-xl">Data</th>
          <th class="text-xl">Nota Fiscal</th>
          <th class="text-xl">Total do Faturamento</th>
          <!-- <th class="text-xl">Situação</th> -->
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody v-if="contrato.faturamentos">
        <tr
          class="h-28 text-center"
          v-for="faturamento in faturamentosOrdenados"
          :key="faturamento.id"
        >
          <td class="text-2xl">
            <!-- {{ faturamento.dataFaturamento}} -->
            {{ formatDatePTBR(faturamento.dataFaturamento) }}
          </td>
          <td class="text-2xl">{{ faturamento.notaFiscal }}</td>

          <td class="text-2xl">
            {{
              formatCurrency(
                calcularSaldoFaturamentoItens(faturamento.faturamentoItens)
              )
            }}
          </td>
          <!-- <td class="text-2xl text-center">
            <div class="flex justify-center">
            <span
            class="border-2 py-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
              :class="{
                'bg-green-200 border-green-400': faturamento.status === 'Pago',
                'bg-yellow-200 border-yellow-400': faturamento.status === 'Aguardando Pagamento',
                'bg-blue-200 border-blue-400': faturamento.status === 'Aguardando Faturamento',
              }"
              >
              {{ faturamento.status }}
          </span>
        </div>
          </td> -->

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

  <!-- Modal novo pedido de faturamento-->
  <JetDialogModal
    :show="modalPedidoFaturamento"
    :withouHeader="false"
    @close="closeModalPedidoFaturamento"
    maxWidth="6xl"
    :modalTitle="'Criar Pedido de Faturamento'"
  >
    <template #content>
      <form @submit.prevent="createPedidoFaturamento">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4 items-center justify-between text-center">
            <label class="font-bold text-3xl">Valor total:</label>
            <span class="font-medium text-3xl">{{
              formatCurrency(calcularTotalLancamento(contrato.lancamentos))
            }}</span>
          </div>
          <div class="flex gap-4 items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Nota fiscal:</label>
            <input
              type="text"
              v-model="pedidoFaturamentoData.nota_fiscal"
              required
              placeholder="Informe o código da  nota fiscal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
          <div class="flex gap-4 items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Encaminhado em:</label>
            <input
              type="date"
              v-model="pedidoFaturamentoData.data_faturamento"
              required
              placeholder="Informe a  data do pedido  de faturamento"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
        </section>
        <div class="font-bold text-3xl mt-8">Descrição da nota:</div>
        <table
          class="table-auto border border-slate-200 rounded-2xl w-full mt-8"
        >
          <thead class="h-20 bg-slate-100 border-1">
            <tr>
              <th class="text-xl">Projeto</th>
              <th class="text-xl">Unidade de medida</th>
              <th class="text-xl">Quantidade</th>
              <th class="text-xl">Valor do lançamento</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-24 text-center"
              :key="item.id"
              v-for="(item, index) in contrato.lancamentos.filter(
                (lancamento) => pedidosFaturamento.includes(lancamento.id)
              )"
            >
              <td>{{ item.projetos }}</td>
              <td>
                <div
                  v-for="unidade in [
                    ...new Set(
                      item.lancamentoItens.map(
                        (subitem) => subitem.unidadeMedida
                      )
                    ),
                  ]"
                  :key="unidade"
                >
                  <template
                    v-if="
                      item.lancamentoItens
                        .filter((subitem) => subitem.unidadeMedida === unidade)
                        .reduce(
                          (total, subitem) =>
                            total + parseFloat(subitem.quantidadeItens),
                          0
                        ) > 0
                    "
                  >
                    <span class="flex justify-center">
                      {{ unidade }}
                    </span>
                  </template>
                </div>
              </td>
              <td>
                <div
                  v-for="unidade in [
                    ...new Set(
                      item.lancamentoItens.map(
                        (subitem) => subitem.unidadeMedida
                      )
                    ),
                  ]"
                  :key="unidade"
                >
                  <template
                    v-if="
                      item.lancamentoItens
                        .filter((subitem) => subitem.unidadeMedida === unidade)
                        .reduce(
                          (total, subitem) =>
                            total + parseFloat(subitem.quantidadeItens),
                          0
                        ) > 0
                    "
                  >
                    <span class="flex justify-center">
                      {{
                        item.lancamentoItens
                          .filter(
                            (subitem) => subitem.unidadeMedida === unidade
                          )
                          .reduce(
                            (total, subitem) =>
                              total + parseFloat(subitem.quantidadeItens),
                            0
                          )
                      }}
                    </span>
                  </template>
                </div>
              </td>
              <td>
                {{
                  formatCurrency(
                    calcularSaldoLancamentoItens(item.lancamentoItens)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-9 flex justify-end gap-4">
          <button
            @click="closeModalPedidoFaturamento"
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
        </div>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal editar  pedido de  faturamento -->
  <JetDialogModal
    :show="modalEditFaturamento"
    :withouHeader="false"
    @close="closeEditFaturamentoModal"
    maxWidth="6xl"
    :modalTitle="
      isFaturamentoViewModal ? 'Visualizar Faturamento' : 'Editar Faturamento'
    "
  >
    <template #content>
      <form @submit.prevent="saveEditedFaturamento">
        <section class="flex flex-col gap-8">
          <div class="flex justify-between items-center gap-4">
            <label class="font-bold text-3xl w-[180px]">Valor total:</label>
            <span class="font-medium text-3xl">{{
              formatCurrency(calcularTotalFaturamento(editingFaturamento))
            }}</span>
          </div>
          <div class="flex gap-4 items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Nota fiscal:</label>
            <input
              :disabled="isFaturamentoViewModal"
              :class="{ 'bg-white border-none': isFaturamentoViewModal }"
              type="text"
              v-model="editingFaturamento.notaFiscal"
              required
              placeholder="Informe o código da  nota fiscal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
          <div class="flex gap-4 items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Encaminhado em:</label>
            <input
              type="date"
              :disabled="isFaturamentoViewModal"
              :class="{ 'bg-white border-none': isFaturamentoViewModal }"
              v-model="editingFaturamento.dataFaturamento"
              required
              placeholder="Informe a  data do pedido  de faturamento"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
        </section>
        <div class="font-bold text-3xl mt-8">Descrição da nota:</div>
        <table
          class="table-auto border border-slate-200 rounded-2xl w-full mt-8"
        >
          <thead class="h-20 bg-slate-100 border-1">
            <tr>
              <th class="text-xl">Projeto</th>
              <th class="text-xl">Unidade de medida</th>
              <th class="text-xl">Quantidade</th>
              <th class="text-xl">Valor do lançamento</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-24 text-center"
              v-for="item in editingFaturamento.faturamentoItens.map(
                (subItem) => subItem.lancamento
              )"
              :key="item.id"
            >
              <td>{{ item.projetos }}</td>
              <td>
                <span
                  class="flex justify-center"
                  v-for="unidade in [
                    ...new Set(
                      item.lancamentoItens.map(
                        (subitem) => subitem.unidadeMedida
                      )
                    ),
                  ]"
                  :key="unidade"
                >
                  {{ unidade }}
                </span>
              </td>
              <td>
                <div
                v-for="unidade in [
                  ...new Set(
                    item.lancamentoItens.map(
                      (subitem) => subitem.unidadeMedida
                    )
                  ),
                ]"
                :key="unidade"
              >
                <template
                  v-if="
                    item.lancamentoItens
                      .filter((subitem) => subitem.unidadeMedida === unidade)
                      .reduce(
                        (total, subitem) =>
                          total + parseFloat(subitem.quantidadeItens),
                        0
                      ) > 0
                  "
                >
                  <span class="flex justify-center">
                    {{
                      item.lancamentoItens
                        .filter(
                          (subitem) => subitem.unidadeMedida === unidade
                        )
                        .reduce(
                          (total, subitem) =>
                            total + parseFloat(subitem.quantidadeItens),
                          0
                        )
                    }}
                  </span>
                </template>
              </div>
              </td>
              <td>
                {{
                  formatCurrency(
                    calcularSaldoLancamentoItens(item.lancamentoItens)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
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
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
            Salvar
          </button>
        </div>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal criar Lancamento -->
  <JetDialogModal
    :show="modalLancamento"
    :withouHeader="false"
    @close="closeModalLancamento"
    maxWidth="7xl"
    :modalTitle="'Criar Lançamento'"
  >
    <template #content>
      <form @submit.prevent="createLancamento">
        <section class="flex flex-col gap-8">
          <!-- <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Situação:</label>
            <select
              v-model="selectNovoLancamento"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">Selecione a situação</option>
              <option>Aguardando Lancamento</option>
              <option>Aguardando Pagamento</option>
              <option>Pago</option>
            </select>
          </div> -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl">Projeto:</label>
            <input
              type="text"
              placeholder="Informe o nome do  projeto"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="projetos"
            />
          </div>
          <!-- <div class="flex gap-4 justify-between items-center">
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
          </div> -->
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
                    ).toFixed(2)
                  }}
                </td>
                <td>
                  <money3
                  v-model="item.quantidadeItens"
                  type="number"
                  class="border-2 text-center max-w-60"
                  min="0"
                  :max="Number(item.saldoQuantidadeContratada)"
                  v-bind="decimalConfig"

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
            @click="closeModalLancamento"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            :disabled="isSaldoNegativo"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-lancamento w-40"
          >
            Salvar
          </button>
        </div>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal editar lancamento-->
  <JetDialogModal
    :show="modalEditLancamento"
    :withouHeader="false"
    @close="closeEditLancamentoModal"
    maxWidth="7xl"
    :modalTitle="
      isLancamentoViewModal ? 'Visualizar Lançamento' : 'Editar Lançamento'
    "
  >
    <template #content>
      <form @submit.prevent="saveEditedLancamento">
        <section class="flex flex-col gap-8">
          <!-- <div class="mt-8 flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Situação:</label>
            <select
              :disabled="isLancamentoViewModal"
              v-model="editingLancamento.status"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">Selecione a situação</option>
              <option>Aguardando Lancamento</option>
              <option>Aguardando Pagamento</option>
              <option>Pago</option>
            </select>
          </div> -->

          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl">Projeto:</label>
            <input
              type="text"
              placeholder="Informe o nome do projeto"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              :disabled="isLancamentoViewModal"
              :class="{ 'border-none bg-white': isLancamentoViewModal }"
              v-model="editingLancamento.projetos"
            />
          </div>
          <!-- <div class="flex gap-4 justify-between items-center">
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
          </div> -->
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
                v-for="item in editingLancamento.lancamentoItens"
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
                    ).toFixed(2)
                  }}
                </td>
                <td>
                  <money3
                  v-model="item.quantidadeItens"
                  type="number"
                  :disabled="isLancamentoViewModal"
                  :class="{ 'border-none bg-white': isLancamentoViewModal }"
                  class="border-2 text-center max-w-60"
                  min="0"
                  :max="Number(item.saldoQuantidadeContratada)"
                  v-bind="decimalConfig"

                />
                </td>
                <td class="text-2xl flex justify-center mt-4 gap-3 w-full">
                  <span
                    class="max-w-60"
                    :class="{
                      'text-red-500': saldoMaiorQueContratoEditLancamento(item),
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
            @click="closeEditLancamentoModal"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            v-if="!isLancamentoViewModal"
            type="submit"
            :disabled="isSaldoNegativo"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-lancamento w-40"
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
            <money3
            v-model="newItem.saldo_quantidade_contratada"
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
            @click="closeModalCreateItem"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-lancamento w-40"
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
            <money3
            v-model="editingItem.saldoQuantidadeContratada"
             :disabled="isItemViewModal"
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
            @click="closeModalEditItem"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            v-if="!isItemViewModal"
            type="submit"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-lancamento w-40"
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
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-lancamento w-40"
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
import { format, formatISO, startOfDay } from "date-fns";

const router = useRouter();
const route = useRoute();
const contrato = ref({});
const lancamentos = ref([]);
const modalLancamento = ref(false);
const selectNovoLancamento = ref(null);
const modalPedidoFaturamento = ref(false);
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
const modalEditLancamento = ref(false);
const modalEditFaturamento = ref(false);
const editingLancamento = ref({});
const isLancamentoViewModal = ref(false);
const isItemViewModal = ref(false);
const isFaturamentoViewModal = ref(false);
const editingFaturamento = ref({});

const projetos = ref("");
const pedidosFaturamento = ref([]);
const arrayIds = ref([]);
const pedidoFaturamentoData = ref({
  nota_fiscal: "",
  data_faturamento: "",
  descricao_nota: [],
});

const changePedido = (e) => {
  pedidoFaturamentoData.value.descricao_nota = pedidosFaturamento.value;
};

const areAllSelected = computed(() => {
  return (
    pedidosFaturamento.value.length === lancamentosOrdenados.value.length &&
    lancamentosOrdenados.value.length > 0
  );
});

const toggleSelectAll = () => {
  if (areAllSelected.value) {
    pedidosFaturamento.value = [];
  } else {
    pedidosFaturamento.value = lancamentosOrdenados.value.map(
      (lancamento) => lancamento.id
    );
  }
  changePedido();
};

// Faturamento
const ExibirModalPedidoFaturamento = () => {
  modalPedidoFaturamento.value = true;
};
const closeModalPedidoFaturamento = () => {
  modalPedidoFaturamento.value = false;
  pedidoFaturamentoData.value = {
    nota_fiscal: "",
    data_faturamento: "",
    descricao_nota: [],
  };

  pedidosFaturamento.value = [];
};

// Editar faturamento do contrato
const openEditFaturamentoModal = (faturamento) => {
  const dataFormatada = format(
    new Date(faturamento.dataFaturamento),
    "yyyy-MM-dd"
  );
  editingFaturamento.value = { ...faturamento, dataFaturamento: dataFormatada };
  modalEditFaturamento.value = true;
};

const openViewFaturamentoModal = (faturamento) => {
  isFaturamentoViewModal.value = true;
  const dataFormatada = format(
    new Date(faturamento.dataFaturamento),
    "yyyy-MM-dd"
  );
  editingFaturamento.value = { ...faturamento, dataFaturamento: dataFormatada };
  modalEditFaturamento.value = true;
};

const closeEditFaturamentoModal = () => {
  isFaturamentoViewModal.value = false;
  editingFaturamento.value = {};
  // closeModalPedidoFaturamento()
  modalEditFaturamento.value = false;
};

const calcularTotalLancamento = (lancamentos) => {
  let total = 0;

  const lancamentosFiltrados = lancamentos.filter((lancamento) =>
    pedidosFaturamento.value.includes(lancamento.id)
  );

  lancamentosFiltrados.forEach((lancamento) => {
    lancamento.lancamentoItens.forEach((lancamentoItem) => {
      total +=
        parseFloat(lancamentoItem.valorUnitario) *
        parseFloat(lancamentoItem.quantidadeItens);
    });
  });

  return total;
};

const calcularTotalFaturamento = (faturamento) => {
  let total = 0;

  faturamento.faturamentoItens.forEach((faturamentoItem) => {
    faturamentoItem.lancamento.lancamentoItens.forEach((lancamentoItem) => {
      total +=
        parseFloat(lancamentoItem.valorUnitario) *
        parseFloat(lancamentoItem.quantidadeItens);
    });
  });
  return total;
};

const calcularSaldoFaturamentoItens = (faturamento) => {
  let saldoTotal = 0;
  faturamento.forEach((item) => {
    item.lancamento.lancamentoItens.forEach((subItem) => {
      const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
      const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
      const valorTotalItem = quantidadeItens * valorUnitario;
      saldoTotal += valorTotalItem;
    });
  });
  return saldoTotal;
};

const formatDatePTBR = (isoString) => {
  const [datePart] = isoString.split("T");

  const [ano, mes, dia] = datePart.split("-");

  return `${dia}/${mes}/${ano}`;
};

const createPedidoFaturamento = async () => {
  // const dataFaturamento = startOfDay(new Date(pedidoFaturamentoData.value.data_faturamento));
  // const dataFaturamentoISO = formatISO(dataFaturamento, { representation: 'date' });

  let payload = {
    nota_fiscal: pedidoFaturamentoData.value.nota_fiscal,
    data_faturamento: pedidoFaturamentoData.value.data_faturamento,
    descricao_nota: pedidoFaturamentoData.value.descricao_nota,
  };

  if (payload.descricao_nota.length <= 0) {
    toast.error("Selecione pelo menos um lançamento para gerar o faturamento.");
    return;
  }

  try {
    const contratoId = route.params.id;
    const response = await api
      .post(`/contratos/${contrato.value.id}/faturamentos`, payload)
      .then((response) => {
        toast("Faturamento criado com sucesso!", {
          theme: "colored",
          type: "success",
        });
        closeModalPedidoFaturamento();
      });
    fetchContrato(contratoId);
  } catch (error) {
    toast("Não foi possível criar o  pedido  de faturamento!", {
      theme: "colored",
      type: "error",
    });
  }
};

const deleteFaturamento = (faturamentoId) => {
  const contratoId = route.params.id;

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
          fetchContrato(contratoId);
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

const saveEditedFaturamento = async () => {
  let payload = {
    nota_fiscal: editingFaturamento.value.notaFiscal,
    data_faturamento: editingFaturamento.value.dataFaturamento,
    descricao_nota: editingFaturamento.value.descricao_nota,
  };

  try {
    let contratoId = route.params.id;
    const response = await api
      .put(`/faturamentos/${editingFaturamento.value.id}`, payload)
      .then((response) => {
        Object.assign(editingFaturamento.value);
        toast("Faturamento atualizado com sucesso!", {
          theme: "colored",
          type: "success",
        });
        closeEditFaturamentoModal();
        fetchContrato(contratoId);
      });
  } catch (error) {
    console.error(error);
  }
};

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

const decimalConfig = {
  precision: 2,
  decimal: ',',
  thousands: '.',
  prefix: '',
  masked: false
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

const ExibirModalLancamento = () => {
  if (contrato.value.contratoItens.length === 0) {
    toast(
      "Não é possível adicionar um novo lancamento. Não há itens no contrato.",
      {
        theme: "colored",
        type: "error",
      }
    );
    return;
  }
  modalLancamento.value = true;
};

const isSaldoNegativo = computed(() => {
  return contrato.value.contratoItens.some(
    (item) => calcularSaldoAtual(item) < 0
  );
});

const closeModalLancamento = () => {
  modalLancamento.value = false;
  projetos.value = "";
  contrato.value.contratoItens.forEach((item) => {
    item.quantidadeItens = null;
  });
};

const resetForm = () => {
  selectNovoLancamento.value = "";
  contrato.value.contratoItens.forEach((item) => {
    item.quantidadeItens = null;
  });
  projetos.value = "";
  closeModalLancamento();
};

const createLancamento = async () => {
  if (!projetos.value || projetos.value == null) {
    toast("Insira o nome do projeto", {
      theme: "colored",
      type: "error",
    });
    return;
  }
  let itensQuantidadePreenchida = contrato.value.contratoItens
    // .filter((item) => item.quantidadeItens)
    .map((item) => ({
      id_item: item.id,
      quantidade_itens: item.quantidadeItens,
    }));
  if (itensQuantidadePreenchida.length === 0) {
    toast("Adicione pelo menos um item para criar o lancamento.", {
      theme: "colored",
      type: "error",
    });
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
      "A quantidade a ser lançada não pode ultrapassar a quantidade disponível."
    );
    return;
  }

  let novoSaldoContrato =
    calcularSaldoAtualContrato() -
    calcularSaldoLancamentoItens(itensQuantidadePreenchida);

  if (novoSaldoContrato < 0) {
    toast("O saldo contratado não pode ser excedido.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  let payload = {
    status: selectNovoLancamento.value || "status",
    itens: itensQuantidadePreenchida,
    projetos: projetos.value,
  };
  try {
    const contratoId = route.params.id;

    const response = await api
      .post(`/contratos/${contrato.value.id}/lancamentos`, payload)
      .then((response) => {
        toast("Lancamento criado com sucesso!", {
          theme: "colored",
          type: "success",
        });
      });
    resetForm();
    fetchContrato(contratoId);
  } catch (error) {
    console.error("Erro ao criar lancamento:", error);
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

const deleteLancamento = (lancamentoId) => {
  const contratoId = route.params.id;
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este lançamento?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      api
        .delete(`/lancamentos/${lancamentoId}`)
        .then((response) => {
          toast("Lancamento deletado com sucesso!", {
            theme: "colored",
            type: "success",
          });
          fetchContrato(contratoId);
        })
        .catch((error) => {
          toast('Não foi possível deletar lançamento', {
            theme: "colored",
            type: "error",
          });
          console.error("Erro ao deletar lancamento:", error.message);
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

const lancamentosOrdenados = computed(() => {
  if (!contrato.value || !contrato.value.lancamentos) {
    return [];
  }
  return contrato.value.lancamentos.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
});

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

const calcularSaldoAtualEditLancamento = () => {
  let saldoTotal = contrato.value.saldoContrato;

  editingLancamento.value.lancamentoItens.forEach((item) => {
    const valorTotalItem = item.quantidadeItens
      ? item.quantidadeItens * item.valorUnitario
      : 0;

    saldoTotal -= valorTotalItem;
  });

  return saldoTotal;
};

const calcularSaldoAtualContrato = () => {
  let saldoTotal = contrato.value.saldoContrato;

  contrato.value.lancamentos.forEach((lancamento) => {
    saldoTotal -= calcularSaldoLancamentoItens(lancamento.lancamentoItens);
  });

  return saldoTotal;
};

const saldoMaiorQueContrato = (item) => {
  const saldoAtual = calcularSaldoAtual(item);

  return saldoAtual < 0;
};

const saldoMaiorQueContratoEditLancamento = (item) => {
  const saldoAtual = calcularSaldoAtualEditLancamento(item);

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

const calcularSaldoLancamentoItens = (lancamento) => {
  let saldoTotal = 0;
  lancamento.forEach((item) => {
    const quantidadeItens = parseFloat(item.quantidadeItens) || 0;
    const valorUnitario = parseFloat(item.valorUnitario) || 0;
    const valorTotalItem = quantidadeItens * valorUnitario;
    saldoTotal += valorTotalItem;
  });
  return saldoTotal;
};

const calcularSaldoDisponivel = (lancamento) => {
  let saldoTotal = 0;
  let valorAguardandoLancamento = 0;
  let valorAguardandoPagamento = 0;
  let valorPago = 0;

  lancamento?.forEach((item) => {
    if (item.status === "Aguardando Lancamento") {
      item.lancamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorAguardandoLancamento += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    } else if (item.status === "Aguardando Pagamento") {
      item.lancamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorAguardandoPagamento += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    } else if (item.status === "Pago") {
      item.lancamentoItens.forEach((subItem) => {
        const quantidadeItens = parseFloat(subItem.quantidadeItens) || 0;
        const valorUnitario = parseFloat(subItem.valorUnitario) || 0;
        const valorTotalItem = quantidadeItens * valorUnitario;
        valorPago += valorTotalItem;
        saldoTotal += valorTotalItem;
      });
    }
  });

  return {
    aguardandoLancamento: parseFloat(valorAguardandoLancamento.toFixed(2)),
    aguardandoPagamento: parseFloat(valorAguardandoPagamento.toFixed(2)),
    totalUtilizado: parseFloat(saldoTotal.toFixed(2)),
    valorPago: parseFloat(valorPago.toFixed(2)),
  };
};

const calcularItensRestante = (idItem, quantidadeContratada) => {
  let quantidadeUtilizada = 0;
  let quantidadeRestante = 0;

  contrato.value.lancamentos.forEach((lancamento) => {
    lancamento.lancamentoItens.forEach((lancamentoItem) => {
      if (idItem === lancamentoItem.contratoItemId) {
        quantidadeUtilizada += parseFloat(lancamentoItem.quantidadeItens);
      }
    });
  });
  quantidadeRestante = parseFloat(quantidadeContratada) - quantidadeUtilizada;
  return quantidadeRestante;
};

const calcularQuantidadeItens = (lancamentoItens) => {
  let saldoTotal = 0;

  lancamentoItens.forEach((item) => {
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
  const contratoId = route.params.id;
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir este item?",
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
        fetchContrato(contratoId);
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
    console.error("itens de contrato não definidos.");
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

// Editar lancamento do contrato
const editingLancamentoBackup = ref(null);
const openEditLancamentoModal = (lancamento) => {
  editingLancamentoBackup.value = JSON.parse(JSON.stringify(lancamento));
  editingLancamento.value = lancamento;
  modalEditLancamento.value = true;
};

const openViewLancamentoModal = (lancamento) => {
  isLancamentoViewModal.value = true;
  const itensComQuantidade = lancamento.lancamentoItens.filter(
    (item) => item.quantidadeItens > 0
  );
  editingLancamento.value = {
    ...lancamento,
    lancamentoItens: itensComQuantidade,
  };
  modalEditLancamento.value = true;
};

const closeEditLancamentoModal = () => {
  if (editingLancamentoBackup.value) {
    Object.assign(editingLancamento.value, editingLancamentoBackup.value);
    editingLancamentoBackup.value = null;
  }
  isLancamentoViewModal.value = false;
  editingLancamento.value = {};
  modalEditLancamento.value = false;
  projetos.value = "";
};

const saveEditedLancamento = async () => {
  if (
    !editingLancamento.value.projetos ||
    editingLancamento.value.projetos === null
  ) {
    toast.error("Adicione o nome do projeto.", {
      theme: "colored",
      type: "error",
    });
    return;
  }
  let itensQuantidadePreenchida = editingLancamento.value.lancamentoItens
    // .filter((item) => item.quantidadeItens)
    .map((item) => ({
      id: item.id,
      contrato_item_id: item.contratoItemId,
      saldo_quantidade_contratada: item.saldoQuantidadeContratada,
      quantidade_itens: item.quantidadeItens.toString(),
    }));

  const todosQuantidadeZero = itensQuantidadePreenchida.every(
    (item) => item.quantidade_itens === "0"
  );

  if (todosQuantidadeZero) {
    toast.error("Adicione pelo menos um item ao lancamento.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  if (itensQuantidadePreenchida.length === 0) {
    toast("Adicione pelo menos um item para editar o lancamento.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  const quantidadeExcedida = itensQuantidadePreenchida.some((item) => {
    let quantidadeTotalLançada = contrato.value.lancamentos.reduce(
      (total, lancamento) => {
        return (
          total +
          lancamento.lancamentoItens.reduce((subTotal, lancamentoItem) => {
            if (
              lancamentoItem.contratoItemId === item.contrato_item_id &&
              lancamentoItem.id !== item.id
            ) {
              return subTotal + parseFloat(lancamentoItem.quantidadeItens);
            }
            return subTotal;
          }, 0)
        );
      },
      0
    );

    const saldoQuantidadeContratada = parseFloat(
      item.saldo_quantidade_contratada
    );
    const quantidadeItens = parseFloat(item.quantidade_itens);
    const quantidadeDisponivel =
      saldoQuantidadeContratada - quantidadeTotalLançada;

    return quantidadeItens > quantidadeDisponivel;
  });

  if (quantidadeExcedida) {
    toast.error(
      "A quantidade a ser lançada não pode ultrapassar a quantidade disponível do item.",
      {
        theme: "colored",
        type: "error",
      }
    );
    return;
  }

  let payload = {
    // status: editingLancamento.value.status,
    status: "sem situação",
    itens: itensQuantidadePreenchida.map((item) => ({
      id: item.id,
      quantidade_itens: item.quantidade_itens,
    })),
    projetos: editingLancamento.value.projetos,
  };
  try {
    const contratoId = route.params.id;
    const response = await api
      .put(`/lancamentos/${editingLancamento.value.id}`, payload)
      .then((response) => {
        Object.assign(editingLancamento.value);
        toast("Lancamento atualizado com sucesso!", {
          theme: "colored",
          type: "success",
        });
        modalEditLancamento.value = false;
        editingLancamentoBackup.value = null;
        fetchContrato(contratoId);
      });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.btn-lancamento,
.btn-faturamento {
  background-color: var(--bluePrimary);
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 185px;
  height: 40px;
}

.btn-lancamento:hover,
.btn-faturamento:hover {
  background-color: #0ea5e9;
}

.btn-save-lancamento,
.btn-save-faturamento {
  background-color: var(--bluePrimary);
}

.btn-save-lancamento:hover,
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
