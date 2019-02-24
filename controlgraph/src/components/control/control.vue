<template>
  <v-container>
    <h1>{{code}}</h1>
    <h2>{{message}}</h2>
    <qrcode-stream @decode="onCode" v-if="!paused" @init="onInit"></qrcode-stream>
    <v-btn color="success" @click="activeCamera">
        <span v-if="paused">Activar camara</span>
        <span v-else>Pausar camara</span>
    </v-btn>
    {{errorMessage}}
  </v-container>
</template>
<script src="./control.js"></script>