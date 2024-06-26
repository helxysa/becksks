<template>
    <div  v-for="contrato in contratos" :key="contrato.id" class="flex flex-col">
      

  <Card style="width: 25rem; overflow: hidden">
      <!-- <template #header>
          <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
      </template> -->
      <template #title >
          <div class="flex justify-end text-lg">
            <Button>Aguardando pagamento</Button>

          </div>
      </template>
     
      <template #content>
        <img src="../../assets/imagens/imageCard.png" alt="imagem representativa  do  contrato"/>
        <p class="flex justify-center font-semibold mt-2">{{ contrato.nomeCliente }}</p>
        <div>
          <span class="font-semibold">Vigência:</span>         
          <span>{{
            new Intl.DateTimeFormat("pt-BR", {
              timeZone: "UTC",
          }).format(
              new Date(
                  contrato.vigencia
              )
          )
            }}</span>
          
        </div>
        <div>
          <span class="font-semibold">
            Saldo atual : 
          </span>
          <span>{{contrato.saldoContrato}}</span>
        </div>
        <div>
          <span class="font-semibold">
            Valor aguard.  faturamento : 
          </span>
        
          <!-- <span>{{contrato.saldoContrato}}</span> -->
        </div>
        <div>
          <span class="font-semibold">
            Valor aguard. pagamento:
          </span>
         
        </div>
        
      </template>
     
  </Card>
  <div class="flex justify-end mt-2">
    <router-link :to="{name:'editarcontrato', params: {id: contrato.id}}">
      <router-view>
        <Icon icon="bx:edit" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"/>
      </router-view>
    </router-link>
      <Icon icon="ph:trash" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"
      @click=" openModalDeleteContrato"/>
  </div>




      <!-- <td class="text-2xl ">{{ contrato.nome_cliente }}</td>
      <td class="text-2xl ">{{ 
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "UTC",
      }).format(
          new Date(
              contrato.vigencia
          )
      )

      }}</td>
      <td class="text-2xl ">{{ contrato.objeto_contrato }}</td>
      <td class="text-2xl flex justify-center mt-4 gap-3">
        <router-link :to="{name:'visualizarContrato', params: {id: contrato.id}}">
          <router-view>
            <Icon icon="ph:eye" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"/>
          </router-view>
        </router-link>
        <router-link :to="{name:'editarcontrato', params: {id: contrato.id}}">
          <router-view>
            <Icon icon="bx:edit" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"/>
          </router-view>
        </router-link>
          <Icon icon="ph:trash" height="20" class="hover:text-blue-500 hover:rounded-md cursor-pointer"
          @click=" openModalDeleteContrato"/>
      </td> -->
    </div>
    <JetDialogModal
    :show="excluirModal"
    @close="closeModal"
    :withouHeader="true"
    >
    <template #title>
        <!-- <h1 class="font-bold text-xl">Gerenciamento do status de vaga</h1> -->
    </template>
    <template #content>
      <div class="flex justify-center font-semibold">
        <h1>Tem certeza  de excluir  esse  contrato?</h1>
      </div>
      <div class="mt-9 flex justify-end gap-4">
        <button @click="closeModal"  class=" ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700  tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40">
            Não
        </button>
        <button
            type="button"
            class="inline-flex ml-3 items-center justify-center px-4 py-2  border border-transparent rounded-md font-bold text-xl text-white  tracking-widest   disabled:opacity-25 transition h-14 btn-item w-40"
          @click="deleteContrato"
        >
            Sim
        </button>
    </div>


    </template>


    </JetDialogModal>

</template>

