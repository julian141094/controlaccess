<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Departamentos UNEFANB</v-toolbar-title>
                    <v-divider
                        class="mx-2"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                        <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                        ></v-text-field>
                        <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-btn slot="activator" color="primary" dark class="mb-2" >Nuevo</v-btn>
                        
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container grid-list-xs>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4 pr-3>
                                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                                </v-flex>
                            </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.description }}</td>
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
                    <template slot="no-data">
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./Departments.js"></script>

