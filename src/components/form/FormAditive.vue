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
      <h1 class="text-5xl font-bold">Cadastro  Termo Aditivo</h1>
    </div>

    <section class="">
      <form class="mt-12" @submit.prevent="saveTermoADitive">
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
              class="font-sans focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
              required
              type="date"
              placeholder="Digite o inicio do contrato"
              v-model="contratoForm.data_inicio"
            />
            <span class="font-sans"> até</span>
            <input
              class="font-sans focus:border-blue-400 font-sans transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
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
          <select
            disabled
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
        <!-- <div class="flex flex-col items-start gap-3 mt-8">
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
        </div> -->
        <!-- <div class="flex flex-col items-start gap-3 mt-8">
          <label class="font-semibold">Observações</label>
          {{ contratoForm }}
          <textarea
            v-model="contratoForm.observacoes"
            rows="7"
            placeholder="Observações..."
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-3 w-full border-gray-300 rounded-md"
          />
        </div> -->
        <section class="mt-8 flex gap-8 flex-wrap justify-end">
          <button
            class="flex items-center justify-center px-9 py-3 rounded-md text-xl font-normal text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="button"
            @click="showExibirModalItems"
            v-if="store.profile.permissions.some((item)=> item.name === 'itens_contrato' && item.canCreate === true)"
          >
            <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50" />
            Adicionar Item
          </button>
          <!-- <button
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
          </button> -->
          <!-- <button
            class="flex items-center justify-center px-5 py-3 rounded-md text-xl font-normal text-white bg-green-600 hover:bg-green-700 transition-transform ease-in-out transform hover:-translate-y-[2px]"
            type="button"
            @click="openModalProjeto()"
          >
            <span class="mr-2">
              <Icon
                icon="ant-design:project-outlined"
                height="20"
                class="text-zinc-50"
              />
            </span>
            Adicionar Projeto
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
            <AnexoUpload :resourceId="contratoId" variant="contrato" :localAnexos="localAnexos" />
        </div>
        <div v-if="currentTab === 'Projetos'">
          <table class="mt-8 table-auto border border-slate-200 rounded-2xl w-full">
            <thead class="h-24 bg-slate-100 border-1">
              <tr>
                <th class="text-2xl">Id</th>
                <th class="text-2xl">Projeto</th>     
                <th></th>   
                <th></th> 
                <th></th>       
              
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(projeto, index) in contratoForm.projetos"
                :key="index"
                class="text-center"
              >
                <td class="text-2xl p-4">{{ projeto.id }}</td>
                <td class="text-2xl p-4">{{ projeto.projeto }}</td> 
                <td class="text-2xl p-4"></td>  
                <td class="text-2xl p-4"></td> 
                <td class="text-2xl p-4"></td> 

                <!-- <td>
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
                </td> -->
              </tr>
            </tbody>
          </table>
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
    <!-- Modal de projeto -->
    <JetDialogModal
      :show="isModalProjetoOpen"
      :withouHeader="false"
      @close="closeModalProjeto"
      :modalTitle="modalTitleProjeto"
      maxWidth="6xl"
    >
      <template #content>
        <form
          @submit.prevent="handleSubmitProjeto"
          class="flex gap-8 px-6 h-[4.40rem]"
        >
          <input
            type="text"
            id="nome"
            v-model="newProjeto"
            required
            class="text-2xl font-sans pl-6 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            placeholder="Digite o nome do projeto"
          />
          <button
            type="button"
            @click="handleSubmitProjeto"
             v-if="store.profile.permissions.some((item)=> item.name === 'projetos' && item.canCreate === true
            || item.name === 'projetos' && item.canEdit === true )"
            class="px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          >
            {{ isEditingProjeto ? "Atualizar" : "Adicionar" }}
          </button>
        </form>
        <div class="mt-6 px-6 flex flex-col gap-4 max-h-[32vh] overflow-y-auto">
          {{ projetos }}
          <div
            v-for="item in projetos"
            :key="item.id"
            class="flex items-center gap-2 border-[1px] rounded-md"
          >
            <div
              v-if="!item.isEditing"
              class="flex justify-between items-center w-full hover:bg-gray-100 p-4 transition-colors ease-in-out duration-500"
            >
              <span
                class="ml-6 font-sans text-nowrap truncate max-w-[500px]"
                :title="item.projeto"
                >{{ item.projeto }}</span
              >
              <div class="flex items-center mx-4">
                <button
                  @click="editProjeto(item)"
                  class="hover:bg-gray-200 hover:rounded-full rounded-full p-4"
                  v-if="store.profile.permissions.some((item)=> item.name === 'projetos' && item.canEdit === true)"
                >
                  <Icon
                    icon="heroicons-solid:pencil"
                    height="18"
                    class="text-blue-600 rounded-full"
                  />
                </button>
                <button
                  @click="deletarProjeto(item.id)"
                  class="hover:bg-gray-200 hover:rounded-full rounded-full p-4"
                  v-if="store.profile.permissions.some((item)=> item.name === 'projetos' && item.canDelete === true)"
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
                v-model="item.projeto"
                class="text-2xl font-sans pl-6 focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
                placeholder="Digite o nome do projeto"
              />
              <div class="ml-auto text-nowrap flex gap-4">
                <button
                  @click="saveProjeto(item)"
                  class="bg-blue-500 p-2 text-xl font-sans font-medium text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
                >
                  Salvar
                </button>
                <button
                  @click="cancelEdit(item)"
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
            @click="closeModalProjeto"
            class="px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          >
            Salvar Projetos
          </button>
        </footer>
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

 const store = useProfileStore()
 console.log(store.profile, 'storecontrato')


