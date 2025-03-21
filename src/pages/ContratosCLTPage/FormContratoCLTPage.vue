<template>
  <div class="w-full px-6 py-8">
    <div class="flex items-center mb-8">
      <router-link
        to="/contratos/clt"
        class="flex items-center text-blue-600 hover:text-blue-800"
      >
        <Icon icon="mdi:arrow-left" height="35" />
      </router-link>
      <h1 class="text-4xl font-medium ml-8">
        {{ isEdicao ? "Editar" : "Novo" }} Contrato CLT
      </h1>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-8 w-full">
      <div class="mb-12">
        <div class="flex justify-between items-center">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
          >
            <div
              :class="[
                'w-14 h-14 rounded-full flex items-center justify-center text-2xl font-medium',
                currentStep > index
                  ? 'bg-green-500 text-white'
                  : currentStep === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600',
              ]"
            >
              {{ index + 1 }}
            </div>
            <span
              class="ml-3 text-2xl"
              :class="{
                'text-green-500 font-medium': currentStep > index,
                'text-blue-500 font-medium': currentStep === index,
                'text-gray-600': currentStep < index,
              }"
            >
              {{ step }}
            </span>
            <div
              v-if="index < steps.length - 1"
              class="w-40 h-1 mx-4"
              :class="{
                'bg-green-500': currentStep > index,
                'bg-gray-200': currentStep <= index,
              }"
            ></div>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="w-full">
        <!-- Etapa 1: Dados Pessoais -->
        <div v-if="currentStep === 0">
          <div class="grid grid-cols-2 gap-8 w-full">
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">Matrícula*</label>
              <input
                v-model="formData.matricula"
                type="text"
                placeholder="Digite o número da matricula"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('matricula') ? 'border-red-500 bg-red-50' : '',
                ]"
                @input="clearInvalidState('matricula')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Nome Completo*</label
              >
              <input
                v-model="formData.nomeCompleto"
                type="text"
                placeholder="Digite o nome completo"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('nomeCompleto')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('nomeCompleto')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">CPF*</label>
              <input
                type="text"
                :value="formatarCPF(formData.cpf)"
                @input="handleCPFInput"
                placeholder="000.000.000-00"
                maxlength="14"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('cpf') ? 'border-red-500 bg-red-50' : '',
                ]"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">RG*</label>
              <input
                v-model="formData.rg"
                placeholder="Digite o número do RG"
                type="text"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('rg') ? 'border-red-500 bg-red-50' : '',
                ]"
                @input="clearInvalidState('rg')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">PIS*</label>
              <input
                v-model="formData.pis"
                type="text"
                placeholder="Digite o número do PIS"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('pis') ? 'border-red-500 bg-red-50' : '',
                ]"
                @input="clearInvalidState('pis')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Data de Nascimento*</label
              >
              <input
                v-model="formData.dataNascimento"
                type="date"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('dataNascimento')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('dataNascimento')"
                required
              />
            </div>
            <div class="col-span-2">
              <label class="block text-2xl font-medium mb-3"
                >Endereço Completo*</label
              >
              <input
                v-model="formData.enderecoCompleto"
                type="text"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('enderecoCompleto')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('enderecoCompleto')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">Telefone*</label>
              <input
                v-model="formData.telefone"
                type="text"
                v-mask="'(##) #####-####'"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('telefone') ? 'border-red-500 bg-red-50' : '',
                ]"
                @input="clearInvalidState('telefone')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Email Pessoal*</label
              >
              <input
                v-model="formData.emailPessoal"
                type="email"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('emailPessoal')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('emailPessoal')"
                required
              />
            </div>
          </div>
        </div>

        <!-- Etapa 2: Dados Profissionais -->
        <div v-if="currentStep === 1">
          <div class="grid grid-cols-2 gap-8 w-full">
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Data de Admissão*</label
              >
              <input
                v-model="formData.dataAdmissao"
                type="date"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('dataAdmissao')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('dataAdmissao')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">Cargo*</label>
              <input
                v-model="formData.cargo"
                type="text"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('cargo') ? 'border-red-500 bg-red-50' : '',
                ]"
                @input="clearInvalidState('cargo')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Nível Profissional*</label
              >
              <div class="space-y-3">
                <select
                  v-if="!isOutroNivelProfissional"
                  v-model="formData.nivelProfissional"
                  class="input-field text-xl"
                  :class="[
                    isFieldInvalid('nivelProfissional')
                      ? 'border-red-500 bg-red-50'
                      : '',
                  ]"
                  @change="handleNivelProfissionalChange"
                  @input="clearInvalidState('nivelProfissional')"
                  required
                >
                  <option value="">Selecione um nível</option>
                  <option value="Junior">Júnior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Senior">Sênior</option>
                  <option value="Estagiário">Estagiário</option>
                  <option value="outro">Outro</option>
                </select>
                <div v-else class="space-y-2">
                  <input
                    v-model="formData.nivelProfissional"
                    type="text"
                    class="input-field text-xl"
                    placeholder="Digite o nível profissional"
                    :class="[
                      isFieldInvalid('nivelProfissional')
                        ? 'border-red-500 bg-red-50'
                        : '',
                    ]"
                    @input="clearInvalidState('nivelProfissional')"
                    required
                  />
                  <button
                    @click="voltarSelectNivelProfissional"
                    type="button"
                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Icon icon="mdi:arrow-left" height="16" />
                    Voltar para a lista
                  </button>
                </div>
              </div>
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Departamento*</label
              >
              <input
                v-model="formData.departamento"
                type="text"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('departamento')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('departamento')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Projeto Atual*</label
              >
              <select
                v-model="formData.projetoAtual"
                class="input-field text-xl"
                :class="[
                  isFieldInvalid('projetoAtual')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                required
              >
                <option value="" disabled selected>Selecione um projeto</option>
                <option
                  v-for="projeto in projetos"
                  :key="projeto.id"
                  :value="projeto.projeto"
                >
                  {{ projeto.projeto }}
                </option>
              </select>
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3 required"
                >Gestor Projeto</label
              >
              <input
                v-model="formData.gestorProjeto"
                type="text"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('gestorProjeto')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('gestorProjeto')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3 required"
                >Regime de Trabalho*</label
              >
              <div class="space-y-3">
                <select
                  v-if="!isOutroRegimeTrabalho"
                  v-model="formData.regimeTrabalho"
                  :class="[
                    'input-field text-xl',
                    isFieldInvalid('regimeTrabalho')
                      ? 'border-red-500 bg-red-50'
                      : '',
                  ]"
                  @change="handleRegimeTrabalhoChange"
                  @input="clearInvalidState('regimeTrabalho')"
                  required
                >
                  <option value="">Selecione um regime</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Hibrido">Híbrido</option>
                  <option value="Remoto">Remoto</option>
                  <option value="outro">Outro</option>
                </select>
                <div v-else class="space-y-2">
                  <input
                    v-model="formData.regimeTrabalho"
                    type="text"
                    class="input-field text-xl"
                    placeholder="Digite o regime de trabalho"
                    :class="[
                      isFieldInvalid('regimeTrabalho')
                        ? 'border-red-500 bg-red-50'
                        : '',
                    ]"
                    @input="clearInvalidState('regimeTrabalho')"
                    required
                  />
                  <button
                    @click="voltarSelectRegimeTrabalho"
                    type="button"
                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Icon icon="mdi:arrow-left" height="16" />
                    Voltar para a lista
                  </button>
                </div>
              </div>
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3 required"
                >Horário de Trabalho</label
              >
              <input
                v-model="formData.horarioTrabalho"
                type="text"
                placeholder="Ex: 13h as 18h"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('horarioTrabalho')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('horarioTrabalho')"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3 required"
                >Jornada Semanal (h)*</label
              >
              <input
                v-model="formData.jornadaSemanal"
                type="number"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('jornadaSemanal')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('jornadaSemanal')"
                required
                min="0"
                step="1"
              />
            </div>
          </div>
        </div>

        <!-- Etapa 3: Remuneração e Benefícios -->
        <div v-if="currentStep === 2">
          <div class="grid grid-cols-2 gap-8 w-full">
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Remuneração*</label
              >
              <input
                :value="remuneracaoFormatada"
                type="text"
                placeholder="R$ 0,00"
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('remuneracao')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="handleRemuneracaoInput"
                required
              />
            </div>
            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Forma de Pagamento*</label
              >
              <select
                v-model="formData.formaPagamento"
                required
                :class="[
                  'input-field text-xl',
                  isFieldInvalid('remuneracao')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('remuneracao')"
              >
                <option value="Transferência">Transferência</option>
                <option value="PIX">PIX</option>
              </select>
            </div>

            <div class="col-span-2">
              <div class="grid grid-cols-2 gap-8">
                <div
                  v-if="formData.formaPagamento === 'PIX'"
                  class="col-span-2"
                >
                  <label class="block text-2xl font-medium mb-3"
                    >Chave PIX</label
                  >
                  <input
                    v-model="formData.chavePix"
                    type="text"
                    :class="[
                      'input-field text-xl',
                      isFieldInvalid('chavePix')
                        ? 'border-red-500 bg-red-50'
                        : '',
                    ]"
                    @input="clearInvalidState('chavePix')"
                  />
                </div>

                <template v-if="formData.formaPagamento === 'Transferência'">
                  <div class="col-span-1">
                    <label class="block text-2xl font-medium mb-3">Banco</label>
                    <input
                      v-model="formData.banco"
                      type="text"
                      :class="[
                        'input-field text-xl',
                        isFieldInvalid('banco')
                          ? 'border-red-500 bg-red-50'
                          : '',
                      ]"
                      @input="clearInvalidState('banco')"
                    />
                  </div>
                  <div class="col-span-1">
                    <label class="block text-2xl font-medium mb-3"
                      >Agência</label
                    >
                    <input
                      v-model="formData.agencia"
                      type="text"
                      :class="[
                        'input-field text-xl',
                        isFieldInvalid('agencia')
                          ? 'border-red-500 bg-red-50'
                          : '',
                      ]"
                      @input="clearInvalidState('agencia')"
                    />
                  </div>
                  <div class="col-span-1">
                    <label class="block text-2xl font-medium mb-3"
                      >Número da Conta</label
                    >
                    <input
                      v-model="formData.numeroConta"
                      type="text"
                      :class="[
                        'input-field text-xl',
                        isFieldInvalid('numeroConta')
                          ? 'border-red-500 bg-red-50'
                          : '',
                      ]"
                      @input="clearInvalidState('numeroConta')"
                    />
                  </div>
                </template>
              </div>
            </div>

            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Plano de Saúde</label
              >
              <div class="grid grid-cols-2 gap-8">
                <div class="flex gap-8 items-start">
                  <div class="w-1/2">
                    <label class="block text-2xl font-medium mb-3"
                      >Plano de Saúde</label
                    >
                    <div class="flex items-center gap-4">
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-model="formData.planoSaude"
                          :value="true"
                          class="mr-2"
                        />
                        Sim
                      </label>
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-model="formData.planoSaude"
                          :value="false"
                          class="mr-2"
                        />
                        Não
                      </label>
                    </div>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-2xl font-medium mb-3"
                      >Empresa Plano de Saúde</label
                    >
                    <input
                      v-model="formData.empresaPlanoSaude"
                      type="text"
                      :disabled="!formData.planoSaude"
                      :class="[
                        'input-field text-xl w-full',
                        isFieldInvalid('empresaPlanoSaude')
                          ? 'border-red-500 bg-red-50'
                          : '',
                        !formData.planoSaude
                          ? 'bg-gray-100 cursor-not-allowed'
                          : '',
                      ]"
                      @input="clearInvalidState('empresaPlanoSaude')"
                    />
                  </div>
                </div>

                <div class="flex gap-8 items-start">
                  <div class="w-1/2">
                    <label class="block text-2xl font-medium mb-3"
                      >Vale Transporte</label
                    >
                    <div class="flex items-center gap-4">
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-model="formData.valeTransporte"
                          :value="true"
                          class="mr-2"
                        />
                        Sim
                      </label>
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-model="formData.valeTransporte"
                          :value="false"
                          class="mr-2"
                        />
                        Não
                      </label>
                    </div>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-2xl font-medium mb-3"
                      >Valor Vale Transporte</label
                    >
                    <input
                      v-model="formData.valorValeTransporte"
                      type="text"
                      placeholder="R$ 0,00"
                      v-money="money"
                      :disabled="!formData.valeTransporte"
                      :class="[
                        'input-field text-xl w-full',
                        isFieldInvalid('valorValeTransporte')
                          ? 'border-red-500 bg-red-50'
                          : '',
                        !formData.valeTransporte
                          ? 'bg-gray-100 cursor-not-allowed'
                          : '',
                      ]"
                      @input="clearInvalidState('valorValeTransporte')"
                    />
                  </div>
                </div>

                <div class="flex gap-8 items-start">
                  <div class="w-1/2">
                    <label class="block text-2xl font-medium mb-3"
                      >Vale Alimentação</label
                    >
                    <div class="flex items-center gap-4">
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-model="formData.valeAlimentacao"
                          :value="true"
                          class="mr-2"
                        />
                        Sim
                      </label>
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-model="formData.valeAlimentacao"
                          :value="false"
                          class="mr-2"
                        />
                        Não
                      </label>
                    </div>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-2xl font-medium mb-3"
                      >Valor Vale Alimentação</label
                    >
                    <input
                      v-model="formData.valorValeAlimentacao"
                      type="text"
                      v-money="money"
                      :disabled="!formData.valeAlimentacao"
                      :class="[
                        'input-field text-xl w-full',
                        isFieldInvalid('valorValeAlimentacao')
                          ? 'border-red-500 bg-red-50'
                          : '',
                        !formData.valeAlimentacao
                          ? 'bg-gray-100 cursor-not-allowed'
                          : '',
                      ]"
                      @input="clearInvalidState('valorValeAlimentacao')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Etapa 4: Documentos e Observações -->
        <div v-if="currentStep === 3">
          <div class="grid grid-cols-1 gap-8">
            <div class="col-span-1">
              <div class="w-full">
                <h2 class="font-bold text-3xl mb-6">Documentos</h2>

                <div class="col-span-2">
                  <label class="block text-2xl font-semibold text-gray-700 mb-4"
                    >Documentos</label
                  >
                  <div class="flex items-center justify-center w-full">
                    <label
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                    >
                      <div
                        class="flex flex-col items-center justify-center pt-5 pb-6"
                      >
                        <Icon
                          icon="mdi:cloud-upload"
                          height="48"
                          class="text-blue-500 mb-4"
                        />
                        <p class="mb-2 text-xl text-blue-500">
                          <span class="font-semibold"
                            >Clique para fazer upload</span
                          >
                          ou arraste e solte
                        </p>
                        <p class="text-sm text-blue-400">
                          PDF, DOCX, DOC, XLSX, CSV, JPG, PNG, RAR, ZIP (Máx.
                          20MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        class="hidden"
                        @change="handleFileUpload"
                        accept=".pdf,.docx,.doc,.xlsx,.csv,.jpg,.png,.rar,.zip"
                      />
                    </label>
                  </div>
                </div>

                <div
                  v-if="formData.documentos && formData.documentos.length > 0"
                  class="mt-6"
                >
                  <h4 class="text-xl font-medium mb-4 text-gray-700">
                    Documentos Selecionados:
                  </h4>
                  <div class="space-y-3">
                    <div
                      v-for="(file, index) in formData.documentos"
                      :key="index"
                      class="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200"
                    >
                      <div class="flex items-center gap-3 flex-grow">
                        <Icon
                          icon="mdi:file-document-outline"
                          class="text-blue-500 text-xl"
                        />
                        <input
                          v-if="editingIndex === index"
                          type="text"
                          v-model="editingName"
                          @blur="saveFileName(index)"
                          @keyup.enter="saveFileName(index)"
                          class="border border-blue-300 rounded px-3 py-2 flex-grow bg-white focus:outline-none focus:border-blue-500"
                          ref="editInput"
                        />
                        <span v-else class="text-gray-700 text-xl">{{
                          file.name
                        }}</span>
                      </div>
                      <div class="flex items-center gap-3">
                        <button
                          @click="startEditing(index, file.name)"
                          type="button"
                          class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-full transition-colors"
                          title="Editar nome"
                        >
                          <Icon icon="mdi:pencil" height="20" />
                        </button>
                        <button
                          @click="removeFile(index)"
                          type="button"
                          class="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-full transition-colors"
                          title="Remover"
                        >
                          <Icon icon="mdi:delete" height="20" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="documentosAtuais.length > 0" class="mt-8">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-700">
                    Documentos Anexados
                  </h3>
                  <div class="flex flex-col gap-3">
                    <div
                      v-for="(doc, index) in documentosAtuais"
                      :key="doc.path"
                      class="bg-blue-50 rounded-lg p-4 flex justify-between items-center border border-blue-200"
                    >
                      <div class="flex items-center gap-3 flex-grow">
                        <Icon
                          icon="mdi:file-document-outline"
                          class="text-blue-500 text-xl"
                        />
                        <input
                          v-if="editingExistingIndex === index"
                          type="text"
                          v-model="editingExistingName"
                          @blur="saveExistingFileName(index)"
                          @keyup.enter="saveExistingFileName(index)"
                          class="border border-blue-300 rounded px-3 py-2 flex-grow bg-white focus:outline-none focus:border-blue-500"
                          ref="editExistingInput"
                        />
                        <span v-else class="text-gray-700 text-xl">{{
                          doc.nome
                        }}</span>
                      </div>
                      <div class="flex items-center gap-3">
                        <button
                          @click="startEditingExisting(index, doc.nome)"
                          type="button"
                          class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-full transition-colors"
                          title="Editar nome"
                        >
                          <Icon icon="mdi:pencil" height="20" />
                        </button>
                        <a
                          :href="`${api.defaults.baseURL}/download/contrato-clt/${route.params.id}/documento/${doc.nome}`"
                          target="_blank"
                          class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-full transition-colors"
                          title="Baixar"
                        >
                          <Icon icon="mdi:download" height="20" />
                        </a>
                        <button
                          @click="deleteExistingDocument(index)"
                          type="button"
                          class="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-full transition-colors"
                          title="Excluir"
                        >
                          <Icon icon="mdi:delete" height="20" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3"
                >Outros Benefícios</label
              >
              <textarea
                v-model="formData.outrosBeneficios"
                class="input-field text-xl"
                rows="3"
                :class="[
                  'input-field',
                  isFieldInvalid('outrosBeneficios')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('outrosBeneficios')"
              ></textarea>
            </div>

            <div class="col-span-1">
              <label class="block text-2xl font-medium mb-3">Observações</label>
              <textarea
                v-model="formData.observacao"
                class="input-field text-xl"
                rows="3"
                :class="[
                  'input-field',
                  isFieldInvalid('observacao')
                    ? 'border-red-500 bg-red-50'
                    : '',
                ]"
                @input="clearInvalidState('observacao')"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            type="button"
            v-if="currentStep > 0"
            @click="currentStep--"
            class="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Anterior
          </button>
          <button
            type="button"
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Próximo
          </button>
          <button
            type="submit"
            v-if="currentStep === steps.length - 1"
            class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>

    <ConfirmationModal
      :is-open="showDeleteModal"
      :on-confirm="confirmDeleteDocument"
      :on-cancel="cancelDeleteDocument"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import { api } from "../../services/api";
