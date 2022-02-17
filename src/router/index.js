import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PatientList from '../views/patient-list.vue'
import PatientCreate from '../views/patient-create.vue'
import PatientEdit from '../views/patient-edit.vue'
import IssueList from '../views/issue-list.vue'
import IssueCreate from '../views/issue-create.vue'
import IssueEdit from '../views/issue-edit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/patient/list/:page',
    name: 'patient-list',
    component: PatientList
  },{
    path: '/patient/create',
    name: 'patient-create',
    component: PatientCreate
  },{
    path: '/patient/edit/:id',
    name: 'patient-edit',
    component: PatientEdit
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/catch/list/:page',
    name: 'issue-list',
    component: IssueList
  },{
    path: '/catch/create',
    name: 'issue-create',
    component: IssueCreate
  },{
    path: '/catch/edit/:id',
    name: 'issue-edit',
    component: IssueEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
