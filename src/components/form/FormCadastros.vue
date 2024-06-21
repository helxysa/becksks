<template>
      <div>
          <div class="flex items-center mt-12 ">
             <span @click="voltarListagem" class="cursor-pointer">
                <Icon icon="ic:round-arrow-back" height="30"  />
             </span>
              <h1 class="text-5xl font-medium">Formulário de Contrato</h1>
            </div>
            <div class="flex justify-center">

                <form class="mt-12  form-contrato" @submit.prevent="saveContrato" >
                    <div class="flex items-center justify-between">
                        <label  class="font-bold w-60">Nome do  cliente </label>
                        <input type="text" placeholder="Informe  o nome do cliente"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.nome_cliente"
                       
                        required/>
    
                    </div>
                    <div class="mt-8 flex items-center justify-between">
                        <label  class="font-bold w-60">Vigência  do  contrato </label>
                        <input type="date"  placeholder="Digite a duração do  contrato"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.vigencia"
                        required/>
    
                    </div>
                    <div class="mt-8 flex items-center justify-between">
                        <label  class="font-bold w-60">Saldo  de  contrato </label>
                        <input type="text"  placeholder="Informe o saldo do  contrato"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.saldo_contrato"
                        required/>
    
                    </div>
                    <div class="mt-8 flex items-center justify-between">
                        <label  class="font-bold w-60">Fiscal  do  contrato </label>
                        <input type="text"  placeholder="Informe o fiscal do  contrato"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.fiscal"
                        required/>
    
                    </div>
                    <div class="mt-8 flex items-center justify-between">
                        <label  class="font-bold w-60">Ponto  focal </label>
                        <input type="text"  placeholder="Informe o ponto focal"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.ponto_focal"
                        required/>
    
                    </div>
                    <div class="mt-8 flex items-center justify-between">
                        <label  class="font-bold w-60">Cidade  </label>
                        <input type="text"  placeholder="Informe a  cidade  do contrato"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.cidade"
                        required/>
    
                    </div>
                    <div class="mt-8 flex items-center justify-between">
                        <label  class="font-bold w-60">Objeto  do  contrato </label>
                        <input type="text"  placeholder="Informe o objeto do  contrato"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-3/4 border-gray-300 rounded-3xl"
                        v-model="form.objeto_contrato"
                        required/>
    
                    </div>
                    <!-- <span>{{form}}</span> -->
                    <div class="mt-14 flex justify-center">
                        <button  class="btn-contrato" type="button" @click="showExibirModalItems">Adicionar Item</button>
                    </div>
                        <table class="mt-8 table-auto border border-slate-200 rounded-2xl w-full">
                        <thead class="h-24 bg-slate-100 border-1">
                          <tr class="">
                            <th class="text-2xl">Título</th>
                            <th class="text-2xl">Unidade de medida</th>
                            <th class="text-2xl">Valor  unitário</th>
                            <th class="text-2xl">Saldo</th>
                            <th class="text-2xl">Opções</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ListItems />
                        </tbody>
                      </table>
                      <div class="mt-8 flex gap-2 justify-end">
                        <button class="btn-submit-contrato" type="submit" >Salvar</button>
                      </div>

                </form>
            </div>
            <JetDialogModal
                :show="exibirModal"
                :withouHeader="false"
                @close="closeModal"
            >
            <template #title>
            <!-- <h1 class="font-bold text-xl">Gerenciamento do status de vaga</h1> -->
            </template>
            <template #content>
                <form @submit.prevent="saveItem">
                    <div class="mt-8 flex gap-2 items-center ">
                        <label  class="font-bold w-60">Título </label>
                        <input type="text"  placeholder="Titulo do item"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
                        required
                       />
                    </div>
                    <div class="mt-8 flex gap-2 items-center ">
                        <label  class="font-bold w-60">Unidade  de medida </label>
                        <select
                        class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300  rounded-3xl h-14"
                        required
                    >
                        <option value="">
                            Selecione a unidade  de  medida
                        </option>
                        <option>PF</option>
                        <option>UST</option>
                        <option>Funcionário</option>
                    </select>

                    </div>
                    <div class="mt-8 flex gap-2 items-center ">
                        <label  class="font-bold w-60">Valor unitário </label>
                        <input type="text"  placeholder="Informe o valor  do item"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
                        required
                       />
                    </div>
                    <div class="mt-8 flex gap-2 items-center ">
                        <label  class="font-bold w-60">Saldo  </label>
                        <input type="text"  placeholder="Saldo  da  quantidade  contratada"    class="focus:border-[#FF6600] border-2 focus:border-2 focus:outline-none focus:ring-0 focus:ring-offset-0 px-4 py-2 w-full border-gray-300 rounded-3xl"
                        required
                       />
                    </div>
                  
                    <div class="mt-9 flex justify-end gap-4">
                        <button @click="closeModal"  class=" ml-3 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-bold text-xl text-gray-700  tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition hover:bg-gray-100 h-14 w-40">
                            Fechar
                        </button>
                        <button
                            type="submit"
                            class="inline-flex ml-3 items-center justify-center px-4 py-2  border border-transparent rounded-md font-bold text-xl text-white  tracking-widest   disabled:opacity-25 transition h-14 btn-item w-40"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </template>

            </JetDialogModal>
      </div>
