import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import RegisterEmployer from './components/employers/registerEmployer.vue'
import Employers from './components/employers/Employers.vue'
import qr from './components/control/control.vue'
import Departments from './components/departments/Departments.vue'
import Permisions from './components/permisions/Permisions.vue'
import MedicalRest from './components/medicalRest/MedicalRest.vue'
import ServicesCommission from './components/servicescommission/ServicesCommission.vue'
import InternalControl from './components/internalControl/InternalControl.vue'
import Userss from './components/users/userss.vue'
import usersystem from './components/usersystem/userSystem.vue'
import store from './store.js'

Vue.use(Router)

// to, from y next son parametros internos que maneja vue
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuth) {
    next()
    return
  }
  next('/')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: qr
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
       path: '/registeremployer',
       name: 'registerEmployer',
       component: RegisterEmployer
    },
    {
      path: '/employers',
      name: 'Employers',
      component: Employers,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/usersystem',
      name: 'usersystem',
      component: usersystem,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/departments',
      name: 'Departments',
      component: Departments,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/users',
      name: 'Userss',
      component: Userss,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/permisions',
      name: 'Permisions',
      component: Permisions,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/medicalrest',
      name: 'MedicalRest',
      component: MedicalRest
    },
    {
      path: '/servicescommission',
      name: 'ServicesCommission',
      component: ServicesCommission,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/internalcontrol',
      name: 'InternalControl',
      component: InternalControl,
      beforeEnter: ifAuthenticated
    }
  ]
})
