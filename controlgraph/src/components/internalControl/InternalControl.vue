<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Control de Entrada Y Salida</v-toolbar-title>
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
                        <v-btn slot="activator" color="primary" dark class="mb-2" @click="clearFields">Nuevo</v-btn>
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs12 >
                                    <v-autocomplete
                                    v-model="InAndOut.userData_id"
                                    name="fName"
                                    :error-messages="errors.collect('fName')"
                                    data-vv-as="Primer Nombre"
                                    :items="UserData"
                                    :loading="isLoading"
                                    :search-input.sync="searchUser"
                                    class="iprint-third--text attibutes"
                                    hide-no-data
                                    :filter='filterUser'
                                    item-text='fName'
                                    item-value="pk"
                                    key="attributes-input"
                                    v-validate="''"
                                    append-icon="fa-search"
                                    label="Buscar por Nombre de Trabajador"
                                    >
                                    <template
                                        slot="item" slot-scope="data">
                                        <v-list-tile-content>
                                        <v-list-tile-title v-html="data.item.fName+' '+data.item.sName+' '+data.item.fSurname+' '+data.item.sSurname"></v-list-tile-title>
                                        <!-- <v-list-tile-sub-title v-html="data.item.institutional.condition"></v-list-tile-sub-title> -->
                                        <!-- <v-list-tile-sub-title v-html="data.item.measure.name"></v-list-tile-sub-title> -->
                                        </v-list-tile-content>
                                    </template>
                                    <template slot="selection" slot-scope="data">
                                        {{data.item.fName+' '+data.item.sName+' '+data.item.fSurname+' '+data.item.sSurname}}
                                    </template>
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="date"
                                        v-model="modalDate"
                                        :return-value.sync="InAndOut.date"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="date_formatted"
                                            label="Fecha "
                                            prepend-icon="event"
                                            readonly
                                            key="Date"
                                        ></v-text-field>
                                        <v-date-picker
                                            v-model="InAndOut.date"
                                            locale="es-VE"
                                            scrollable
                                            @input="dateFormat(1, InAndOut.date)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.date.save(InAndOut.date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="timeIn"
                                        v-model="modalTimeIn"
                                        :return-value.sync="InAndOut.timeIn"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="time_in_formated"
                                            label="Hora de Entrada"
                                            prepend-icon="access_time"
                                            readonly
                                            key="timeIn"
                                        ></v-text-field>
                                        <v-time-picker
                                            v-model="InAndOut.timeIn"
                                            locale="es-VE"
                                            scrollable
                                            @input="timeFormat(1, InAndOut.timeIn)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalTimeIn = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.timeIn.save(InAndOut.timeIn)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                    <!-- <v-time-picker v-model="InAndOut.timeIn" color="green lighten-1"></v-time-picker> -->
                                </v-flex>
                                <v-flex lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="timeOutEat"
                                        v-model="modalTimeOutEat"
                                        :return-value.sync="InAndOut.timeOutEat"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="time_out_eat_formated"
                                            label="Hora de Salida al Almuerzo"
                                            prepend-icon="access_time"
                                            readonly
                                            key="timeOutEat"
                                        ></v-text-field>
                                        <v-time-picker
                                            v-model="InAndOut.timeOutEat"
                                            locale="es-VE"
                                            scrollable
                                            @input="timeFormat(1, InAndOut.timeOutEat)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalTimeOutEat = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.timeOutEat.save(InAndOut.timeOutEat)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="timeInEat"
                                        v-model="modalTimeInEat"
                                        :return-value.sync="InAndOut.timeInEat"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="time_in_eat_formated"
                                            label="Hora de Salida al Almuerzo"
                                            prepend-icon="access_time"
                                            readonly
                                            key="timeInEat"
                                        ></v-text-field>
                                        <v-time-picker
                                            v-model="InAndOut.timeInEat"
                                            locale="es-VE"
                                            scrollable
                                            @input="timeFormat(1, InAndOut.timeInEat)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalTimeInEat = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.timeInEat.save(InAndOut.timeInEat)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="timeOut"
                                        v-model="modalTimeOut"
                                        :return-value.sync="InAndOut.timeOut"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="time_out_formated"
                                            label="Hora de Salida al Almuerzo"
                                            prepend-icon="access_time"
                                            readonly
                                            key="timeOut"
                                        ></v-text-field>
                                        <v-time-picker
                                            v-model="InAndOut.timeOut"
                                            locale="es-VE"
                                            scrollable
                                            @input="timeFormat(1, InAndOut.timeOut)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalTimeOut = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.timeOut.save(InAndOut.timeOut)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg12 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="InAndOut.observation"
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
                            <v-btn color="blue darken-1" flat @click="saveOrUpdate(1)">Guardar</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                <v-flex xs12>
                    <v-card>
                        <v-data-table
                        :headers="headers"
                        :items="inAndOutEmployer"
                        :search="search"
                        class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td style="text-align: center;">{{ dateFormatTable(props.item.date) }}</td>
                                <td >{{ props.item.userData.fName }}</td>
                                <td >{{ props.item.userData.fSurname }}</td>
                                <td style="text-align: center;">{{ timeFormatTable(props.item.timeIn) }}</td>
                                <td style="text-align: center;">{{ timeFormatTable(props.item.timeOutEat) }}</td>
                                <td style="text-align: center;">{{ timeFormatTable(props.item.timeInEat) }}</td>
                                <td style="text-align: center;">{{ timeFormatTable(props.item.timeOut) }}</td>
                                <!-- <td>{{ props.item.observation }}</td> -->
                                <td class="justify-center layout px-0">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="saveOrUpdate(2, props.item)"
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
                        </v-data-table>
                    </v-card>

                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./InternalControl.js"></script>
