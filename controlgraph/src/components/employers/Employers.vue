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
                    :items="employers"
                    :search="search"
                    class="table-employers"
                    >
                    <template slot="no-data">
                    </template>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.identification }}</td>
                        <td class="text-xs-right">{{ props.item.fName }}</td>
                        <td class="text-xs-right">{{ props.item.fSurname }}</td>
                        <td class="text-xs-right">{{ props.item.institutional.condition }}</td>
                        <td class="text-xs-right">{{ props.item.institutional.category }}</td>
                        <td class="text-xs-right">
                            {{ props.item.institutional.department != null ? 
                            props.item.institutional.department.name: '---' }}
                        </td>
                        <td class="justify-center layout px-0">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
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
