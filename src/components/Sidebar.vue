<template>
  <aside id="logo-sidebar" class="bg-white rounded-md shadow-md">
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
          <router-link
            :to="route.path"
            class="flex items-center p-4 rounded-lg hover:bg-[#1e40afd7] hover:text-white transition duration-100 ease-in-out group"
            active-class="bg-[#1E3A8A] text-white shadow-md"
          >
            <Icon :icon="route.icon" height="20" />
            <span class="ms-3 text-2xl font-bold">{{ route.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useProfileStore } from "@/stores/ProfileStore";
import { RouterLink } from "vue-router";

const store = useProfileStore();

const routes = [
  {
    path: "/",
    label: "Dashboard",
    icon: "mdi:graph-pie",
    permission: { name: "dashboard", action: "Visualizar" },
  },
  {
    path: "/contratos",
    label: "Contratos",
    icon: "eos-icons:project",
    permission: { name: "contratos", action: "Visualizar" },
  },
  {
    path: "/contratos/pj",
    label: "Prestação de Serviços",
    icon: "eos-icons:project",
    permission: { name: "prestacao_servico", action: "Visualizar" },
  },
  {
    path: "/contratos/clt",
    label: "Colaboradores (CLT)",
    icon: "eos-icons:project",
    permission: { name: "contratos", action: "Visualizar" },
  },
  
 
  {
    path: "/perfis",
    label: "Perfis",
    icon: "eos-icons:admin-outlined",
    permission: {
      name: "perfil",
      actions: ["Visualizar", "Editar", "Criar", "Deletar"],
    },

  },
  {
    path: "/usuarios",
    label: "Usuários",
    icon: "mdi:account-group",
    permission: {
      name: "usuarios",
      actions: ["Visualizar", "Editar", "Criar", "Deletar"],
    },
  },
  {
    path: "/logs",
    label: "Registros",
    icon: "mdi:account-group",
    permission: {
      name: "registros",
      actions: ["Visualizar"],
    },
  },
  {
    path: "/relatorio",
    label: "Relatório",
    icon: "eos-icons:project",
    permission: { name: "relatorios", action: "Visualizar" },
  },
];  

function hasPermission(permission) {
  if (!permission) return true;

  return store.profile.permissions.some((item) => {
    if (item.name !== permission.name) return false;

    if (permission.action) {
      return item.actions && item.actions[permission.action] === true;
    }

    if (permission.actions) {
      return item.actions && permission.actions.some((action) => item.actions[action] === true);
    }

    return false;
  });
}

// Se o usuário for prestador, atualize dinamicamente a rota de "Prestação de Serviços"
const accessibleRoutes = computed(() => {
  const user = JSON.parse(localStorage.getItem("profileUser") || "{}");
  return routes.map((route) => {
    if (route.label === "Prestação de Serviços" && user && user.prestadorServicos) {
      return {
        ...route,
        path: `/contratos/pj/${user.contratoPjId}`,
        permission: { ...route.permission, action: ["Visualizar Contrato"] },
      };
    }
    return route;
  }).filter((route) => hasPermission(route.permission));
});

// const accessibleRoutes = computed(() =>
//   routes.filter((route) => hasPermission(route.permission))
// );
</script>
