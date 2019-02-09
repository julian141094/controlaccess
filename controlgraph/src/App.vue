<template>
  <v-app>
    <headmain></headmain>
    <v-content>
      <!-- Se cambia de HelloWord al router-view para que tome las vistas del router -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import head from './components/NavBar/NavBar.vue'
export default {
  name: 'App',
  components:{
    headmain:head,
  }
}
</script>
