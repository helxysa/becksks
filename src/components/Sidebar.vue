<template>
  <aside id="logo-sidebar" class="bg-white rounded-md">
    <section class="flex flex-col items-center justify-center bg-white">
       <img
         class="h-22 m-10"
         src="../assets/imagens/logoMSB.png"
         alt="MSB Logo"
       />
       <div class="border-b w-[90%] border-blue-300"></div>
     </section>

     <div class="pt-12 overflow-y-auto bg-white flex justify-center">
       <ul class="space-y-8">
         <li>
           <router-link to="/" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-400 group">
             <Icon icon="mdi:graph-pie" height="20"/>
             <span class="ms-3 text-3xl font-bold">Dashboard</span>
           </router-link>
         </li>
         <li>
           <router-link to="/contratos" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-400 group">
             <Icon icon="eos-icons:project" height="20"/>
             <span class="ms-3 text-3xl font-bold">Contratos</span>
           </router-link>
         </li>
         <!-- <li>
           <router-link to="/perfis" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-400 group">
             <Icon icon="eos-icons:admin-outlined" height="20"/>
             <span class="ms-3 text-3xl font-bold">Perfis</span>
           </router-link>
         </li>
         <li>
           <router-link to="/usuarios" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-400 group" >
             <Icon icon="mdi:account-group" height="20" />
             <span  class="ms-3 text-3xl font-bold">Usuários</span>
           </router-link>
         </li> -->
       </ul>
     </div>
   </aside>
 </template>

 <script setup>
 import { Icon } from '@iconify/vue';
 import { RouterLink } from 'vue-router';
 </script>
