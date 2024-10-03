import { createRouter, createWebHistory } from "vue-router";

// const ViewContrato = () => import("../components/list/ViewContrato.vue");
// import Register from "@/pages/Register.vue";
const DashboardPage = () => import("../pages/DashboardPage/DashboardPage.vue");
const ContratosPage = () => import("../pages/ContratosPage/ContratosPage.vue");
const FormContratosPage = () => import("../components/form/FormCadastros.vue");
const FormContratosEdit = () => import("../components/form/FormCadastrosEdit.vue");
const ViewContratoTabs = () => import("../pages/ContratosPage/VisualizarContrato/ContratoTabs.vue");
const PerfisPage = () => import("../pages/PerfisPage/PerfisPage.vue");
import Login from "@/pages/Login/Login.vue";
import ChangePassword from "@/pages/Login/ChangePassword.vue";
import ResetPassword from "@/pages/Login/ResetPassword.vue";
import UsersPage from '@/pages/UsersPage/UsersPage.vue';

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
  },
  {
    path: "/alterar-senha",
    name: "ChangePassword",
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: '/esqueci-minha-senha',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  // {
  //   path: "/cadastro",
  //   component: Register,
  // },
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
    path: "/cadastro/contratos/:id",
    name: "editarcontrato",
    component: FormContratosEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/visualizar/contratos/:id",
    name: "visualizarContrato",
    component: ViewContratoTabs,
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
    path: "/:pathMatch(.*)*",
    redirect: '{ name: "Dashboard" }',
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
