<template>
  <div class="w-20 h-10"></div>
    <nav class="fixed top-0 z-50 w-full bg-white border-b-8 border-blue-100 h-32 mb-20">
      <div class="card">
        <MegaMenu :model="items" class="p-4 bg-surface-0 h-32" >
            <template #start>
              <a href="#" class="flex ms-2 md:me-24">
                <img src="../assets/imagens/logoMSB.png" class="h-22 me-3" alt="MSB Logo" />
              </a>
                <!-- <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
                    <path
                        d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                        fill="var(--p-primary-color)"
                    />
                    <path
                        d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                        fill="var(--p-text-color)"
                    />
                </svg> -->
            </template>
            <template #item="{ item }">


                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom

               >
                 <div class="h-16 flex items-center justify-center mr-8 text-gray-900 rounded-lg  hover:bg-blue-50 hover:text-blue-500 ">

                   <a v-ripple :href="href" @click="navigate" >
                       <span :class="item.icon" />
                       <span class="ml-2 text-3xl font-bold sm:hidden">{{ item.label }}</span>
                   </a>
                 </div>
              </router-link>
              <a v-else v-ripple :href="item.url" :target="item.target" class="text-gray-900 rounded-lg  hover:bg-blue-50 hover:text-blue-500 " >
                  <span :class="item.icon" />
                  <span class="ml-2 text-3xl font-bold">{{ item.label }}</span>
              </a>

                <!-- <a v-if="item.root" v-ripple class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg uppercase" style="border-radius: 2rem">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
                <a v-else-if="!item.image" class="flex items-center p-4 cursor-pointer mb-2 gap-3">
                    <span class="inline-flex items-center justify-center rounded-full bg-primary text-primary-contrast w-12 h-12">
                        <i :class="[item.icon, 'text-lg']"></i>
                    </span>
                    <span class="inline-flex flex-col gap-1">
                        <span class="font-bold text-lg">{{ item.label }}</span>
                        <span class="whitespace-nowrap">{{ item.subtext }}</span>
                    </span>
                </a>
                <div v-else class="flex flex-col items-start gap-4 p-2">
                    <img alt="megamenu-demo" :src="item.image" class="w-full" />
                    <span>{{ item.subtext }}</span>
                    <Button :label="item.label" outlined />
                </div> -->
            </template>
            <template #end>
                <div class="flex items-center gap-4">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="xlarge"/>
                  <span @click="logout" class="mr-4 hover:underline hover:text-blue-400 cursor-pointer">Sair</span>
                </div>
              </template>
        </MegaMenu>
    </div>
        <!-- <div class="px-3 py-7 lg:px-5 lg:pl-3 ">
          <div class="flex items-center justify-between">

            <div class="flex items-center justify-center rtl:justify-end ml-6">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                  <span class="sr-only">Open sidebar</span>
                  <svg class="w-10 h-10 mr-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
               </button>
              <a href="#" class="flex ms-2 md:me-24">
                <img src="../assets/imagens/logoMSB.png" class="h-22 me-3" alt="MSB Logo" />
              </a>
            </div>

            <div class="flex items-center">
                <div class="flex items-center ms-3">
                  <div>
                    <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span class="sr-only">Open user menu</span>
                      <img class="w-14 h-14 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
                    </button>
                  </div>
                  <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                    <div class="px-4 py-3" role="none">
                      <p class="text-sm text-gray-900" role="none">
                        Neil Sims
                      </p>
                      <p class="text-sm font-medium text-gray-900 truncate" role="none">
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Earnings</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div> -->
      </nav>
</template>

<script setup>
import { ref } from 'vue';
import MegaMenu from 'primevue/megamenu';
import Avatar from 'primevue/avatar';
import { useRouter } from "vue-router";
import { isAuthenticated } from '@/state/auth';
const router = useRouter();

const  isOpenSidebar = ref(false);
const toogleSidebar = () => {
    isOpenSidebar.value = !isOpenSidebar.value
}

const items = ref([
    {
        label: 'Dashboard',
        root: true,
        route: '/',

    },
    {
        label: 'Contratos',
        root: true,
        route: '/contratos',
    },

]);

const logout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
  router.push('/login');
}

</script>

<style scoped>

</style>
