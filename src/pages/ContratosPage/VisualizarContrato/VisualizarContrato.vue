<template>
  <!-- Detalhes do contrato -->
  <section>
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
    >
      <h1 class="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
        Detalhes do Contrato
      </h1>
      <div class="flex flex-wrap gap-3">
        <button
          class="flex items-center justify-center px-8 py-3 rounded-md text-2xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          <i class="fas fa-edit mr-2"></i>
          <router-link
            :to="{ name: 'editarcontrato', params: { id: contrato.id } }"
          >
            Editar
          </router-link>
        </button>
        <button
          @click="deleteContrato(contrato)"
          class="flex items-center justify-center px-8 py-3 rounded-md text-2xl font-medium text-white bg-red-500 hover:bg-red-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          <i class="fas fa-trash-alt mr-2"></i>Excluir
        </button>
      </div>
    </div>

    <!-- Detalhes do contrato -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div
        class="bg-white rounded-xl shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
      >
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Informações do Contrato
        </h3>
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="bg-blue-100 text-blue-500 rounded-full p-2 mr-3">
              <i class="fas fa-file-contract"></i>
              <Icon
                icon="fa6-solid:file-contract"
                width="1.5rem"
                height="1.5rem"
                class="text-blue-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Contrato</p>
              <p class="font-medium text-gray-700">
                {{ contrato.nomeContrato }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-green-100 text-green-500 rounded-full p-2 mr-3">
              <i class="fas fa-user"></i>
              <Icon
                icon="fa-solid:user"
                width="1.5rem"
                height="1.5rem"
                class="text-green-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Cliente</p>
              <p class="font-medium text-gray-700">
                {{ contrato.nomeCliente }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-purple-100 text-purple-500 rounded-full p-2 mr-3">
              <i class="fas fa-calendar-alt"></i>
              <Icon
                icon="fa-solid:calendar-alt"
                width="1.5rem"
                height="1.5rem"
                class="text-purple-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Vigência</p>
              <p class="font-medium text-gray-700">
                {{ formatDate(contrato.dataInicio) }} até
                {{ formatDate(contrato.dataFim) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        class="bg-white rounded-xl shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
      >
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Fiscal</h3>
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="bg-indigo-100 text-indigo-500 rounded-full p-3 mr-3">
              <i class="fas fa-user-tie"></i>
              <Icon
                icon="fa-solid:user-tie"
                width="1.5rem"
                height="1.5rem"
                class="text-indigo-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Nome</p>
              <p class="font-medium text-gray-700">
                {{ contrato?.fiscal?.nome }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-yellow-100 text-yellow-500 rounded-full p-3 mr-3">
              <i class="fas fa-phone"></i>
              <Icon icon="fa:phone" width="1.5rem" class="text-yellow-400" />
            </div>
            <div>
              <p class="text-lg text-gray-500">Contato</p>
              <p
                class="font-medium text-gray-700 underline hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                @click="openWhatsApp(contrato.fiscal.telefone)"
              >
                {{ contrato?.fiscal?.telefone }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-red-100 text-red-500 rounded-full p-3 mr-3">
              <Icon
                icon="fa:envelope"
                width="1.5rem"
                height="1.5rem"
                class="text-red-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">E-mail</p>
              <p class="font-medium text-gray-700">
                {{ contrato?.fiscal?.email }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="bg-white rounded-xl shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
      >
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Detalhes Adicionais
        </h3>
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="bg-teal-100 text-teal-500 rounded-full p-3 mr-3">
              <Icon
                icon="fa-solid:bullseye"
                width="1.5rem"
                height="1.5rem"
                class="text-teal-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Ponto Focal</p>
              <p class="font-medium text-gray-700">{{ contrato.pontoFocal }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-pink-100 text-pink-500 rounded-full p-3 mr-3">
              <Icon
                icon="fa6-solid:city"
                width="1.5rem"
                height="1.5rem"
                class="text-pink-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Cidade</p>
              <p class="font-medium text-gray-700">
                {{ contrato.cidade }} ({{ contrato.estado }})
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="bg-orange-100 text-orange-500 rounded-full p-3 mr-3">
              <Icon
                icon="fa-solid:file-alt"
                width="1.5rem"
                height="1.5rem"
                class="text-orange-400"
              />
            </div>
            <div>
              <p class="text-lg text-gray-500">Objeto do Contrato</p>
              <p class="font-medium text-gray-700">
                {{ contrato.objetoContrato }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>

    <!-- Financial Summary Cards -->
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Resumo Financeiro</h2>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8"
    >
      <div
        v-for="(item, index) in financialSummary"
        :key="index"
        :class="`bg-gradient-to-br ${item.bgColor} rounded-xl shadow-lg p-6 text-white transition duration-300 ease-in-out hover:shadow-xl`"
      >
        <section class="flex flex-col h-full justify-between">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <Icon :icon="`${item.icon}`" :height="24" class="opacity-80" />
          </div>
          <p class="text-3xl font-bold mt-2">{{ item.value }}</p>
        </section>
      </div>
    </section>

    <!-- Observações Section -->
    <section
      class="bg-white rounded-xl shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg"
    >
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Descrição</h3>
      <div class="flex items-center">
        <div class="bg-gray-100 text-gray-500 rounded-md p-3 mr-3">
          <Icon
            icon="fa-solid:comment-alt"
            width="1.5rem"
            height="1.5rem"
            class="text-gray-400"
          />
        </div>
        <div>
          <p class="text-lg text-gray-500">Detalhes adicionais</p>
          <p class="font-medium text-gray-700">{{ contrato.observacoes }}</p>
        </div>
      </div>
    </section>
  </section>

  <!-- Tabela itens do contrato-->
  <section class="mt-16">
    <div class="flex justify-between items-center">
      <h1 class="mt-12 text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
        Itens do Contrato
      </h1>
      <div class="flex gap-4">
        <button
          @click="openCreateItemModal"
          class="flex items-center justify-center px-9 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
          Adicionar Item
        </button>
        <button
          class="inline-flex items-center justify-between px-4 py-3 rounded-md text-xl font-normal text-white bg-gray-500 hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          type="button"
          @click="openModalUnidade"
        >
          <span class="mr-2 pb-[1px]">
            <Icon
              icon="material-symbols-light:grid-on-outline"
              height="20"
              class="text-zinc-50"
            />
          </span>
          Adicionar Unidade
        </button>
      </div>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th class="text-xl px-2">Id</th>
          <th class="text-xl">Item</th>
          <th class="text-xl">U.M (Unidade de Medida)</th>
          <th class="text-xl">Quantidade Contratada</th>
          <th class="text-xl">Valor Unitário</th>
          <th class="text-xl">Valor Total (Item)</th>
          <th class="text-xl min-w-44">Quantidade itens disponíveis</th>
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody>
        <!-- {{contratoItemData}} -->
        <tr
          class="h-24 text-center"
          v-for="(item, index) in contratoItemData"
          :key="item.id"
        >
          <td class="text-2xl px-2">{{ index + 1 }}</td>
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
            {{
              calcularItensRestante(
                item.id,
                item.saldoQuantidadeContratada
              ).toFixed(3)
            }}
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
    <div class="flex justify-center">
      <vue-awesome-paginate
        :total-items="totalItens"
        :items-per-page="resultsPerPageItens"
        :max-pages-shown="5"
        v-model="currentPage"
        @click="changePageItem"
      />
    </div>
  </section>

  <!-- Tabela Medições-->
  <section>
    <div class="flex justify-between mt-12">
      <h1 class="mt-12 text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
        Medição
      </h1>
      <div class="mt-8 flex gap-8 flex-wrap justify-end">
        <button
          class="flex items-center justify-center px-9 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          @click="ExibirModalLancamento"
        >
          <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
          Nova Medição
        </button>
        <button
          class="inline-flex items-center justify-between px-4 py-3 rounded-md text-xl font-normal text-white bg-orange-500 hover:bg-orange-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          @click="ExibirModalPedidoFaturamento"
        >
          <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
          Novo faturamento
        </button>
      </div>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th></th>
          <th class="text-xl">Id</th>
          <th
            class="text-xl cursor-pointer"
            @click="changeSorting('data_medicao', 'medicoes')"
          >
            Data
            <span>
              {{ sortOrder["medicoes"] === "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th class="text-xl">Competência</th>
          <th class="text-xl">Projeto</th>
          <th class="text-xl">Tarefa</th>
          <th class="text-xl">Tipo</th>
          <th class="text-xl">Status</th>
          <!-- <th class="text-xl">Quantidade itens</th> -->
          <th class="text-xl">Resultado</th>
          <th class="text-xl">Unidade de medida</th>
          <!-- <th class="text-xl">Itens disponíveis</th> -->
          <!-- <th class="text-xl">Situação</th> -->
          <!-- <th class="text-xl">Saldo Atual do Contrato</th> -->
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody v-if="medicaoItemData">
        <tr
          class="h-24 text-center"
          v-for="(lancamento, index) in medicaoItemData"
          :key="lancamento.id"
          :class="{
            'bg-indigo-100':
              lancamento.tipoMedicao === 'Estimada' || lancamento.isFaturado,
          }"
        >
          <td>
            <input
              type="checkbox"
              class="w-6 h-6"
              v-model="pedidosFaturamento"
              :value="lancamento.id"
              @change="changePedido"
              :disabled="
                lancamento.tipoMedicao === 'Estimada' || lancamento.isFaturado
              "
            />
          </td>

          <td class="text-2xl">{{ index + 1 }}</td>
          <td class="text-2xl">{{ formatDate(lancamento.dataMedicao) }}</td>
          <td class="text-2xl">{{ lancamento.competencia }}</td>
          <td class="text-2xl">{{ lancamento.projetos }}</td>
          <td
            class="text-2xl cursor-pointer underline hover:text-blue-500 transition-colors duration-300"
            @click="redirectToRedmine(lancamento.tarefaMedicao)"
          >
            {{ lancamento.tarefaMedicao }}
          </td>
          <td class="text-2xl">
            <div class="flex justify-center">
              <span
                class="border-2 py-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                :class="{
                  'bg-purple-200 border-purple-400 text-purple-400':
                    lancamento.tipoMedicao === 'Estimada',
                  'bg-blue-200 border-blue-400 text-blue-400':
                    lancamento.tipoMedicao === 'Detalhada',
                }"
              >
                {{ lancamento.tipoMedicao }}
              </span>
            </div>
          </td>
          <td class="text-2xl">
            <div class="flex justify-center">
              <span
                v-if="lancamento.tipoMedicao !== 'Detalhada'"
                class="border-2 py-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                :class="{
                  'bg-orange-200 border-orange-400 text-orange-400':
                    lancamento.status === 'Não Autorizada',
                  'bg-green-200 border-green-400 text-green-400':
                    lancamento.status === 'Autorizada',
                  'bg-red-200 border-red-400 text-red-400':
                    lancamento.status === 'Cancelada',
                }"
              >
                {{ lancamento.status }}
              </span>
              <span
                class="border-2 py-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                :class="{
                  'bg-orange-200 border-red-600 text-red-600':
                    lancamento.status === 'Não Iniciada',
                  'bg-green-200 border-yellow-600 text-yellow-400':
                    lancamento.status === 'Em Andamento',
                  'bg-red-200 border-green-600 text-green-600':
                    lancamento.status === 'Disponível para Faturamento',
                }"
                v-else
              >
                {{ lancamento.status }}
              </span>
            </div>
          </td>
          <!-- <td class="text-2xl">
            {{ calcularQuantidadeItens(lancamento.lancamentoItens) }}
          </td> -->
          <td class="text-2xl">
            {{ calcularQuantidadeItens(lancamento.lancamentoItens) }}
          </td>
          <td class="text-2xl w-[200px]">
            {{ mostrarUnidadeMedida(lancamento.lancamentoItens) }}
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

              <!-- <span  v-if=" lancamento.tipoMedicao === 'Estimada' || lancamento.isFaturado "> -->
              <!-- <span>
                <Icon
                  icon="bx:edit"
                  height="20"
                  class="text-gray-500 hover:rounded-md cursor-pointer"
                />
              </span> -->
              <!-- <span @click="openEditLancamentoModal(lancamento)" v-else> -->
              <span @click="openEditLancamentoModal(lancamento)">
                <Icon
                  icon="bx:edit"
                  height="20"
                  class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                />
              </span>
              <!-- <span  v-if=" lancamento.tipoMedicao === 'Estimada' || lancamento.isFaturado "> -->
              <!-- <span>
                <Icon
                  icon="ph:trash"
                  height="20"
                  class="text-gray-500 hover:rounded-md cursor-pointer"
                />
              </span> -->

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
    <div class="flex justify-center" v-if="medicaoItemData">
      <vue-awesome-paginate
        :total-items="totalMedicoes"
        :items-per-page="resultsPerPageMedicoes"
        :max-pages-shown="5"
        v-model="currentPageMedicao"
        @click="changePageMedicao"
      />
    </div>
  </section>

  <!-- Tabela Faturamentos-->
  <section>
    <div class="flex justify-between mt-12">
      <h1 class="mt-12 text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
        Faturamentos
      </h1>
    </div>
    <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
      <thead class="h-20 bg-slate-100 border-1">
        <tr>
          <th class="text-xl">Id</th>
          <th
            class="text-xl cursor-pointer"
            @click="changeSorting('data_faturamento', 'faturamentos')"
          >
            Data
            <span>
              {{ sortOrder["faturamentos"] === "asc" ? "▲" : "▼" }}
            </span>
          </th>
          <th class="text-xl">Competência</th>
          <th class="text-xl">Nota Fiscal</th>
          <th class="text-xl">Total</th>
          <th class="text-xl">Situação</th>
          <th class="text-xl">Ações</th>
        </tr>
      </thead>
      <tbody v-if="faturamentoItemData">
        <tr
          class="h-28 text-center"
          v-for="(faturamento, index) in faturamentoItemData"
          :key="faturamento.id"
        >
          <td class="text-2xl">{{ index + 1 }}</td>
          <td class="text-2xl">
            {{ formatDatePTBR(faturamento.dataFaturamento) }}
          </td>
          <td class="text-2xl">
            {{ faturamento.competencia }}
          </td>
          <td
            class="text-2xl"
            v-if="faturamento.status !== 'Aguardando Faturamento'"
          >
            {{ faturamento.notaFiscal }}
          </td>
          <td v-else>-</td>

          <td class="text-2xl">
            {{
              formatCurrency(
                calcularSaldoFaturamentoItens(faturamento.faturamentoItens)
              )
            }}
          </td>
          <td class="text-2xl text-center">
            <div class="flex justify-center">
              <span
                class="border-2 py-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                :class="{
                  'bg-green-200 border-green-400':
                    faturamento.status === 'Pago',
                  'bg-yellow-200 border-yellow-400':
                    faturamento.status === 'Aguardando Pagamento',
                  'bg-blue-200 border-blue-400':
                    faturamento.status === 'Aguardando Faturamento',
                }"
              >
                {{ faturamento.status }}
              </span>
            </div>
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
    <div class="flex justify-center" v-if="faturamentoItemData">
      <vue-awesome-paginate
        :total-items="totalFaturamentos"
        :max-pages-shown="5"
        :items-per-page="resultsPerPageFaturamentos"
        v-model="currentPageFaturamento"
        @click="changePageFaturamento"
      />
    </div>
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
          <div class="flex gap-4 justify-between items-center">
            <label class="font-bold text-3xl">Situação:</label>
            <select
              v-model="pedidoFaturamentoData.status"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">Selecione a situação</option>
              <option>Aguardando Faturamento</option>
              <option>Aguardando Pagamento</option>
              <option>Pago</option>
            </select>
          </div>
          <div
            class="flex gap-4 items-center justify-between"
            v-if="
              pedidoFaturamentoData.status !== 'Aguardando Faturamento' &&
              pedidoFaturamentoData.status !== ''
            "
          >
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
          <div class="flex gap-4 items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Competência:</label>
            <input
              type="text"
              v-model="pedidoFaturamentoData.competencia"
              required
              placeholder="Informe a competência"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
          <div class="gap-4 flex items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Descrição:</label>
            <textarea
              v-model="pedidoFaturamentoData.observacoes"
              rows="7"
              placeholder="Descrição..."
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl text-observacoes"
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
              <th class="text-xl">Competência</th>
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
                {{item.competencia}}
                <!-- <input type="text" /> -->
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
          <div class="flex gap-4 justify-between items-center">
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
          <div
            class="flex gap-4 items-center justify-between"
            v-if="
              editingFaturamento.status !== 'Aguardando Faturamento' &&
              editingFaturamento.status !== ''
            "
          >
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
          <div class="flex gap-4 items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Competência:</label>
            <input
              type="text"
              :disabled="isFaturamentoViewModal"
              :class="{ 'bg-white border-none': isFaturamentoViewModal }"
              v-model="editingFaturamento.competencia"
              required
              placeholder="Informe a competência"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
          <div class="gap-4 flex items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Descrição</label>
            <textarea
              :disabled="isFaturamentoViewModal"
              v-model="editingFaturamento.observacoes"
              rows="7"
              placeholder="Descrição..."
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-3xl text-observacoes"
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
              <th class="text-xl">Competência</th>
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
                {{item.competencia}}
                <!-- <input
                type="text"
                :disabled="isFaturamentoViewModal"
                :class="{ 'border-none bg-white': isFaturamentoViewModal }"
                class="border-2 text-center max-w-60"
              /> -->
              </td>
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

  <!-- Modal criar Medição -->
  <JetDialogModal
    :show="modalLancamento"
    :withouHeader="false"
    @close="closeModalLancamento"
    maxWidth="8xl"
    :modalTitle="'Medição'"
  >
    <template #content>
      <form @submit.prevent="createLancamento">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Projeto:</label>
            <!-- <input
              type="text"
              placeholder="Informe o nome do  projeto"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="projetos"
            /> -->
            <select
              v-model="projetos"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">Selecione o projeto</option>
              <option
                v-for="item in projetosLoaders"
                :value="item"
                :key="item.id"
              >
                {{ item.projeto }}
              </option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]"
              >Tarefa da medição:</label
            >
            <input
              v-model="medicaoData.tarefa_medicao"
              type="number"
              min="0"
              placeholder="Informe o ticket  da tarefa"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Tipo da medição:</label>
            <select
              v-model="medicaoData.tipo_medicao"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">
                Selecione o tipo da medição
              </option>
              <option>Estimada</option>
              <option>Detalhada</option>
            </select>
          </div>
          <!-- <div class="flex gap-4 items-center" v-if="medicaoData.tipo_medicao !== 'Detalhada'
           && medicaoData.tipo_medicao !== '' ">
            <label class="font-bold text-3xl w-[200px]"
              >Status da medição:</label
            >
            <select
              v-model="medicaoData.status"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">
                Selecione o status da medição
              </option>
              <option>Autorizada</option>
              <option>Não Autorizada</option>
              <option>Cancelada</option>
            </select>
          </div> -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Competência:</label>
            <input
              type="text"
              placeholder="Informe a competência"
              required
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="medicaoData.competencia"
            />
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Data medição:</label>
            <input
              type="date"
              placeholder="Informe a data da medição"
              required
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="medicaoData.data_medicao"
            />
          </div>
          <div class="flex gap-12 items-center">
            <label class="font-bold text-3xl w-[180px]">Descrição:</label>
            <textarea
              v-model="medicaoData.descricao"
              rows="7"
              placeholder="Descrição..."
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-md text-observacoes"
            />
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Item:</label>
            <select
              v-model="selectedItem"
              @change="addItemToTable(selectedItem)"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">
                Selecione o item da medição
              </option>
              <option
                v-for="item in contrato.contratoItens"
                :value="item"
                :key="item.id"
              >
                {{ item.titulo }}
              </option>
            </select>
          </div>
        </section>
        <div class="mt-8">
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">Item</th>
                <th class="text-xl">U.M (Unidade Medida)</th>
                <!-- <th class="text-xl">Valor unitário</th> -->
                <th class="text-xl">Quantidade contratada</th>
                <th class="text-xl">Disponível</th>
                <th class="text-xl">Resultado da medição</th>
                <!-- <th class="text-xl">Total</th> -->
              </tr>
            </thead>
            <tbody v-if="medicaoData.itens">
              <tr
                class="h-24 text-center"
                v-for="item in medicaoData.itens"
                :key="item.id"
              >
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">{{ item.unidadeMedida }}</td>
                <!-- <td class="text-2xl">
                  {{ formatCurrency(item.valorUnitario) }}
                </td> -->
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
                    ).toFixed(3)
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
                <!-- <td class="text-2xl flex justify-center mt-4 gap-3 w-full">
                  <span
                    class="max-w-60"
                    :class="{ 'text-red-500': saldoMaiorQueContrato(item) }"
                  >
                    {{ formatCurrency(calcularSaldoItem(item) || 0) }}
                  </span>
                </td> -->
              </tr>
            </tbody>
          </table>
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

  <!-- Modal editar medição-->
  <JetDialogModal
    :show="modalEditLancamento"
    :withouHeader="false"
    @close="closeEditLancamentoModal"
    maxWidth="8xl"
    :modalTitle="
      isLancamentoViewModal ? 'Visualizar Medição' : 'Editar Medição'
    "
  >
    <template #content>
      <form @submit.prevent="saveEditedLancamento">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Projeto:</label>
            <!-- <input
              type="text"
              placeholder="Informe o nome do projeto"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              :disabled="isLancamentoViewModal"
              v-model="editingLancamento.projetos"
            /> -->
            <select
              v-model="editingLancamento.projetos"
              :disabled="isLancamentoViewModal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">Selecione o projeto</option>
              <option
                v-for="item in projetosLoaders"
                :value="item.projeto"
                :key="item.id"
              >
                {{ item.projeto }}
              </option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]"
              >Tarefa da medição:</label
            >
            <input
              v-model="editingLancamento.tarefaMedicao"
              :disabled="isLancamentoViewModal"
              type="number"
              min="0"
              placeholder="Informe o ticket  da tarefa"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            />
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Tipo da medição:</label>
            <select
              v-model="editingLancamento.tipoMedicao"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
              :disabled="isLancamentoViewModal"
            >
              <option disabled hidden value="">
                Selecione o tipo da medição
              </option>
              <option>Estimada</option>
              <option>Detalhada</option>
            </select>
          </div>
          <div
            class="flex gap-4 items-center"
            v-if="editingLancamento.tipoMedicao !== 'Detalhada'"
          >
            <label class="font-bold text-3xl w-[200px]"
              >Status da medição:</label
            >
            <select
              v-model="editingLancamento.status"
              :disabled="isLancamentoViewModal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">
                Selecione o status da medição
              </option>
              <option>Autorizada</option>
              <option>Não Autorizada</option>
              <option>Cancelada</option>
            </select>
          </div>
          <div class="flex gap-4 items-center" v-else>
            <label class="font-bold text-3xl w-[200px]"
              >Status da medição:</label
            >
            <select
              v-model="editingLancamento.status"
              :disabled="isLancamentoViewModal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">
                Selecione o status da medição
              </option>
              <option>Não Iniciada</option>
              <option>Em Andamento</option>
              <option>Disponível para Faturamento</option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Competência:</label>
            <input
              type="text"
              :disabled="isLancamentoViewModal"
              placeholder="Informe a competência"
              required
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="editingLancamento.competencia"
            />
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Data medição:</label>
            <input
              type="date"
              placeholder="Informe a  data da medição"
              required
              :disabled="isLancamentoViewModal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              v-model="editingLancamento.dataMedicao"
            />
          </div>
          <div class="flex gap-12 items-center">
            <label class="font-bold text-3xl w-[180px]">Descrição:</label>
            <textarea
              v-model="editingLancamento.descricao"
              :disabled="isLancamentoViewModal"
              rows="7"
              placeholder="Descrição..."
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-md text-observacoes"
            />
          </div>
        </section>
        <div class="mt-8">
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">Item</th>
                <th class="text-xl">U.M (Unidade Medida)</th>
                <!-- <th class="text-xl">Valor unitário</th> -->
                <th class="text-xl">Quantidade contratada</th>
                <th class="text-xl">Disponível</th>
                <th class="text-xl">Resultado da medição</th>
                <!-- <th class="text-xl">Total</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-24 text-center"
                v-for="item in editingLancamento.lancamentoItens"
                :key="item.id"
              >
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">{{ item.unidadeMedida }}</td>
                <!-- <td class="text-2xl">
                  {{ formatCurrency(item.valorUnitario) }}
                </td> -->
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
                    ).toFixed(3)
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
                <!-- <td class="text-2xl flex justify-center mt-7 items-center gap-3 w-full">
                  <span
                    class="max-w-60"
                    :class="{
                      'text-red-500': saldoMaiorQueContratoEditLancamento(item),
                    }"
                  >
                    {{ formatCurrency(calcularSaldoItem(item) || 0) }}
                  </span>
                </td> -->
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
          <div class="flex justify-between items-center">
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
              v-model="newItem.unidade_medida"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
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
              v-model="editingItem.unidadeMedida"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
              required
            >
              <option disabled hidden value="">Selecione a situação</option>
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

  <!-- Modal unidade -->
  <JetDialogModal
    :show="isModalUnidadeOpen"
    :withouHeader="false"
    @close="closeModalUnidade"
    :modalTitle="modalTitleUnidade"
    maxWidth="6xl"
  >
    <template #content>
      <form
        @submit.prevent="handleSubmitUnidade"
        class="flex gap-8 px-6 h-[4.40rem]"
      >
        <input
          type="text"
          id="nome"
          v-model="newUnidade"
          required
          class="text-2xl font-sans pl-6 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          placeholder="Digite o nome da unidade"
        />
        <button
          type="button"
          @click="handleSubmitUnidade"
          class="px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          {{ isEditingUnidade ? "Atualizar" : "Adicionar" }}
        </button>
      </form>
      <div class="mt-6 px-6 flex flex-col gap-4 max-h-[32vh] overflow-y-auto">
        <div
          v-for="item in unidadesMedida"
          :key="item.id"
          class="flex items-center gap-2 border-[1px] rounded-md"
        >
          <div
            v-if="!item.isEditing"
            class="flex justify-between items-center w-full hover:bg-gray-100 p-4 transition-colors ease-in-out duration-500"
          >
            <span
              class="ml-6 font-sans text-nowrap truncate max-w-[500px]"
              :title="item.unidadeMedida"
            >
              {{ item.unidadeMedida }}
            </span>
            <div class="flex items-center mx-4">
              <button
                @click="editUnidade(item)"
                class="hover:bg-gray-200 hover:rounded-full rounded-full p-4"
              >
                <Icon
                  icon="heroicons-solid:pencil"
                  height="18"
                  class="text-blue-600 rounded-full"
                />
              </button>
              <button
                @click="deletarUnidade(item.id)"
                class="hover:bg-gray-200 hover:rounded-full rounded-full p-4"
              >
                <Icon icon="ph:trash-fill" height="20" class="text-red-500" />
              </button>
            </div>
          </div>
          <div
            v-else
            class="flex justify-between items-center w-full hover:bg-gray-100 p-4 transition-colors ease-in-out duration-500 gap-6"
          >
            <input
              type="text"
              v-model="item.unidadeMedida"
              class="text-2xl font-sans pl-6 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              placeholder="Digite o nome da unidade"
            />
            <div class="ml-auto text-nowrap flex gap-4">
              <button
                @click="saveUnidade(item)"
                class="bg-blue-500 p-2 text-xl font-sans font-medium text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
              >
                Salvar
              </button>
              <button
                @click="cancelEditUnidade(item)"
                class="bg-red-500 p-2 text-xl font-sans font-medium text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-8" />
      <footer class="flex justify-end h-16 mb-2">
        <button
          type="button"
          @click="closeModalUnidade"
          class="px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          Salvar Unidades
        </button>
      </footer>
    </template>
  </JetDialogModal>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { api } from "@/services/api";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { Money3Component } from "v-money3";
import { format, formatISO, startOfDay } from "date-fns";

const financialSummary = computed(() => [
  {
    title: "Valor Contratado",
    value: formatCurrency(contrato.value.saldoContrato),
    icon: "fa6-solid:file-contract",
    bgColor: "from-blue-400 to-blue-600",
  },
  {
    title: "Aguardando faturamento",
    value: formatCurrency(
      calcularSaldoDisponivel(contrato.value.faturamentos).aguardandoFaturamento
    ),
    icon: "ph:clock-fill",
    bgColor: "from-orange-400 to-orange-600",
  },
  {
    title: "Aguardando pagamento",
    value: formatCurrency(
      calcularSaldoDisponivel(contrato.value.faturamentos).aguardandoPagamento
    ),
    icon: "fa-solid:hand-holding-usd",
    bgColor: "from-indigo-400 to-indigo-600",
  },
  {
    title: "Pago",
    value: formatCurrency(
      calcularSaldoDisponivel(contrato.value.faturamentos).valorPago
    ),
    icon: "fa-check-circle",
    bgColor: "from-green-400 to-green-600",
  },
  {
    title: "Saldo disponível",
    value: formatCurrency(
      contrato.value.saldoContrato -
        calcularSaldoDisponivel(contrato.value.faturamentos).totalUtilizado
    ),
    icon: "ph-wallet-fill",
    bgColor: "from-purple-400 to-purple-600",
  },
]);
const router = useRouter();
const route = useRoute();
const contrato = ref({});
const lancamentos = ref([]);
const modalLancamento = ref(false);
const selectedItem = ref("");
const selectNovoLancamento = ref(null);
const selectNovoFaturamento = ref(null);
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
const podeRenovar = ref(false);
const projetos = ref("");
const projetosLoaders = ref([]);
const pedidosFaturamento = ref([]);
const arrayIds = ref([]);
const pedidoFaturamentoData = ref({
  nota_fiscal: "",
  data_faturamento: "",
  descricao_nota: [],
  status: "",
  competencia: "",
  observacoes: "",
});

const medicaoData = ref({
  tarefa_medicao: "",
  tipo_medicao: "",
  status: "",
  competencia: "",
  descricao: "",
  data_medicao: "",
  itens: [],
});

const totalItens = ref();
const resultsPerPageItens = ref();
let contratoItemData = ref([]);
let contratoItemMeta = ref([]);

const totalMedicoes = ref();
const resultsPerPageMedicoes = ref();

let medicaoItemData = ref([]);
let medicaoItemMeta = ref([]);

const totalFaturamentos = ref(0);
const resultsPerPageFaturamentos = ref();
let faturamentoItemData = ref([]);
let faturamentoItemMeta = ref([]);

// UNIDADE DE MEDIDA
const unidadesMedida = ref([]);
const newUnidade = ref("");
const isModalUnidadeOpen = ref(false);
const isEditingUnidade = ref(false);
// const currentUnidadeId = ref(null);
const modalTitleUnidade = "Adicionar Unidade";

const fetchUnidadesMedida = async () => {
  try {
    const response = await api.get("/unidade_medida");
    unidadesMedida.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar unidades de medida:", error);
  }
};

const openModalUnidade = () => {
  fetchUnidadesMedida().then(() => {
    newUnidade.value = "";
    isModalUnidadeOpen.value = true;
  });
};

const handleSubmitUnidade = async () => {
  const unidadeNome = newUnidade.value.trim();
  if (unidadeNome === "") {
    toast.error("O nome da unidade não pode estar vazio.");
    return;
  }

  await CriarUnidade();
};

const CriarUnidade = async () => {
  try {
    await api.post("/unidade_medida", {
      unidade_medida: newUnidade.value,
    });
    await fetchUnidadesMedida();
    toast.success("Unidade criada com sucesso!");
    newUnidade.value = "";
  } catch (error) {
    console.error("Erro ao criar unidade:", error);
    toast.error("Não foi possível criar a unidade.");
  }
};

const editUnidade = (item) => {
  item.originalUnidadeMedida = item.unidadeMedida;
  item.isEditing = true;
};

const saveUnidade = async (item) => {
  const unidadeNome = item.unidadeMedida.trim();
  const unidadeId = item.id;

  if (unidadeNome === "") {
    toast.error("O nome da unidade não pode estar vazio.");
    return;
  }

  if (isDuplicateUnidade(unidadeNome, item.id)) {
    toast.error("Já existe uma unidade com esse nome.");
    return;
  }
  try {
    await api.put(`/unidade_medida/${unidadeId}`, {
      unidade_medida: unidadeNome,
    });
    await fetchUnidadesMedida();
    toast.success("Unidade editada com sucesso!");
  } catch (error) {
    console.error("Erro ao editar unidade:", error);
    toast.error("Não foi possível editar a unidade.");
  }

  item.isEditing = false;
};

const cancelEditUnidade = (item) => {
  item.isEditing = false;
  item.unidadeMedida = item.originalUnidadeMedida;
};

const deletarUnidade = (id) => {
  Swal.fire({
    title: "Você tem certeza?",
    text: `Deseja remover a unidade de medida?`,
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
        toast.success("Unidade removida com sucesso!");
      } catch (error) {
        console.error("Erro ao remover unidade:", error);
        toast.error("Erro ao remover unidade.");
      }
    }
  });
};

const closeModalUnidade = () => {
  newUnidade.value = "";
  isEditingUnidade.value = false;
  // currentUnidadeId.value = null;
  isModalUnidadeOpen.value = false;
};

const isDuplicateUnidade = (nome, excludeId = null) => {
  return unidadesMedida.value.some(
    (u) =>
      u.unidadeMedida.toLowerCase() === nome.toLowerCase() && u.id !== excludeId
  );
};

const fetchProjetos = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}/projetos`);
    projetosLoaders.value = response.data.data;
  } catch (error) {
    console.error("Erro ao contratos:", error);
  }
};

const changePageItem = (page) => {
  currentPage.value = page;
};

const changePageMedicao = (page) => {
  currentPageMedicao.value = page;
};

const changePageFaturamento = (page) => {
  currentPageFaturamento.value = page;
};

const currentPage = ref(1);
const currentPageMedicao = ref(1);
const currentPageFaturamento = ref(1);

const fetchContratoItens = async (page) => {
  try {
    const response = await api.get(
      `/contratos/${contrato.value.id}/items/?page=${page}`
    );
    contratoItemData.value = response.data.data;
    contratoItemMeta.value = response.data.meta;
    currentPage.value = contratoItemMeta.value.currentPage;
    totalItens.value = contratoItemMeta.value.total;
    resultsPerPageItens.value = contratoItemMeta.value.perPage;
  } catch (error) {
    console.error(error);
  }
};

const sortBy = ref({ medicoes: null, faturamentos: null });
const sortOrder = ref({ medicoes: null, faturamentos: null });

const changeSorting = (column, type) => {
  if (sortBy.value[type] === column) {
    sortOrder.value[type] = sortOrder.value[type] === "asc" ? "desc" : "asc";
  } else {
    sortBy.value[type] = column;
    sortOrder.value[type] = "asc";
  }

  if (type === "medicoes") {
    fetchContratoMedicoes(currentPageMedicao.value);
  } else if (type === "faturamentos") {
    fetchContratoFaturamentos(currentPageFaturamento.value);
  }
};

const fetchContratoMedicoes = async (page) => {
  try {
    const params = {
      page,
      limit: 8,
    };
    if (sortBy.value) {
      params.sortBy = sortBy.value.medicoes;
    }
    if (sortOrder.value) {
      params.sortOrder = sortOrder.value.medicoes;
    }
    const response = await api.get(
      `/contratos/${contrato.value.id}/lancamentos`,
      { params }
    );
    medicaoItemData.value = response.data.data;
    medicaoItemMeta.value = response.data.meta;
    if (contrato.value.faturamentos) {
      medicaoItemData.value = verificaIsFaturado(
        medicaoItemData.value,
        contrato.value.faturamentos
      );
    }
    currentPageMedicao.value = medicaoItemMeta.value.currentPage;
    resultsPerPageMedicoes.value = medicaoItemMeta.value.perPage;
    totalMedicoes.value = medicaoItemMeta.value.total;
  } catch (error) {
    console.error(error);
  }
};

const fetchContratoFaturamentos = async (page) => {
  try {
    const params = {
      limit: 8,
    };
    if (sortBy.value) {
      params.sortBy = sortBy.value.faturamentos;
    }
    if (sortOrder.value) {
      params.sortOrder = sortOrder.value.faturamentos;
    }
    const response = await api.get(
      `/contratos/${contrato.value.id}/faturamentos?page=${page}`,
      { params }
    );
    console.log("response", response.data);
    faturamentoItemData.value = response.data.data;
    faturamentoItemMeta.value = response.data.meta;
    currentPageFaturamento.value = faturamentoItemMeta.value.currentPage;
    resultsPerPageFaturamentos.value = faturamentoItemMeta.value.perPage;
    totalFaturamentos.value = faturamentoItemMeta.value.total;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

watch(
  () => currentPage.value,
  () => fetchContratoItens(currentPage.value)
);
watch(
  () => currentPageMedicao.value,
  () => fetchContratoMedicoes(currentPageMedicao.value)
);
watch(
  () => currentPageFaturamento.value,
  () => fetchContratoFaturamentos(currentPageFaturamento.value)
);

const changePedido = (e) => {
  pedidoFaturamentoData.value.descricao_nota = pedidosFaturamento.value;
};

// Faturamento
const ExibirModalPedidoFaturamento = () => {
  modalPedidoFaturamento.value = true;
};
const closeModalPedidoFaturamento = () => {
  modalPedidoFaturamento.value = false;
  selectNovoFaturamento.value = "";
  pedidoFaturamentoData.value = {
    nota_fiscal: "",
    data_faturamento: "",
    descricao_nota: [],
    observacoes: "",
    status: "",
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
  console.log('faturamento', faturamento)
  isFaturamentoViewModal.value = true;
  const dataFormatada = format(
    new Date(faturamento.dataFaturamento),
    "yyyy-MM-dd"
  );
  editingFaturamento.value = { ...faturamento, dataFaturamento: dataFormatada };
  modalEditFaturamento.value = true;
};

const closeEditFaturamentoModal = () => {
  selectNovoFaturamento.value = "";
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
    status: pedidoFaturamentoData.value.status,
    competencia: pedidoFaturamentoData.value.competencia,
    observacoes: pedidoFaturamentoData.value.observacoes,
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
    status: editingFaturamento.value.status,
    competencia: editingFaturamento.value.competencia,
    observacoes: editingFaturamento.value.observacoes,
    competencia: editingFaturamento.value.competencia,
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
  precision: 3,
  decimal: ",",
  thousands: ".",
  prefix: "",
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

const ExibirModalLancamento = () => {
  fetchProjetos(route.params.id);
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
  medicaoData.value = {
    tarefa_medicao: "",
    status: "",
    tipo_medicao: "",
    competencia: "",
    descricao: "",
    data_medicao: "",
    itens: [],
  };
  selectedItem.value = "";
  contrato.value.contratoItens.forEach((item) => {
    // item.data = null;
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
const addItemToTable = (selectedItem) => {
  if (selectedItem) {
    // Substitui o item existente ou adiciona o novo item
    medicaoData.value.itens = [selectedItem]; // Garante que apenas o item selecionado esteja na lista
  } else {
    console.log("Nenhum item selecionado");
  }
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
    .map((item) => ({
      id_item: item.id,
      quantidade_itens: item.quantidadeItens,
    }))
    .filter(
      (item) => item.quantidade_itens && parseFloat(item.quantidade_itens) > 0
    );

  if (itensQuantidadePreenchida.length === 0) {
    toast(
      "Adicione pelo menos um item com data e resultado da  medição para criar o lançamento.",
      {
        theme: "colored",
        type: "error",
      }
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

  if (medicaoData.value.tipo_medicao === "Detalhada") {
    medicaoData.value.status = "";
  }
  if (medicaoData.value.tipo_medicao === "Estimada") {
    medicaoData.value.status = "Não Autorizada";
  }
  let payload = {
    status: medicaoData.value.status,
    itens: itensQuantidadePreenchida,
    projetos: projetos.value.projeto,
    competencia: medicaoData.value.competencia,
    descricao: medicaoData.value.descricao,
    data_medicao: medicaoData.value.data_medicao,
    tarefa_medicao: medicaoData.value.tarefa_medicao,
    tipo_medicao: medicaoData.value.tipo_medicao,
  };
  try {
    const contratoId = route.params.id;

    const response = await api
      .post(`/contratos/${contrato.value.id}/lancamentos`, payload)
      .then((response) => {
        toast("Medição criada com sucesso!", {
          theme: "colored",
          type: "success",
        });
      });
    resetForm();
    fetchContrato(contratoId);
  } catch (error) {
    console.error("Erro ao criar medição:", error);
    toast.error("Não foi possível criar a medição", error);
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
    let contratoData = response.data;

    // contratoData.lancamentos = verificaIsFaturado(contratoData.lancamentos, contratoData.faturamentos);

    contrato.value = contratoData;
    fetchContratoItens(currentPage.value);
    fetchContratoMedicoes(currentPageMedicao.value);
    fetchContratoFaturamentos(currentPageFaturamento.value);

    podeRenovar.value = calcularPodeRenovar();
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

const verificaIsFaturado = (lancamentos, faturamentos) => {
  lancamentos.forEach((lancamento) => {
    lancamento.isFaturado = false;
  });

  faturamentos.forEach((faturamento) => {
    faturamento.faturamentoItens.forEach((item) => {
      const lancamento = lancamentos.find(
        (lancamento) => lancamento.id === item.lancamentoId
      );
      if (lancamento) {
        lancamento.isFaturado = true;
      }
    });
  });
  return lancamentos;
};

const deleteLancamento = (lancamentoId) => {
  const contratoId = route.params.id;
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir essa medição?",
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
          toast("Medição deletada com sucesso!", {
            theme: "colored",
            type: "success",
          });
          fetchContrato(contratoId);
        })
        .catch((error) => {
          toast("Não foi possível deletar medição", {
            theme: "colored",
            type: "error",
          });
          console.error("Erro ao deletar medição:", error.message);
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

const calcularSaldoDisponivel = (faturamento) => {
  let saldoTotal = 0;
  let valorAguardandoFaturamento = 0;
  let valorAguardandoPagamento = 0;
  let valorPago = 0;

  faturamento?.forEach((item) => {
    if (item.status === "Aguardando Faturamento") {
      item.faturamentoItens.forEach((subItem) => {
        subItem.lancamento.lancamentoItens.forEach((itemLancamento) => {
          const quantidadeItens =
            parseFloat(itemLancamento.quantidadeItens) || 0;
          const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;
          const valorTotalItem = quantidadeItens * valorUnitario;
          valorAguardandoFaturamento += valorTotalItem;
          saldoTotal += valorTotalItem;
        });
      });
    } else if (item.status === "Aguardando Pagamento") {
      item.faturamentoItens.forEach((subItem) => {
        subItem.lancamento.lancamentoItens.forEach((itemLancamento) => {
          const quantidadeItens =
            parseFloat(itemLancamento.quantidadeItens) || 0;
          const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;
          const valorTotalItem = quantidadeItens * valorUnitario;
          valorAguardandoPagamento += valorTotalItem;
          saldoTotal += valorTotalItem;
        });
      });
    } else if (item.status === "Pago") {
      item.faturamentoItens.forEach((subItem) => {
        subItem.lancamento.lancamentoItens.forEach((itemLancamento) => {
          const quantidadeItens =
            parseFloat(itemLancamento.quantidadeItens) || 0;
          const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;
          const valorTotalItem = quantidadeItens * valorUnitario;
          valorPago += valorTotalItem;
          saldoTotal += valorTotalItem;
        });
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

  contrato.value.lancamentos.forEach((lancamento) => {
    if (
      lancamento.status === "Não Autorizada" ||
      lancamento.status === "Cancelada"
    ) {
      return;
    }
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
  return parseFloat(saldoTotal.toFixed(3));
};

const mostrarUnidadeMedida = (lancamentoItens) => {
  let unidadeMedida = "";

  lancamentoItens.forEach((item) => {
    unidadeMedida = item.unidadeMedida;
  });
  return unidadeMedida;
};

// Editar Item do contrato

const openItemEditModal = (item) => {
  editingItem.value = { ...item };
  modalEditItem.value = true;
  fetchUnidadesMedida();
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
  // showNewUnitInput.value = false;
  fetchUnidadesMedida();
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
  const dataMedicao = lancamento.dataMedicao || "";
  const dataFormatada = dataMedicao.split("T")[0];
  editingLancamento.value = { ...lancamento, dataMedicao: dataFormatada };
  modalEditLancamento.value = true;
  fetchProjetos(route.params.id);
};

const openViewLancamentoModal = (lancamento) => {
  isLancamentoViewModal.value = true;
  const itensComQuantidade = lancamento.lancamentoItens.filter(
    (item) => item.quantidadeItens > 0
  );
  const dataMedicao = lancamento.dataMedicao || "";
  const dataFormatada = dataMedicao.split("T")[0];
  editingLancamento.value = {
    ...lancamento,
    lancamentoItens: itensComQuantidade,
    dataMedicao: dataFormatada,
  };
  fetchProjetos(route.params.id);
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
      // data: item.data,
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

  if (editingLancamento.value.tipoMedicao === "Detalhada") {
    editingLancamento.value.status = "";
  }

  let payload = {
    // data_medicao: formatDate(editingLancamento.value.dataMedicao),
    data_medicao: editingLancamento.value.dataMedicao,
    // data_medicao: "2024-08-22",
    competencia: editingLancamento.value.competencia,
    descricao: editingLancamento.value.descricao,
    tarefa_medicao: editingLancamento.value.tarefaMedicao,
    tipo_medicao: editingLancamento.value.tipoMedicao,
    status: editingLancamento.value.status,
    itens: itensQuantidadePreenchida.map((item) => ({
      id_item: item.id,
      quantidade_itens: item.quantidade_itens,
      // data: item.data,
    })),
    projetos: editingLancamento.value.projetos,
  };
  try {
    const contratoId = route.params.id;
    const response = await api
      .put(`/lancamentos/${editingLancamento.value.id}`, payload)
      .then((response) => {
        Object.assign(editingLancamento.value);
        toast("Medição atualizada com sucesso!", {
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

const calcularPodeRenovar = () => {
  const totalUtilizado = calcularSaldoDisponivel(
    contrato.value.faturamentos
  ).totalUtilizado;
  const saldoContrato = contrato.value.saldoContrato;
  const dataFimContrato = formatDate(contrato.value.dataFim);
  const dataAtual = formatDate(new Date());

  return totalUtilizado >= saldoContrato || dataFimContrato <= dataAtual;
};

const redirectToRedmine = (tarefa) => {
  const url = `https://redmine.msbtec.com.br/issues/${tarefa}`;
  window.open(url, "_blank");
};

const openWhatsApp = (telefone) => {
  const telefoneFormatado = `+55${telefone.replace(/\D/g, "")}`;
  const url = `https://wa.me/${telefoneFormatado}`;
  window.open(url, "_blank");
};
</script>

<style>
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

.btn-unidade {
  border-radius: 9px;
  color: var(--whiteLight);
  font-weight: 500;
  width: 200px;
  height: 40px;
}

.text-observacoes {
  resize: none;
}

.pagination-container {
  display: flex;
  padding-top: 5px;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