import { mask } from "vue-the-mask";
import ConfirmationModal from "./modal/ConfirmationModal.vue";

const showDeleteModal = ref(false);
const documentToDelete = ref<{ index: number } | null>(null);

interface ContratoCLT {
  id?: number;
  matricula: string;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  pis: string;
  dataNascimento: string;
  enderecoCompleto: string;
  telefone: string;
  emailPessoal: string;
  dataAdmissao: string;
  cargo: string;
  nivelProfissional: string;
  departamento: string;
  projetoAtual: string | null;
  gestorProjeto: string | null;
  regimeTrabalho: string;
  horarioTrabalho: string;
  jornadaSemanal: number;
  remuneracao: number;
  formaPagamento: string;
  chavePix: string | null;
  banco: string | null;
  agencia: string | null;
  numeroConta: string | null;
  planoSaude: boolean;
  empresaPlanoSaude: string;
  valeTransporte: boolean;
  valorValeTransporte: number;
  valeAlimentacao: boolean;
  valorValeAlimentacao: number;
  outrosBeneficios: string | null;
  observacao: string | null;
  documentos?: File[];
}

interface Documento {
  path: string;
  nome: string;
  url: string;
}

interface Projeto {
  id: number;
  projeto: string;
  // ... outros campos não são necessários para o select
}

