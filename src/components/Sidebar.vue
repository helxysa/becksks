<template>
  <aside id="logo-sidebar" class="bg-white rounded-md">
    <section class="flex flex-col items-center justify-center bg-white">
       <img
         class="h-[73px] mx-10 mb-10"
         src="../assets/imagens/logoMSB.png"
         alt="MSB Logo"
       />
       <div class="border-b w-[90%] border-blue-300"></div>
     </section>

     <div class="pt-12 overflow-y-auto bg-white flex justify-center">
      <ul class="space-y-8">
        <li v-for="route in accessibleRoutes" :key="route.path">
          <a
            @click.prevent="navigateTo(route.path)"
            :href="route.path"
            class="flex items-center p-4 text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-400 group"
          >
            <Icon :icon="route.icon" height="20" />
            <span class="ms-3 text-3xl font-bold">{{ route.label }}</span>
          </a>
        </li>
      </ul>
    </div>
   </aside>
 </template>

 <script setup>
 import { Icon } from '@iconify/vue';
 import { RouterLink } from 'vue-router';
 import { computed } from 'vue'
 import { useProfileStore } from '@/stores/ProfileStore';
 import { useRouter } from 'vue-router';

 const router = useRouter();
 const store = useProfileStore()
 const routes = [
  {
    path: '/',
    label: 'Dashboard',
    icon: 'mdi:graph-pie',
    permission: null
  },
  {
    path: '/contratos',
    label: 'Contratos',
    icon: 'eos-icons:project',
    permission: { name: 'contratos', canView: true }
  },
  {
    path: '/perfis',
    label: 'Perfis',
    icon: 'eos-icons:admin-outlined',
    permission: { name: 'perfil', canAccess: ['canView', 'canEdit', 'canCreate', 'canDelete'] }
  },
  {
    path: '/usuarios',
    label: 'Usuários',
    icon: 'mdi:account-group',
    permission: { name: 'usuarios', canAccess: ['canView', 'canEdit', 'canCreate', 'canDelete'] }
  }
]

function hasPermission(permission) {
  if (!permission) return true

  return store.profile.permissions.some((item) => {
    if (item.name !== permission.name) return false
    if (permission.canView) return item.canView === true
    if (permission.canAccess) return permission.canAccess.some((perm) => item[perm] === true)
    return false
  })
}

const accessibleRoutes = computed(() => routes.filter(route => hasPermission(route.permission)))

function navigateTo(routePath) {
  // window.location.href = routePath
  router.push(routePath)
}
</script>
