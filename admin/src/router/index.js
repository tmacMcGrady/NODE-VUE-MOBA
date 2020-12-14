import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEditer from '../views/CategoryEditer'
import CategoryList from '../views/CategoryList'

import ItemEditer from '../views/ItemEdit'
import ItemList from '../views/ItemList'

import HeroEditer from '../views/HeroEdit'
import HeroList from '../views/HeroList'
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
      },
      {
        path:'/categories/edit/:id', //两个页面运用同一个组件
        component: CategoryEditer, 
        props:true //能在这个组价中直接使用id作为props
      },
      {
        path:'/categories/list',
        component: CategoryList
      },
      {
        path:'/items/create',
        component: ItemEditer
      },
      {
        path:'/items/edit/:id', //两个页面运用同一个组件
        component: ItemEditer, 
        props:true //能在这个组价中直接使用id作为props
      },
      {
        path:'/items/list',
        component: ItemList
      },
      {
        path:'/heroes/create',
        component: HeroEditer
      },
      {
        path:'/heroes/edit/:id', //两个页面运用同一个组件
        component: HeroEditer, 
        props:true //能在这个组价中直接使用id作为props
      },
      {
        path:'/heroes/list',
        component: HeroList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