const route = useRoute();
const router = useRouter();
const isEdicao = route.params.id !== undefined;
const currentStep = ref(0);
const steps = [
  "Dados Pessoais",
  "Dados Profissionais",
  "Remuneração",
  "Documentos",
];

const formData = ref<ContratoCLT>({
  matricula: "",
  nomeCompleto: "",
  cpf: "",
  rg: "",
  pis: "",
  dataNascimento: "",
  enderecoCompleto: "",
  telefone: "",
  emailPessoal: "",
  dataAdmissao: "",
  cargo: "",
  nivelProfissional: "",
  departamento: "",
  projetoAtual: null,
  gestorProjeto: null,
  regimeTrabalho: "Presencial",
  horarioTrabalho: "",
  jornadaSemanal: 40,
  remuneracao: 0,
  formaPagamento: "Transferência",
  chavePix: null,
  banco: null,
  agencia: null,
  numeroConta: null,
  planoSaude: false,
  empresaPlanoSaude: "",
  valeTransporte: false,
  valorValeTransporte: 0,
  valeAlimentacao: false,
  valorValeAlimentacao: 0,
  outrosBeneficios: null,
  observacao: null,
});

const money = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false,
};

const documentosAtuais = ref<Documento[]>([]);

const editingIndex = ref<number | null>(null);
const editingName = ref("");
const editingExistingIndex = ref<number | null>(null);
const editingExistingName = ref("");
const editInput = ref<HTMLInputElement | null>(null);
const editExistingInput = ref<HTMLInputElement | null>(null);

