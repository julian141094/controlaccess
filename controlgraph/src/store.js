import Vue from 'vue'
import Vuex from 'vuex'
import Routes from './plugins/backroutes.js'

Vue.use(Vuex)

export default new Vuex.Store({
  //Para incluir el plugin de las rutas, backroutes.js
  modules: {
    route: Routes
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
