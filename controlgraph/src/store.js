import Vue from 'vue'
import Vuex from 'vuex'
import Routes from './plugins/backroutes.js'
import user from './plugins/user.js'


Vue.use(Vuex)

export default new Vuex.Store({
  //Para incluir el plugin de las rutas, backroutes.js
  modules: {
    route: Routes,
    user:user
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
