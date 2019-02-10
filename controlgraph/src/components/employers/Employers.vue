<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-dialog v-model="dialog" persistent max-width="100%">
                <v-btn slot="activator"  color="primary" dark>Agregar un Trabajador</v-btn>
                <v-card>
                    <v-card-title class="headline">Guardar Trabajador</v-card-title>
                    <v-card-text>Por favor llene el formulario detenidamente, al finalizar todos los campos presione almacenar. </v-card-text>
                    <!-- Formulario de Empliados -->
                    <formemployers/>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="green darken-1" flat @click="dialog = false">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-flex>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                    Listado de Traabjadores
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    class="table-employers"
                    >
                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            Perdon, nada para mostrar aqui :(
                        </v-alert>
                    </template>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        No hay resultados para la busqueda de: "{{ search }}".
                    </v-alert>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./Employers.js"></script>
<style>
.table-employers tr th{
    background-color: aqua
}
</style>
