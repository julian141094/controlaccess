<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Reposos Medicos</v-toolbar-title>
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
                    <v-dialog v-model="dialog" max-width="100%px">
                        <v-btn slot="activator" color="primary" dark class="mb-2" >Nuevo</v-btn>
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-checkbox
                                        v-model="MedicalRest.approvedBoss"
                                        v-validate="'required'"
                                        label="Firmado por Jefe Inmediato"
                                        required
                                        key="license-input"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modalDate"
                                        :return-value.sync="MedicalRest.reportDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="MedicalRest.reportDate"
                                            label="Fecha de Reporte del Reposo"
                                            prepend-icon="event"
                                            readonly
                                            key="reportDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="MedicalRest.reportDate" 
                                            locale="es-VE"
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(modalBirthDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modalDate"
                                        :return-value.sync="MedicalRest.startDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="MedicalRest.startDate"
                                            label="Fecha de Inicio del Reposo"
                                            prepend-icon="event"
                                            readonly
                                            key="startDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="MedicalRest.startDate" 
                                            locale="es-VE"
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(modalBirthDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modalDate"
                                        :return-value.sync="MedicalRest.endDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="MedicalRest.endDate"
                                            label="Fecha de Finalización del Reposo"
                                            prepend-icon="event"
                                            readonly
                                            key="endDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="MedicalRest.endDate" 
                                            locale="es-VE"
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(modalBirthDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="MedicalRest.description" 
                                    name="Descripción"
                                    label="Descripción"
                                    value=""
                                    hint=""
                                    ></v-textarea>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="MedicalRest.description" 
                                    name="Observación"
                                    label="Observación"
                                    value=""
                                    hint=""
                                    ></v-textarea>
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
                <v-flex xs12>
                    <v-card>
                        
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
                    </v-card>
                    
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./MedicalRest.js"></script>
