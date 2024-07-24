
const modalPedidoFaturamento = ref(false);
const ExibirModalPedidoFaturamento = () => {
  modalPedidoFaturamento.value = true;
};
const closeModalPedidoFaturamento = () => {
  modalPedidoFaturamento.value = false;
}

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

linha 234

<button class="bg-orange-500 text-zinc-50 rounded-lg w-[200px]"
@click="ExibirModalPedidoFaturamento">
  Novo pedido faturamento
</button>

<!-- Tabela Faturamentos-->
<section>
  <div class="flex justify-between mt-12">
    <h1 class="text-4xl font-medium">Faturamentos</h1>
    <button class="btn-faturamento relative" @click="ExibirModalFaturamento">
      Novo Faturamento
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
        <th class="text-xl">Nota Fiscal</th>
        <th class="text-xl">Total do Faturamento</th>
        <th class="text-xl">Situação</th>
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
        <td class="text-2xl">{{  }}</td>

        <td class="text-2xl">
          {{
            formatCurrency(
              calcularSaldoFaturamentoItens(faturamento.faturamentoItens)
            )
          }}
        </td>
        <td class="text-2xl text-center">
          <!-- <div class="flex justify-center">
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
        </div> -->
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


  <!-- Modal novo pedido de faturamento-->
  <JetDialogModal
   :show="modalPedidoFaturamento"
    :withouHeader="false"
    @close="closeModalPedidoFaturamento"
    maxWidth="6xl"
    :modalTitle="' Criar Pedido de Faturamento'"
  >
  <template #content>
      <form @submit.prevent="createFaturamento">
        <section class="flex flex-col gap-8">
          <div class="flex gap-4  items-center">
            <label class="font-bold text-3xl">Valor Total:</label>
             <span>0</span>
          </div>
          <div  class="flex gap-4 items-center">
              <label class="font-bold text-3xl w-[180px]">Nota  Fiscal:</label>
              <input
              type="text"
              placeholder="Informe o código da  nota fiscal"
              class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"

            />
          </div>
          <div  class="flex gap-4 items-center">
            <label class="font-bold text-3xl w-[180px]">Encaminhado em:</label>
            <input
            type="date"
            placeholder="Informe a  data do pedido  de faturamento"
            class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-[50%] border-gray-300 rounded-md h-14"

          />
        </div>
        </section>
        <div class="font-bold text-3xl mt-8">
          Descrição  da nota:
        </div>
        <div >
          <table
            class="table-auto border border-slate-200 rounded-2xl w-full mt-12"
          >
            <thead class="h-20 bg-slate-100 border-1">
              <tr>
                <th class="text-xl">Projeto</th>
                <th class="text-xl">Unidade de medida</th>
                <th class="text-xl">Quantidade</th>
                <th class="text-xl">Valor do  lançamento</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-24 text-center"
                v-for="item in contrato.contratoItens"
                :key="item.id"
              >

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
