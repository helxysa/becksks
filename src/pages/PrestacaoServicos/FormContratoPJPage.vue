<template>
  <div>
    <!-- Cabeçalho com título e botão de voltar -->
    <div class="flex items-center mt-12 gap-4">
      <span @click="voltarListagem" class="cursor-pointer">
        <Icon
          icon="ic:round-arrow-back"
          height="30"
          class="duration-600 transition-all ease-in-out transform hover:-translate-y-[2px]"
        />
      </span>
      <h1 class="text-5xl font-bold">
        Formulário de Contrato de Prestação de Serviço
      </h1>
    </div>

    <!-- Formulário principal -->
    <form class="mt-12" @submit.prevent="salvarContrato">
      <!-- Razão Social -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Razão Social</label>
        <input
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          type="text"
          placeholder="Informe a Razão Social"
          v-model="contratoForm.razao_social"
          maxlength="120"
        />
      </div>

      <!-- Nome Fantasia -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Nome Fantasia</label>
        <input
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          type="text"
          placeholder="Informe o Nome Fantasia"
          v-model="contratoForm.nome_fantasia"
          maxlength="120"
        />
      </div>

      <!-- CNPJ -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">CNPJ</label>
        <input
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          type="text"
          placeholder="Informe o CNPJ"
          v-model="contratoForm.cnpj"
          maxlength="20"
          @keyup="handleCnpjMask"
        />
        <small class="text-gray-500">Ex.: 12.345.678/0001-99</small>
      </div>

      <!-- Endereço Completo -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Endereço Completo</label>
        <input
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          type="text"
          placeholder="Informe o endereço"
          v-model="contratoForm.endereco"
          maxlength="200"
        />
      </div>

      <!-- Cidade e Estado -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Cidade</label>
        <input
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          type="text"
          placeholder="Informe a cidade"
          v-model="contratoForm.cidade"
          maxlength="60"
        />
      </div>

      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Estado</label>
        <select
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          v-model="contratoForm.estado"
        >
          <option value="" disabled hidden>Selecione o Estado</option>
          <option v-for="uf in ufs" :key="uf.sigla" :value="uf.sigla">
            {{ uf.nome }}
          </option>
        </select>
      </div>

      <!-- Telefone da Empresa -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Telefone da Empresa</label>
        <input
          required
          type="tel"
          placeholder="Informe o telefone da empresa"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.telefone_empresa"
          maxlength="15"
          @keyup="handlePhoneEmpresa"
        />
      </div>

      <!-- E-mail da Empresa -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">E-mail da Empresa</label>
        <input
          required
          type="email"
          placeholder="Informe o e-mail da empresa"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.email_empresa"
          maxlength="120"
        />
      </div>

      <!-- Representante Legal -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Representante Legal</label>
        <input
          required
          type="text"
          placeholder="Informe o nome do representante"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.representante_legal"
          maxlength="120"
        />
      </div>

      <!-- Telefone do Representante -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Telefone do Representante</label>
        <input
          required
          type="tel"
          placeholder="Informe o telefone do representante"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.telefone_representante"
          maxlength="15"
          @keyup="handlePhoneRepresentante"
        />
      </div>

      <!-- E-mail do Representante -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">E-mail do Representante</label>
        <input
          required
          type="email"
          placeholder="Informe o e-mail do representante"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.email_representante"
          maxlength="120"
        />
      </div>

      <!-- Tipo de Contrato -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Tipo de Contrato</label>
        <select
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          required
          v-model="contratoForm.tipo_contrato"
        >
          <option value="" disabled hidden>Selecione o tipo de contrato</option>
          <option value="tempo_determinado">Por tempo determinado</option>
          <option value="tempo_indeterminado">Por tempo indeterminado</option>
          <option value="projeto_especifico">Projeto específico</option>
        </select>
      </div>

      <!-- Vigência do Contrato (datas) -->
      <div
        class="flex flex-col items-start gap-3 mt-8"
        v-if="contratoForm.tipo_contrato !== ''"
      >
        <label class="font-semibold">Vigência do Contrato</label>
        <div class="flex gap-4 items-center w-full">
          <!-- Data de Início -->
          <input
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            type="date"
            placeholder="Data de início"
            v-model="contratoForm.data_inicio"
            :required="contratoForm.tipo_contrato === 'tempo_determinado'"
          />
          <span
            class="font-sans"
            v-if="contratoForm.tipo_contrato === 'tempo_determinado'"
            >até</span
          >
          <input
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-if="contratoForm.tipo_contrato === 'tempo_determinado'"
            type="date"
            placeholder="Data de término"
            v-model="contratoForm.data_fim"
            :required="contratoForm.tipo_contrato === 'tempo_determinado'"
          />
        </div>
      </div>

      <!-- Valor Mensal -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Valor Mensal</label>
        <money3
          required
          type="text"
          placeholder="Informe o valor mensal"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.valor_mensal"
          v-bind="moneyConfig"
        />
      </div>

      <!-- Valor por Hora -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Valor por Hora</label>
        <money3
          required
          type="text"
          placeholder="Informe o valor por hora"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.valor_hora"
          v-bind="moneyConfig"
        />
      </div>

      <!-- Forma de Pagamento -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Forma de Pagamento</label>
        <select
          required
          v-model="contratoForm.forma_pagamento"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
        >
          <option disabled hidden value="">
            Selecione a forma de pagamento
          </option>
          <option value="pix">PIX</option>
          <option value="transferencia">Transferência Bancária</option>
        </select>
      </div>

      <!-- Se for PIX, exibir campo de chave PIX -->
      <div
        v-if="contratoForm.forma_pagamento === 'pix'"
        class="flex flex-col items-start gap-3 mt-8"
      >
        <label class="font-semibold">Chave PIX</label>
        <input
          required
          type="text"
          placeholder="Informe a chave PIX"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.chave_pix"
          maxlength="120"
        />
      </div>

      <!-- Se for Transferência, exibir dados bancários separados -->
      <div
        v-if="contratoForm.forma_pagamento === 'transferencia'"
        class="flex flex-col gap-3 mt-8"
      >
        <label class="font-semibold">Banco</label>
        <input
          required
          type="text"
          placeholder="Ex.: Banco do Brasil"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.banco"
        />

        <label class="font-semibold">Agência</label>
        <input
          required
          type="text"
          placeholder="Ex.: 1234-5"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.agencia"
        />

        <label class="font-semibold">Número da Conta</label>
        <input
          required
          type="text"
          placeholder="Ex.: 12345-6"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.numeroConta"
        />

        <label class="font-semibold">Tipo de Conta</label>
        <select
          required
          v-model="contratoForm.tipoConta"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
        >
          <option disabled hidden value="">Selecione o tipo de conta</option>
          <option value="corrente">Conta Corrente</option>
          <option value="poupanca">Conta Poupança</option>
          <option value="salario">Conta Salário</option>
        </select>

        <label class="font-semibold">Nome do Titular</label>
        <input
          required
          type="text"
          placeholder="Ex.: Fulano da Silva"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="contratoForm.nomeTitular"
        />
      </div>

      <!-- Serviço Prestado -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Serviço Prestado</label>
        <select
          required
          v-model="contratoForm.servico_prestado"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
        >
          <option disabled hidden value="">Selecione o serviço</option>
          <option value="analista_uiux">Analista de UI/UX designer</option>
          <option value="analista_qualidade">Analista de Qualidade</option>
          <option value="desenvolvedor">Desenvolvedor</option>
          <option value="analista">Analista</option>
          <option value="gestor_projeto">Gestor de projeto</option>
          <option value="devops">DevOps</option>
          <option value="devsecops">DevSecOps</option>
        </select>
      </div>

      <!-- Escopo de Trabalho -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Escopo de Trabalho</label>
        <textarea
          rows="5"
          placeholder="Descreva o escopo de trabalho acordado"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-3 w-full border-gray-300 rounded-md"
          v-model="contratoForm.escopo_trabalho"
        />
      </div>

      <!-- Projetos -->
      <div class="flex items-center gap-4 mt-12">
        <h2 class="text-2xl font-semibold">Projetos Envolvidos</h2>
        <button
          type="button"
          class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          @click="abrirModalProjetos"
        >
          <Icon icon="ic:baseline-plus" height="20" class="text-zinc-50 mr-2" />
          Adicionar Projeto
        </button>
      </div>

      <!-- Listagem de Projetos adicionados -->
      <div class="mt-6">
        <table
          v-if="contratoForm.projetos.length"
          class="table-auto border border-slate-200 rounded-2xl w-full"
        >
          <thead class="h-24 bg-slate-100 border-1">
            <tr>
              <th class="text-2xl">Projeto/Produto</th>
              <th class="text-2xl">Serviço Prestado</th>
              <th class="text-2xl">Esforço Estimado</th>
              <th class="text-2xl">Gestor do Projeto</th>
              <th class="text-2xl">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(proj, idx) in contratoForm.projetos"
              :key="idx"
              class="text-center"
            >
              <!-- Aqui exibimos o nome do projeto do SELECT -->
              <td class="p-4 text-xl">{{ proj.nomeProjeto }}</td>
              <td class="p-4 text-xl">{{ proj.servicoPrestado }}</td>
              <td class="p-4 text-xl">{{ proj.esforcoEstimado }}</td>
              <td class="p-4 text-xl">{{ proj.gestorProjeto }}</td>
              <td>
                <button
                  type="button"
                  @click="editarProjeto(idx)"
                  class="mr-2 hover:text-blue-600"
                >
                  <Icon icon="ph:pencil" height="20" />
                </button>
                <button
                  type="button"
                  @click="removerProjeto(idx)"
                  class="hover:text-red-600"
                >
                  <Icon icon="ph:trash" height="20" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Observação -->
      <div class="flex flex-col items-start gap-3 mt-8">
        <label class="font-semibold">Observações</label>
        <textarea
          v-model="contratoForm.observacoes"
          rows="4"
          placeholder="Observações..."
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 px-4 py-3 w-full border-gray-300 rounded-md"
        />
      </div>

      <!-- Botões de ação -->
      <div class="mt-8 flex gap-8 justify-end">
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-3 rounded-md w-56 text-2xl font-medium text-white bg-gray-500 hover:bg-gray-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
          @click="voltarListagem"
        >
          Voltar
        </button>
        <button
          type="submit"
          class="flex items-center justify-center px-8 py-3 rounded-md w-56 text-2xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-transform ease-in-out transform hover:-translate-y-[2px]"
        >
          Salvar
        </button>
      </div>
    </form>

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
            <!-- SELECIONAR PROJETO PELO ID (BUSCADO NO onMounted) -->
            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Projeto:</label>
              <select
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                v-model="projetoAtual.projetoId"
                required
              >
                <option :value="null" disabled hidden>
                  Selecione um projeto
                </option>
                <option
                  v-for="proj in listaProjetos"
                  :key="proj.id"
                  :value="proj.id"
                >
                  {{ proj.projeto }}
                </option>
              </select>
            </div>

            <!-- Serviço Prestado -->
            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Serviço Prestado:</label>
              <select
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                v-model="projetoAtual.servicoPrestado"
                required
              >
                <option disabled hidden value="">Selecione</option>
                <option>Desenvolvedor</option>
                <option>Analista</option>
                <option>Gestor de projeto</option>
                <option>DevOps</option>
                <option>DevSecOps</option>
              </select>
            </div>

            <!-- Esforço Estimado -->
            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Esforço Estimado:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="text"
                v-model="projetoAtual.esforcoEstimado"
                placeholder="Ex: 80 horas/mês"
                required
              />
            </div>

            <!-- Gestor do Projeto -->
            <div class="flex gap-4 items-center">
              <label class="font-bold text-2xl w-48">Gestor do Projeto:</label>
              <input
                class="flex-1 border-[1px] border-gray-300 rounded-md px-4 py-2 focus:border-blue-400 focus:ring-0 focus:outline-none focus:border-2"
                type="text"
                v-model="projetoAtual.gestorProjeto"
                placeholder="Informe o gestor do projeto"
                required
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
/* Imports e dependências */
import { ref, reactive, onMounted, computed, watch } from "vue";
import { Icon } from "@iconify/vue";
import { Money3Component as money3 } from "v-money3";
import JetDialogModal from "@/components/modals/DialogModal.vue";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import { ufs } from "@/services/ufs.js";
import { api } from "@/services/api";

