<template>
  <div
  v-if="isLoading"
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-sm"
  >
  <l-waveform size="40" stroke="3.5" speed="1" color="white"></l-waveform>
</div>
<div class="flex gap-4 mb-8" v-if="!isLoading">
    <button
      v-for="(termo, index) in [...termosAditivos].reverse()"
      :key="termo.id"
      @click="selecionarContrato(termo)"
      :class="[
        'px-6 py-2 rounded-md font-bold text-lg transition-colors',
        contratoSelecionadoId === termo.id
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 hover:bg-gray-300'
      ]"
    >
      {{ termosAditivos.length - index }}º Termo Aditivo
    </button>

    <button
      @click="selecionarContrato(contratoOriginal)"
      :class="[
        'px-6 py-2 rounded-md font-bold text-lg transition-colors',
        contratoSelecionadoId === contratoOriginal?.id
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 hover:bg-gray-300'
      ]"
    >
      Contrato Original
    </button>
  </div>
<!-- Detalhes do contrato -->
<section v-if="!isLoading">
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
  >
  <div class="flex items-center gap-2">
    <span @click="voltarListagem" class="cursor-pointer" title="Voltar">
      <Icon
      icon="ic:round-arrow-back"
      height="28"
      class="duration-600 transition-all ease-in-out transform hover:-translate-y-[2px]"
      />
    </span>
    <h1 class="text-4xl font-medium text-gray-800 mb-6 sm:mb-0">
      {{ contrato.nomeContrato }}
    </h1>
  </div>
    <div class="flex flex-wrap gap-3">
      <button v-if="contrato.termoAditivoId === null"
      class="flex items-center justify-center px-7 py-3 rounded-md text-2xl font-normal text-white bg-green-500 hover:bg-green-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
    >
      <router-link
        :to="{ name: 'Formulário Aditivo', params: { id: contrato.id } }"
      >
        Adicionar aditivo
      </router-link>
    </button>
    <router-link
      :to="{ name: contrato.termoAditivoId ? 'editartermo' : 'editarcontrato', params: { id: contrato.id }}"
      class="flex items-center justify-center px-7 py-3 rounded-md text-2xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
      v-if="hasPermission('contratos', 'Editar')"
    >
      Editar
    </router-link>

    </div>
  </div>

    <!-- Detalhes do contrato -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div
        class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md"
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
                {{contrato.nomeCliente}}
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
        class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md"
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
        class="border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md"
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

 <!-- Resumo Financeiro -->
  <h2 class="text-2xl font-bold text-gray-800 mb-6" v-if="hasPermission('contratos', 'Visualizar Finanças')">Resumo Financeiro</h2>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8" v-if="hasPermission('contratos', 'Visualizar Finanças')">
    <div
      v-for="(item, index) in financialSummary"
      :key="index"
      :class="[`bg-gradient-to-br ${item.bgColor} rounded-md shadow-md p-6 text-white transform transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:scale-100`, (['Aguardando Faturamento','Aguardando Pagamento','Pago'].includes(item.title) ? 'cursor-pointer' : '')]"
      @click="['Aguardando Faturamento','Aguardando Pagamento','Pago'].includes(item.title) && openFinancialCardsModal(item.title)"
    >
      <section class="flex flex-col h-full justify-between">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <Icon :icon="item.icon" :height="24" class="opacity-80" />
        </div>
        <p class="text-3xl font-bold mt-2">{{ item.value }}</p>
      </section>
    </div>

    <!-- Se a aba estiver no contrato original, então renderiza o card de Valores Aditivados-->
    <div
      v-if="contratoSelecionadoId === contratoOriginal?.id"
      class="bg-gradient-to-br from-slate-400 to-slate-600 rounded-md shadow-md p-6 text-white transform transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:scale-100"
    >
      <section class="flex flex-col h-full justify-between">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Valores Aditivados</h3>
          <Icon icon="ph-wallet-fill" :height="24" class="opacity-80" />
        </div>
        <p class="text-3xl font-bold mt-2">{{ formatCurrencySemArrendondar(calcularValoresAditivados(termosAditivos)) }}</p>
      </section>
    </div>
  </section>

    <!-- Observações -->
    <section class="mt-8">
      <div class="flex items-start justify-between gap-12">
        <div class=" border bg-white rounded-xl shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md w-full">
          <div class="flex">
          <span>
              <Icon icon="material-symbols-light:date-range-outline" class="text-blue-800 mr-2" height="20"/>
            </span>
            <h2 class="text-3xl font-bold mb-4 text-blue-800 ">
              Descrição:
            </h2>

          </div>
          <p class="font-medium text-gray-700">{{ contrato.observacoes }}</p>
        </div>
      </div>
    </section>

</section>

