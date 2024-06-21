<template>
  <div class="flex justify-between mt-12 ">
    <h1 class="text-5xl font-medium">Visualizar Contrato</h1>
  </div>

  <section class="mt-12">
      <div class="w-full flex flex-col gap-10">
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Nome do cliente:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.nome_cliente}}</span>
        </div>
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Vigência:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.vigencia}}</span>
        </div>
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Saldo Contrato:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.saldo_contrato}}</span>
        </div>
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Fiscal:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.fiscal}}</span>
        </div>
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Ponto Focal:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.ponto_focal}}</span>
        </div>
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Cidade:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.cidade}}</span>
        </div>
        <div class="flex items-center gap-4 w-3/4">
          <label class="font-medium w-60">Objeto do Contrato:</label>
          <span class="pl-4 font-bold border-2 p-2 rounded-lg w-80">{{contrato.objeto_contrato}}</span>
        </div>
      </div>
  </section>

<section>
  <h1 class="text-4xl font-medium mt-12">Itens do Contrato</h1>
  <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
    <thead class="h-24 bg-slate-100 border-1">
      <tr class="">
        <th class="text-2xl">Título</th>
        <th class="text-2xl">Unidade de medida</th>
        <th class="text-2xl">Valor Unitário</th>
        <th class="text-2xl">Saldo Quantidade Contratada</th>
      </tr>
    </thead>
    <tbody>
      <tr class="h-20 text-center" v-for="item in itens" :key="item.id">
        <td class="text-2xl ">{{ item.titulo }}</td>
        <td class="text-2xl ">{{ item.unidade_medida }}</td>
        <td class="text-2xl ">{{ item.valor_unitario }}</td>
        <td class="text-2xl ">{{ item.saldo_quantidade_contratada }}</td>
      </tr>
    </tbody>
</table>
</section>

<section>
  <h1 class="text-4xl font-medium mt-12">Faturamentos</h1>
  <table class="table-auto border border-slate-200 rounded-2xl w-full mt-12">
    <thead class="h-24 bg-slate-100 border-1">
      <tr class="">
        <th class="text-2xl">Título</th>
        <th class="text-2xl">Valor</th>
        <th class="text-2xl">Status</th>
        <th class="text-2xl">Saldo Atual</th>
        <th class="text-2xl">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr class="h-20 text-center" v-for="faturamento in faturamentos" :key="faturamento.id">
        <td class="text-2xl ">{{ faturamento.titulo }}</td>
        <td class="text-2xl ">{{ faturamento.valor }}</td>
        <td class="text-2xl ">{{ faturamento.status }}</td>
        <td class="text-2xl ">{{ faturamento.saldo }}</td>
        <td class="text-2xl flex justify-center mt-4 gap-3">
          <span>
            <Icon icon="ph:eye" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"/>
          </span>
          <span>
            <Icon icon="bx:edit" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"/>
          </span>
          <span>
            <Icon icon="ph:trash" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"/>
          </span>
        </td>
      </tr>
    </tbody>
</table>
</section>

</template>

<script setup>
import { Icon } from '@iconify/vue';

const contrato = {
  nome_cliente: "Pedro Souza",
	vigencia: "21/06/2024",
	saldo_contrato: 100,
	fiscal: "João da Silva",
	ponto_focal: "Ponto focal",
	cidade: "São Paulo",
	objeto_contrato: "Serviços de Consultoria",
}

const itens = [{
  id: 1,
  titulo: "Exemplo Título",
  unidade_medida: "Funcionário",
  valor_unitario: 10,
  saldo_quantidade_contratada: 50,
}]

const faturamentos = [{
  id: 1,
  titulo: 'Exemplo Título',
  valor: 10,
  status: 'Solicitação',
  saldo: 50,
}]
</script>

<style>

</style>
