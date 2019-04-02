<template>
<v-list class="menu-iprint">
<div v-for="item in itemsComputed" :key="item.title" 
  :class="item.title === 'logout' ? 'logout' : false">
  <!-- Item menu -->
  <v-list-tile v-if='item.show' :class="$route.fullPath === item.url ? 'active-list' : false" >
      <v-list-tile-content>
          <v-list-tile-title v-on="item.click != undefined ? {'click':item.click} : {}">
              <router-link :to="item.url" class="blue-text-unefa">
                  <v-list-tile-title>
                      {{ item.title }}
                  </v-list-tile-title>
              </router-link>
          </v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action  v-on="item.click != undefined ? {'click':item.click} : {}">
          <router-link :to="item.url">
              <v-icon :size="item.size">{{ item.icon }}</v-icon>
          </router-link>
      </v-list-tile-action>
  </v-list-tile>
  <!-- Sub-item menu-->
    <!-- :value="item.sub.find(o=>o.url === $route.fullPath) !== undefined" -->
  <v-list-group
    :prepend-icon="item.icon"
    append-icon="fa-chevron-down"
    v-if="item.sub" 
    class="blue-text-unefa">
    <v-list-tile slot="activator">
      <v-list-tile-title >{{ item.title }} </v-list-tile-title>
    </v-list-tile>
    <v-list-tile
      v-for="sub in item.sub" :key="sub.title"
      v-on="sub.click != undefined ? {'click':sub.click} : {}"
      :to="sub.url"
      :class="{
        'pl-0': $vuetify.breakpoint.xsOnly || $parent.miniVariant,
        'pl-4': $vuetify.breakpoint.smAndUp && !$parent.miniVariant,
        'active-list': $route.fullPath === sub.url ? true : false
      }"
    >
      <v-list-tile-title>{{ sub.title }}</v-list-tile-title>
      <v-list-tile-action>
        <v-icon>{{sub.icon}}</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list-group>
</div>
</v-list>
</template>

<script>
/**
* Format to pass the icon and the URL in the sidebar.
* e.g.:
* {
*   url: '/item',
*   title: 'item',
*   icon: 'item',
*   show: bool,//In case need validation for show
*   // In the case of sub item
*   sub: [
*     {
*       url: '/sub-item',
*       title: 'sub-item',
*       icon: 'sub-item',
*       show: bool
*     }
*   ]
* }
*/
export default {
  data () {
    return {
        items: [
        { 
          title: 'Tablero', 
          icon: 'fa-dashboard', 
          url: '/home',
          show: false
        },
        { 
          title: 'Empleados', 
          icon: 'fa-people', 
          show: true,
          url: '/employers'
        },
        { 
          title: 'Departamentos', 
          icon: 'fa-dashboard', 
          show: true,
          url: '/departments'
        },  
        { 
          title: 'Permisos Laborales', 
          icon: 'fa-dashboard', 
          url: '/permisions',
          show: true
        },  
        { 
          title: 'Reposos Medicos', 
          icon: 'fa-dashboard', 
          show: true,
          url: '/medicalrest'
        },  
        { 
          title: 'Control E&S', 
          icon: 'fa-people', 
          show: true,
          url: '/internalcontrol'
        }, 
        { 
          title: 'Reportes', 
          icon: 'fa-people', 
          url: '/reports',
          show: true
        },
        { 
          title: 'Usuarios del sistema', 
          icon: 'fa-people', 
          url: '/usersystem',
          show: this.$store.getters.isSuperUser
        },
      ],
    }
  },
  mounted() {
   
  },
  methods:{
    
  },
  computed:{
    itemsComputed(){
      console.log(this.items)
      return this.items.filter(o => o.show === true)
    }
  }
};
</script>
