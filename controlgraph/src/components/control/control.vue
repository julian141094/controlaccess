<template>
  <v-container fluid>
    <v-layout justify-center align-center>
      <v-flex xs12 sm8>
        <v-card>
        <v-layout row wrap class="imgAndText" style>
          <v-flex xs3 md3>
            <img src="@/assets/img/logoUnefa.png" >
          </v-flex>
          <v-flex xs12 md9>
            <h1 pa-3 class>Sistema de Control de Entrada y Salida del Personal de la UNEFANB</h1>
            <br>
            <h4>Por favor, escané su código qr o suministre sus datos para reportar su llegada a la institución</h4>
          </v-flex>
          <v-flex xs6>
            <h1>{{code}}</h1>
            <h2>{{message}}</h2>
            <v-btn color="success" @click="activeCamera">
              <span v-if="paused">Activar camara</span>
              <span v-else>Pausar camara</span>
            </v-btn>
            <v-dialog v-model="dialog2" persistent max-width="35%">
              <v-btn slot="activator"  color="success" dark>Teclado</v-btn>
              <v-card>
                <v-card-title class="headline">Marcar Entrada-Salida</v-card-title>
                <v-card-text>Por favor suministre los datos del usuario para tomar su hora de entrada o salida.</v-card-text>
                <!-- Formulario del Login -->
                <keyControl/>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" flat @click="dialog2 = false">Cancelar</v-btn>
                <v-btn color="success" flat @click="dialog2 = false">Ingresar</v-btn>
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
            <v-dialog v-model="dialog" persistent max-width="35%">
              <v-btn slot="activator" v-if="!$store.getters.isAuth"  color="primary" dark>Ingresar al Sistema</v-btn>
              <v-card>
                <v-card-title class="headline">Iniciar Sesión</v-card-title>
                <v-card-text>Por favor suministre los datos del usuario para ingresar al sistema.</v-card-text>
                <!-- Formulario del Login -->
                  <login/>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" flat @click="dialog = false">Cancelar</v-btn>
                  <v-btn color="success" flat @click="dialog = false" ref="loginSend" @submit.prevent='login'>Ingresar</v-btn>
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
