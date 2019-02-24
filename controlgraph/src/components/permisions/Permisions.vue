<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Permisos Laborales</v-toolbar-title>
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
                                    v-model="PermissionsEmployer.userData_id"
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
                                        </v-list-tile-content>
                                    </template>
                                    <template slot="selection" slot-scope="data">
                                        {{data.item.fName+' '+data.item.sName+' '+data.item.fSurname+' '+data.item.sSurname}}
                                    </template>
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-checkbox
                                        v-model="PermissionsEmployer.approvedBoss"
                                        v-validate="'required'"
                                        label="Firmado por Jefe Inmediato"
                                        required
                                        key="license-input"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex lg8 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="PermissionsEmployer.description" 
                                    name="Comentario Jefe Inmediato"
                                    label="Comentario Jefe Inmediato"
                                    value=""
                                    hint=""
                                    ></v-textarea>
                                </v-flex>
                                  
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-checkbox
                                        v-model="PermissionsEmployer.approvedFinished"
                                        v-validate="'required'"
                                        label="Aprobado por Decanato"
                                        required
                                        key="aprovedFinished-input"
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex lg8 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="PermissionsEmployer.commentFinished" 
                                    name="Comentario Decanato"
                                    label="Comentario Decanato"
                                    value=""
                                    hint=""
                                    ></v-textarea>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="reportDialog"
                                        v-model="modalDate"
                                        :return-value.sync="PermissionsEmployer.inDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="date_formatted"
                                            label="Fecha de Reporte del Permiso"
                                            prepend-icon="event"
                                            readonly
                                            key="inDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="PermissionsEmployer.inDate" 
                                            locale="es-VE"
                                            scrollable
                                            @input="dateFormat(1, PermissionsEmployer.inDate)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.reportDialog.save(PermissionsEmployer.inDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="modalStartDate"
                                        v-model="startDate"
                                        :return-value.sync="PermissionsEmployer.startDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="startdate_formatted"
                                            label="Fecha de Inicio del Permiso"
                                            prepend-icon="event"
                                            readonly
                                            key="startDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="PermissionsEmployer.startDate" 
                                            locale="es-VE"
                                            scrollable
                                            @input="dateFormat(2, PermissionsEmployer.startDate)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.startDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.modalStartDate.save(PermissionsEmployer.startDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-dialog
                                        ref="modalEndDate"
                                        v-model="endDate"
                                        :return-value.sync="PermissionsEmployer.endDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="endDate_formatted"
                                            label="Fecha de Finalización del Permiso"
                                            prepend-icon="event"
                                            readonly
                                            key="endDate"
                                        ></v-text-field>
                                        <v-date-picker 
                                            v-model="PermissionsEmployer.endDate" 
                                            locale="es-VE"
                                            scrollable
                                            @input="dateFormat(3, PermissionsEmployer.endDate)"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="this.endDate = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.modalEndDate.save(PermissionsEmployer.endDate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
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
                        :items="permissions"
                        :search="search"
                        class="elevation-1"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="justify-center">{{ props.item.userData.fName }}</td>
                                <td class="justify-center">{{ props.item.userData.fSurname }}</td>
                                <td class="justify-center">{{ props.item.inDate }}</td>
                                <td class="justify-center">{{ props.item.startDate }}</td>
                                <td class="justify-center">{{ props.item.endDate }}</td>
                                <td class="justify-center">{{ props.item.description }}</td>
                                <td class="justify-center">{{ props.item.approvedBoss }}</td>
                                <td class="justify-center">{{ props.item.approvedFinished }}</td>
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
<script src="./Permisions.js"></script>
