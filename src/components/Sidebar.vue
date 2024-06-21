<template>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-80 h-screen pt-20 mt-16 transition-transform -translate-x-full bg-white border-r-8 border-blue-100 sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full pt-12 overflow-y-auto bg-white flex justify-center w-full">
           <ul class="space-y-8">
              <li>
                 <router-link to="/" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-500 group">
                   <router-view>
                       <!-- <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                       </svg> -->
                       <!-- <Icon icon="material-symbols:space-dashboard" height="20"/> -->
                       <Icon icon="mdi:graph-pie"  height="20"/>
                       <span class="ms-3 text-3xl font-bold">Dashboard</span>
                   </router-view>
                 </router-link>
              </li>
              <li>
                <router-link to="/contratos" class="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-blue-50 hover:text-blue-500  group">
                   <router-view>
                       <Icon icon="eos-icons:project"  height="20" />
                       <span class="ms-3 text-3xl font-bold">Contratos</span>
                   </router-view>
                </router-link>
             </li>
           </ul>
        </div>
     </aside>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';

</script>

<style  scoped>

</style>