// Configurações para money3
const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

// Estado reativo do formulário
const contratoForm = reactive({
  razao_social: "",
  nome_fantasia: "",
  cnpj: "",
  endereco: "",
  cidade: "",
  estado: "",
  telefone_empresa: "",
  email_empresa: "",
  representante_legal: "",
  telefone_representante: "",
  email_representante: "",
  tipo_contrato: "",
  data_inicio: "",
  data_fim: "",
  valor_mensal: "",
  valor_hora: "",
  forma_pagamento: "",
  // Se for PIX:
  chave_pix: "",
  // Se for transferência:
  banco: "",
  agencia: "",
  numeroConta: "",
  tipoConta: "",
  nomeTitular: "",
  //
  servico_prestado: "",
  escopo_trabalho: "",
  observacoes: "",
  // Projetos relacionados
  projetos: [],
});

// Lista de projetos (buscada do back-end no onMounted)
const listaProjetos = ref([]);

// Ao montar o componente, buscamos os projetos
onMounted(() => {
  buscarProjetos();
});

// Função que faz o GET em /projetos
async function buscarProjetos() {
  try {
    const response = await api.get("/projetos");
    console.log(response.data);
    // A API retorna { status, data, message } etc.
    listaProjetos.value = response.data.data; // conforme seu response
  } catch (error) {
    console.error("Erro ao buscar projetos", error);
    toast.error("Não foi possível carregar a lista de projetos.");
  }
}