const isOutroNivelProfissional = ref(false);
const isOutroRegimeTrabalho = ref(false);

const invalidFields = ref<Set<string>>(new Set());

const projetos = ref<Projeto[]>([]);

const fetchProjetos = async () => {
  try {
    const response = await api.get("/projetos");
    projetos.value = response.data.data; // acessando o array dentro de data
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
  }
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const newFiles = Array.from(input.files);
    formData.value.documentos = formData.value.documentos
      ? [...formData.value.documentos, ...newFiles]
      : newFiles;
  }
};

const removeFile = (index: number) => {
  formData.value.documentos?.splice(index, 1);
};

const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
  }
};

const validateCurrentStep = (): boolean => {
  const requiredFields: { [key: number]: string[] } = {
    0: [
      "matricula",
      "nomeCompleto",
      "cpf",
      "rg",
      "pis",
      "dataNascimento",
      "enderecoCompleto",
      "telefone",
      "emailPessoal",
    ],
    1: [
      "dataAdmissao",
      "cargo",
      "nivelProfissional",
      "departamento",
      "regimeTrabalho",
      "jornadaSemanal",
      "projetoAtual",
      "gestorProjeto",
      "horarioTrabalho",
    ],
    2: ["remuneracao", "formaPagamento"],
  };

  const currentFields = requiredFields[currentStep.value] || [];
  const missingFields = currentFields.filter(
    (field) => !formData.value[field as keyof ContratoCLT]
  );

  invalidFields.value.clear();

  missingFields.forEach((field) => invalidFields.value.add(field));

  if (missingFields.length > 0) {
    toast.error(`Por favor, preencha todos os campos obrigatórios`);
    return false;
  }

  return true;
};