</template>

<script setup >
import { reactive, ref, onMounted } from 'vue';
import { api } from '@/services/api';
import { toast } from 'vue3-toastify';
import JetDialogModal from '@/components/modals/DialogModal.vue'
import ListItems from '../list/ListItems.vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();
    

const  router  =  useRouter();
onMounted(() => {
    const id = route.params.id;
  console.log('id', id)
   if (id) {
    console.log('entrou')
    const  objeto = JSON.parse(localStorage.getItem('contrato'))
    form = {
        id: objeto.id,
    nome_cliente: objeto.nome_cliente, 
    vigencia: objeto.vigencia, 
    saldo_contrato: objeto.saldo_contrato, 
    fiscal: objeto.fiscal, 
    ponto_focal: objeto.ponto_focal,
    cidade: objeto.cidade, 
    objeto_contrato: objeto.objeto_contrato, 
    items: objeto.items

    }

    console.log(form, 'form')
   } else {

    console.log('else')

       form = {
        id: 1,
  nome_cliente: "", 
  vigencia: "", 
  saldo_contrato: "", 
  fiscal: "", 
  ponto_focal: "",
  cidade: "", 
  objeto_contrato: "", 
  items: [
      // {
      //     titulo: "Item 2", 
      //     unidade_medida: "PF",
      //     valor_unitario: "50.00", 
      //     saldo_quantidade_contratada: "100"
      // }
  ]
       }  
    

   }
})

const voltarListagem = () => {
    router.push({ name: 'Contratos' });
}

const loading =  ref(false);

const openListItems = ref(false)
const toggleOpenListItems = () => {
    openListItems.value =  !openListItems.value
}

const exibirModal = ref(false);
let form = reactive({
    id: 1,
    nome_cliente: "", 
    vigencia: "", 
    saldo_contrato: "", 
    fiscal: "", 
    ponto_focal: "",
    cidade: "", 
    objeto_contrato: "", 
    items: [
        // {
        //     titulo: "Item 2", 
        //     unidade_medida: "PF",
        //     valor_unitario: "50.00", 
        //     saldo_quantidade_contratada: "100"
        // }
    ]
})

const showExibirModalItems = () => {
    exibirModal.value = true;
};

const closeModal = () => {
    exibirModal.value = false;
//     toast("Hello! Wow so easy!", {
//   theme: "colored",
//   type: "success",
// })

};

const saveItem = () => {
    console.log('entrouItem', form)
}

const saveContrato = () => {
    console.log('entrou', form)
    loading.value =  true;
   
    localStorage.setItem('contrato', JSON.stringify(form))
    voltarListagem()
    // router.push({ name: 'Contratos' });


  
//     api.post(`/contracts`, form).then((response)=>{
//         console.log(response, 'resposta')
//         toast("Contrato  cadastrado  com  sucesso!", {
//   theme: "colored",
//   type: "success",
  
//    })
      
//     }).catch((erro)=> {
//          console.log(erro, 'erro')
//          toast("Não   foi  possível  cadastrar  o contrato!", {
//   theme: "colored",
//   type: "error",
  
//    })
//     })
}

</script>

<style scoped>

.form-contrato {
    width: 70%;
}

.btn-contrato {
    background-color: var(--bluePrimary);
    border-radius: 9px;
    color: var(--whiteLight);
    font-weight: 500;
    width: 100%;
    height: 40px;
  }

  .btn-contrato:hover {
    background-color: #0ea5e9;
  }

  .btn-item {
    background-color: var(--bluePrimary);
  }

  .btn-item:hover {
    background-color: #0ea5e9;
  }

  .btn-submit-contrato{
    background-color: var(--bluePrimary);
    border-radius: 9px;
    color: var(--whiteLight);
    font-weight: 500;
    width: 160px;
    height: 40px;
  }

  .btn-submit-contrato:hover{
    background-color: #0ea5e9;
  }

</style>
