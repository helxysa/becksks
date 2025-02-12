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
      <h1 class="text-5xl font-bold">Formulário de Contrato</h1>
    </div>

    <section class="">
      <form class="mt-12" @submit.prevent="saveContrato">
        <div class="flex flex-col items-center gap-3 my-8">
          <div class="flex flex-col items-center justify-center w-[30rem] h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
            <label for="file-upload" class="flex flex-col items-center justify-center cursor-pointer">
              <span v-if="!previewFoto" class="text-lg font-semibold text-gray-500">Clique para enviar uma imagem</span>
              <span v-if="!previewFoto" class="text-sm text-gray-400">(JPG, PNG, JPEG)</span>
              <img v-if="previewFoto" :src="previewFoto" alt="Preview da Foto" class="w-[20rem] rounded-md object-cover"/>
            </label>
            <input id="file-upload" type="file" accept="image/*" @change="handleFileChange" class="hidden"/>
          </div>

          <button v-if="previewFoto" @click="removeFoto" type="button" class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Remover Imagem
          </button>
        </div>
        <div class="flex flex-col items-start gap-3">
          <label class="font-semibold">Nome do contrato</label>
          <input
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
            type="text"
            placeholder="Informe o nome do contrato"
            v-model="contratoForm.nome_contrato"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Nome do cliente</label>
          <input
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
            type="text"
            placeholder="Informe o nome do cliente"
            v-model="contratoForm.nome_cliente"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Vigência</label>
          <div class="flex gap-4 items-center w-full">
            <input
              class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
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
          <label class="font-semibold">Valor contratado</label>
          <money3
            required
            type="text"
            placeholder="Informe o valor contratado"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.saldo_contrato"
            v-bind="moneyConfig"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Fiscal do contrato</label>
          <input
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
            required
            type="text"
            placeholder="Informe o ponto focal"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.ponto_focal"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="block font-semibold mb-2">Cidade</label>
          <input
            required
            type="text"
            placeholder="Informe a cidade do contrato"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="contratoForm.cidade"
            maxlength="120"
          />
        </div>
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="block font-semibold mb-2">Estado</label>
          <select
            required
            v-model="contratoForm.estado"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          >
            <option value="" disabled selected>Selecione o estado</option>
            <option v-for="uf in ufs" :key="uf.sigla" :value="uf.sigla">
              {{ uf.nome }}
            </option>
          </select>
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
          <label class="font-semibold">Lembrete vencimento:</label>
          <select
            v-model="contratoForm.lembrete_vencimento"
            class="font-sans focus:border-blue-400 transition-colors h-[4.40rem] ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
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
        <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Observações</label>
          <textarea
            v-model="contratoForm.observacoes"
            rows="7"
            placeholder="Observações..."
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-3 w-full border-gray-300 rounded-md"
          />
        </div>
        <section class="mt-8 flex gap-8 flex-wrap justify-end">
          <button
            class="flex items-center justify-center px-9 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="button"
            @click="showExibirModalItems"
            v-if="hasPermission('itens_contrato', 'Criar')"
          >
            <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
            Adicionar Item
          </button>
          <div class="flex items-center gap-4 mt-12">
            <button
              type="button"
              class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
              @click="abrirModalProjetos"
            >
              <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50 mr-2" />
              Adicionar Projeto
            </button>
          </div>
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
                  <button
                    type="button"
                    @click="openEditModal(index)"
                    v-if="hasPermission('itens_contrato', 'Editar')"
                  >
                    <Icon
                      icon="ph:pencil"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    />
                  </button>
                  <button
                    type="button"
                    @click="removeItem(index)"
                    v-if="hasPermission('itens_contrato', 'Deletar')"
                  >
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
        <!-- Tabela de Projetos -->
        <div v-if="currentTab === 'Projetos'">
          <table class="mt-8 table-auto border border-slate-200 rounded-2xl w-full">
            <thead class="h-24 bg-slate-100 border-1">
              <tr>
                <th class="text-2xl">Projeto</th>
                <th class="text-2xl">Situação</th>
                <th class="text-2xl">Data de Início</th>
                <th class="text-2xl">Data Prevista</th>
                <th class="text-2xl">Gestor</th>
                <th class="text-2xl">Analista Responsável</th>
                <th class="text-2xl">Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(projeto, index) in contratoForm.projetos"
                :key="index"
                class="text-center"
              >
                <td class="text-xl p-4">{{ projeto.projeto }}</td>
                <td class="text-xl p-4">{{ projeto.situacao }}</td>
                <td class="text-xl p-4">{{ projeto.data_inicio }}</td>
                <td class="text-xl p-4">{{ projeto.data_prevista }}</td>
                <td class="text-xl p-4">{{ projeto.nome_gestor }}</td>
                <td class="text-xl p-4">{{ projeto.analista_responsavel }}</td>
                <td>
                  <button
                    type="button"
                    @click="editarProjeto(index)"
                    v-if="hasPermission('projetos', 'Editar')"
                  >
                    <Icon
                      icon="ph:pencil"
                      height="20"
                      class="hover:text-red-500 hover:rounded-md cursor-pointer"
                    />
                  </button>
                  <button
                    type="button"
                    @click="removerProjeto(index)"
                    v-if="hasPermission('projetos', 'Deletar')"
                  >
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
            <AnexoUpload ref="anexoUploadRef" :resourceId="contratoId" variant="contrato" :localAnexos="localAnexos" />
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
            {{ route.params.id ? "Editar" : "Salvar" }}
          </button>
        </div>
      </form>
    </section>
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

    <!-- Modal de Projetos -->
    <JetDialogModal
    :show="exibirModalProjetos"
    :withouHeader="false"
    @close="fecharModalProjetos"
    :modalTitle="isEdicaoProjeto ? 'Editar Projeto' : 'Adicionar Projeto'"
    maxWidth="6xl"
    >
    <template #content>
      <form @submit.prevent="salvarProjeto">
        <section class="flex flex-col gap-6">
          <!-- Nome do Projeto -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Projeto:</label>
            <input
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              type="text"
              v-model="projetoAtual.projeto"
              required
              placeholder="Nome do projeto"
            />
          </div>

          <!-- Situação -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Situação:</label>
            <select
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              v-model="projetoAtual.situacao"
              required
            >
              <option disabled hidden value="">Selecione a situação</option>
              <option>Aguardando Autorização</option>
              <option>Em Desenvolvimento</option>
              <option>Em Sustentação</option>
              <option>Parado</option>
              <option>Finalizado</option>
            </select>
          </div>

          <!-- Data de Início -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Data de Início:</label>
            <input
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              type="date"
              v-model="projetoAtual.data_inicio"
              required
            />
          </div>

          <!-- Data Prevista -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Data Prevista:</label>
            <input
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              type="date"
              v-model="projetoAtual.data_prevista"
              required
            />
          </div>

          <!-- Nome do Dono da Regra -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Dono da Regra:</label>
            <input
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              type="text"
              v-model="projetoAtual.nome_dono_regra"
              required
              placeholder="Nome do dono da regra"
            />
          </div>

          <!-- Nome do Gestor -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Gestor:</label>
            <input
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              type="text"
              v-model="projetoAtual.nome_gestor"
              required
              placeholder="Nome do gestor"
            />
          </div>

          <!-- Analista Responsável -->
          <div class="flex gap-4 items-center">
            <label class="font-bold text-2xl w-48">Analista Responsável:</label>
            <input
              class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
              type="text"
              v-model="projetoAtual.analista_responsavel"
              required
              placeholder="Nome do analista"
            />
          </div>
        </section>

        <div class="mt-9 flex justify-end gap-4">
          <button
            type="button"
            @click="fecharModalProjetos"
            class="ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700 tracking-widest shadow-sm hover:text-gray-500 hover:bg-gray-100 transition h-14 w-40"
          >
            Fechar
          </button>
          <button
            type="submit"
            class="inline-flex ml-3 items-center justify-center px-4 py-2 border border-transparent rounded-md font-bold text-xl text-white tracking-widest transition h-14 bg-blue-500 hover:bg-blue-600 w-40"
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
import { reactive, ref, watch, onMounted, computed, nextTick } from "vue";
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
import { usePermissions } from '@/composables/usePermission';