const isFieldInvalid = (fieldName: string): boolean => {
  return invalidFields.value.has(fieldName);
};

const clearInvalidState = (fieldName: string) => {
  invalidFields.value.delete(fieldName);
};

const handleSubmit = async () => {
  try {
    const formDataObj = new FormData();

    Object.entries(formData.value).forEach(([key, value]) => {
      if (key !== "documentos") {
        formDataObj.append(key, value?.toString() || "");
      }
    });

    if (formData.value.documentos) {
      formData.value.documentos.forEach((file) => {
        formDataObj.append("documentos", file);
      });
    }

    const response = isEdicao
      ? await api.put(`/contrato-clt/${route.params.id}`, formDataObj)
      : await api.post("/contrato-clt", formDataObj);

    toast.success(
      isEdicao
        ? "Contrato atualizado com sucesso!"
        : "Contrato cadastrado com sucesso!"
    );
    router.push("/contratos/clt");
  } catch (error) {
    console.error("Erro ao salvar contrato:", error);
    toast.error("Erro ao salvar contrato");
  }
};

const carregarDocumentos = async (contratoId: number) => {
  try {
    const response = await api.get(`/contrato-clt/${contratoId}/documentos`);
    if (response.data.documentos) {
      const docs = response.data.documentos.split(",").map((path: string) => {
        const nome = path.split("/").pop();
        return {
          path: path,
          nome: nome,
          url: `/download/contrato-clt/${contratoId}/documento/${nome}`,
        };
      });
      documentosAtuais.value = docs;
    }
  } catch (error) {
    console.error("Erro ao carregar documentos:", error);
    toast.error("Erro ao carregar documentos do contrato");
  }
};