<section class="bg-white rounded-xl border shadow-sm p-6 transition duration-300 ease-in-out hover:shadow-md mt-4 min-h-[400px]" v-if="!isLoading">
  <!-- Abas de itens, medições, faturamentos e anexos -->
  <div class="flex border-b border-gray-200 mb-8 pt-4">
    <TabButton
      v-for="tab in tabs"
      :key="tab"
      :currentTab="currentTab"
      :tab="tab"
      @update:currentTab="currentTab = $event"
    />
  </div>

  <!-- Tabela itens do contrato-->
  <div v-if="currentTab === 'Itens'">
    <section class="mt-8">
      <div class="flex justify-between items-center">
        <h1 class="text-[1.8rem] font-medium text-gray-800">
          Itens do Contrato
        </h1>
        <section class="flex justify-end w-3/4 gap-8">
          <button
            @click="openCreateItemModal"
            class="flex items-center justify-center px-7 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            v-if="hasPermission('itens_contrato', 'Criar')"
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
          <div class="relative w-full max-w-[20%] items-center">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon icon="mdi:magnify" width="2rem" class="text-gray-400" />
            </span>
            <input
              v-model="filterItens"
              type="text"
              placeholder="Pesquisar..."
              class="border rounded px-4 p-2 pl-16 mr-4 w-full"
            />
          </div>
        </section>
      </div>
      <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12" >
        <thead class="h-20 bg-slate-100 border-1">
          <tr>
            <th class="text-xl px-2">#</th>
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

          <tr
            class="h-24 text-center"
            v-for="(item) in contratoItemData"
            :key="item.id"
          >
            <td class="text-2xl px-2">{{ item.contagem_dinamica }}</td>
            <td class="text-2xl">{{ item.titulo }}</td>
            <td class="text-2xl">{{ item.unidadeMedida }}</td>
            <td class="text-2xl">{{ parseFloat(item.saldoQuantidadeContratada).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}</td>
            <td class="text-2xl">{{ formatCurrencySemArrendondar(item.valorUnitario) }}</td>
            <td class="text-2xl">{{ formatCurrencySemArrendondar(item.valorUnitario * item.saldoQuantidadeContratada)}}</td>
            <td class="text-2xl">
              {{
                calcularItensRestante(
                  item.id,
                  item.saldoQuantidadeContratada
                ).toLocaleString('pt-BR', { minimumFractionDigits: 3 })
              }}
            </td>
            <td>
              <div class="flex justify-center items-center gap-2">
                <span
                  @click="openItemViewModal(item)"
                  v-if="hasPermission('itens_contrato', 'Visualizar')"
                >
                  <Icon
                    icon="ph:eye"
                    height="20"
                    class="hover:text-blue-500 text-black hover:rounded-md cursor-pointer"
                  />
                </span>
                <span @click="openItemEditModal(item)"
                v-if="hasPermission('itens_contrato', 'Editar')"
                >
                  <Icon
                    icon="bx:edit"
                    height="20"
                    class="hover:text-red-500 hover:rounded-md cursor-pointer"
                  />
                </span>
                <span
                  @click="deleteItem(item.id)"
                  v-if="hasPermission('itens_contrato', 'Deletar')"
                >
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
          :max-pages-shown="lastPageItens"
          :items-per-page="resultsPerPageItens"
          v-model="currentPage"
          @click="changePageItem"
        />
      </div>
    </section>
  </div>

  <!-- Tabela Medições-->
  <div v-if="currentTab === 'Medições'">
    <section class="mt-8">
      <div class="flex justify-between items-center">
        <h1 class="text-[1.8rem] font-medium text-gray-800">
          Medição
        </h1>
        <div class="flex justify-end w-3/4 gap-8">
          <button
            class="flex items-center justify-center px-7 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            @click="ExibirModalLancamento"
            v-if="hasPermission('medicoes', 'Criar')"
          >
            <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
            Nova Medição
          </button>
          <button
            class="inline-flex items-center justify-between px-4 py-3 rounded-md text-xl font-normal text-white bg-orange-500 hover:bg-orange-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            @click="ExibirModalPedidoFaturamento"
            v-if="hasPermission('faturamentos', 'Criar')"
          >
            <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
            Novo faturamento
          </button>
          <div class="relative w-full max-w-[20%] items-center">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon icon="mdi:magnify" width="2rem" class="text-gray-400" />
            </span>
            <input
              v-model="filterMedicoes"
              type="text"
              placeholder="Pesquisar..."
              class="border rounded px-4 p-2 pl-16 mr-4 w-full"
            />
          </div>
        </div>
      </div>
      <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
        <thead class="h-20 bg-slate-100 border-1">
          <tr>
            <th></th>
            <th class="text-xl">#</th>
            <th class="text-xl cursor-pointer hover:text-blue-600" @click="changeSorting('data_medicao', 'medicoes')">
              Data
              <span>
                {{ sortBy["medicoes"] === "data_medicao" && sortOrder["medicoes"] === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th class="text-xl cursor-pointer hover:text-blue-600" @click="changeSorting('competencia', 'medicoes')">
              Competência
              <span>
                {{ sortBy["medicoes"] === "competencia" && sortOrder["medicoes"] === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th class="text-xl">Projeto</th>
            <th class="text-xl">Tarefa</th>
            <th class="text-xl">Tipo</th>
            <th class="text-xl">
              <StatusFilter
                :allStatuses="allStatuses"
                v-model="selectedStatuses"
              />
            </th>
            <th class="text-xl">Resultado</th>
            <th class="text-xl">Unidade de medida</th>
            <th class="text-xl">Ações</th>
          </tr>
        </thead>
        <tbody v-if="medicaoItemData">
          <tr
            class="h-24 text-center"
            v-for="(lancamento) in medicaoItemData"
            :key="lancamento.id"
            :class="{
              'bg-indigo-100':
                lancamento.status !== 'Disponível p/ Faturamento' || lancamento.isFaturado,
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
                  lancamento.status !== 'Disponível p/ Faturamento' || lancamento.isFaturado
                "
              />
            </td>

            <td class="text-2xl">{{ lancamento.id }}</td>
            <td class="text-2xl">{{ formatDate(lancamento.dataMedicao) }}</td>
            <td class="text-2xl">{{ formataMesAno(lancamento.competencia) }}</td>
            <td class="text-2xl">{{ lancamento.projetos }}</td>
            <td
              class="text-2xl underline hover:text-blue-500 transition-colors duration-300"
              :class="{'cursor-pointer': lancamento.tarefaMedicao}"
              @click="lancamento.tarefaMedicao && redirectToRedmine(lancamento.tarefaMedicao)"
            >
              {{ lancamento.tarefaMedicao }}
            </td>
            <td class="text-2xl">
              <div class="flex justify-center">
                <span
                  class="border-2 py-2 px-2 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-full"
                  :class="{
                    'bg-purple-200 border-purple-400': lancamento.tipoMedicao === 'Estimada',
                    'bg-blue-200 border-blue-400': lancamento.tipoMedicao === 'Detalhada',
                    'bg-indigo-200 border-indigo-400': lancamento.tipoMedicao === 'Relatório Mensal',
                    'bg-neutral-200 border-slate-400': lancamento.tipoMedicao === 'Não se aplica',
                  }"
                >
                  {{ lancamento.tipoMedicao }}
                </span>
              </div>
            </td>
            <td class="text-2xl">
              <div class="flex justify-center">
                <span
                  v-if="lancamento.tipoMedicao === 'Estimada'"
                  class="border-2 py-2 px-4 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                  :class="{
                    'bg-gray-200 border-gray-400':
                      lancamento.status === 'Não Autorizada',
                    'bg-green-200 border-green-400':
                      lancamento.status === 'Autorizada',
                    'bg-red-200 border-red-400':
                      lancamento.status === 'Cancelada',
                    'bg-slate-200 border-slate-400':
                      lancamento.status === 'Finalizada',
                  }"
                >
                  {{ lancamento.status }}
                </span>
                <span
                  v-else-if="lancamento.tipoMedicao === 'Detalhada' || lancamento.tipoMedicao === 'Relatório Mensal' || lancamento.tipoMedicao === 'Não se aplica'"
                  class="border-2 py-2 px-4 rounded-2xl font-bold sm:text-base md:text-xl text-slate-600 flex items-center justify-center w-[80%]"
                  :class="{
                    'bg-red-200 border-red-400':
                      lancamento.status === 'Não Iniciada',
                    'bg-orange-200 border-orange-400':
                      lancamento.status === 'Em Andamento',
                    'bg-yellow-200 border-yellow-400':
                      lancamento.status === 'Encaminhada p/ Faturamento',
                    'bg-green-200 border-green-400':
                      lancamento.status === 'Disponível p/ Faturamento',
                    'bg-slate-200 border-slate-400':
                      lancamento.status === 'Finalizada',
                  }"
                  >
                  {{ lancamento.status }}
                  </span>
              </div>
            </td>
            <td class="text-2xl">
              <!-- <span v-for="(subitem, index) in lancamento.lancamentoItens" :key="index">
                {{ subitem.quantidadeItens }}
              </span> -->
              {{ lancamento.lancamentoItens.reduce((total, subitem) => total + parseFloat(subitem.quantidadeItens), 0).toFixed(3) }}
            </td>
            <td class="text-2xl w-[200px]">
              {{ mostrarUnidadeMedida(lancamento.lancamentoItens) }}
            </td>
            <td class="text-2xl">
              <div class="flex justify-center items-center gap-2">
                <span
                  @click="openViewLancamentoModal(lancamento)"
                  v-if="hasPermission('medicoes', 'Visualizar')"
                >
                  <Icon
                    icon="ph:eye"
                    height="20"
                    class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                  />
                </span>
                <span
                  @click="openEditLancamentoModal(lancamento)"
                  v-if="hasPermission('medicoes', 'Editar')"
                >
                  <Icon
                    icon="bx:edit"
                    height="20"
                    class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                  />
                </span>

                <span
                  @click="deleteLancamento(lancamento.id)"
                  v-if="hasPermission('medicoes', 'Deletar')"
                 >
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
          :max-pages-shown="lastPageMedicoes"
          v-model="currentPageMedicao"
          @click="changePageMedicao"
        />
      </div>
    </section>
  </div>

  <!-- Tabela Faturamentos-->
  <div v-if="currentTab === 'Faturamentos'">
    <section>
      <div class="flex justify-between">
        <h1 class="text-[1.8rem] font-medium text-gray-800">
          Faturamentos
        </h1>
        <div class="flex justify-end w-3/4 gap-8">
          <div class="relative w-full max-w-[20%] items-center">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon icon="mdi:magnify" width="2rem" class="text-gray-400" />
          </span>
          <input
            v-model="filterFaturamentos"
            type="text"
            placeholder="Pesquisar..."
            class="border rounded px-4 p-2 pl-16 mr-4 w-full"
          />
        </div>
      </div>
    </div>
      <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
        <thead class="h-20 bg-slate-100 border-1">
          <tr>
            <th class="text-xl">#</th>
            <th class="text-xl cursor-pointer hover:text-blue-600" @click="changeSorting('data_faturamento', 'faturamentos')">
              Data
              <span>
                {{ sortBy["faturamentos"] === "data_faturamento" && sortOrder["faturamentos"] === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th class="text-xl cursor-pointer hover:text-blue-600" @click="changeSorting('competencia', 'faturamentos')">Competência
                <span>{{ sortBy["faturamentos"] === "competencia" && sortOrder["faturamentos"] === "asc" ? "▲" : "▼" }}</span>
            </th>
            <th class="text-xl">Nota Fiscal</th>
            <th class="text-xl">Total</th>
            <th class="text-xl">Situação</th>
            <th class="text-xl">Ações</th>
          </tr>
        </thead>
        <tbody v-if="faturamentoItemData">
          <tr
            class="h-28 text-center"
            v-for="(faturamento) in faturamentoItemData"
            :key="faturamento.id"
          >
            <td class="text-2xl">{{ faturamento.id }}</td>
            <td class="text-2xl">
              {{ formatDatePTBR(faturamento.dataFaturamento) }}
            </td>
            <td class="text-2xl">
              {{ formataMesAno(faturamento.competencia) }}
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
                formatCurrencySemArrendondar(
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
                <span
                  @click="openViewFaturamentoModal(faturamento)"
                  v-if="hasPermission('faturamentos', 'Visualizar')"
                >
                  <Icon
                    icon="ph:eye"
                    height="20"
                    class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                  />
                </span>
                <span
                  @click="openEditFaturamentoModal(faturamento)"
                  v-if="hasPermission('faturamentos', 'Editar')"
                >
                  <Icon
                    icon="bx:edit"
                    height="20"
                    class="hover:text-blue-500 hover:rounded-md cursor-pointer"
                  />
                </span>
                <span
                  @click="deleteFaturamento(faturamento.id)"
                  v-if="hasPermission('faturamentos', 'Deletar')"
                >
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
          :max-pages-shown="lastPageFaturamentos"
          :items-per-page="resultsPerPageFaturamentos"
          v-model="currentPageFaturamento"
          @click="changePageFaturamento"
        />
      </div>
    </section>
  </div>

  <!-- Anexos do contrato -->
  <div v-if="currentTab === 'Anexos'">
    <Anexos :key="contratoId" :resourceId="contratoId" :variant="'contrato'" />
  </div>
</section>
  <!-- Modal novo pedido de faturamento-->
  <JetDialogModal
    :show="modalPedidoFaturamento"
    :withouHeader="false"
    @close="closeModalPedidoFaturamento"
    maxWidth="8xl"
    :modalTitle="'Novo Pedido de Faturamento'"
  >
    <template #content>
      <div class="flex border-b border-gray-200 mb-8 pt-4">
          <TabButton
          v-for="tab in criarFaturamentoTabs"
          :key="tab"
          :currentTab="criarFaturamentoCurrentTab"
          :tab="tab"
          @update:currentTab="criarFaturamentoCurrentTab = $event"
        />
      </div>

      <form @submit.prevent="createPedidoFaturamento">
        <div v-if="criarFaturamentoCurrentTab === 'Formulário'">
        <section class="flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <label class="font-bold text-3xl w-[180px]">Contrato:</label>
            <span class="font-medium text-3xl">{{contrato.nomeContrato}}</span>
          </div>
          <div class="flex gap-4 items-center justify-between text-center">
            <label class="font-bold text-3xl">Valor total:</label>
            <span class="font-medium text-3xl">{{ formatCurrencySemArrendondar(calcularTotalLancamento(contrato.lancamentos))}}</span>
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
              type="month"
              v-model="pedidoFaturamentoData.competencia"
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
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-bl-3xl rounded-tl-3xl text-observacoes"
            />
          </div>
        </section>
        <div class="font-bold text-3xl mt-8">Descrição da nota:</div>
        <table
          class="table-auto border border-slate-200 rounded-2xl w-full mt-8"
        >
          <thead class="h-20 bg-slate-100 border-1">
            <tr>
              <th class="text-xl">#</th>
              <th class="text-xl">Projeto</th>
              <th class="text-xl">Competência</th>
              <th class="text-xl">Unidade de medida</th>
              <th class="text-xl">Quantidade</th>
              <th class="text-xl">Valor do lançamento</th>
            </tr>
          </thead>
          <tbody>
            <template
            v-for="(lancamento, lIndex) in contrato.lancamentos.filter((l) => pedidosFaturamento.includes(l.id))"
            :key="lancamento.id"
          >
            <tr
              class="h-24 text-center cursor-pointer hover:bg-gray-100 transition"
              @click="toggleExpand(lancamento.id, lancamento.lancamentoItens.length)"
            >
              <td class="px-4">
                {{ lancamento.id }}
              </td>
              <td>{{ lancamento.projetos }}</td>
              <td>{{ lancamento.competencia }}</td>
              <td>{{ lancamento.lancamentoItens[0].unidadeMedida }}</td>
              <td>
                {{ parseFloat(lancamento.lancamentoItens[0].quantidadeItens).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}
              </td>
              <td>
                {{ formatCurrencySemArrendondar(calcularSaldoLancamentoItens(lancamento.lancamentoItens, lancamento.dias)) }}
              </td>
            </tr>

            <!--Se houver itens convertidos, faz um dropdown -->
            <tr
              v-for="(subItem, sIndex) in lancamento.lancamentoItens.slice(1)"
              :key="subItem.id"
              v-show="expandedLancamentos[lancamento.id]"
              class="h-24 text-center bg-gray-50"
            >
              <!-- <td colspan="3">O item {{ lancamento.lancamentoItens[0].titulo }} excedeu a quantidade disponível e foi convertido para o item {{subItem.titulo}}</td> -->
              <td></td>
              <td></td>
              <td></td>
              <td>{{ subItem.unidadeMedida }}</td>
              <td>{{ parseFloat(subItem.quantidadeItens).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}</td>
              <td></td>
            </tr>
          </template>
          </tbody>
        </table>
        <div>
          <AnexoUpload ref="anexoUploadRef" :resourceId="faturamentoId" variant="faturamento" :localAnexos="faturamentoLocalAnexos"/>
        </div>
      </div>
        <footer class="mt-9 flex justify-end gap-4">
          <button
            @click="closeModalPedidoFaturamento"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-faturamento w-40"
          >
            Salvar
          </button>
        </footer>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal editar faturamento -->
  <JetDialogModal
    :show="modalEditFaturamento"
    :withouHeader="false"
    @close="closeEditFaturamentoModal"
    maxWidth="8xl"
    :modalTitle="isFaturamentoViewModal ? `Visualizar Faturamento` : 'Editar Faturamento'"
  >
    <template #content>
      <div class="flex border-b border-gray-200 mb-8 pt-4">
        <TabButton
          v-for="tab in editFaturamentoTabs"
          :key="tab"
          :currentTab="editFaturamentoCurrentTab"
          :tab="tab"
          @update:currentTab="editFaturamentoCurrentTab = $event"
        />
      </div>
      <form @submit.prevent="saveEditedFaturamento">
      <section v-if="editFaturamentoCurrentTab === 'Formulário'">

        <section class="flex flex-col gap-8">
          <div class="flex justify-between items-center gap-4">
            <label class="font-bold text-3xl w-[180px]">Contrato:</label>
            <span class="font-medium text-3xl">{{contrato.nomeContrato}}</span>
          </div>
          <div class="flex justify-between items-center gap-4">
            <label class="font-bold text-3xl w-[180px]">Valor total:</label>
            <span class="font-medium text-3xl">{{
              formatCurrencySemArrendondar(calcularTotalFaturamento(editingFaturamento))
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
              type="month"
              :disabled="isFaturamentoViewModal"
              :class="{ 'bg-white border-none': isFaturamentoViewModal }"
              v-model="editingFaturamento.competencia"
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
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-bl-3xl rounded-tl-3xl text-observacoes"
            />
          </div>
        </section>
        <div class="font-bold text-3xl mt-8">Descrição da nota:</div>
        <div class="overflow-y-auto max-h-[42rem] border border-gray-300 rounded-lg mt-8">
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">#</th>
                <th class="text-xl">Projeto</th>
                <th class="text-xl">Competência</th>
                <th class="text-xl">Unidade de medida</th>
                <th class="text-xl">Quantidade</th>
                <th class="text-xl">Valor do lançamento</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(lancamento, lIndex) in editingFaturamento.faturamentoItens.map(fi => fi.lancamento)" :key="lancamento.id">
                <tr
                  class="h-24 text-center cursor-pointer hover:bg-gray-100 transition"
                  @click="toggleExpand(lancamento.id, lancamento.lancamentoItens.length)"
                >
                  <td class="px-4">{{ lancamento.id }}</td>
                  <td>{{ lancamento.projetos }}</td>
                  <td class="text-center">
                    <input
                      @click.stop
                      v-model="lancamento.competencia"
                      type="month"
                      :disabled="isFaturamentoViewModal"
                      :class="{ 'bg-white border-none': isFaturamentoViewModal }"
                      placeholder="Informe a competência"
                      class="focus:border-[#FF6600] border focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-md h-14 text-center"
                    />
                  </td>
                  <td>{{ lancamento.lancamentoItens[0].unidadeMedida }}</td>
                  <td>
                    {{ parseFloat(lancamento.lancamentoItens[0].quantidadeItens).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}
                  </td>
                  <td>
                    {{ formatCurrencySemArrendondar(calcularSaldoLancamentoItens(lancamento.lancamentoItens, lancamento.dias)) }}
                  </td>
                </tr>

                <!-- Linhas adicionais se houver mais subitens -->
                <tr
                  v-for="(subItem, sIndex) in lancamento.lancamentoItens.slice(1)"
                  :key="subItem.id"
                  v-show="expandedLancamentos[lancamento.id]"
                  class="h-24 text-center bg-gray-50"
                >
                  <td colspan="3">
                    <!-- <span>O item {{ lancamento.lancamentoItens[0].titulo }} excedeu a quantidade disponível e foi convertido para o item {{subItem.titulo}}</span> -->
                  </td>
                  <td>{{ subItem.unidadeMedida }}</td>
                  <td>{{ parseFloat(subItem.quantidadeItens).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}</td>
                  <td></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div>
          <div v-if="editingFaturamento.id">
            <Anexos :resourceId="editingFaturamento.id" :variant="'faturamento'" :isViewOnly="isFaturamentoViewModal"/>
          </div>
        </div>
      </section>
        <footer class="mt-9 flex justify-end gap-4">
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
        </footer>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal criar Medição -->
  <JetDialogModal
    :show="modalLancamento"
    :withouHeader="false"
    @close="closeModalLancamento"
    maxWidth="8xl"
    :modalTitle="'Criar Nova Medição'"
  >
    <template #content>
      <div class="flex border-b border-gray-200 mb-8 pt-4">
        <TabButton
        v-for="tab in criarMedicaoTabs"
        :key="tab"
        :currentTab="criarMedicaoCurrentTab"
        :tab="tab"
        @update:currentTab="criarMedicaoCurrentTab = $event"
      />
    </div>
      <form @submit.prevent="createLancamento">
        <div v-if="criarMedicaoCurrentTab === 'Formulário'">
        <section class="flex flex-col gap-8">
          <div class="flex items-center gap-12">
            <label class="font-bold text-3xl w-[180px]">Contrato:</label>
            <span class="font-medium text-3xl">{{contrato.nomeContrato}}</span>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Projeto:</label>
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
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14 custom-number-input"
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
              <option>Relatório Mensal</option>
              <option>Não se aplica</option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Competência:</label>
            <input
              type="month"
              placeholder="Informe a competência"
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
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-bl-3xl rounded-tl-3xl text-observacoes"
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
          <div class="flex justify-end w-full gap-2">
            <span
              v-if="hasConversion"
              @click="cancelConversion"
              class="text-center px-4 py-4 border border-transparent rounded-md font-bold text-xl text-white disabled:opacity-25 transition w-40 bg-red-500 hover:bg-red-600 cursor-pointer"
            >
            Cancelar Conversão
          </span>
            <span
              @click="openConverterItemModal"
              class="text-center px-4 py-4 border border-transparent rounded-md font-bold text-xl text-white disabled:opacity-25 transition w-40 bg-green-500 hover:bg-green-600 cursor-pointer"
            >
            + Converter item
          </span>
        </div>
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">#</th>
                <th class="text-xl">Item</th>
                <th class="text-xl">U.M (Unidade Medida)</th>
                <th class="text-xl">Quantidade contratada</th>
                <th class="text-xl">Disponível</th>
                <th class="text-xl">Resultado da medição</th>
                <th v-if="medicaoData.tipo_medicao === 'Relatório Mensal'" class="text-xl">Dias</th>
              </tr>
            </thead>
            <tbody v-if="medicaoData.itens">
              <tr
                class="h-24 text-center"
                v-for="item in medicaoData.itens"
                :key="item.id"
              >
                <td class="text-2xl">{{ item.contagem_dinamica }}</td>
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">{{ item.unidadeMedida }}</td>
                <td>
                  <span>
                    {{ parseFloat(item.saldoQuantidadeContratada).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}
                  </span>
                </td>
                <td>
                  {{
                    calcularItensRestante(
                      item.id,
                      item.saldoQuantidadeContratada
                    ).toLocaleString('pt-BR', { minimumFractionDigits: 3 })
                  }}
                </td>
                <td>
                  <money3
                    v-model="item.quantidadeItens"
                    type="number"
                    class="border-2 text-center max-w-60"
                    min="0"
                    v-bind="conversaoConfig"
                  />
                </td>
                <td v-if="medicaoData.tipo_medicao === 'Relatório Mensal'">
                  <input
                    v-model="medicaoData.dias"
                    type="number"
                    min="1"
                    max="31"
                    class="border-2 text-center max-w-72"
                    placeholder="Dias"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <AnexoUpload ref="anexoUploadRef" :resourceId="medicaoId" variant="medicao" :localAnexos="medicaoLocalAnexos" />
          </div>
        </div>
        </div>
        <footer class=" mt-9 flex justify-end gap-4">
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
        </footer>
      </form>
    </template>
  </JetDialogModal>

  <!-- Modal editar medição-->
  <JetDialogModal
    :show="modalEditLancamento"
    :withouHeader="false"
    @close="closeEditLancamentoModal"
    maxWidth="8xl"
    :modalTitle="isLancamentoViewModal ? 'Visualizar Medição' : 'Editar Medição'"
  >
    <template #content>
    <div class="flex border-b border-gray-200 mb-8 pt-4">
        <TabButton
        v-for="tab in editMedicaoTabs"
        :key="tab"
        :currentTab="editMedicaoCurrentTab"
        :tab="tab"
        @update:currentTab="editMedicaoCurrentTab = $event"
      />
    </div>

    <form @submit.prevent="saveEditedLancamento">
      <section v-if="editMedicaoCurrentTab === 'Formulário'">
        <section class="flex flex-col gap-8">
          <div class="flex items-center gap-12">
            <label class="font-bold text-3xl w-[180px]">Contrato:</label>
            <span class="font-medium text-3xl">{{contrato.nomeContrato}}</span>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Projeto:</label>
            <select
              v-model="editingLancamento.projetos"
              :disabled="isLancamentoViewModal || editingLancamento.isFaturado"
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
              :disabled="isLancamentoViewModal || editingLancamento.isFaturado"
            >
              <option disabled hidden value="">
                Selecione o tipo da medição
              </option>
              <option>Estimada</option>
              <option>Detalhada</option>
              <option>Relatório Mensal</option>
              <option>Não se aplica</option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Status da medição:</label>
            <select
              v-model="editingLancamento.status"
              :disabled="isLancamentoViewModal || editingLancamento.isFaturado"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"
            >
              <option disabled hidden value="">Selecione o status da medição</option>
              <option v-if="editingLancamento.tipoMedicao === 'Estimada'" value="Autorizada">Autorizada</option>
              <option v-if="editingLancamento.tipoMedicao === 'Estimada'" value="Não Autorizada">Não Autorizada</option>
              <option v-if="editingLancamento.tipoMedicao === 'Estimada'" value="Cancelada">Cancelada</option>

              <option v-if="editingLancamento.tipoMedicao === 'Detalhada' || editingLancamento.tipoMedicao === 'Relatório Mensal' || editingLancamento.tipoMedicao === 'Não se aplica'" value="Não Iniciada">Não Iniciada</option>
              <option v-if="editingLancamento.tipoMedicao === 'Detalhada' || editingLancamento.tipoMedicao === 'Relatório Mensal' || editingLancamento.tipoMedicao === 'Não se aplica'" value="Em Andamento">Em Andamento</option>
              <option v-if="editingLancamento.tipoMedicao === 'Detalhada' || editingLancamento.tipoMedicao === 'Relatório Mensal' || editingLancamento.tipoMedicao === 'Não se aplica'" value="Disponível p/ Faturamento">Disponível para Faturamento</option>
              <option v-if="editingLancamento.tipoMedicao === 'Detalhada' || editingLancamento.tipoMedicao === 'Relatório Mensal' || editingLancamento.tipoMedicao === 'Não se aplica'" value="Encaminhada p/ Faturamento" disabled hidden>Encaminhada p/ Faturamento</option>
              <option v-if="editingLancamento.tipoMedicao === 'Detalhada' || editingLancamento.tipoMedicao === 'Relatório Mensal' || editingLancamento.tipoMedicao === 'Não se aplica'" value="Finalizada" disabled hidden>Finalizada</option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[200px]">Competência:</label>
            <input
              type="month"
              :disabled="isLancamentoViewModal"
              placeholder="Informe a competência"
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
              :disabled="isLancamentoViewModal || editingLancamento.isFaturado"
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
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-1/2 border-gray-300 rounded-bl-3xl rounded-tl-3xl text-observacoes"
            />
          </div>
        </section>
        <section class="mt-8">
          <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">#</th>
                <th class="text-xl">Item</th>
                <th class="text-xl">U.M (Unidade Medida)</th>
                <th class="text-xl">Quantidade contratada</th>
                <th class="text-xl">Disponível</th>
                <th class="text-xl">Resultado da medição</th>
                <th v-if="editingLancamento.tipoMedicao === 'Relatório Mensal'" class="text-xl">Dias</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-24 text-center"
                v-for="item in editingLancamento.lancamentoItens"
                :key="item.id"
              >
                <td class="text-2xl">{{ item.contagem_dinamica }}</td>
                <td class="text-2xl">{{ item.titulo }}</td>
                <td class="text-2xl">{{ item.unidadeMedida }}</td>
                <td>
                  <span>
                    {{ parseFloat(item.saldoQuantidadeContratada).toLocaleString('pt-BR', { minimumFractionDigits: 3 }) }}
                  </span>
                </td>
                <td>
                  {{
                    calcularItensRestante(
                      item.contratoItemId,
                      item.saldoQuantidadeContratada
                    ).toLocaleString('pt-BR', { minimumFractionDigits: 3 })
                  }}
                </td>
                <td>
                  <money3
                    v-model="item.quantidadeItens"
                    type="number"
                    :disabled="isLancamentoViewModal || editingLancamento.isFaturado"
                    :class="{ 'border-none bg-white': isLancamentoViewModal }"
                    class="border-2 text-center max-w-60"
                    min="0"
                    v-bind="decimalConfig"
                  />
                </td>
                <td v-if="editingLancamento.tipoMedicao === 'Relatório Mensal'">
                  <input
                    v-model="editingLancamento.dias"
                    type="number"
                    min="0"
                    max="31"
                    :disabled="isLancamentoViewModal || editingLancamento.isFaturado"
                    class="border-2 text-center max-w-72"
                    placeholder="Dias"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="editingLancamento.id">
            <Anexos :resourceId="editingLancamento.id" :variant="'medicao'" :isViewOnly="isLancamentoViewModal"/>
          </div>
        </section>
      </section>
        <footer class="mt-9 flex justify-end gap-4">
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
        </footer>
      </form>

    </template>
  </JetDialogModal>

 <!-- Modal de conversão -->
 <JetDialogModal
 :show="modalConverterItem"
 @close="closeConverterItemModal"
 maxWidth="6xl"
 modalTitle="Converter Item"
 :centered="true"
>
 <template #content class="p-4">
   <div>
     <h3 class="text-2xl mb-4 text-[#9E9E9E] font-normal">Informe os itens que você gostaria de fazer a conversão:</h3>
   </div>

   <form @submit.prevent="confirmarConversao" class="space-y-6">
    <div class="flex flex-wrap gap-6 items-center">
      <section class="flex flex-col w-full md:w-[48%] space-y-2">
        <label class="font-medium text-2xl">Item atual:</label>
        <select
          v-model="itemAtual"
          disabled
          class="focus:border-black border-2 focus:border-4 focus:outline-none px-4 py-4 rounded-lg w-full border-gray-300 h-[4.5rem]"
        >
          <option v-if="itemAtual" :value="itemAtual">
            {{ itemAtual?.titulo }}
          </option>
        </select>
      </section>

      <section class="flex flex-col w-full md:w-[48%] space-y-2">
        <label class="font-medium text-2xl">Quantidade</label>
        <span>
          <money3
            v-model="itemAtual.quantidadeItens"
            type="number"
            disabled
            class="border-2 text-center w-full py-4 rounded-lg h-[4.5rem]"
            min="0"
            v-bind="decimalConfig"
          />
        </span>
      </section>
    </div>

    <div class="flex flex-wrap gap-6 items-center">
      <section class="flex flex-col w-full md:w-[48%] space-y-2">
        <label class="font-medium text-2xl">Item Novo:</label>
        <select
          v-model="itemNovo"
          @change="() => {
            if (itemNovo && typeof itemNovo === 'object') {
              if (!itemNovo.quantidadeItens) {
                itemNovo.quantidadeItens = '0.000'
              }
            }
            calcular()
          }"
          class="focus:border-black focus:border-[3px] border-2 focus:outline-8 px-4 py-4 rounded-lg w-full border-gray-300 h-[4.5rem]"
        >
          <option disabled hidden value="">Selecione o item para converter</option>
          <option
            v-for="item in itensParaConverter"
            :value="item"
            :key="item.id"
          >
            {{ item.titulo }}
          </option>
        </select>
      </section>

      <section class="flex flex-col w-full md:w-[48%] space-y-2">
        <label class="font-medium text-2xl">Quantidade</label>
        <span>
          <money3
            v-model="itemNovo.quantidadeItens"
            type="number"
            class="border-2 text-center w-full py-4 rounded-lg h-[4.5rem]"
            min="0"
            v-bind="conversaoConfig"
            @change="calcular"
          />
        </span>
      </section>
    </div>

    <footer class="mt-12 flex justify-end gap-4">
      <button
        @click="closeConverterItemModal"
        class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
      >
        Cancelar
      </button>
      <button
        @click="confirmarConversao"
        class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest disabled:opacity-25 transition h-14 btn-save-lancamento w-40"
      >
        Confirmar
      </button>
    </footer>
  </form>
 </template>
</JetDialogModal>

  <!-- Modal criar item -->
  <JetDialogModal
    :show="modalCreateItem"
    :withouHeader="false"
    @close="closeModalCreateItem"
    maxWidth="6xl"
    :modalTitle="'Criar Novo Item'"
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
            <label class="font-bold text-3xl">Unidade de Medida:</label>
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

  <!-- Modal para visualizar aditivo -->
  <JetDialogModal
    :show="modalViewAditivo"
    :withouHeader="false"
    @close="closeModalViewAditivo"
    maxWidth="4xl"
    :modalTitle="'Visualizar Termo Aditivo'"
  >
    <template #content>
      <ViewAditivoForm :aditivo="selectedAditivo" v-if="selectedAditivo" />
    </template>
  </JetDialogModal>

  <!-- Modal para visualizar os cards do resumo financeiro -->
   <JetDialogModal
   :show="modalFinancialCards"
   :withouHeader="false"
   @close="closeFinancialCardsModal"
   maxWidth="8xl"
   :modalTitle="`${selectedCardTitle}`"
   >
    <template #content>
      <div class="max-h-[70vh] overflow-y-auto">
      <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
        <thead class="h-20 bg-slate-100 border-1">
          <tr>
            <th class="text-xl">#</th>
            <th class="text-xl cursor-pointer hover:text-blue-600" @click="changeSorting('data_faturamento', 'faturamentos')">
              Data
              <span>
                {{ sortBy["faturamentos"] === "data_faturamento" && sortOrder["faturamentos"] === "asc" ? "▲" : "▼" }}
              </span>
            </th>
            <th class="text-xl cursor-pointer hover:text-blue-600" @click="changeSorting('competencia', 'faturamentos')">Competência
                <span>{{ sortBy["faturamentos"] === "competencia" && sortOrder["faturamentos"] === "asc" ? "▲" : "▼" }}</span>
            </th>
            <th class="text-xl">Nota Fiscal</th>
            <th class="text-xl">Total</th>
            <th class="text-xl">Situação</th>
          </tr>
        </thead>
        <tbody v-if="financialCardsData">
          <tr
            class="h-28 text-center"
            v-for="(faturamento) in financialCardsData"
            :key="faturamento.id"
          >
            <td class="text-2xl">{{ faturamento.id }}</td>
            <td class="text-2xl">
              {{ formatDatePTBR(faturamento.dataFaturamento) }}
            </td>
            <td class="text-2xl">
              {{ formataMesAno(faturamento.competencia) }}
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
                formatCurrencySemArrendondar(
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
          </tr>
        </tbody>
      </table>
      <footer class="flex justify-end mt-12">
          <button
          @click="closeFinancialCardsModal"
          class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40"
          >
          Fechar
        </button>
      </footer>
      </div>
    </template>
  </JetDialogModal>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, watch, nextTick } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { api } from "@/services/api";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";
import { Money3Component } from "v-money3";
import { format, formatISO, startOfDay, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';
import Anexos from '../../../components/form/Anexos.vue';
import AnexoUpload from '../../../components/form/AnexoUpload.vue';
import TabButton from '../../../components/TabButton.vue';
import { useProfileStore } from '@/stores/ProfileStore';
import { usePermissions } from '@/composables/usePermission';
import ViewAditivoForm from '@/components/ViewAditivoForm.vue';
import EditAditivoForm from '@/components/EditAditivoForm.vue';
import { waveform } from "ldrs";
import socket from '../../../../websocket.js'
import StatusFilter from '@/components/StatusFilter.vue';

const { hasPermission } = usePermissions();
const store = useProfileStore()
waveform.register();
const contratoSelecionadoId = ref(null);
const isLoading = ref(true);
const isSubmitting = ref(false)
// Guias das tabelas
let alterouStatus = ref(false); // Flag para verificar se houve alteração no status
const tabs = ['Itens', 'Medições', 'Faturamentos', 'Anexos']
const currentTab = ref(tabs[0])
// Guias dos modais de edição
const editMedicaoTabs = ['Formulário']
const editMedicaoCurrentTab = ref(editMedicaoTabs[0])
const editFaturamentoTabs = ['Formulário']
const editFaturamentoCurrentTab = ref(editFaturamentoTabs[0])
// Guias dos modais de criação
const anexoUploadRef = ref(null);
// Medicao
const selectedStatuses= ref([])
const allStatuses = ref([
  'Não Autorizada',
  'Autorizada',
  'Cancelada',
  'Finalizada',
  'Não Iniciada',
  'Em Andamento',
  'Encaminhada p/ Faturamento',
  'Disponível p/ Faturamento',
])
const criarMedicaoTabs = ['Formulário']
const criarMedicaoCurrentTab = ref(criarMedicaoTabs[0])
const medicaoLocalAnexos = ref([])
const medicaoId = ref(null)
// Faturamento
const criarFaturamentoTabs = ['Formulário']
const criarFaturamentoCurrentTab = ref(criarFaturamentoTabs[0])
const faturamentoLocalAnexos = ref([])
const faturamentoId = ref(null)
let contratoId = null
const financialSummary = computed(() => [
  {
    title: "Valor Contratado",
    value: formatCurrencySemArrendondar(contrato.value.saldoContrato),
    icon: "fa6-solid:file-contract",
    bgColor: "from-blue-400 to-blue-600",
  },
  {
    title: "Aguardando Faturamento",
    value: formatCurrencySemArrendondar(
      calcularSaldoDisponivel(faturamentoItemData.value).aguardandoFaturamento
    ),
    icon: "ph:clock-fill",
    bgColor: "from-orange-400 to-orange-600",
  },
  {
    title: "Aguardando Pagamento",
    value: formatCurrencySemArrendondar(
      calcularSaldoDisponivel(faturamentoItemData.value).aguardandoPagamento
    ),
    icon: "fa-solid:hand-holding-usd",
    bgColor: "from-indigo-400 to-indigo-600",
  },
  {
    title: "Pago",
    value: formatCurrencySemArrendondar(
      calcularSaldoDisponivel(faturamentoItemData.value).valorPago
    ),
    icon: "fa-check-circle",
    bgColor: "from-green-400 to-green-600",
  },
  {
    title: "Saldo Disponível",
    value: formatCurrencySemArrendondar(contrato.value.saldoContrato - calcularSaldoDisponivel(faturamentoItemData.value).totalUtilizado),
    icon: "ph-wallet-fill",
    bgColor: "from-purple-400 to-purple-600",
  },
]);
const router = useRouter();
const route = useRoute();
const contratoOriginal = ref(null);
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
const editingAditivo =  ref({});
const modalEditLancamento = ref(false);
const modalConverterItem = ref(false);
const modalEditFaturamento = ref(false);
const editingLancamento = ref({});
const isLancamentoViewModal = ref(false);
const isItemViewModal = ref(false);
const isFaturamentoViewModal = ref(false);
const isFormViewAditivo =  ref(false);
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
const termosAditivos = ref([]);
const totalItens = ref();
const resultsPerPageItens = ref();
const lastPageItens = ref(1)
let contratoItemData = ref([]);
let contratoItemMeta = ref([]);
const totalMedicoes = ref();
const resultsPerPageMedicoes = ref();
const lastPageMedicoes = ref(1);
let medicaoItemData = ref([]);
let medicaoItemMeta = ref([]);
const totalFaturamentos = ref(0);
const lastPageFaturamentos = ref(1)
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

const fetchContratoItens = async (id, page, search = '') => {
  try {
    const response = await api.get(`/contratos/${id}/items/`, { params: { page, search}});
    const itens = response.data.data;
    const meta = response.data.meta;

    itens.forEach((item, index) => {
      item.contagem_dinamica = (meta.currentPage - 1) * meta.perPage + index + 1;
    });

    contratoItemData.value = itens;
    contratoItemMeta.value = meta;
    lastPageItens.value = contratoItemMeta.value.lastPage;
    currentPage.value = contratoItemMeta.value.currentPage;
    totalItens.value = contratoItemMeta.value.total;
    resultsPerPageItens.value = contratoItemMeta.value.perPage;

    contrato.value.contratoItens.forEach(item => {
      const itemContrato = contratoItemData.value.find(contratoItem => contratoItem.id === item.id);
      if(itemContrato) {
        item.contagem_dinamica = itemContrato.contagem_dinamica;
      }
    })
  } catch (error) {
    contratoItemData.value = [];
    contratoItemMeta.value = [];
    currentPage.value = 1;
    totalItens.value = 0;
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
    fetchContratoMedicoes(contratoId, currentPageMedicao.value);
  } else if (type === "faturamentos") {
    fetchContratoFaturamentos(contratoId, currentPageFaturamento.value);
  }
};

const fetchContratoMedicoes = async (id, page, search = '') => {
  try {
    const params = {
      page,
      limit: 8,
      search
    };
    if (sortBy.value.medicoes) {
      params.sortBy = sortBy.value.medicoes;
    }
    if (sortOrder.value.medicoes) {
      params.sortOrder = sortOrder.value.medicoes;
    }
    if (selectedStatuses.value && selectedStatuses.value.length > 0) {
      params.statuses = selectedStatuses.value;
    }
    const response = await api.get(
      `/contratos/${id}/lancamentos`,
      { params }
    );
    medicaoItemData.value = response.data.data;
    medicaoItemMeta.value = response.data.meta;

    medicaoItemData.value.forEach((medicao) => {
      medicao.lancamentoItens.forEach((lancamentoItem) => {
        const itemContrato = contratoItemData.value.find(
          (contratoItem) => contratoItem.id === lancamentoItem.contratoItemId
        );
        if (itemContrato) {
          lancamentoItem.contagem_dinamica = itemContrato.contagem_dinamica;
        }
      });
    });

    if (contrato.value.faturamentos) {
      medicaoItemData.value = await verificaIsFaturado(medicaoItemData.value,contrato.value.faturamentos);
    }
    currentPageMedicao.value = medicaoItemMeta.value.currentPage;
    resultsPerPageMedicoes.value = medicaoItemMeta.value.perPage;
    lastPageMedicoes.value = medicaoItemMeta.value.lastPage;
    totalMedicoes.value = medicaoItemMeta.value.total;
  } catch (error) {
    medicaoItemData.value = [];
    medicaoItemMeta.value = [];
    currentPageMedicao.value = 1;
    totalMedicoes.value = 0;
  }
};

const fetchContratoFaturamentos = async (id, page, search = '') => {
  try {
    const params = {
      page,
      limit: 8,
      search
    };
    if (sortBy.value.faturamentos) {
      params.sortBy = sortBy.value.faturamentos;
    }
    if (sortOrder.value.faturamentos) {
      params.sortOrder = sortOrder.value.faturamentos;
    }
    const response = await api.get(`/contratos/${id}/faturamentos`, { params });
    faturamentoItemData.value = response.data.data;
    faturamentoItemMeta.value = response.data.meta;
    lastPageFaturamentos.value = response.data.meta.lastPage
    currentPageFaturamento.value = faturamentoItemMeta.value.currentPage;
    resultsPerPageFaturamentos.value = faturamentoItemMeta.value.perPage;
    totalFaturamentos.value = faturamentoItemMeta.value.total;
  } catch (error) {
    faturamentoItemData.value = [];
    faturamentoItemMeta.value = [];
    currentPageFaturamento.value = 1;
    totalFaturamentos.value = 0;
  }
};

watch(()=> alterouStatus.value, () =>{
  fetchContratoMedicoes(contratoId, currentPageMedicao.value )
  alterouStatus.value = false;
})
watch(
  () => currentPage.value,
  () => fetchContratoItens(contratoId, currentPage.value)
);
watch(
  () => currentPageMedicao.value,
  () => fetchContratoMedicoes(contratoId, currentPageMedicao.value)
);

watch(
  () => selectedStatuses.value,
  () => {
    fetchContratoMedicoes(contratoId, 1);
  },
  { deep: true }
);

watch(
  () => currentPageFaturamento.value,
  () => fetchContratoFaturamentos(contratoId, currentPageFaturamento.value)
);

watch(()=> contrato.value.id, () => contratoId = contrato.value.id)

const changePedido = (e) => {
  pedidoFaturamentoData.value.descricao_nota = pedidosFaturamento.value;
};

// Faturamento
const ExibirModalPedidoFaturamento = () => {
  if (pedidoFaturamentoData.value.descricao_nota.length == 0) {
    toast.error("Por favor, selecione uma medição antes de continuar.");
    return;
  }
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
  criarFaturamentoCurrentTab.value = criarFaturamentoTabs[0]
  // faturamentoLocalAnexos.value = []
  // faturamentoId.value = null
  pedidosFaturamento.value = [];
};

// Editar faturamento do contrato
const openEditFaturamentoModal = (faturamento) => {
  let dataFormatada = ''
  if (faturamento.dataFaturamento) {
    dataFormatada = faturamento.dataFaturamento.split('T')[0];
  }
  const competencia = faturamento.competencia || "";
  const competenciaFormatada = competencia.split("-").slice(0, 2).join("-");

  editingFaturamento.value = {
    ...faturamento,
    dataFaturamento: dataFormatada,
    competencia: competenciaFormatada,
    faturamentoItens: faturamento.faturamentoItens.map(item => ({
      ...item,
      lancamento: {
        ...item.lancamento,
        competencia: item.lancamento.competencia.split("-").slice(0,2).join("-"),
        originalCompetencia: item.lancamento.competencia
      }
    }))
  };
  modalEditFaturamento.value = true;
};

const openViewFaturamentoModal = (faturamento) => {
  isFaturamentoViewModal.value = true;
  const dataFormatada = format(
    new Date(faturamento.dataFaturamento),
    "yyyy-MM-dd"
  );
  const competencia = faturamento.competencia || "";
  const competenciaFormatada = competencia.split("-").slice(0, 2).join("-");

  editingFaturamento.value = {
    ...faturamento,
    dataFaturamento: dataFormatada,
    competencia: competenciaFormatada,
    faturamentoItens: faturamento.faturamentoItens.map(item => ({
      ...item,
      lancamento: {
        ...item.lancamento,
        competencia: item.lancamento.competencia.split("-").slice(0,2).join("-"),
        originalCompetencia: item.lancamento.competencia
      }
    }))
  };
  modalEditFaturamento.value = true;
};

const closeEditFaturamentoModal = () => {
  selectNovoFaturamento.value = "";
  editFaturamentoCurrentTab.value = editFaturamentoTabs[0]
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
      if(lancamento.dias){
        total += (parseFloat(lancamentoItem.valorUnitario) / 30) * parseFloat(lancamento.dias);
      } else {
        total += parseFloat(lancamentoItem.valorUnitario) * parseFloat(lancamentoItem.quantidadeItens);
      }
    });
  });

  return total;
};

const calcularTotalFaturamento = (faturamento) => {
  let total = 0;

  faturamento.faturamentoItens.forEach((faturamentoItem) => {
    faturamentoItem.lancamento.lancamentoItens.forEach((lancamentoItem) => {
      if(faturamentoItem.lancamento.dias){
        total += (parseFloat(lancamentoItem.valorUnitario) / 30) * parseFloat(faturamentoItem.lancamento.dias);
      } else {
        total += parseFloat(lancamentoItem.valorUnitario) * parseFloat(lancamentoItem.quantidadeItens);
      }
    });
  });
  return total;
};

const calcularSaldoFaturamentoItens = (faturamento) => {
  let saldoTotal = 0;

  faturamento.forEach((faturamentoObjeto) => {
    let lancamentoTemDias = faturamentoObjeto.lancamento.dias
    faturamentoObjeto.lancamento.lancamentoItens.forEach(lancamentoItem => {
      if(lancamentoTemDias) {
        saldoTotal += (parseFloat(lancamentoItem.valorUnitario) / 30) * parseFloat(lancamentoTemDias);
      } else {
        saldoTotal += parseFloat(lancamentoItem.valorUnitario) * parseFloat(lancamentoItem.quantidadeItens)
      }
    })
  })
  return saldoTotal;
};

const formatDatePTBR = (isoString) => {
  const [datePart] = isoString.split("T");

  const [ano, mes, dia] = datePart.split("-");

  return `${dia}/${mes}/${ano}`;
};

const createPedidoFaturamento = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
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
    isSubmitting.value = false;
    return;
  }

  try {
    const response = await api.post(`/contratos/${contratoId}/faturamentos`, payload)

    faturamentoId.value = response.data.id;
    toast("Faturamento criado com sucesso!", {
      theme: "colored",
      type: "success",
    });
    await nextTick();
    if (anexoUploadRef.value && faturamentoLocalAnexos.value.length > 0) {
      await anexoUploadRef.value.uploadAnexosPendentes();
    }
    faturamentoLocalAnexos.value = [];
    faturamentoId.value = null;

    closeModalPedidoFaturamento();
    fetchContrato(contratoId);
  } catch (error) {
    toast("Não foi possível criar o  pedido  de faturamento!", {
      theme: "colored",
      type: "error",
    });
  } finally {
    isSubmitting.value = false;
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

const updateCompetencia = async (lancamentoId, novaCompetencia) => {
  try {
    const response = await api.patch(`/lancamentos/${lancamentoId}/competencia`, {
      competencia: novaCompetencia
    });

  } catch (error) {
    console.error("Erro ao atualizar competência:", error);
    toast("Erro ao atualizar competência", {
      theme: "colored",
      type: "error",
    });
  }
};


const saveEditedFaturamento = async () => {
  // if(editingFaturamento.value.observacoes && editingFaturamento.value.observacoes.length > 1500) {
  //   toast.error(`Descrição não pode ter mais que 1500 caracteres! Caracteres: ${editingFaturamento.value.observacoes.length}`)
  //   return;
  // }
  let payload = {
    competencia: editingFaturamento.value.competencia,
    nota_fiscal: editingFaturamento.value.notaFiscal,
    data_faturamento: editingFaturamento.value.dataFaturamento,
    descricao_nota: editingFaturamento.value.descricao_nota,
    status: editingFaturamento.value.status,
    observacoes: editingFaturamento.value.observacoes,
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
        editingFaturamento.value.faturamentoItens.forEach(async (item) => {
          if (item.lancamento.competencia !== item.lancamento.originalCompetencia) {
            await updateCompetencia(item.lancamento.id, item.lancamento.competencia);
          }
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

const conversaoConfig = {
  precision: 3,
  decimal: ",",
  thousands: ".",
  prefix: "",
  masked: false,
};

// const deleteContrato = async (contratoAtual) => {
//   Swal.fire({
//       title: "Confirmar exclusão",
//     text: "Tem certeza que deseja excluir este contrato?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Excluir",
//     cancelButtonText: "Cancelar",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       api
//         .delete(`/contratos/${contratoAtual.id}`)
//         .then((response) => {
//           toast("Contrato deletado com sucesso!", {
//             theme: "colored",
//             type: "success",
//           });
//           if(contratoAtual.id === contratoOriginal.value.id) {
//             router.push('/contratos')
//           } else {
//             fetchTermoAditivo(contratoOriginal.value.id)
//             selecionarContrato(contratoOriginal.value)
//           }
//         })
//         .catch((error) => {
//           toast("Não foi possível deletar o contrato!", {
//             theme: "colored",
//             type: "error",
//           });
//           console.error("Erro ao deletar contrato:", error);
//         });
//     }
//   });
// };

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
  medicaoLocalAnexos.value = [];
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
  // medicaoId.value = null;
  criarMedicaoCurrentTab.value = criarMedicaoTabs[0]
  projetos.value = "";
  closeModalLancamento();
};

const addItemToTable = (selectedItem) => {
if (!selectedItem) return;

medicaoData.value.itens = [selectedItem];
// if (selectedItem) {
//   medicaoData.value.itens = [selectedItem];
// } else {
//   console.log("Nenhum item selecionado");
// }
};

const createLancamento = async () => {
  if (!projetos.value || projetos.value == null) {
    toast("Insira o nome do projeto", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  // let itensQuantidadePreenchida = contrato.value.contratoItens
  //   .filter(item => item.quantidadeItens !== undefined && item.quantidadeItens !== null)
  //   .map((item) => ({
  //     id_item: item.id,
  //     quantidade_itens: item.quantidadeItens,
  //   }));

  let itensQuantidadePreenchida = medicaoData.value.itens.map((item) => ({
    id_item: item.id,
    quantidade_itens: item.quantidadeItens || "0.000",
  }));

  const quantidadeExcedida = contrato.value.contratoItens.some((item) => {
    const quantidadeRestante = calcularItensRestante(
      item.id,
      item.saldoQuantidadeContratada
    );
    return item.quantidadeItens > quantidadeRestante;
  });
  if (quantidadeExcedida) {
    toast.error("A quantidade a ser lançada não pode ultrapassar a quantidade disponível.");
    return;
  }

  let novoSaldoContrato = calcularSaldoAtualContrato() - calcularSaldoLancamentoItens(itensQuantidadePreenchida);

  if (novoSaldoContrato < 0) {
    toast("O saldo contratado não pode ser excedido.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  if (medicaoData.value.tipo_medicao === "Não se aplica") {
    medicaoData.value.status = "Não Iniciada";
  }
  if (medicaoData.value.tipo_medicao === "Relatório Mensal") {
    medicaoData.value.status = "Não Iniciada";
  }
  if (medicaoData.value.tipo_medicao === "Detalhada") {
    medicaoData.value.status = "Não Iniciada";
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
  if (medicaoData.value.tipo_medicao === "Relatório Mensal") {
    payload.dias = medicaoData.value.dias || null;
  }

  try {
    const response = await api.post(`/contratos/${contratoId}/lancamentos`, payload)

    medicaoId.value = response.data.id;
    toast("Medição criada com sucesso!", {
      theme: "colored",
      type: "success",
    });

    await nextTick();
    if (medicaoLocalAnexos.value.length > 0 && anexoUploadRef.value) {
      await anexoUploadRef.value.uploadAnexosPendentes();
    }
    medicaoLocalAnexos.value = [];

    medicaoId.value = null;

    resetForm();
    fetchContrato(contratoId);
  } catch (error) {
    console.error("Erro ao criar medição:", error);
    toast.error("Não foi possível criar a medição", error);
  }
};

const voltarListagem = () => {
 window.location.href = '/contratos'
};

onMounted(async () => {
  contratoId = route.params.id;

  await fetchContrato(contratoId);
  contratoOriginal.value = { ...contrato.value };

  await fetchTermoAditivo(contratoId);

  if (termosAditivos.value.length > 0) {
    const ultimoTermo = termosAditivos.value[termosAditivos.value.length - 1];
    contratoSelecionadoId.value = ultimoTermo.id;
    await selecionarContrato(ultimoTermo);
  } else {
    contratoSelecionadoId.value = contratoOriginal.value.id;
  }

  isLoading.value = false;
  window.scroll({
    top: 0,
  });
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    let contratoData = response.data;

    contrato.value = contratoData;
    fetchContratoItens(id, currentPage.value);
    fetchContratoMedicoes(id, currentPageMedicao.value);
    fetchContratoFaturamentos(id, currentPageFaturamento.value);

    podeRenovar.value = calcularPodeRenovar();
  } catch (error) {
    console.error("Erro ao buscar contrato:", error);
  }
};

const fetchTermoAditivo = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}/termo-aditivo`);
    termosAditivos.value = response.data.sort((a, b) =>
    new Date(a.createdAt) - new Date(b.createdAt)
  );

    if (termosAditivos.value.length > 0) {
      const ultimoTermo = termosAditivos.value[termosAditivos.value.length - 1]
      contratoSelecionadoId.value = ultimoTermo.id;
      selecionarContrato(ultimoTermo);
    }
  } catch (error) {
    console.error("Erro ao buscar termos aditivos:", error);
    termosAditivos.value = [];
  }
};

const verificaIsFaturado = async (lancamentos, faturamentos) => {
  lancamentos.forEach((lancamento) => {
    lancamento.isFaturado = false;
  });

  if (faturamentos && faturamentos.length > 0) {
    for (const faturamento of faturamentos) {
      for (const item of faturamento.faturamentoItens) {
        const lancamento = lancamentos.find(
          (lancamento) => lancamento.id === item.lancamentoId
        );

        if (lancamento) {
          lancamento.isFaturado = true;

          switch (faturamento.status) {
            case 'Pago':
              if (lancamento.status !== 'Finalizada') {
                await alterarStatusMedicao(lancamento.id, 'Finalizada');
                alterouStatus.value = true;
              }
              break;

            case 'Aguardando Pagamento':
            case 'Aguardando Faturamento':
              if (lancamento.status !== 'Encaminhada p/ Faturamento') {
                await alterarStatusMedicao(lancamento.id, 'Encaminhada p/ Faturamento');
                alterouStatus.value = true;
              }
              break;

            default:
              break;
          }
        }
      }
    }
  }

  for (const lancamento of lancamentos) {
    if (
      !lancamento.isFaturado &&
      (lancamento.status === 'Encaminhada p/ Faturamento' || lancamento.status === 'Finalizada') &&
      lancamento.tipoMedicao === 'Detalhada'
    ) {
      await alterarStatusMedicao(lancamento.id, 'Disponível p/ Faturamento');
      alterouStatus.value = true;
    }
  }

  return lancamentos;
};

const alterarStatusMedicao = async (id, novoStatus) => {
  try {
    const response = await api.patch(`/lancamentos/${id}/status`, {
      status: novoStatus,
    });
    if (response.data.status === 'Disponível p/ Faturamento' || response.data.status === 'Finalizada'){
        socket.emit('medicao:update', {
          id,
          status: novoStatus,
          contratoId: contratoOriginal.value.id,
          message: `O status da medição ${id} foi alterado para: ${novoStatus}`,
        });
      }

  } catch (error) {
    console.error(`Erro ao alterar status da medição ${id}:`, error);
  }
};

const deleteLancamento = (lancamentoId) => {
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

const formatCurrencySemArrendondar = (value) => {
  // Divide o valor em inteiros e decimais
  const [parteInteira, parteDecimal] = value.toString().split('.');

  // Formata a parte inteira com separador de milhar
  const inteiroFormatado = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Trunca as casas decimais para 2 dígitos, sem arredondar
  const decimalFormatado = (parteDecimal || '00').substring(0, 2).padEnd(2, '0');
  // Garante duas casas decimais, preenchendo com zeros quando necessário
  // const decimalFormatado = (parteDecimal || '00').padEnd(2, '0');

  // Retorna no formato de moeda brasileiro
  return `R$ ${inteiroFormatado},${decimalFormatado}`;
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

const calcularSaldoLancamentoItens = (lancamento, dias = null) => {
  let saldoTotal = 0;
  lancamento.forEach((item) => {
    const quantidadeItens = parseFloat(parseFloat(item.quantidadeItens).toFixed(6)) || 0;
    const valorUnitario = parseFloat(parseFloat(item.valorUnitario).toFixed(6)) || 0;
    let valorTotalItem = 0;
    if (dias !== null) {
      valorTotalItem = parseFloat(((valorUnitario / 30) * dias).toFixed(6));
  } else {
      valorTotalItem = parseFloat((quantidadeItens * valorUnitario).toFixed(6));
  }
    saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(6));
  });
  return saldoTotal;
};

const calcularSaldoDisponivel = (faturamento) => {
  let saldoTotal = 0;
  let valorAguardandoFaturamento = 0;
  let valorAguardandoPagamento = 0;
  let valorPago = 0;

  faturamento?.forEach((item) => {
    item.faturamentoItens.forEach((subItem) => {
      const lancamento = subItem.lancamento;

      lancamento.lancamentoItens.forEach((itemLancamento) => {
        const quantidadeItens = parseFloat(itemLancamento.quantidadeItens) || 0;
        const valorUnitario = parseFloat(itemLancamento.valorUnitario) || 0;

        let valorTotalItem;
        if (lancamento.dias) {
          valorTotalItem = parseFloat(((valorUnitario / 30) * lancamento.dias).toFixed(2));
        } else {
          valorTotalItem = parseFloat((quantidadeItens * valorUnitario).toFixed(2));
        }

        if (item.status === "Aguardando Faturamento") {
          valorAguardandoFaturamento = parseFloat((valorAguardandoFaturamento + valorTotalItem).toFixed(2));
          saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(2));
        } else if (item.status === "Aguardando Pagamento") {
          valorAguardandoPagamento = parseFloat((valorAguardandoPagamento + valorTotalItem).toFixed(2));
          saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(2));
        } else if (item.status === "Pago") {
          valorPago = parseFloat((valorPago + valorTotalItem).toFixed(2));
          saldoTotal = parseFloat((saldoTotal + valorTotalItem).toFixed(2));
        }
      });
    });
  });

  return {
    aguardandoFaturamento: parseFloat(valorAguardandoFaturamento.toFixed(2)),
    aguardandoPagamento: parseFloat(valorAguardandoPagamento.toFixed(2)),
    totalUtilizado: parseFloat(saldoTotal.toFixed(2)),
    valorPago: parseFloat(valorPago.toFixed(2)),
  };
};

const calcularValoresAditivados = (termos) => {
  let saldoTotal = 0;

  termos.forEach((contrato) => {
    let saldoContrato =  parseFloat(contrato.saldoContrato)
    saldoTotal = parseFloat((saldoTotal + saldoContrato).toFixed(2));
  })
  return saldoTotal
}

const calcularItensRestante = (idItem, quantidadeContratada) => {
  let quantidadeUtilizada = 0;
  let quantidadeRestante = 0;

  contrato.value.lancamentos.forEach((lancamento) => {
    if (
      lancamento.status === "Autorizada" ||
      lancamento.status === "Não Autorizada" ||
      lancamento.status === "Cancelada" ||
      lancamento.status === "Não Iniciada" ||
      lancamento.status === "Em Andamento"
    ) {
      return;
    }
    lancamento.lancamentoItens.forEach((lancamentoItem) => {
      if (idItem === lancamentoItem.contratoItemId) {
        quantidadeUtilizada += parseFloat(lancamentoItem.quantidadeItens);
      }
    });
  });
  quantidadeRestante = parseFloat((quantidadeContratada - quantidadeUtilizada).toFixed(3));
  return quantidadeRestante;
};

const calcularQuantidadeItens = (lancamentoItens) => {
  let saldoTotal = 0;

  lancamentoItens.forEach((item) => {
    const quantidadeItens = parseFloat(item.quantidadeItens) || 0;
    saldoTotal += quantidadeItens;
  });
  return saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 3 });
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
  fetchUnidadesMedida();
  isItemViewModal.value = true;
  editingItem.value = { ...item };
  modalEditItem.value = true;
};

const closeModalEditItem = () => {
  isItemViewModal.value = false;
  modalEditItem.value = false;
};

const saveEditedItem = async () => {
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
    toast.error( `Valor total dos itens excede o valor contratado por R$ ${(valorTotalItens - valorContratado).toFixed(3)}`);
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

    toast.success("Item alterado com sucesso!", {
      theme: "colored",
    });

    fetchContrato(contratoId);
    closeModalEditItem();
  } catch (error) {
    console.error("Erro ao alterar item:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Erro ao alterar o item.", {
      theme: "colored",
    });
  }
};

// Deletar Item do contrato
const deleteItem = async (itemId) => {
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
        toast(error.response.data.message, { theme: "colored", type: "error" });
        console.error("Erro ao deletar item:", error.response.data.message);
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
      `/contratos/${contratoId}/items`,
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

// Converter itens de medição
const itemAtual = ref(null)
const itemNovo = ref(null)
const hasConversion = ref(false);

function truncateToPrecision(value, precision = 3) {
  const multiplier = Math.pow(10, precision);
  return Math.floor(value * multiplier) / multiplier;
}

function calcular() {
  if (!itemAtual.value || !itemNovo.value) return;

  const quantidadeDisponivel = calcularItensRestante(selectedItem.value.id, selectedItem.value.saldoQuantidadeContratada)
  const quantidadeEmExcesso =  parseFloat((selectedItem.value.quantidadeItens - quantidadeDisponivel).toFixed(6));
  const novoValor = parseFloat(((itemAtual.value.valorUnitario * quantidadeEmExcesso) / itemNovo.value.valorUnitario).toFixed(6));

  itemNovo.value.quantidadeItens = truncateToPrecision(novoValor, 3);
}

// Filtra o select de itens novos ao remover o item atual
const itensParaConverter = computed(() => {
  return contrato.value.contratoItens.filter(i => i.id !== itemAtual.value?.id)
})

function openConverterItemModal() {
  if (!selectedItem.value) {
    toast.error('Selecione um item antes de converter');
    return;
  }
  itemNovo.value = { ...itemNovo.value, quantidadeItens: "0.000" }
  const quantidadeDisponivel = calcularItensRestante(selectedItem.value.id, selectedItem.value.saldoQuantidadeContratada)
  const quantidadeEmExcesso = selectedItem.value.quantidadeItens - quantidadeDisponivel

  if (quantidadeEmExcesso <= 0) {
    toast.error("Não há quantidade excedente para converter.");
    return;
  }

  itemAtual.value = {...selectedItem.value, quantidadeItens: quantidadeEmExcesso};
  modalConverterItem.value = true;
}

function closeConverterItemModal() {
  modalConverterItem.value = false;
}

const confirmarConversao = () => {
  if (!itemAtual.value || !itemNovo.value) {
    toast.error('Selecione o item novo para conversão!')
    return;
  }

  const itemIndex = medicaoData.value.itens.findIndex(i => i.id === itemAtual.value.id);
  const quantidadeDisponivel = calcularItensRestante(selectedItem.value.id, selectedItem.value.saldoQuantidadeContratada)

  if (itemIndex !== -1) {
    medicaoData.value.itens[itemIndex].quantidadeItens = parseFloat(quantidadeDisponivel.toFixed(6));
  } else {
    console.error('Item atual não encontrado em medicaoData.value.itens');
  }

  medicaoData.value.itens.push({
    ...itemNovo.value,
    quantidadeItens: parseFloat(itemNovo.value.quantidadeItens.toFixed(6)) || "0.000000"
  });

  hasConversion.value = true;
  modalConverterItem.value = false;
}

function cancelConversion() {
  if (!itemNovo.value || !itemNovo.value.id) {
    toast.error('Nenhum item para excluir!');
    return;
  }

  const itemIndex = medicaoData.value.itens.findIndex(i => i.id === itemNovo.value.id);

  if (itemIndex !== -1) {
    medicaoData.value.itens.splice(itemIndex, 1);
    toast.success('Item convertido excluído com sucesso!');
  } else {
    toast.error('Item convertido não encontrado!');
  }

  itemAtual.value = null;
  itemNovo.value = null;
  hasConversion.value = false;
}

const expandedLancamentos = ref({})
function toggleExpand(id, quantidadeSubItens) {
  if (quantidadeSubItens > 1) {
    expandedLancamentos.value[id] = !expandedLancamentos.value[id]
  }
}
// Editar medição do contrato
const editingLancamentoBackup = ref(null);
const openEditLancamentoModal = (lancamento) => {
  // Crie um backup profundo (deep copy) do objeto original
  editingLancamentoBackup.value = JSON.parse(JSON.stringify(lancamento));

  const dataMedicao = lancamento.dataMedicao || "";
  const dataFormatada = dataMedicao.split("T")[0];

  const competencia = lancamento.competencia || "";
  const competenciaFormatada = competencia.split("-").slice(0, 2).join("-");

  // Faça uma cópia profunda também dos itens de lançamento
  editingLancamento.value = {
    ...lancamento,
    dataMedicao: dataFormatada,
    competencia: competenciaFormatada,
    lancamentoItens: JSON.parse(JSON.stringify(lancamento.lancamentoItens)) // Deep copy dos itens
  };

  modalEditLancamento.value = true;
  fetchProjetos(route.params.id);
};

const openViewLancamentoModal = (lancamento) => {
  isLancamentoViewModal.value = true;
  const itensComQuantidade = lancamento.lancamentoItens
  const dataMedicao = lancamento.dataMedicao || "";
  const dataFormatada = dataMedicao.split("T")[0];
  const competencia = lancamento.competencia || "";
  const competenciaFormatada = competencia.split("-").slice(0, 2).join("-");
  editingLancamento.value = {
    ...lancamento,
    dataMedicao: dataFormatada,
    competencia: competenciaFormatada,
    lancamentoItens: itensComQuantidade,
  };
  modalEditLancamento.value = true;
  fetchProjetos(route.params.id);
};

const closeEditLancamentoModal = () => {
  // Verifica se existe um backup
  if (editingLancamentoBackup.value) {
    // Restaura o backup, incluindo os itens de lançamento
    editingLancamento.value = JSON.parse(JSON.stringify(editingLancamentoBackup.value));
    editingLancamentoBackup.value = null; // Limpa o backup após restaurar
  }

  // Fecha o modal
  editMedicaoCurrentTab.value = editMedicaoTabs[0]
  modalEditLancamento.value = false;
  isLancamentoViewModal.value = false;
};

const saveEditedLancamento = async () => {
  if (!editingLancamento.value.projetos || editingLancamento.value.projetos === null)
  {
    toast.error("Adicione o nome do projeto.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  let itensQuantidadePreenchida = editingLancamento.value.lancamentoItens
    .filter((item) => item.quantidadeItens)
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
        return ( total + lancamento.lancamentoItens.reduce((subTotal, lancamentoItem) => {
            if ( lancamentoItem.contratoItemId === item.contrato_item_id &&  lancamentoItem.id !== item.id) {
              return subTotal + parseFloat(lancamentoItem.quantidadeItens);
            } return subTotal }, 0));
      }, 0);
    const saldoQuantidadeContratada = parseFloat(item.saldo_quantidade_contratada);
    const quantidadeItens = parseFloat(item.quantidade_itens);
    const quantidadeDisponivel = saldoQuantidadeContratada - quantidadeTotalLançada;

    return quantidadeItens > parseFloat((saldoQuantidadeContratada - quantidadeTotalLançada).toFixed(3))
  });

  if (quantidadeExcedida) {
    toast.error("A quantidade a ser lançada não pode ultrapassar a quantidade disponível.");
    return;
  }

  if (editingLancamento.value.status === "" || editingLancamento.value.status === null) {
    toast.error("Selecione um status para a medição.")
    return;
  }

  let payload = {
    data_medicao: editingLancamento.value.dataMedicao,
    competencia: editingLancamento.value.competencia,
    descricao: editingLancamento.value.descricao,
    tarefa_medicao: editingLancamento.value.tarefaMedicao,
    tipo_medicao: editingLancamento.value.tipoMedicao,
    status: editingLancamento.value.status,
    itens: itensQuantidadePreenchida.map((item) => ({
      id_item: item.id,
      quantidade_itens: item.quantidade_itens,
    })),
    projetos: editingLancamento.value.projetos,
  };

  if (editingLancamento.value.tipoMedicao === "Relatório Mensal") {
    payload.dias = editingLancamento.value.dias || null;
  }

  try {
    const response = await api
      .put(`/lancamentos/${editingLancamento.value.id}`, payload)
      .then((response) => {
        Object.assign(editingLancamento.value);
        toast("Medição atualizada com sucesso!", {
          theme: "colored",
          type: "success",
        });
        if( response.data.status === 'Disponível p/ Faturamento' ) {
          socket.emit('medicao:update', {
            id: response.data.id,
            status: response.data.status,
            contratoId: contratoOriginal.value.id,
            message: `O status da medição ${response.data.id} foi alterado para: ${response.data.status}`,
          });
        }
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

// const downloadZip = async (id) => {
//   try {
//     const response = await api.get(`/termo-aditivos/${id}/anexos/zip`, {
//       responseType: 'blob',
//     });

//     const contentDisposition = response.headers['content-disposition'];
//     let fileName = 'download.zip';

//     if (contentDisposition && contentDisposition.includes('filename')) {
//       const fileNameMatch = contentDisposition.match(/filename\*?=(?:UTF-8''|")?([^;\r\n"]+)/i);
//       if (fileNameMatch && fileNameMatch.length > 1) {
//         fileName = decodeURIComponent(fileNameMatch[1].replace(/"/g, ''));
//       }
//     }

//     const blob = new Blob([response.data], { type: 'application/zip' });

//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     document.body.appendChild(a);
//     a.click();

//     a.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error('Erro ao baixar o arquivo:', error);
//     alert('Ocorreu um erro ao baixar o arquivo.');
//   }
// };


watch(() => editingLancamento.value.tipoMedicao, (newTipo) => {
  if (newTipo === 'Estimada') {
    if (!['Autorizada', 'Não Autorizada', 'Cancelada'].includes(editingLancamento.value.status)) {
      editingLancamento.value.status = '';
    }
  } else if (newTipo === 'Detalhada' || newTipo === 'Relatório Mensal' || newTipo === 'Não se aplica') {
    if (!['Não Iniciada', 'Em Andamento', 'Disponível p/ Faturamento', 'Finalizada', 'Encaminhada p/ Faturamento'].includes(editingLancamento.value.status)) {
      editingLancamento.value.status = '';
    }
  }
});

const selecionarContrato = async (contratoData) => {
  if (contratoData && contratoData.id) {
    contratoSelecionadoId.value = contratoData.id;
    currentPage.value = 1;
    currentPageMedicao.value = 1;
    currentPageFaturamento.value = 1;
    await fetchContrato(contratoData.id);

    if (!contratoData.idContratoOriginal) {
      contratoOriginal.value = { ...contrato.value };
    }
  }
};

const formataMesAno = (competencia) => {
if (!competencia) return '';
  try {
    const date = parseISO(competencia);
    return format(date, "MMMM yyyy", { locale: ptBR }).toUpperCase();
  } catch (error) {
    console.error('Erro ao formatar competência:', error);
    return competencia;
  }
}
// Modal dos cards
const modalFinancialCards = ref(false)
const financialCardsData = ref([])
const selectedCardTitle = ref('')

const openFinancialCardsModal = (title) => {
  financialCardsData.value = faturamentoItemData.value.filter(fat => fat.status === title)
  selectedCardTitle.value = title
  modalFinancialCards.value = true
}

const closeFinancialCardsModal = () => {
  modalFinancialCards.value = false
  financialCardsData.value = []
  selectedCardTitle.value = ''
}

// Filtro de itens, medições e faturamentos
const filterItens = ref('')
const filterMedicoes = ref('')
const filterFaturamentos = ref('')

watch([filterItens, filterMedicoes, filterFaturamentos], () => {
  fetchContratoItens(contratoId, currentPage.value, filterItens.value);
  fetchContratoMedicoes(contratoId, currentPageMedicao.value, filterMedicoes.value )
  fetchContratoFaturamentos(contratoId, currentPageFaturamento.value, filterFaturamentos.value)
});
</script>

<style>
.custom-number-input::-webkit-inner-spin-button,
.custom-number-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input {
  -moz-appearance: textfield;
}

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
