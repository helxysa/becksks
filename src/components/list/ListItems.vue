<template>
    <tr class=" grid grid-cols-5 gap-4 mb-4 justify-items-center items-center h-20" v-for="item in  items" :key="item.name">
            <td class="text-2xl ">{{ contrato.name }}</td>
            <td class="text-2xl ">{{ contrato.data }}</td>
            <td class="text-2xl ">{{ contrato.pontos }}</td>
            <td class="text-2xl flex gap-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" cursor="pointer">
                <path fill="currentColor" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9" />
              </svg>

              <router-link to="/cadastro/contratos/${contrato.id}">
                <router-view>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" cursor="pointer">
                    <path fill="#777" d="m21.561 5.318l-2.879-2.879A1.495 1.495 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06M11.5 14.672L9.328 12.5l6.293-6.293l2.172 2.172zm-2.561-1.339l1.756 1.728L9 15zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289c-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29c.464-.19.896-.347 1.188-.64L16 13zm2.5-11.328L16.328 5.5l1.293-1.293l2.171 2.172z" />
                  </svg>

                </router-view>

              </router-link>


                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" cursor="pointer" @click="excluirContrato(contrato)">
                  <path fill="currentColor" d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z" />
                </svg>

            </td>


    </tr>
    <!-- <JetDialogModal
    :show="excluirModal"
    @close="closeModal"
    :withouHeader="true"
    >
    <template #title>

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

        >
            Sim
        </button>
    </div>


    </template>


    </JetDialogModal> -->

</template>

<script setup >
import { Icon } from '@iconify/vue';
import { ref, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { toast } from 'vue3-toastify';
import JetDialogModal from '@/components/modals/DialogModal.vue'

// const contrato = ref({})
// const excluirModal = ref(false);

// const  excluirContrato = (contratoExcluido) => {
//    contrato.value = contratoExcluido
//    excluirModal.value = true
// }

// const  closeModal = ()=> {
//    excluirModal.value = false
// }

// const contratos =  ref([

//     {
//         id:1,
//         name: 'contrato1',
//         data: '12/05/2024',
//         pontos:  5,

//     },

// ])


</script>

<style scoped>
.btn-item {
  background-color: var(--bluePrimary);

}

.btn-item:hover {
  background-color: #0ea5e9;
}
</style>