<script setup >
import { Icon } from '@iconify/vue';
import { ref, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import JetDialogModal from '@/components/modals/DialogModal.vue'
import { api } from '@/services/api';
import Card from 'primevue/card';
import Button from 'primevue/button';

const  router =  useRouter()

const contrato = ref({})
const excluirModal = ref(false);

const  openModalDeleteContrato = (contratoExcluido) => {
   contrato.value = contratoExcluido
   excluirModal.value = true
}

const  deleteContrato = () => {
  localStorage.removeItem('contrato')
    closeModal()
   toast("Contrato  deletado  com  sucesso!", {
  theme: "colored",
  type: "success",

   })

  //  router.push({name:'Contratos'})

  // api.delete(`/contracts/${contrato.value.id}`).then(
  //   (response) => {
  //         console.log(response, 'response')
  //   console.log('contarto deletado',  contrato.value)
  //   closeModal()
  //  toast("Contrato  deletado  com  sucesso!", {
  // theme: "colored",
  // type: "success",
  
  //  })
  //   }
  // ).catch((erro)=>{
  //   console.log(erro, 'erro')
  //   closeModal()
  //   toast("Não   foi  possível  deletar  o  contrato!", {
  // theme: "colored",
  // type: "error",
  
  //  })

  // })
 
  
}

const  closeModal = ()=> {
   excluirModal.value = false
}

const contratos =  ref([
  {
        id: 1,
        nomeCliente: "Cliente B",
        vigencia: "2024-12-31T00:00:00.000Z",
        saldoContrato: "500.00",
        fiscal: "Supervisor",
        pontoFocal: "Ponto Focal",
        cidade: "Cidade",
        objetoContrato: "Objeto",
        createdAt: "2024-06-26T12:21:53.957+00:00",
        updatedAt: "2024-06-26T12:21:53.957+00:00",
        contratoItens: [
            {
                id: 1,
                contratoId: 1,
                titulo: "desenvolvimento",
                unidadeMedida: "PF",
                valorUnitario: "50",
                saldoQuantidadeContratada: "100",
                createdAt: "2024-06-26T12:21:53.962+00:00",
                updatedAt: "2024-06-26T12:21:53.962+00:00"
            },
            {
                id: 2,
                contratoId: 1,
                titulo: "Sustentação",
                unidadeMedida: "PF",
                valorUnitario: "50",
                saldoQuantidadeContratada: "100",
                createdAt: "2024-06-26T12:21:53.962+00:00",
                updatedAt: "2024-06-26T12:21:53.962+00:00"
            }
        ]
    },

    {
        id: 1,
        nomeCliente: "Cliente B",
        vigencia: "2024-12-31T00:00:00.000Z",
        saldoContrato: "500.00",
        fiscal: "Supervisor",
        pontoFocal: "Ponto Focal",
        cidade: "Cidade",
        objetoContrato: "Objeto",
        createdAt: "2024-06-26T12:21:53.957+00:00",
        updatedAt: "2024-06-26T12:21:53.957+00:00",
        contratoItens: [
            {
                id: 1,
                contratoId: 1,
                titulo: "desenvolvimento",
                unidadeMedida: "PF",
                valorUnitario: "50",
                saldoQuantidadeContratada: "100",
                createdAt: "2024-06-26T12:21:53.962+00:00",
                updatedAt: "2024-06-26T12:21:53.962+00:00"
            },
            {
                id: 2,
                contratoId: 1,
                titulo: "Sustentação",
                unidadeMedida: "PF",
                valorUnitario: "50",
                saldoQuantidadeContratada: "100",
                createdAt: "2024-06-26T12:21:53.962+00:00",
                updatedAt: "2024-06-26T12:21:53.962+00:00"
            }
        ]
    }
])

watchEffect( ()=> {
  // const  objeto = JSON.parse(localStorage.getItem('contrato'))
  
//  if (objeto) {

//    contratos.value.push({...objeto, id: 1});
//  }
//   contratos = contratos.concat(objeto.map(item => ({
//   ...objeto
// })));
  // console.log(contratos.value, 'contrartos')



  api.get(`/contratos`).then((response)  => {
    console.log('lista  contratos', response)
  }).catch((erro)=>{
     console.log(erro, 'erro')
  })
}
)




</script>

<style scoped>
.btn-item {
  background-color: var(--bluePrimary);

}

.btn-item:hover {
  background-color: #0ea5e9;
}
</style>