const startEditing = (index: number, fileName: string) => {
  editingIndex.value = index;
  editingName.value = fileName;
  nextTick(() => {
    if (editInput.value) {
      editInput.value.focus();
    }
  });
};

const saveFileName = (index: number) => {
  if (formData.value.documentos && editingName.value.trim()) {
    const file = formData.value.documentos[index];
    const newFile = new File([file], editingName.value, { type: file.type });
    formData.value.documentos[index] = newFile;
  }
  editingIndex.value = null;
};

const startEditingExisting = (index: number, fileName: string) => {
  editingExistingIndex.value = index;
  editingExistingName.value = fileName;
  nextTick(() => {
    if (editExistingInput.value) {
      editExistingInput.value.focus();
    }
  });
};

const saveExistingFileName = async (index: number) => {
  if (!editingExistingName.value.trim()) {
    editingExistingIndex.value = null;
    return;
  }

  try {
    const contratoId = route.params.id;
    if (!contratoId) {
      toast.error("ID do contrato não encontrado");
      return;
    }

    const doc = documentosAtuais.value[index];
    const oldFileName = encodeURIComponent(doc.nome);

    await api.put(`/contrato-clt/${contratoId}/documentos/${oldFileName}`, {
      novoNome: editingExistingName.value,
    });

    // Atualiza o documento na lista local
    documentosAtuais.value[index] = {
      ...doc,
      nome: editingExistingName.value,
      path: `/uploads/contrato_clt/${editingExistingName.value}`,
    };

    toast.success("Nome do documento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar nome do documento:", error);
    toast.error("Erro ao atualizar nome do documento");
  }

  editingExistingIndex.value = null;
};

