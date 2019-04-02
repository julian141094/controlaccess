<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8>
        <v-card>
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 class="text-xs-center">
            <img src="@/assets/img/logoUnefa.png">
          </v-flex>
          <v-flex xs12 sm8 md9 class="px-1">
            <h1 pa-3 class="text-sm-center">Sistema de Información para la Gestión del Área de Talento Humano de la UNEFANB</h1>
            <br>
            <h4 class="text-sm-center">Por favor, escané su código qr o suministre sus datos para reportar su llegada a la institución</h4>
          </v-flex>
          <v-flex xs12 class="text-xs-right" style="border-top: 1px solid #E42222">
            <v-btn color="success" @click="activeCamera">
              <span v-if="paused">Activar camara</span>
              <span v-else>Pausar camara</span>
            </v-btn>
            <v-dialog v-model="dialog2" persistent max-width="35%">
              <v-btn slot="activator"  color="success" dark>Teclado</v-btn>
              <v-card>
                <v-card-title class="headline">Marcar Entrada-Salida</v-card-title>
                <v-card-text>Por favor suministre los datos del usuario para tomar su hora de entrada o salida.</v-card-text>
                <v-layout row justify-center>
                  <v-flex xs12 pa-3>
                      <div>
                      <!-- <div v-if="mode == 1"> -->
                        <v-text-field
                            v-model="username"
                            name="username"
                            :error-messages="errors.collect('username')"
                            label="Cédula"
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
                        <!-- <v-flex xs12 text-xs-center>
                            <v-btn small round color="ivss--blue" class="white--text"
                            @click.native="login" 
                            :disabled="password != '' && login != '' ? false : true"
                            >
                            {{ $t('login') }}
                            </v-btn>
                        </v-flex> -->
                        <v-flex xs12 text-xs-center>
                            <!-- <v-btn flat @click="change_mode(2)" color="ivss-blue" class="pt-0">{{$t('forgot')}}</v-btn> -->
                        </v-flex>
                    </div>
                    <!-- <div v-if="mode == 2">
                        <ForgotPassword @changepass="change_mode(1)" @click="$emit('changepass')"></ForgotPassword>
                    </div> -->
                  </v-flex>
                </v-layout>
                <!-- Formulario del Login -->
                <!-- <keyControl/> -->
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" flat @click="dialog2 = false">Cancelar</v-btn>
                <v-btn color="success" flat @click="register">Ingresar</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs6>
            <qrcode-stream @decode="onCode" v-if="!paused" @init="onInit"></qrcode-stream>
            {{errorMessage}}
          </v-flex>
          </v-layout>
          <v-card-actions align-content-end>
            <v-dialog v-model="dialog" persistent max-width="35%" class="text-xs-center mx-auto">
              <v-btn slot="activator" v-if="!$store.getters.isAuth"  color="primary" dark >Ingresar al Sistema</v-btn>
              <v-card>
                <v-card-title class="headline">Iniciar Sesión</v-card-title>
                <v-card-text>Por favor suministre los datos del usuario para ingresar al sistema.</v-card-text>
                
                <!-- Formulario del Login -->
                  <login @joined="dialog = false" />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="success" flat @click="dialog = false">Cancelar</v-btn> -->
                  <v-btn color="success" flat @click="dialog = false" ref="loginSend" @submit.prevent='login'>Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- <v-btn right flat color="success" slot="activator" @click.stop="dialog = true">Ingresar al Sistema</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="./control.js"></script>