/** Máscara de telefone da empresa */
function handlePhoneEmpresa(e) {
  contratoForm.telefone_empresa = phoneMask(e.target.value);
}

/** Máscara de telefone do representante */
function handlePhoneRepresentante(e) {
  contratoForm.telefone_representante = phoneMask(e.target.value);
}

/** Função simples de máscara de telefone */
function phoneMask(value) {
  if (!value) return "";
  let val = value.replace(/\D/g, "");
  val = val.replace(/(\d{2})(\d)/, "($1) $2");
  val = val.replace(/(\d)(\d{4})$/, "$1-$2");
  return val;
}

function handleCnpjMask(e) {
  let v = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");

  // Se quiser manter a formatação parcial, adaptando:
  // até 14 caracteres numéricos, e se passar disso, permitir letras
  // Ex.: 12.345.678/0001-99AB
  // Vamos só inserir pontuação até chegar nos 14 dígitos iniciais
  // e depois se vier letras, deixamos no final.

  // Extrair somente a parte numérica inicial
  const numeros = v.replace(/[^0-9]/g, "");
  const letras = v.replace(/[^A-Z]/g, "");

  // até 14 dígitos
  let nums14 = numeros.substring(0, 14);

  // Formata os 14 dígitos no estilo CNPJ
  nums14 = nums14.replace(/^(\d{2})(\d)/, "$1.$2");
  nums14 = nums14.replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2");
  nums14 = nums14.replace(/\.(\d{3})(\d)/, ".$1/$2");
  nums14 = nums14.replace(/(\d{4})(\d)/, "$1-$2");

  // Se houver letras no final, acrescentar (limitado a 2 letras)
  let finalLetras = letras.substring(0, 2);

  e.target.value = nums14 + finalLetras;
  contratoForm.cnpj = e.target.value;
}