const deleteExistingDocument = async (index: number) => {
  documentToDelete.value = { index };
  showDeleteModal.value = true;
};

const confirmDeleteDocument = async () => {
  if (!documentToDelete.value) return;

  try {
    const doc = documentosAtuais.value[documentToDelete.value.index];
    const fileName = encodeURIComponent(doc.nome);

    await api.delete(`/contrato-clt/${route.params.id}/documentos/${fileName}`);
    documentosAtuais.value = documentosAtuais.value.filter(
      (d) => d.nome !== doc.nome
    );
    toast.success("Documento excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir documento:", error);
    toast.error("Erro ao excluir documento");
  } finally {
    showDeleteModal.value = false;
    documentToDelete.value = null;
  }
};

const cancelDeleteDocument = () => {
  showDeleteModal.value = false;
  documentToDelete.value = null;
};

const handleNivelProfissionalChange = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  if (select.value === "outro") {
    isOutroNivelProfissional.value = true;
    formData.value.nivelProfissional = "";
  }
};

const handleRegimeTrabalhoChange = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  if (select.value === "outro") {
    isOutroRegimeTrabalho.value = true;
    formData.value.regimeTrabalho = "";
  }
};

const voltarSelectNivelProfissional = () => {
  isOutroNivelProfissional.value = false;
  formData.value.nivelProfissional = "";
};

const voltarSelectRegimeTrabalho = () => {
  isOutroRegimeTrabalho.value = false;
  formData.value.regimeTrabalho = "";
};

// Função para formatar o valor para exibição (R$)
const formatarMoeda = (valor: string | number) => {
  const numero =
    typeof valor === "string"
      ? parseFloat(valor.replace(/\D/g, "")) / 100
      : valor;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
};

