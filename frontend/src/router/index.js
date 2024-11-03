import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Admin from '../pages/Admin.vue'
import User from '../pages/User.vue'
import EditBook from '../components/EditBook.vue'
import store from '../store'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (store.state.user && store.state.user.is_admin) {
        next()
      } else {
        next('/login')
      }
    },
  },
  {
    path: '/edit-book/:id',
    name: 'EditBook',
    component: EditBook,
  },
  {
    path: '/user',
    component: User,
    beforeEnter: (to, from, next) => {
      if (store.state.user && !store.state.user.is_admin) {
        next()
      } else {
        next('/login')
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
