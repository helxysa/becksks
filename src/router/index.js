import { createRouter, createWebHistory } from "vue-router";

// const ViewContrato = () => import("../components/list/ViewContrato.vue");
// import Register from "@/pages/Register.vue";
const DashboardPage = () => import("../pages/DashboardPage/DashboardPage.vue");
const ContratosPage = () => import("../pages/ContratosPage/ContratosPage.vue");
const RelatorioPage = () => import("../pages/Relatorio/RelatoriosPage.vue");
const FormContratosPage = () => import("../components/form/FormCadastros.vue");
const FormContratosEdit = () =>
  import("../components/form/FormCadastrosEdit.vue");
const ViewContratoTabs = () =>
  import("../pages/ContratosPage/VisualizarContrato/ContratoTabs.vue");
const ViewTermoAditivoPage = () =>
  import(
    "../pages/ContratosPage/VisualizarTermoAditivo/VisualizarTermoAditivo.vue"
  );
const PerfisPage = () => import("../pages/PerfisPage/PerfisPage.vue");
const FormAditive = () => import("../components/form/FormAditive.vue");
const PrestacaoServicos = () =>
  import("../pages/PrestacaoServicos/PrestacaoPage.vue");
const FormContratoPJPage = () =>
  import("../pages/PrestacaoServicos/FormContratoPJPage.vue");
const ContratoPJ = () => import("../pages/PrestacaoServicos/ContratoPJ.vue");
const ContratoCLTPage = () =>
  import("../pages/ContratosCLTPage/ContratoCLTPage.vue");
const FormContratoCLTPage = () =>
  import("../pages/ContratosCLTPage/FormContratoCLTPage.vue");

import Login from "@/pages/Login/Login.vue";
import ChangePassword from "@/pages/Login/ChangePassword.vue";
import ResetPassword from "@/pages/Login/ResetPassword.vue";
import UsersPage from "@/pages/UsersPage/UsersPage.vue";
import EditAditivoForm from "@/components/EditAditivoForm.vue";
import LogView from "@/pages/LogsPage/LogView.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/alterar-senha",
    name: "ChangePassword",
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: "/esqueci-minha-senha",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/contratos/pj",
    name: "listagem-contratos-pj",
    component: PrestacaoServicos,
    meta: { requiresAuth: true },
  },
  {
    path: "/cadastro/contratos/pj",
    name: "FormContratoPJ",
    component: FormContratoPJPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos/pj/:id",
    name: "contrato-detalhes",
    component: ContratoPJ,
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos/clt",
    name: "contratos-clt",
    component: ContratoCLTPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos/clt/novo",
    name: "novo-contrato-clt",
    component: FormContratoCLTPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos/clt/editar/:id",
    name: "EditarContratoCLT",
    component: () => import("@/pages/ContratosCLTPage/FormContratoCLTPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos/pj/:id/editar",
    name: "contrato-editar",
    component: FormContratoPJPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos",
    name: "Contratos",
    component: ContratosPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/cadastro/contratos",
    name: "Formulário Contratos",
    component: FormContratosPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/editar/contratos/:id",
    name: "editarcontrato",
    component: FormContratosEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/editar/termo/:id",
    name: "editartermo",
    component: EditAditivoForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/cadastro/contratos/aditivo/:id",
    name: "Formulário Aditivo",
    component: FormAditive,
    meta: { requiresAuth: true },
  },

  {
    path: "/visualizar/contratos/:id",
    name: "visualizarContrato",
    component: ViewContratoTabs,
    meta: { requiresAuth: true },
  },
  {
    path: "/visualizar/termoAditivo/:id",
    name: "visualizarTermoAditivo",
    component: ViewTermoAditivoPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/relatorio",
    name: "Relatório",
    component: RelatorioPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/perfis",
    name: "Perfis",
    component: PerfisPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: UsersPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/logs",
    name: "Log",
    component: LogView,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/contratos/termo-aditivo/:id/editar',
  //   name: 'EditarTermoAditivo',
  //   component: () => import('../pages/ContratosPage/EditarTermoAditivo/EditarTermoAditivo.vue'),
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   },
  //   beforeEnter: async (to, from, next) => {
  //     next();
  //   }
  // },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Dashboard" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("profileUser") || "{}");

  // Rotas públicas que não devem ser redirecionadas mesmo para usuários prestadores
  const publicRouteNames = ["Login", "ResetPassword", "ChangePassword"];
  const publicPaths = ["/login", "/esqueci-minha-senha"]; // ajuste conforme necessário

  // Se a rota requer autenticação e não há token, redireciona para o login.
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next("/login");
    return;
  }

  // Se a rota for pública, não fazemos o redirecionamento
  if (
    publicRouteNames.includes(to.name) ||
    publicPaths.some((path) => to.path.startsWith(path))
  ) {
    next();
    return;
  }

  // Se o usuário for um prestador de serviços
  if (user.prestadorServicos) {
    // Verifica se o path começa com "/contratos/pj/"
    if (to.path.startsWith("/contratos/pj/")) {
      const routeContractId = to.params.id;
      if (routeContractId !== user.contratoPjId.toString()) {
        next({ name: "contrato-detalhes", params: { id: user.contratoPjId } });
        return;
      }
    } else {
      // Redireciona para o contrato do prestador de serviços se não estiver na rota correta
      next({ name: "contrato-detalhes", params: { id: user.contratoPjId } });
      return;
    }
  }

  next();
});

export default router;