// Função para limpar a formatação e retornar apenas o número com ponto
const limparFormatacaoMoeda = (valor: string) => {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{1,2})$/, ".$1")
    .replace(/(?=(\d{3})+(\D))\B/g, "");
};

// Ref para controlar o valor formatado exibido no input
const remuneracaoFormatada = ref("");

// Watch para atualizar o valor formatado quando o valor real mudar
watch(
  () => formData.value.remuneracao,
  (newValue) => {
    if (newValue) {
      remuneracaoFormatada.value = formatarMoeda(newValue);
    }
  },
  { immediate: true }
);

// Função para atualizar o valor quando o usuário digitar
const handleRemuneracaoInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const valorLimpo = limparFormatacaoMoeda(input.value);
  formData.value.remuneracao = parseFloat(valorLimpo) || 0;
  remuneracaoFormatada.value = formatarMoeda(valorLimpo);
  clearInvalidState("remuneracao");
};

const formatarCPF = (cpf: string) => {
  // Remove tudo que não é número
  const numeros = cpf.replace(/\D/g, "");

  // Aplica a máscara XXX.XXX.XXX-XX
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const limparFormatacaoCPF = (cpf: string) => {
  // Remove tudo que não é número
  return cpf.replace(/\D/g, "");
};

const handleCPFInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const cpfLimpo = limparFormatacaoCPF(input.value);

  // Salva no formData sem formatação
  formData.value.cpf = cpfLimpo;

  // Atualiza input com formatação
  input.value = formatarCPF(cpfLimpo);
  clearInvalidState("cpf");
};

onMounted(async () => {
  if (isEdicao) {
    try {
      const response = await api.get(`/contrato-clt/${route.params.id}`);
      formData.value = {
        ...response.data,
        documentos: [],
      };

      const niveisDefault = ["Junior", "Pleno", "Senior", "Estágiario"];
      const regimesDefault = ["Presencial", "Hibrido", "Remoto"];

      if (!niveisDefault.includes(formData.value.nivelProfissional)) {
        isOutroNivelProfissional.value = true;
      }

      if (!regimesDefault.includes(formData.value.regimeTrabalho)) {
        isOutroRegimeTrabalho.value = true;
      }

      await carregarDocumentos(Number(route.params.id));
    } catch (error) {
      console.error("Erro ao carregar contrato:", error);
      toast.error("Erro ao carregar contrato");
      router.push("/contratos/clt");
    }
  }

  fetchProjetos();
});
</script>

<style scoped>
.input-field {
  @apply focus:border-blue-400 
         border-2 
         transition-colors 
         ease-in-out 
         duration-300 
         focus:border-2 
         focus:outline-none 
         focus:ring-0 
         focus:ring-offset-0 
         px-6 
         py-4 
         w-full 
         border-gray-300 
         rounded-md;
  min-height: 4rem;
}

label {
  @apply text-2xl font-medium text-gray-700;
}

.section-title {
  @apply text-4xl font-medium mb-6;
}

select {
  @apply text-xl h-16;
}

textarea {
  @apply text-xl;
  min-height: 8rem;
}

button {
  @apply text-xl py-4 px-8;
  min-height: 4rem;
}

th {
  @apply text-2xl font-semibold p-6;
}

td {
  @apply text-xl p-6;
}

.step-number {
  @apply w-12 h-12 text-2xl;
}

.step-text {
  @apply text-2xl;
}

input[type="file"] {
  @apply hidden;
}

label:hover .text-blue-500 {
  @apply text-blue-600;
}

.drag-active {
  @apply border-blue-500 bg-blue-100;
}

select.input-field {
  @apply appearance-none bg-white;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.input-field.border-red-500 {
  border-color: rgb(239 68 68);
  background-color: rgb(254 242 242);
}

.input-field.border-red-500:focus {
  border-color: rgb(239 68 68);
  box-shadow: 0 0 0 1px rgb(254 202 202);
}

label.required::after {
  content: "*";
  @apply text-red-500 ml-1;
}

select option[value=""][disabled] {
  display: block;
  color: #6b7280;
}
</style>
