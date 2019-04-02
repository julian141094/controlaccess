<template>
  <v-container fluid>
    <h1>Reportes</h1>
    <v-btn color="primary" dark href="http://localhost:8000/api/generate/pdf/">
      Reporte General de empleados
    </v-btn>
    
    <v-flex lg6 md6 xs12 pr-4>
      <v-select
        :items="conditionInt"
        v-model="category"
        label="Tipo de Trabajador"
        key="condition-input"
        v-validate="'required'"
      ></v-select>
    </v-flex>
    <v-btn :disabled="category == ''" color="primary" dark :href="'http://localhost:8000/api/generate/pdf/?type=' + category">
      Reporte general por condicion
    </v-btn>
    <v-flex lg6 md6 xs12 pr-4>
    <v-dialog
        ref="dialogBD"
        v-model="modalBD"
        :return-value.sync="start"
        persistent
        lazy
        full-width
        width="290px"
    >
          <v-text-field
              slot="activator"
              v-model="startFormatted"
              label="Fecha inicio"
              prepend-icon="fa-calendar"
              readonly
              key="birthDate-input"
              name="Fecha inicio"
              :error-messages="errors.collect('Fecha inicio')"
              v-validate="'required'"
          ></v-text-field>
          <v-date-picker
              v-model="start"
              locale="es-VE"
              scrollable
              @input="dateFormat(1, start)"
          >
              <!-- :max="validateCalendars(2)" -->
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.prevent="modalBD = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialogBD.save(start)">OK</v-btn>
          </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-layout row wrap>
    <v-flex sm6 xs12 pr-2>
    <v-dialog
        ref="dialogBD2"
        v-model="modalBD2"
        :return-value.sync="end"
        persistent
        lazy
        full-width
        width="290px"
    >
          <v-text-field
              slot="activator"
              v-model="endFormatted"
              label="Fecha finalizacion"
              prepend-icon="fa-calendar"
              readonly
              key="birthDate-input"
              name="Fecha finalizacion"
              :error-messages="errors.collect('Fecha finalizacion')"
              v-validate="'required'"
          ></v-text-field>
          <v-date-picker
              :min="start"
              v-model="end"
              locale="es-VE"
              scrollable
              @input="dateFormat(2, end)"
          >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.prevent="close(2)">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialogBD2.save(end)">OK</v-btn>
          </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12>
      <v-btn :disabled="start == '' || end == ''" color="primary" dark 
        :href="`http://localhost:8000/api/generalAC/?start=${start}&end=${end}`">
        Generar reporte general Entrada y Salida
      </v-btn>
    </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="./report.js">
</script>
