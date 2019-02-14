import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import RegisterEmployer from './components/employers/registerEmployer.vue'
import Employers from './components/employers/Employers.vue'
import qr from './components/control/control.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: qr
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/registeremployer',
      name: 'registerEmployer',
      component: RegisterEmployer
    },
    {
      path: '/employers',
      name: 'Employers',
      component: Employers
    }
  ]
})
