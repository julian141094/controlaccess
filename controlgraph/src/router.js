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
    // {
    //   path: '/registeremployer',
    //   name: 'registerEmployer',
    //   component: RegisterEmployer
    // },
    {
      path: '/employers',
      name: 'Employers',
      component: Employers
    },
    {
      path: '/departments',
      name: 'Departments',
      component: Departments
    },
    {
      path: '/permisions',
      name: 'Permisions',
      component: Permisions
    },
    {
      path: '/medicalrest',
      name: 'MedicalRest',
      component: MedicalRest
    },
    {
      path: '/servicescommission',
      name: 'ServicesCommission',
      component: ServicesCommission
    }
  ]
})
