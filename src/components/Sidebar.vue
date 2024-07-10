<template>
   <aside id="logo-sidebar" class="fixed top-0 left-0 z-10 w-72 h-screen pt-20 mt-16 transition-transform -translate-x-full bg-white border-r-[12px] border-blue-200 sm:translate-x-0" aria-label="Sidebar">
     <div class="h-full pt-12 overflow-y-auto bg-white flex justify-center w-full">
       <ul class="space-y-8">
         <li>
           <router-link to="/" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-500 group">
             <Icon icon="mdi:graph-pie" height="20"/>
             <span class="ms-3 text-3xl font-bold">Dashboard</span>
           </router-link>
         </li>
         <li>
           <router-link to="/contratos" class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-500 group">
             <Icon icon="eos-icons:project" height="20"/>
             <span class="ms-3 text-3xl font-bold">Contratos</span>
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
