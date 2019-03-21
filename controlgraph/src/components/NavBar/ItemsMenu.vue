<template>
<v-list class="menu-iprint">
<div v-for="item in items" :key="item.title" 
  :class="item.title === 'logout' ? 'logout' : false">
  <!-- Item menu -->
  <v-list-tile v-if="!item.sub" :class="$route.fullPath === item.url ? 'active-list' : false" >
      <v-list-tile-content>
          <v-list-tile-title v-on="item.click != undefined ? {'click':item.click} : {}">
              <router-link :to="item.url">
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
    v-if="item.sub">
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
        // imageUrl:'',
        // username: '',
        // groups: "",
        items: [
        { 
          title: 'Tablero', 
          icon: 'fa-dashboard', 
          url: '/home'
        },
        // { 
        //   title: 'Trabajadores', 
        //   icon: 'fa-poll-people',
        //   sub:[
            { 
              title: 'Empleados', 
              icon: 'fa-people', 
              url: '/employers'
            },
            { 
              title: 'Usuarios del sistema', 
              icon: 'fa-people', 
              url: '/usersystem'
            },
        //   ]
        // },  
        { 
          title: 'Permisos Laborales', 
          icon: 'fa-dashboard', 
          url: '/permisions'
        },  
        { 
          title: 'Reposos Medicos', 
          icon: 'fa-dashboard', 
          url: '/medicalrest'
        },  
        { 
          title: 'Comisión de Servicios', 
          icon: 'fa-dashboard', 
          url: '/servicescommission'
        },
        { 
          title: 'Control E&S', 
          icon: 'fa-people', 
          url: '/internalcontrol'
        }, 
        // { 
        //   title: 'Entrada y Salida', 
        //   icon: 'fa-poll-people',
        //   sub:[
            // { 
            //   title: 'Departamentos', 
            //   icon: 'fa-dashboard', 
            //   url: '/departments'
            // },   
            // { 
            //   title: 'Permisos Laborales', 
            //   icon: 'fa-dashboard', 
            //   url: '/permisions'
            // },  
            // { 
            //   title: 'Reposos Medicos', 
            //   icon: 'fa-dashboard', 
            //   url: '/medicalrest'
            // },  
            // { 
            //   title: 'Comisión de Servicios', 
            //   icon: 'fa-dashboard', 
            //   url: '/servicescommission'
            // }, 
        //   ]
        // },
        { 
          title: 'Reportes', 
          icon: 'fa-poll-people',
          sub:[
            // { 
            //   title: 'Empleados', 
            //   icon: 'fa-dashboard', 
            //   url: '/home'
            // },
            // { 
            //   title: 'Entradas y Salidas', 
            //   icon: 'fa-dashboard', 
            //   url: '/home'
            // },
            // { 
            //   title: 'Permisos Personales', 
            //   icon: 'fa-dashboard', 
            //   url: '/home'
            // },
            // { 
            //   title: 'Reposos Médicos', 
            //   icon: 'fa-dashboard', 
            //   url: '/home'
            // },
            // { 
            //   title: 'Comisiones de Servicios', 
            //   icon: 'fa-dashboard', 
            //   url: '/home'
            // },
          ]
        },
        { 
          title: 'Usuaios', 
          icon: 'fa-poll-people',
          sub:[
            // { 
            //   title: 'Usuarios de Empleados', 
            //   icon: 'fa-dashboard', 
            //   url: '/home'
            // },
            { 
              title: 'Usuarios de Sistema', 
              icon: 'fa-dashboard', 
              url: '/home'
            },
          ]
        },
        { 
          title: 'Configuraciones', 
          icon: 'fa-poll-people',
          sub:[
            { 
              title: 'Departamentos', 
              icon: 'fa-dashboard', 
              url: '/departments'
            }, 
            { 
              title: 'Cargos y Nombramientos', 
              icon: 'fa-dashboard', 
              url: '/departments'
            }, 
          ]
        },
      ],
    }
  },
  mounted() {
   
  },
  methods:{
    
  }
};
</script>
