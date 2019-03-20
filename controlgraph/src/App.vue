<template>
  <v-app>
    <!-- Asi se prohibe algo si el usuario esta o no autenticado -->
    <headmain v-if="$store.getters.isAuth"></headmain>
    <v-content>
      <!-- Se cambia de HelloWord al router-view para que tome las vistas del router -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
//Importar los CSS por aqui
import './assets/css/style.css'

import head from './components/NavBar/NavBar.vue'
export default {
  name: 'App',
  components:{
    headmain:head,
  }
}
</script>
