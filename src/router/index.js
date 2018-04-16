import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from  '@/components/Login'
import SignUp from  '@/components/SignUp'
import Address from  '@/components/Address'
import Checkout from  '@/components/Checkout'
import Finish from  '@/components/Finish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish,
    },
  ]
})