const tabs = ['Itens', 'Anexos', 'Projetos']
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
const termoAditivoItens = ref([])

let contratoForm = ref({
  nomeCliente: "",
  data_inicio: "",
  data_fim: "",
  saldo_contrato: "",
  fiscal: {
    nome: "",
    telefone: "",
    email: "",
  },
  pontoFocal: "",
  cidade: "",
  estado: "",
  objeto_contrato: "", 
  // observacoes: "",
  nome_termo: "",
  // lembrete_vencimento: "",
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

onMounted(() => {
  const contratoId = route.params.id;
  if (contratoId) {
    fetchContrato(contratoId);
  }
});

const fetchContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`);
    console.log(response.data, 'termo adit')   
    contratoForm.value = response.data;   

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
  if (contratoForm.value.fiscal.telefone.length < 15) {
    toast("Telefone incompleto! Por favor, preencha o telefone corretamente.", {
      theme: "colored",
      type: "error",
    });
    return;
  }

  try {
    termoAditivoItens.value = termoAditivoItens.value.map((item)=> {
        return {
          ...item,
          valor_unitario: parseFloat(item.valor_unitario)
        }
    })

    console.log(termoAditivoItens.value, 'termo')
    
    let payload = {
      contrato_id: Number(contratoId),
      nome_termo: contratoForm.value.nome_termo,
      data_inicio: contratoForm.value.data_inicio,
      data_fim: contratoForm.value.data_fim,
      objeto_contrato: contratoForm.value.objeto_contrato,
      termo_aditivo_itens: termoAditivoItens.value,
    }
    const response = await api.post("/termo-aditivo", payload);
    console.log(response, 'resposta')
    toast("Termo aditivo cadastrado com  sucesso!", {
      theme: "colored",
      type: "success",
    });
    voltarListagem()
  } catch (error) {
    toast("Não foi possível cadastrar o contrato!", {
      theme: "colored",
      type: "error",
    });
    // console.error("Erro ao cadastrar contrato:", error);
  
  }
};

// const createProjetos = async (contratoId) => {
//   try {
//     const projetosArray = projetos.value.map((p) => p.projeto);

//     if (projetosArray.length > 0) {
//       await api.post(`/contratos/${contratoId}/projetos/multiplos`, {
//         projetos: projetosArray,
//       });
//     } else {
//       toast.info("Nenhum projeto para adicionar.");
//     }
//   } catch (error) {
//     console.log("Erro ao criar projetos:", error);
//     toast("Não foi possível criar os projetos associados.", {
//       theme: "colored",
//       type: "error",
//     });
//     return "error";
//   }
// };

// const deleteContrato = async (contratoId) => {
//   try {
//     await api.delete(`/contratos/${contratoId}`);
//     toast(
//       "Não foi possível salvar o contrato devido à falha na criação dos projetos.",
//       {
//         theme: "colored",
//         type: "info",
//       }
//     );
//   } catch (error) {
//     console.error("Erro ao deletar contrato:", error);
//     toast(
//       "Não foi possível deletar o contrato após falha na criação dos projetos.",
//       {
//         theme: "colored",
//         type: "error",
//       }
//     );
//   }
// };

const saveTermoADitive = async () => {
  contratoId.value =  route.params.id
  createTermoAditivo(contratoId.value)
  
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

// Projeto
const projetos = ref([]);
const newProjeto = ref("");
const isModalProjetoOpen = ref(false);
const isEditingProjeto = ref(false);
const currentProjetoId = ref(null);
const modalTitleProjeto = "Adicionar Projetos";
const originalProjetoValue = ref("");

// const openModalProjeto = (projeto = null) => {
//   if (projeto) {
//     newProjeto.value = projeto.projeto;
//     currentProjetoId.value = projeto.id;
//     isEditingProjeto.value = true;
//   } else {
//     newProjeto.value = "";
//     isEditingProjeto.value = false;
//   }
//   isModalProjetoOpen.value = true;
// };

// const handleSubmitProjeto = () => {
//   const projetoNome = newProjeto.value.trim();

//   if (projetoNome === "") {
//     toast.error("O nome do projeto não pode estar vazio.");
//     return;
//   }

//   if (
//     isDuplicateProjeto(
//       projetoNome,
//       isEditingProjeto.value ? currentProjetoId.value : null
//     )
//   ) {
//     toast.error("Já existe um projeto com esse nome.");
//     return;
//   }

//   if (isEditingProjeto.value) {
//     const index = projetos.value.findIndex(
//       (p) => p.id === currentProjetoId.value
//     );
//     if (index !== -1) {
//       projetos.value[index].projeto = projetoNome;
//     }
//     isEditingProjeto.value = false;
//     currentProjetoId.value = null;
//   } else {
//     projetos.value.push({
//       id: Date.now(),
//       projeto: projetoNome,
//       isEditing: false,
//     });
//   }
//   newProjeto.value = "";
// };

// const editProjeto = (item) => {
//   item.isEditing = true;
//   originalProjetoValue.value = item.projeto;
// };

// const saveProjeto = (item) => {
//   const projetoNome = item.projeto.trim();

//   if (projetoNome === "") {
//     toast.error("O nome do projeto não pode estar vazio.");
//     return;
//   }

//   if (isDuplicateProjeto(projetoNome, item.id)) {
//     toast.error("Já existe um projeto com esse nome.");
//     return;
//   }

//   item.isEditing = false;
// };

// const cancelEdit = (item) => {
//   item.projeto = originalProjetoValue.value;
//   item.isEditing = false;
// };

// const deletarProjeto = (id) => {
//   Swal.fire({
//     title: "Você tem certeza?",
//     text: `Deseja remover o projeto ?`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Sim, remover!",
//     cancelButtonText: "Cancelar",
//     position: "top",
//     backdrop: true,
//     customClass: {
//       container: "p-20",
//     },
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       projetos.value = projetos.value.filter((p) => p.id !== id);
//     }
//   });
// };

// const closeModalProjeto = () => {
//   restoreOriginalValues();
//   newProjeto.value = "";
//   isEditingProjeto.value = false;
//   currentProjetoId.value = null;
//   isModalProjetoOpen.value = false;
// };

// const restoreOriginalValues = () => {
//   projetos.value.forEach((item) => {
//     if (item.isEditing) {
//       item.projeto = originalProjetoValue.value;
//       item.isEditing = false;
//     }
//   });
// };

// const isDuplicateProjeto = (nome, excludeId = null) => {
//   return projetos.value.some(
//     (p) => p.projeto.toLowerCase() === nome.toLowerCase() && p.id !== excludeId
//   );
// };
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
