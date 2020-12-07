import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEditer from '../views/CategoryEditer'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path:'/categories/create',
        component: CategoryEditer
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
