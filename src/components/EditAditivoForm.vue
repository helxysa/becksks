<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">

    <div class="flex flex-col items-start gap-3">
      <label class="font-semibold ">Nome do Termo</label>
      <input
        v-model="formData.nomeContrato"
        class="focus:border-blue-400 border-[1px] transition-colors ease-in-out duration-600 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md "
        required
      />
    </div>
    <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">Nome do cliente</label>
        <input
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          disabled
          type="text"
          placeholder="Informe o nome do cliente"
          v-model="formData.contrato.nomeCliente"
          maxlength="120"
        />
    </div>
    <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">Vigência</label>
        <div class="flex gap-4 items-center w-full">
          <input
            class="font-sans focus:border-blue-400  transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
            type="date"
            placeholder="Digite o inicio do contrato"
            v-model="formData.dataInicio"
          />
          <span class="font-sans"> até</span>
          <input
            class="font-sans focus:border-blue-400  transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            required
            type="date"
            placeholder="Digite o fim do  contrato"
            v-model="formData.dataFim"
          />
        </div>
    </div>
    <div class="flex flex-col items-start gap-3">
      <label class="font-semibold ">Valor Contratado</label>
      <money3
            required
            type="text"
            placeholder="Informe o valor contratado"
            class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
            v-model="formData.saldoContrato"
            v-bind="moneyConfig"
          />
    </div>
      <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">Fiscal do contrato</label>
        <input
          disabled
          type="text"
          placeholder="Informe o fiscal do contrato"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="formData.contrato.fiscal.nome"
          maxlength="120"
        />
      </div>
      <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">Telefone do fiscal</label>
        <input
          disabled
          type="tel"
          placeholder="Informe o telefone do fiscal"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="formData.contrato.fiscal.telefone"
          maxlength="15"
          @keyup="handlePhone"
        />
      </div>
      <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">E-mail do fiscal</label>
        <input
          disabled
          type="email"
          placeholder="Informe o email do fiscal"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="formData.contrato.fiscal.email"
          maxlength="120"
        />
      </div>
      <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">Ponto focal</label>
        <input
          disabled
          type="text"
          placeholder="Informe o ponto focal"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="formData.contrato.pontoFocal"
          maxlength="120"
        />
      </div>
      <div class="flex flex-col items-start gap-3 ">
        <label class="font-semibold">Objeto do contrato</label>
        <input
          required
          type="text"
          placeholder="Informe o objeto do contrato"
          class="font-sans focus:border-blue-400 transition-colors ease-in-out duration-600 border-[1px] focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-[9px] w-full border-gray-300 rounded-md"
          v-model="formData.objetoContrato"
          maxlength="120"
        />
      </div>

    <div class="flex justify-end gap-4 mt-6">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Salvar
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const moneyConfig = {
  precision: 2,
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  masked: false,
};

const props = defineProps({
  aditivo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = ref({ ...props.aditivo });

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>
