<template>
  <v-layout row justify-center>
    <v-flex xs12 pa-3>
        <v-form v-if="mode === 1" :class="{
        'layout':true,
        'align-center':true,
        'justify-center':true,
        'wrap':true, 
        'px-2':$vuetify.breakpoint.smAndDown,
        'px-4': $vuetify.breakpoint.smAndUp
        }" @submit.prevent='login'>
        <div>
        <!-- <div v-if="mode == 1"> -->
          <v-text-field
              v-model="username"
              name="username"
              :error-messages="errors.collect('username')"
              label="Nombre de Usuario"
              color="ivss-blue"
              data-vv-as="Cédula"
              v-validate="'required'"
          ></v-text-field>
          <v-text-field
              v-model="password"
              v-validate="'required|min:8'"
              name="password"
              color="ivss-blue"
              :error-messages="errors.collect('password')"
              label="Contraseña"
              @click:append="showPass = !showPass"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
          ></v-text-field>
          <hr class="separator">
          <v-flex xs12 text-xs-center>
              <v-btn small round color="success" class="white--text"
              @click.native="login" 
              
              >
              Ingresar
              </v-btn>
          </v-flex>
          <v-flex xs12 text-xs-center>
              <!-- <v-btn flat @click="change_mode(2)" color="ivss-blue" class="pt-0">{{$t('forgot')}}</v-btn> -->
          </v-flex>
      </div>
        </v-form>
      <!-- <div v-if="mode == 2">
          <ForgotPassword @changepass="change_mode(1)" @click="$emit('changepass')"></ForgotPassword>
      </div> -->
    </v-flex>
  </v-layout>
</template>
<script src="./Login.js"></script>