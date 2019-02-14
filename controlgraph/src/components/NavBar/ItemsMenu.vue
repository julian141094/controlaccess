<template>
  <v-list>
    <v-list-tile
      v-for="item in items"
      :key="item.title"
    > 
      <v-list-tile-content>
        <router-link :to="item.link">
          <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
        </router-link>
      </v-list-tile-content>
      <v-list-tile-action :class="{
        'pr-2':!$parent.mini
      }">
        <router-link :to="item.link">
          <v-icon>{{ item.icon }}</v-icon>
        </router-link>
      </v-list-tile-action>
    </v-list-tile>
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
import Route from '../../plugins/backroutes.js'

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
          link: '/home'
        },
        { 
          title: 'Trabajadores', 
          icon: 'fa-users', 
          link: '/employers'
        },
        { 
          title: 'Account',
          icon: 'fa-window-maximize',
          link: '#'
        },
        { 
          title: 'Register Subdomain',
          icon: 'fa-globe',
          link: '/subdomain/register'
        },
        { 
          title: 'Subdomain List',
          icon: 'fa-globe',
          link: '/subdomain'
        }
      ],
    }
  },
  mounted() {
   
  },
  methods:{
    
  }
};
</script>
