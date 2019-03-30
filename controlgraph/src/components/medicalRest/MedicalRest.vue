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
                        <v-btn slot="activator" color="primary" dark class="mb-2" @click="clearFields">Nuevo</v-btn>
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            <v-spacer></v-spacer>
                            <v-btn v-if="this.edit" slot="activator" color="primary" dark class="mb-2" @click="editMode">Editar</v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs12 >
                                    <v-autocomplete
                                    v-model="MedicalRest.userData_id"
                                    name="name"
                                    :error-messages="errors.collect('name')"
                                    label="Nombre de Trabajador"
                                    data-vv-as="Nombre de Trabajador"
                                    v-validate="'required'"
                                    :items="UserData"
                                    :loading="isLoading"
                                    :search-input.sync="searchUser"
                                    class="iprint-third--text attibutes"
                                    :disabled='editFields'
                                    hide-no-data
                                    :filter='filterUser'
                                    item-text='sName'
                                    item-value="pk"
                                    key="attributes-input"
                                    append-icon="fa-search"     
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
                                    <v-checkbox
                                        name="approvedBoss"
                                        :error-messages="errors.collect('approvedBoss')"
                                        label="Firmado por Jefe Inmediato"
                                        data-vv-as="Firmado por Jefe Inmediato"
                                        v-validate="'required'"
                                        v-model="MedicalRest.approvedBoss"
                                        required
                                       :disabled='editFields'
                                        key="license-input"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="reportDialog"
                                        v-model="modalDate"
                                        :return-value.sync="MedicalRest.reportDate"
                                        persistent
                                        lazy
                                        :disabled='editFields'
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            name="reportDate"
                                            :error-messages="errors.collect('reportDate')"
                                            label="Fecha de Reporte del RM"
                                            data-vv-as="Fecha de Reporte del RM"
                                            v-validate="'required'"
                                            v-model="date_formatted"
                                            slot="activator"
                                            prepend-icon="event"
                                            readonly
                                            :disabled='editFields'
                                            key="reportDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="MedicalRest.reportDate" 
                                            locale="es-VE"
                                            :max="validateCalendars(1)"
                                            scrollable
                                            @input="dateFormat(1, MedicalRest.reportDate)"
                                            @change="validateChange(1)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="closeCalendars(1)">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.reportDialog.save(MedicalRest.reportDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex v-if="MedicalRest.reportDate != ''" lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="modalStartDate"
                                        v-model="startDate"
                                        :return-value.sync="MedicalRest.startDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                       :disabled='editFields'
                                    >
                                        <v-text-field
                                            name="startDate"
                                            :error-messages="errors.collect('startDate')"
                                            label="Fecha de Inicio del RM"
                                            data-vv-as="Fecha de Inicio del RM"
                                            v-validate="'required'"
                                            v-model="startdate_formatted"
                                            slot="activator"
                                            prepend-icon="event"
                                            readonly
                                            key="startDate"
                                            :disabled='editFields'
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="MedicalRest.startDate" 
                                            locale="es-VE"
                                            scrollable
                                            @input="dateFormat(2, MedicalRest.startDate)"
                                            @change="validateChange(2)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.startDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.modalStartDate.save(MedicalRest.startDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex v-if="MedicalRest.startDate != ''" lg3 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="modalEndDate"
                                        v-model="endDate"
                                        :return-value.sync="MedicalRest.endDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                        :disabled='editFields'
                                    >
                                        <v-text-field
                                            name="endDate"
                                            :error-messages="errors.collect('endDate')"
                                            label="Fecha de Finalización del RM"
                                            data-vv-as="Fecha de Finalización del RM"
                                            v-validate="'required'"
                                            v-model="endDate_formatted"
                                            slot="activator"
                                            prepend-icon="event"
                                            readonly
                                            :disabled='editFields'
                                            key="endDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="MedicalRest.endDate" 
                                            locale="es-VE"
                                            scrollable
                                            @input="dateFormat(3, MedicalRest.endDate)"
                                            :min="MedicalRest.startDate"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.endDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.modalEndDate.save(MedicalRest.endDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-textarea
                                    name="Description"
                                    :error-messages="errors.collect('Description')"
                                    label="Descripción"
                                    data-vv-as="Descripción"
                                    v-validate="'required'"
                                    v-model="MedicalRest.description" 
                                    value=""
                                    hint=""
                                    :disabled='editFields'
                                    ></v-textarea>
                                </v-flex>
                                <v-flex lg6 md6 xs12 pr-4>
                                    <v-textarea
                                    name="Observation"
                                    :error-messages="errors.collect('Observation')"
                                    label="Observación"
                                    data-vv-as="Observación"
                                    v-validate="''"
                                    v-model="MedicalRest.observation" 
                                    value=""
                                    hint=""
                                    :disabled='editFields'
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
                        :items="medicalRest"
                        :search="search"
                        class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="justify-center">{{ dateFormat(4, props.item.reportDate) }}</td>
                                <td class="justify-center">{{ props.item.userData.identification }}</td>
                                <td class="justify-center">{{ props.item.userData.fName }}</td>
                                <td class="justify-center">{{ props.item.userData.sName }}</td>
                                <td class="justify-center">{{ props.item.userData.fSurname }}</td>
                                <td class="justify-center">{{ props.item.userData.sSurname }}</td>
                                <!-- <td class="justify-center">{{ props.item.userData.institutional.condition }}</td> -->
                                <td class="justify-center">{{ dateFormat(4, props.item.startDate) }}</td>
                                <td class="justify-center">{{ dateFormat(4, props.item.endDate) }}</td>
                                <!-- <td class="justify-center">{{ props.item.description }}</td> -->
                                <!-- <td>{{ props.item.observation }}</td> -->
                                <td class="justify-center layout px-0">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="saveOrUpdate(2, props.item)"
                                >
                                    search
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
<script src="./MedicalRest.js"></script>
