import { createRouter, createWebHistory } from "vue-router";

const DashboardPage = () => import("../pages/DashboardPage/DashboardPage.vue");
const ContratosPage = () => import("../pages/ContratosPage/ContratosPage.vue");
const FormContratosPage = () => import("../components/form/FormCadastros.vue");
const FormContratosEdit = () =>
  import("../components/form/FormCadastrosEdit.vue");
// const ViewContrato = () => import("../components/list/ViewContrato.vue");
const ViewContratoTabs = () => import("../pages/ContratosPage/VisualizarContrato/ContratoTabs.vue");
// import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";

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
