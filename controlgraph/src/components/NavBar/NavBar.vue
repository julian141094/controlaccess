<template>
    <v-layout>
        <v-navigation-drawer
        v-model="drawer"
        stateless
        fixed
        app
        class="pt-0 bg-cme--blue "
        width="260"
        >
            <v-toolbar flat height="64px" color="white">
                <v-list>
                    <v-list-tile class="title" style="display: flex; justify-content: center; align-items: center;">
                        <!-- <v-list-tile-title class="title text-md-center" style="border: 1px solid red; display: flex; justify-content: center;"> -->
                          <img src="/unefa.png" alt="unefa" width="40px" height="40px" class="mr-1">
                          <h3 class="white--text">UNEFANB</h3>
                        <!-- </v-list-tile-title> -->
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>
            <itemsmenu/>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar app fixed dense color="white" class="py-2 grey--text text--darken-2 text-uppercase body-2" style="background-image: linear-gradient(to bottom, rgba(255,200,34,0.4), rgba(0,33,99,1) 24%, rgba(0,33,99,0.9) 74%, rgba(228,34,34,0.88) 99%);
">
      <div>
      <!-- <div v-if="this.$store.getters.isAuth">       -->
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon class="white--text font-weight-bold">menu</v-icon>
        </v-btn>
        <!-- <v-btn icon @click.stop="miniVariant = !miniVariant" v-if="$vuetify.breakpoint.name === 'xs' ? false : true">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn> -->
      </div>
      <!-- <login v-else></login> -->

      <v-spacer></v-spacer>
      <!-- <v-btn depressed color="transparent" class="grey--text text--darken-2 hidden-xs-only ml-auto">
        texto
      </v-btn> -->

      <v-spacer></v-spacer>
      <v-btn icon flat color="transparent" to="/">
        <!-- <img v-if="!$vuetify.breakpoint.xsOnly" src="@/../public/images/logo.png" alt="Club Mercado" height="80">
        <img v-else src="@/../public/favicon.png" alt="Club Mercado" height="50"> -->
      </v-btn>

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template  v-slot:activator="{ on }">
              <v-btn fab dark large right depressed color="transparent" @click.prevent="logout" class="white--text hidden-xs-only" v-on="on">
                <v-icon icon class="font-weight-bold">power_settings_new</v-icon>
              </v-btn>
        </template>
        <span>Salir</span>
      </v-tooltip>

      <!-- <v-spacer></v-spacer> -->
      
    </v-toolbar>
     <!-- End - Toolbar -->

    <!-- Floating Action Button -->
    <!-- <v-speed-dial v-model="fab" bottom right fixed direction="top" transition="slide-y-reverse-transition" class="hidden-sm-and-up">
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab small>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip left color="blue-grey darken-4 py-0" v-model="tooltip">
        <v-btn slot="activator" fab dark small color="green">
          <v-icon>contact_mail</v-icon>
        </v-btn> -->
        <!-- <span>{{ $t('home.information.contact.title') }}</span> -->
      <!-- </v-tooltip>
      <v-tooltip left color="blue-grey darken-4 py-0" v-model="tooltip">
        <v-btn slot="activator" fab dark small color="indigo">
          <v-icon>check_circle</v-icon>
        </v-btn> -->
        <!-- <span class="caption">{{ $t('home.participate') }}</span> -->
      <!-- </v-tooltip>
    </v-speed-dial> -->
    <!-- End Floating Action Button -->
  </v-layout>
</template>
<script src="./NavBar.js"></script>