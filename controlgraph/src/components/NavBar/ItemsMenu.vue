<template>
  <v-list>
    <!-- <login v-if="!this.$store.getters.isAuth"/> -->
    <div v-for="item in items" :key="item.title" 
      :class="item.title === 'base.logout' ? 'logout' : false">
    <!-- v-if="item.title === 'base.logout' ? $store.getters.isAuth : $store.getters.isAuth2"  -->
        <!-- Item menu -->
        <v-list-tile v-if="!item.sub" :class="$route.fullPath === item.url ? 'active-list' : false" class="text-cme-list">
            <v-list-tile-action  v-on="item.click != undefined ? {'click':item.click} : {}">
                <router-link :to="$store.getters.isAuth2?item.url:'/Dashboard'">
                    <v-icon dark :size="item.size">{{ item.icon }}</v-icon>
                </router-link>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title v-on="item.click != undefined ? {'click':item.click} : {}">
                    <router-link :to="$store.getters.isAuth2?item.url:'/Dashboard'">
                        <v-list-tile-title>
                            {{ $t(item.title) }}
                        </v-list-tile-title>
                    </router-link>
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <!-- Sub-item menu-->
        <!-- :append-icon="$vuetify.breakpoint.xsOnly || $parent.miniVariant?false:'keyboard_arrow_down'"-->
        <v-list-group
            dark
            append-icon="keyboard_arrow_down"
            :prepend-icon="item.icon"
            :value="item.sub.find(o=>o.url === $route.fullPath) !== undefined"
            v-if="item.sub">
            <v-list-tile slot="activator">
              <v-list-tile-title class="text-cme-list">{{ $t(item.title) }} </v-list-tile-title>
            </v-list-tile>
              <!-- v-if='sub.show' -->
            <v-list-tile
              v-for="sub in item.sub" :key="sub.title"
              v-on="sub.click != undefined ? {'click':sub.click} : {}"
              :to="$store.getters.isAuth2?sub.url:'/Dashboard'"
              :class="{
                'pl-0': $vuetify.breakpoint.xsOnly || $parent.miniVariant,
                'pl-4': $vuetify.breakpoint.smAndUp && !$parent.miniVariant,
                'active-list': $route.fullPath === sub.url ? true : false,
                'text-cme-list': true
              }"
            >
              <v-list-tile-action>
                <v-icon dark>{{sub.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ $t(sub.title) }}</v-list-tile-title>
            </v-list-tile>
        </v-list-group>
    </div>

    <!-- <v-list-tile v-if="$vuetify.breakpoint.name === 'xs' || $parent.miniVariant">
      <v-list-tile-action> -->
        <!-- <router-link/> -->
        <!-- <router-link to="/Dashboard">        
          <v-avatar
            :size="32"
            color="grey lighten-4"
            >
              <img class="mx-auto" :src="imageUrl" alt="avatar">
          </v-avatar>
        </router-link>
      </v-list-tile-action>
    </v-list-tile>
    <v-layout
      v-else
      align-center
      justify-center
      fill-height
      column
      pt-2
    > -->
      <!-- <router-link to="/Dashboard" class="text-xs-center">
        <v-avatar :size="85">
          <img :src="imageUrl">
        </v-avatar>
        <span style="color: white"><h4>{{username}}</h4></span>
      </router-link>
    </v-layout> -->
        <!-- <h3>{{username}}</h3> -->
    <!-- <v-list-tile class="active-list" v-if="$vuetify.breakpoint.name === 'xsOnly' || !$parent.miniVariant && groups">
      <v-list-tile-content>
      <span 
      style="color: white; margin-right: auto; margin-left: auto;">
        <h4>{{groups}}</h4>
      </span>
      </v-list-tile-content>
    </v-list-tile> -->
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
// import log from "@/components/login/Login.vue"
// import {base_url} from '@/utils/ApiRoute.js';
// import ApiRoute from '@/utils/ApiRoute.js';
import Route from '../../plugins/backroutes.js'

export default {
  name: 'menu_item',
  data () {
    return {
        imageUrl:'',
        username: '',
        groups: "",
        items:[
            // {
            //   url:'/Dashboard',￼
            //   title:'dashboard.dashboard',
            //   icon:'dashboard',
            //   show: this.$store.getters.isAuth
            // },
            // {
            //   url:'/groups',
            //   title:'group.group',
            //   icon:'group',
            //   show: this.$store.getters.isAuth
            // },
            // {
            //   url:'/permissions',
            //   title:'permission.permission',
            //   icon:'lock',
            //   show: this.$store.getters.isAuth  {{$vuetify.icons.instagram}}
            // },
            {
              url:'/home',
              title:'Inicio',
              icon: 'dashboard',
              show: '',
              size: ''
            },
            { //FALTA VALIDAR
              url:'/employers',
              title:'Empliados',
              icon:'fa-users',
              show: '',
              size: '50',
              sub: [
                {
                  url:'/productDetail',
                  title:'shopping_and_products.products',
                  icon:'category',
                  show:"",
                  size: '',
                },
                {
                  url:'#',
                  title:'shopping_and_products.prices',
                  icon:'account_balance_wallet',
                  show:"",
                  size: '',
                },
              ]
            },
            {
              url:'#',
              title:'warehouse.warehouse',
              icon:'$vuetify.icons.warehouse',
              show: '',
              size: '19'
            },
            // {
            //   url:'/',
            //   title:'dashboard',
            //   icon:'dashboard',
            //   show: true,
            //   sub: [
            //     {
            //       url:'/',
            //       title:'Sub-item',
            //       icon:'person_add',
            //       show:true,
            //     },
            //     {
            //       url:'/',
            //       title:'Sub-item',
            //       icon:'commute',
            //       show:true,
            //     }
            //   ]
            // },
            {//always last item
              url:'/',
              title:'base.logout',
              icon:'power_settings_new',
              show: "",
              click:this.logout,
              size: ''
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
