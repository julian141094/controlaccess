<template>
    <v-layout>   
        <v-navigation-drawer
        v-model="drawer"
        stateless
        fixed
        app
        clipped
        class="pt-2 bg-cme--blue "
        width="260"
        >
            <v-toolbar flat>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                        Application
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
                <v-list-tile
                v-for="item in items"
                :key="item.title"
                >
                <!-- @click="" -->
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar app fixed clipped-left dense color="white" class="py-2 grey--text text--darken-2 text-uppercase body-2">
      <div>
      <!-- <div v-if="this.$store.getters.isAuth">       -->
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-btn icon @click.stop="miniVariant = !miniVariant" v-if="$vuetify.breakpoint.name === 'xs' ? false : true">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
      </div>
      <!-- <login v-else></login> -->

      <v-spacer></v-spacer>
      <v-btn depressed color="transparent" class="grey--text text--darken-2 hidden-xs-only ml-auto">
        texto
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon flat color="transparent" to="/">
        <!-- <img v-if="!$vuetify.breakpoint.xsOnly" src="@/../public/images/logo.png" alt="Club Mercado" height="80">
        <img v-else src="@/../public/favicon.png" alt="Club Mercado" height="50"> -->
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn depressed color="transparent" class="grey--text text--darken-2 hidden-xs-only">
        hola
      </v-btn>

      <v-spacer></v-spacer>
      
    </v-toolbar>
     <!-- End - Toolbar -->

    <!-- Floating Action Button -->
    <v-speed-dial v-model="fab" bottom right fixed direction="top" transition="slide-y-reverse-transition" class="hidden-sm-and-up">
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab small>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip left color="blue-grey darken-4 py-0" v-model="tooltip">
        <v-btn slot="activator" fab dark small color="green">
          <v-icon>contact_mail</v-icon>
        </v-btn>
        <!-- <span>{{ $t('home.information.contact.title') }}</span> -->
      </v-tooltip>
      <v-tooltip left color="blue-grey darken-4 py-0" v-model="tooltip">
        <v-btn slot="activator" fab dark small color="indigo">
          <v-icon>check_circle</v-icon>
        </v-btn>
        <!-- <span class="caption">{{ $t('home.participate') }}</span> -->
      </v-tooltip>
    </v-speed-dial>
    <!-- End Floating Action Button -->
  </v-layout>
</template>
<script src="./NavBar.js"></script>