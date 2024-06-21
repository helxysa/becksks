import {  createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("../pages/HomePage/HomePage.vue")
const ContratosPage = ()=> import ("../pages/ContratosPage/ContratosPage.vue")
const FormContratosPage = () => import("../components/form/FormCadastros.vue")
const ViewContrato = () => import("../components/list/ViewContrato.vue")

const  routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },

    {
    path: '/contratos',
    name: 'Contratos',
    component: ContratosPage,
   },

   {
    path: '/cadastro/contratos',
    name: 'Formulário Contratos',
    component: FormContratosPage,
   },

   {
    path: '/cadastro/contratos/:id',
    name: 'editarcontrato',
    component: FormContratosPage,
    },

    {
        path: '/visualizar/contratos/:id',
        name: 'visualizarContrato',
        component: ViewContrato,
        },

   {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'Home'}
  }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export  default router
