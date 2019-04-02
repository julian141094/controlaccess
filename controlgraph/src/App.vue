<template>
  <v-app>
    <!-- Asi se prohibe algo si el usuario esta o no autenticado -->
    <headmain v-if="$store.getters.isAuth"></headmain>
    <v-content>
      <!-- Se cambia de HelloWord al router-view para que tome las vistas del router -->
      <router-view/>
      <v-snackbar
        v-model="active"
        :dismissible="true"
        :color="$store.getters.alerttype"
        right
        :timeout="6000"
      >
        {{ $store.getters.alerttext }}
      </v-snackbar>
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
  },
  data(){
    return {
      active:false
    }
  },
  watch:{
    '$store.getters.alerttext': {
      handler(val){
        if(val != ""){
          this.active = true
        }
      }
    },
    active(val){
      if(!val){
        this.$store.dispatch('alert',{
          active:false,
          type:"success",
          text:""
        })
      }
    }
  }
}
</script>