const { hasPermission } = usePermissions();
const anexoUploadRef = ref(null);
const store = useProfileStore()
const tabs = ['Itens', 'Projetos', 'Anexos']
const currentTab = ref(tabs[0])
const contratoId = ref(null)
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
  estado: "",
  objeto_contrato: "",
  items: [],
  observacoes: "",
  nome_contrato: "",
  lembrete_vencimento: "",
  foto: null,
  projetos: []
});
const previewFoto = ref(null);
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

onMounted(() => {
  const contratoId = route.params.id;
  if (contratoId) {
    fetchContrato(contratoId);
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    contratoForm.foto = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      previewFoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeFoto = () => {
  previewFoto.value = null;
};

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
  /* if (contratoForm.fiscal.telefone.length < 15) {
    toast("Telefone incompleto! Por favor, preencha o telefone corretamente.", {
      theme: "colored",
      type: "error",
    });
    return;
  } */

  try {
    const formData = new FormData();
    formData.append("nome_contrato", contratoForm.nome_contrato);
    formData.append("nome_cliente", contratoForm.nome_cliente);
    formData.append("data_inicio", contratoForm.data_inicio);
    formData.append("data_fim", contratoForm.data_fim);
    formData.append("saldo_contrato", contratoForm.saldo_contrato);
    formData.append("ponto_focal", contratoForm.ponto_focal);
    formData.append("cidade", contratoForm.cidade);
    formData.append("estado", contratoForm.estado);
    formData.append("objeto_contrato", contratoForm.objeto_contrato);
    formData.append("observacoes", contratoForm.observacoes);
    formData.append("lembrete_vencimento", contratoForm.lembrete_vencimento);

    // Campos do fiscal (não obrigatórios)
    if (contratoForm.fiscal.nome) formData.append("fiscal[nome]", contratoForm.fiscal.nome);
    if (contratoForm.fiscal.telefone) formData.append("fiscal[telefone]", contratoForm.fiscal.telefone);
    if (contratoForm.fiscal.email) formData.append("fiscal[email]", contratoForm.fiscal.email);

    if (contratoForm.foto) {
      formData.append("foto", contratoForm.foto);
    } else {
    formData.append("foto", null);
    }

    if (contratoForm.items.length) {
      formData.append("items", JSON.stringify(contratoForm.items));
    }

    if (contratoForm.projetos.length) {
      formData.append("projetos", JSON.stringify(contratoForm.projetos));
    }
    console.log('form', formData)
    console.log('contratoform', contratoForm.projetos)

    const response = await api.post("/contratos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Verificar se os projetos foram criados
    if (response.data.projetos.length === 0 && contratoForm.projetos.length > 0) {
      console.error("Projetos não foram criados:", contratoForm.projetos);
    }


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

const deleteContrato = async (contratoId) => {
  try {
    await api.delete(`/contratos/${contratoId}`);
  } catch (error) {
    console.error("Erro ao deletar contrato:", error);
  }
};

const saveContrato = async () => {
  contratoId.value = await createContrato();

  if (contratoId) {
    // Aguarde um próximo ciclo de atualização do Vue
    await nextTick();

    if (anexoUploadRef.value && localAnexos.value.length > 0) {
      await anexoUploadRef.value.uploadAnexosPendentes();
    }

    voltarListagem();
  }
};

const voltarListagem = () => {
 window.location.href = '/contratos'
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

  // if (isEditingUnidade.value) {
  //   await EditarUnidade();
  // } else {
  await CriarUnidade();
  // }
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

// const EditarUnidade = async () => {
//   try {
//     await api.put(`/unidade_medida/${currentUnidadeId.value}`, {
//       unidade_medida: newUnidade.value,
//     });
//     await fetchUnidadesMedida();
//     toast.success("Unidade editada com sucesso!");
//   } catch (error) {
//     console.error("Erro ao editar unidade:", error);
//     toast.error("Não foi possível editar a unidade.");
//   }
// };

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

// Projetos
// Modal de Projetos
const exibirModalProjetos = ref(false);
const isEdicaoProjeto = ref(false);
const projetoIndexEdicao = ref(-1);

// Objeto temporário para criar/editar um item do array "projetos"
const projetoAtual = reactive({
  projeto: "",
  situacao: "",
  data_inicio: "",
  data_prevista: "",
  nome_dono_regra: "",
  nome_gestor: "",
  analista_responsavel: "",
});


// Abre modal de projetos
function abrirModalProjetos() {
  projetoAtual.projeto = "";
  projetoAtual.situacao = "";
  projetoAtual.data_inicio = "";
  projetoAtual.data_prevista = "";
  projetoAtual.nome_dono_regra = "";
  projetoAtual.nome_gestor = "";
  projetoAtual.analista_responsavel = "";
  isEdicaoProjeto.value = false;
  projetoIndexEdicao.value = -1;
  exibirModalProjetos.value = true;
}


// Fecha modal
function fecharModalProjetos() {
  exibirModalProjetos.value = false;
}

function salvarProjeto() {
  if (isEdicaoProjeto.value && projetoIndexEdicao.value >= 0) {
    contratoForm.projetos[projetoIndexEdicao.value] = { ...projetoAtual };
  } else {
    contratoForm.projetos.push({ ...projetoAtual });
  }
  fecharModalProjetos();
}

function editarProjeto(index) {
  const projeto = contratoForm.projetos[index];
  projetoAtual.projeto = projeto.projeto;
  projetoAtual.situacao = projeto.situacao;
  projetoAtual.data_inicio = projeto.data_inicio;
  projetoAtual.data_prevista = projeto.data_prevista;
  projetoAtual.nome_dono_regra = projeto.nome_dono_regra;
  projetoAtual.nome_gestor = projeto.nome_gestor;
  projetoAtual.analista_responsavel = projeto.analista_responsavel;
  projetoAtual.contrato_id = projeto.contrato_id;
  projetoIndexEdicao.value = index;
  isEdicaoProjeto.value = true;
  exibirModalProjetos.value = true;
}

function removerProjeto(index) {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja remover este projeto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Excluir",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      contratoForm.projetos.splice(index, 1);
    }
  });
}

</script>

<style scoped>
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