/**
 * Quando formos enviar o payload, remove
 * toda a pontuação do CNPJ e mantem apenas dígitos + letras (até 16).
 */
function limparCnpj(cnpj) {
  return cnpj.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

async function salvarContrato() {
  try {
    const finalPayload = {
      razaoSocial: contratoForm.razao_social,
      nomeFantasia: contratoForm.nome_fantasia,
      cnpj: limparCnpj(contratoForm.cnpj),
      enderecoCompleto: contratoForm.endereco,
      cidade: contratoForm.cidade,
      estado: contratoForm.estado,
      telefoneEmpresa: contratoForm.telefone_empresa,
      emailEmpresa: contratoForm.email_empresa,
      representanteLegal: contratoForm.representante_legal,
      telefoneRepresentante: contratoForm.telefone_representante,
      emailRepresentante: contratoForm.email_representante,

      tipoContrato: contratoForm.tipo_contrato,
      dataInicio: contratoForm.data_inicio || null,
      dataFim: contratoForm.data_fim || null,
      valorMensal:Number(contratoForm.valor_mensal.toString().replace(/[^\d,]/g, "").replace(",", ".")) || null,
      valorHora:Number(contratoForm.valor_hora.toString().replace(/[^\d,]/g, "").replace(",", ".")) || null,

      formaPagamento: contratoForm.forma_pagamento,

      // Se for PIX, enviamos a chave
      chavePix:
        contratoForm.forma_pagamento === "pix" ? contratoForm.chave_pix : null,

      // Se for transferência, enviamos os dados
      banco:contratoForm.forma_pagamento === "transferencia" ? contratoForm.banco : null,
      agencia:contratoForm.forma_pagamento === "transferencia" ? contratoForm.agencia : null,
      numeroConta:contratoForm.forma_pagamento === "transferencia" ? contratoForm.numeroConta : null,
      tipoConta:contratoForm.forma_pagamento === "transferencia" ? contratoForm.tipoConta : null,
      nomeTitular:contratoForm.forma_pagamento === "transferencia" ? contratoForm.nomeTitular : null,

      servicoPrestado: contratoForm.servico_prestado,
      escopoTrabalho: contratoForm.escopo_trabalho,
      observacao: contratoForm.observacoes,

      // Projetos
      projetos: contratoForm.projetos.map((p) => {
        return {
          projetoId: p.projetoId,
          servicoPrestado: p.servicoPrestado,
          esforcoEstimado: p.esforcoEstimado,
          gestorProjeto: p.gestorProjeto,
        };
      }),
    };

    // Requisição POST
    const response = await api.post("/contrato/pj", finalPayload);

    console.log("Payload final a enviar:", finalPayload);
    toast.success("Contrato de Prestação de Serviço cadastrado com sucesso!");
    voltarListagem();
  } catch (error) {
    toast.error("Não foi possível salvar o contrato!");
    console.error(error);
  }
}

/** Redireciona para listagem */
function voltarListagem() {
  window.location.href = "/contratos/pj";
}

/** Modal de Projetos */
const exibirModalProjetos = ref(false);
const isEdicaoProjeto = ref(false);

// Objeto temporário para criar/editar um item do array "projetos"
const projetoAtual = reactive({
  projetoId: null, // ID que vem da listaProjetos
  nomeProjeto: "", // apenas para exibir na tabela
  servicoPrestado: "",
  esforcoEstimado: "",
  gestorProjeto: "",
});

let projetoIndexEdicao = -1;

// Abre modal de projetos em modo novo
function abrirModalProjetos() {
  projetoAtual.projetoId = null;
  projetoAtual.nomeProjeto = "";
  projetoAtual.servicoPrestado = "";
  projetoAtual.esforcoEstimado = "";
  projetoAtual.gestorProjeto = "";
  isEdicaoProjeto.value = false;
  projetoIndexEdicao = -1;
  exibirModalProjetos.value = true;
}

// Fecha modal
function fecharModalProjetos() {
  exibirModalProjetos.value = false;
}

function salvarProjeto() {
  const projSelecionado = listaProjetos.value.find(
    (p) => p.id === projetoAtual.projetoId
  );
  if (projSelecionado) {
    projetoAtual.nomeProjeto = projSelecionado.projeto;
  }

  if (isEdicaoProjeto.value && projetoIndexEdicao >= 0) {
    contratoForm.projetos[projetoIndexEdicao] = { ...projetoAtual };
  } else {
    contratoForm.projetos.push({ ...projetoAtual });
  }
  fecharModalProjetos();
}

/** Editar um projeto existente do array */
function editarProjeto(index) {
  const proj = contratoForm.projetos[index];
  projetoAtual.projetoId = proj.projetoId;
  projetoAtual.nomeProjeto = proj.nomeProjeto;
  projetoAtual.servicoPrestado = proj.servicoPrestado;
  projetoAtual.esforcoEstimado = proj.esforcoEstimado;
  projetoAtual.gestorProjeto = proj.gestorProjeto;
  projetoIndexEdicao = index;
  isEdicaoProjeto.value = true;
  exibirModalProjetos.value = true;
}

/** Remove projeto do array (confirmando com SweetAlert) */
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

watch(
  () => contratoForm.tipo_contrato,
  (novoTipo) => {
    // Se for tempo_indeterminado ou projeto_especifico, limpa data_fim
    if (
      novoTipo === "tempo_indeterminado" ||
      novoTipo === "projeto_especifico"
    ) {
      contratoForm.data_fim = "";
    }
  }
);
</script>
