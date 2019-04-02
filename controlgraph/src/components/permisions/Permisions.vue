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
                                        @change="getIsActive"
                                        name="fName"
                                        :error-messages="errors.collect('fName')"
                                        v-validate="'required'"
                                        data-vv-as="Empleado"
                                        :items="UserData"
                                        :loading="isLoading"
                                        :search-input.sync="searchUser"
                                        class="iprint-third--text attibutes"
                                        hide-no-data
                                        :filter='filterUser'
                                        item-text='fName'
                                        item-value="pk"
                                        key="attributes-input"
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
                                        <v-layout row wrap v-if="PermissionsEmployer.pk != '' || PermissionsEmployer.userData != null && 
                                          !PermissionsEmployer.userData.statusEmployer.withpermission">
                                        <!-- <v-flex v-if="PermissionsEmployer.userData.active" > -->
                                            <v-flex lg4 md6 xs12 pr-4>
                                                <v-checkbox
                                                    v-model="PermissionsEmployer.approvedBoss"
                                                    name="Aprobado por Jefe Inmediato"
                                                    :error-messages="errors.collect('Aprobado por Jefe Inmediato')"
                                                    v-validate="'required'"
                                                    label="Aprobado por Jefe Inmediato"
                                                    data-vv-as="Aprobado por Jefe Inmediato"
                                                    key="AprovedBoss"
                                                    :disabled='editFields'
                                                ></v-checkbox>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4>
                                                <v-checkbox
                                                    v-model="PermissionsEmployer.approvedBossTH"
                                                    name="Aprobado por Jefe de Talento Humano"
                                                    :error-messages="errors.collect('Aprobado por Jefe de Talento Humano')"
                                                    v-validate="'required'"
                                                    data-vv-as="Aprobado por Jefe de Talento Humano"
                                                    label="Aprobado por Jefe de Talento Humano"
                                                    key="license-input"
                                                    :disabled='editFields'
                                                ></v-checkbox>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4>
                                                <v-checkbox
                                                    v-model="PermissionsEmployer.approvedFinished"
                                                    name="Aprobado por Decano de Núcleo"
                                                    v-validate="'required'"
                                                    data-vv-as="Aprobado por Decano de Núcleo"
                                                    :error-messages="errors.collect('Aprobado por Decano de Núcleo')"
                                                    label="Aprobado por Decano de Núcleo"
                                                    key="aprovedFinished-input"
                                                    :disabled='editFields'
                                                ></v-checkbox>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4>
                                                <v-textarea
                                                v-model="PermissionsEmployer.commentBoss" 
                                                name="Comentario Jefe Inmediato"
                                                :error-messages="errors.collect('Comentario Jefe Inmediato')"
                                                label="Comentario Jefe Inmediato"
                                                data-vv-as="Comentario Jefe Inmediato"
                                                v-validate="'max:100'"                                                
                                                value=""
                                                hint=""
                                                :disabled='editFields'
                                                ></v-textarea>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4>
                                                <v-textarea
                                                v-model="PermissionsEmployer.commentBossTH" 
                                                name="Comentario Jefe de Talento Humano"
                                                :error-messages="errors.collect('Comentario Jefe de Talento Humano')"
                                                label="Comentario Jefe de Talento Humano"
                                                data-vv-as="Comentario Jefe de Talento Humano"
                                                v-validate="'max:100'"                                                
                                                value=""
                                                hint=""
                                                :disabled='editFields'
                                                ></v-textarea>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4>
                                                <v-textarea
                                                v-model="PermissionsEmployer.commentFinished" 
                                                name="Comentario Decano de Núcleo"
                                                :error-messages="errors.collect('Comentario Decano de Núcleo')"
                                                label="Comentario Decano de Núcleo"
                                                data-vv-as="Comentario Decano de Núcleo"
                                                v-validate="'max:100'"                                                
                                                value=""
                                                hint=""
                                                :disabled='editFields'
                                                ></v-textarea>
                                            </v-flex>
                                            <v-flex lg12 md6 xs12 pr-4>
                                                <v-textarea
                                                v-model="PermissionsEmployer.description" 
                                                name="Descripción"
                                                :error-messages="errors.collect('Descripción')"    
                                                v-validate="'required|max:100'"
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
                                                        name="Fecha de Reporte del Permiso"
                                                        :error-messages="errors.collect('Fecha de Reporte del Permiso')"  
                                                        v-validate="'required'"
                                                    ></v-text-field>
                                                    <v-date-picker 
                                                        v-model="PermissionsEmployer.inDate" 
                                                        locale="es-VE"
                                                        scrollable
                                                        :min="validateCalendars(1)"
                                                        @input="dateFormat(1, PermissionsEmployer.inDate)"            
                                                        @change="validateChange(1)"
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn flat color="primary" @click.prevent="closeCalendars(1)">Cancel</v-btn>
                                                        <v-btn flat color="primary" @click="$refs.reportDialog.save(PermissionsEmployer.inDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4 v-if="PermissionsEmployer.inDate != ''"> 
                                                <v-dialog
                                                    ref="modalStartDate"
                                                    v-model="startDate"
                                                    :return-value.sync="PermissionsEmployer.startDate"
                                                    persistent
                                                    lazy
                                                    full-width
                                                    :disabled='editFields'
                                                    width="290px"
                                                >
                                                    <v-text-field
                                                        slot="activator"
                                                        v-model="startdate_formatted"
                                                        label="Fecha de Inicio del Permiso"
                                                        prepend-icon="event"
                                                        readonly
                                                        key="startDate"
                                                        name="Fecha de Inicio del Permiso"
                                                        :error-messages="errors.collect('Fecha de Inicio del Permiso')"  
                                                        v-validate="'required'"
                                                        :disabled='editFields'
                                                    ></v-text-field>
                                                    <v-date-picker 
                                                        :min="PermissionsEmployer.inDate"
                                                        v-model="PermissionsEmployer.startDate" 
                                                        locale="es-VE"
                                                        scrollable
                                                        @input="dateFormat(2, PermissionsEmployer.startDate)"
                                                        @change="validateChange2(2)"
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn flat color="primary" @click.prevent="closeCalendars(2)">Cancel</v-btn>
                                                        <v-btn flat color="primary" @click="$refs.modalStartDate.save(PermissionsEmployer.startDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-flex>
                                            <v-flex lg4 md6 xs12 pr-4 v-if="PermissionsEmployer.startDate != ''">
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
                                                        name="Fecha de Finalización del Permiso"
                                                        :error-messages="errors.collect('Fecha de Finalización del Permiso')"  
                                                        v-validate="'required'"
                                                    ></v-text-field>
                                                    <v-date-picker 
                                                        :min="PermissionsEmployer.startDate"
                                                        v-model="PermissionsEmployer.endDate" 
                                                        locale="es-VE"
                                                        scrollable
                                                        @input="dateFormat(3, PermissionsEmployer.endDate)"
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn flat color="primary" @click.prevent="closeCalendars(3)">Cancel</v-btn>
                                                        <v-btn flat color="primary" @click="$refs.modalEndDate.save(PermissionsEmployer.endDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-flex>
                                        </v-layout>
                                        <v-flex v-else>
                                          <v-alert type="info" outline :value="true"
                                          class="font-weight-black title">
                                            <span v-if="PermissionsEmployer.userData == null"> 
                                              Seleccione a un empleado al cual realizará el permiso
                                            </span>
                                            <span v-else>
                                              <h3>
                                                Tiene activo un {{ PermissionsEmployer.userData.statusEmployer.status }}
                                              </h3>
                                              <p>
                                                Fecha Inicio: {{ dateFormat(4,PermissionsEmployer.userData.statusEmployer.startDate) }} /
                                                Fecha Culminación: {{ dateFormat(4,PermissionsEmployer.userData.statusEmployer.endDate) }}
                                              </p>
                                              <p>
                                                Razón: {{ PermissionsEmployer.userData.statusEmployer.context }}
                                              </p>
                                            </span>
                                          </v-alert>                                            
                                        </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" flat @click="saveOrUpdate(1)"
                             v-if="PermissionsEmployer.userData != null && 
                                !PermissionsEmployer.userData.statusEmployer.withpermission">
                              Guardar
                            </v-btn>
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
                                <td class="justify-center">{{ dateFormat(4, props.item.inDate) }}</td>
                                <td class="justify-center">{{ props.item.userData.identification }}</td>
                                <td class="justify-center">{{ props.item.userData.fName }}</td>
                                <td class="justify-center">{{ props.item.userData.sName ? props.item.userData.sName : 'NO APLICA' }}</td>
                                <td class="justify-center">{{ props.item.userData.fSurname }}</td>
                                <td class="justify-center">{{ props.item.userData.sSurname ? props.item.userData.sSurname : 'NO APLICA' }}</td>
                                <td class="justify-center">{{ dateFormat(4, props.item.startDate) }}</td>
                                <td class="justify-center">{{ dateFormat(4, props.item.endDate) }}</td>
                                <!-- <td class="justify-center">{{ props.item.description }}</td> -->
                                <!-- <td class="justify-center"><v-icon>{{props.item.approvedBoss ? 'fa-check' : 'fa-times'}}</v-icon></td>
                                <td class="justify-center"><v-icon>{{props.item.approvedBossTH ? 'fa-check' : 'fa-times'}}</v-icon></td>
                                <td class="justify-center"><v-icon>{{props.item.approvedFinished ? 'fa-check' : 'fa-times'}}</v-icon></td> -->
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
                                    v-if="$store.getters.isSuperUser"
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
