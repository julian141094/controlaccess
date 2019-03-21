<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Gestionar Permisos Laborales</v-toolbar-title>
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
                    <v-dialog v-model="dialog" max-width="100%">
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
                                    :disabled='editFields'
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
                                        :disabled='editFields'
                                    ></v-checkbox>
                                </v-flex>
                                
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-checkbox
                                        v-model="PermissionsEmployer.approvedBossTH"
                                        v-validate="'required'"
                                        label="Firmado por Jefe de Talento Humano"
                                        required
                                        key="license-input"
                                        :disabled='editFields'
                                    ></v-checkbox>
                                </v-flex>
                                
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-checkbox
                                        v-model="PermissionsEmployer.approvedFinished"
                                        v-validate="'required'"
                                        label="Aprobado por Decano de Núcleo"
                                        required
                                        key="aprovedFinished-input"
                                        :disabled='editFields'
                                    ></v-checkbox>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="PermissionsEmployer.commentBoss" 
                                    name="Comentario Jefe Inmediato"
                                    label="Comentario Jefe Inmediato"
                                    value=""
                                    hint=""
                                    :disabled='editFields'
                                    ></v-textarea>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="PermissionsEmployer.commentBossTH" 
                                    name="Comentario Jefe de Talento Humano"
                                    label="Comentario Jefe de Talento Humano"
                                    value=""
                                    hint=""
                                    :disabled='editFields'
                                    ></v-textarea>
                                </v-flex>
                                <v-flex lg4 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="PermissionsEmployer.commentFinished" 
                                    name="Comentario Decano de Núcleo"
                                    label="Comentario Decano de Núcleo"
                                    value=""
                                    hint=""
                                    :disabled='editFields'
                                    ></v-textarea>
                                </v-flex>
                                <v-flex lg12 md6 xs12 pr-4>
                                    <v-textarea
                                    v-model="PermissionsEmployer.description" 
                                    name="Descripción"
                                    label="Descripción"
                                    value=""
                                    hint=""
                                    :disabled='editFields'
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
                                        :disabled='editFields'
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="date_formatted"
                                            label="Fecha de Reporte del Permiso"
                                            prepend-icon="event"
                                            readonly
                                            key="inDate"
                                            :disabled='editFields'
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
                                        :disabled='editFields'
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="startdate_formatted"
                                            label="Fecha de Inicio del Permiso"
                                            prepend-icon="event"
                                            readonly
                                            key="startDate"
                                            :disabled='editFields'
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
                                        :disabled='editFields'
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="endDate_formatted"
                                            label="Fecha de Finalización del Permiso"
                                            prepend-icon="event"
                                            readonly
                                            key="endDate"
                                            :disabled='editFields'
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
                                <td class="justify-center">{{ props.item.inDate }}</td>
                                <td class="justify-center">{{ props.item.userData.identification }}</td>
                                <td class="justify-center">{{ props.item.userData.fName }}</td>
                                <td class="justify-center">{{ props.item.userData.fSurname }}</td>
                                <td class="justify-center">{{ props.item.startDate }}</td>
                                <td class="justify-center">{{ props.item.endDate }}</td>
                                <!-- <td class="justify-center">{{ props.item.description }}</td> -->
                                <td class="justify-center"><v-icon>{{props.item.approvedBoss ? 'fa-check' : 'fa-times'}}</v-icon></td>
                                <td class="justify-center"><v-icon>{{props.item.approvedBossTH ? 'fa-check' : 'fa-times'}}</v-icon></td>
                                <td class="justify-center"><v-icon>{{props.item.approvedFinished ? 'fa-check' : 'fa-times'}}</v-icon></td>
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
<script src="./Permisions.js"></script>
