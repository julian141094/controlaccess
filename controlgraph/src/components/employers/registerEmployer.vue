<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-form>
                    <!-- <v-layout row wrap >
                        <v-flex lg3 md6 xs12 pr-4>
                            <v-text-field
                                v-model="userData.identification"
                                name="identification"
                                :error-messages="errors.collect('identification')"
                                label="Cédula de Identidad"
                                class=""
                                data-vv-as="Cédula"
                                v-validate="'required'"
                                key="identification-input"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg3 md6 xs12 pr-4>
                            <v-text-field
                                v-model="userData.user.first_name"
                                name="fName"
                                :error-messages="errors.collect('fName')"
                                label="Primer Nombre"
                                class=""
                                data-vv-as="Primer Nombre"
                                v-validate="'required'"
                                key="fName-input"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg3 md6 xs12 pr-4>
                            <v-text-field
                                v-model="userData.user.last_name"
                                name="fSurname"
                                :error-messages="errors.collect('fSurname')"
                                label="Primer Apellido"
                                class=""
                                data-vv-as="Primer Apellido"
                                v-validate="'required'"
                                key="fSurname-input"
                            ></v-text-field>
                        </v-flex>
                        <v-flex lg3 md6 xs12 pr-4>
                            <v-select
                                :items="conditionInt"
                                v-model="userData.institutional.condition"
                                label="Tipo de Trabajador"
                                key="condition-input"
                                v-validate="'required'"
                            ></v-select>
                        </v-flex>
                    </v-layout> -->
                    <v-tabs
                    centered
                    color="cyan"
                    dark
                    icons-and-text
                    >
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab href="#tab-1">
                        Información Personal
                        <v-icon>fa-edit</v-icon>
                        </v-tab>
                        <v-tab href="#tab-2">
                        Estudios Realizados
                        <v-icon>fa-graduation-cap</v-icon>
                        </v-tab>
                        <v-tab href="#tab-3">
                        Experiencia Laboral
                        <v-icon>fa-university</v-icon>
                        </v-tab>
                        <v-tab href="#tab-4">
                        Información Institucional
                        <v-icon>fa-briefcase</v-icon>
                        </v-tab>
                        <v-tab href="#tab-5">
                        Información Extra
                        <v-icon>fa-clipboard-list</v-icon>
                        </v-tab>
                        <v-tab-item
                        value="tab-1"
                        key="1"
                        >
                            <v-card >
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex lg3 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.identification"
                                                name="identification"
                                                :error-messages="errors.collect('identification')"
                                                label="Cédula de Identidad"
                                                class=""
                                                data-vv-as="Cédula"
                                                v-validate="'required'"
                                                key="identification-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg3 md6 xs12 pr-4>
                                            <v-dialog
                                                ref="dialogBD"
                                                v-model="modalBD"
                                                :return-value.sync="userData.birthDate"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="date_formatted"
                                                    label="Fecha de Nacimiento"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="birthDate-input"
                                                    name="Fecha de Nacimiento"
                                                    :error-messages="errors.collect('Fecha de Nacimiento')"
                                                    v-validate="'required'"
                                                ></v-text-field>
                                                <v-date-picker
                                                    :max="validateCalendars(2)"
                                                    v-model="userData.birthDate"
                                                    locale="es-VE"
                                                    scrollable
                                                    @input="dateFormat(1, userData.birthDate)"
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click.prevent="closeCalendars(1)">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialogBD.save(userData.birthDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-flex>
                                        <v-flex lg3 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.phone"
                                                name="phone"
                                                :error-messages="errors.collect('phone')"
                                                label="Número de Teléfono"
                                                class=""
                                                data-vv-as="Número de Teléfono"
                                                v-validate="'required'"
                                                key="phone-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg3 md6 xs12 pr-4>
                                            <v-checkbox
                                                v-model="userData.license"
                                                v-validate="'required'"
                                                label="Tiene Carnet de la UNEFANB?"
                                                required
                                                key="license-input"
                                            ></v-checkbox>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.fName"
                                                name="fName"
                                                :error-messages="errors.collect('fName')"
                                                label="Primer Nombre"
                                                class=""
                                                data-vv-as="Primer Nombre"
                                                v-validate="'required'"
                                                key="fName-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.sName"
                                                name="sName"
                                                :error-messages="errors.collect('sName')"
                                                label="Segundo Nombre"
                                                class=""
                                                data-vv-as="Segundo Nombre"
                                                v-validate="'required'"
                                                key="sName-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.fSurname"
                                                name="fSurname"
                                                :error-messages="errors.collect('fSurname')"
                                                label="Primer Apellido"
                                                class=""
                                                data-vv-as="Primer Apellido"
                                                v-validate="'required'"
                                                key="fSurname-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.sSurname"
                                                name="sSurname"
                                                :error-messages="errors.collect('sSurname')"
                                                label="Segundo Apellido"
                                                class=""
                                                data-vv-as="Segundo Apellido"
                                                v-validate="'required'"
                                                key="sSurname-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.email"
                                                name="email"
                                                :error-messages="errors.collect('email')"
                                                label="Correo Electronico"
                                                class=""
                                                data-vv-as="Correo Electronico"
                                                v-validate="'required'"
                                                key="email-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.address"
                                                name="address"
                                                :error-messages="errors.collect('address')"
                                                label="Direcciòn de Habitaciòn"
                                                class=""
                                                data-vv-as="Direcciòn de Habitaciòn"
                                                v-validate="'required'"
                                                key="address-input"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item
                        value="tab-2"
                        key="2"
                        >
                            <v-card >
                                <v-card-text>
                                    <v-layout column >
                                        <v-layout xs12 pr-4>
                                            <v-btn color="primary" dark @click="modalStudy = true">Nuevo Estudio</v-btn>
                                            <v-dialog v-model="modalStudy" persistent max-width="75%">
                                                <v-card>
                                                    <v-card-title class="headline">Suministre los datos del estudio a cargar:</v-card-title>
                                                    <v-card-text></v-card-text>
                                                    <v-layout row wrap mx-5>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-text-field
                                                                v-model="study.universityOrigin"
                                                                name="study-universityOrigin"
                                                                :error-messages="errors.collect('study-universityOrigin')"
                                                                label="Institución de Origen"
                                                                class=""
                                                                data-vv-as="Institución de Origen"
                                                                v-validate="'required'"
                                                                key="universityOrigin-input"
                                                            ></v-text-field>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-select
                                                                :items="typeSt"
                                                                v-model="study.typeStudy"
                                                                label="Tipo de Estudio del Trabajador"
                                                                data-vv-as="Tipo de Estudio del Trabajador"
                                                                key="typeStudy-input"
                                                                name="study-type"
                                                                :error-messages="errors.collect('study-type')"
                                                                v-validate="'required'"
                                                                @change="validateChangeSelect(1)"
                                                            ></v-select>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                        <!-- <v-flex v-if="study.typeStudy == 'COMPONENTEDOCENTE'" lg6 md6 xs12 pr-4> -->
                                                            <v-select
                                                                :items="study.typeStudy == 'COMPONENTEDOCENTE' ? typeCmp2 : typeCmp"
                                                                v-model="study.typeComponent"
                                                                name="study-typeComponent"
                                                                :error-messages="errors.collect('study-typeComponent')"
                                                                label="Tipo de Componente Docente"
                                                                data-vv-as="Tipo de Componente Docente"
                                                                key="typeComponent-input"
                                                                v-validate="'required'"
                                                            ></v-select>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-dialog
                                                                ref="dialogStudyStart"
                                                                v-model="modalStudyStartDate"
                                                                :return-value.sync="study.startDate"
                                                                persistent
                                                                lazy
                                                                full-width
                                                                width="290px"
                                                            >
                                                                <v-text-field
                                                                    slot="activator"
                                                                    v-model="studyStartDate_Formatted"
                                                                    label="Fecha de Inicio del Estudio"
                                                                    data-vv-as="Fecha de Inicio del Estudio"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    key="startDate-study-input"
                                                                    name="study-startdate"
                                                                    :error-messages="errors.collect('study-startdate')"
                                                                    v-validate="'required'"
                                                                ></v-text-field>
                                                                <v-date-picker
                                                                    v-model="study.startDate"
                                                                    locale="es-VE"
                                                                    scrollable
                                                                    @input="dateFormat(2, study.startDate)"
                                                                    @change="validateChange(1)"
                                                                    :max="validateCalendars(1)"
                                                                >
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click.prevent="closeCalendars(2)">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.dialogStudyStart.save(study.startDate)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-dialog>
                                                        </v-flex>
                                                        <v-flex v-if="studyStartDate_Formatted" lg6 md6 xs12 pr-4>
                                                            <v-dialog
                                                                ref="dialogStudyEnd"
                                                                v-model="modalStudyEndDate"
                                                                :return-value.sync="study.endDate"
                                                                persistent
                                                                lazy
                                                                full-width
                                                                width="290px"
                                                            >
                                                                <v-text-field
                                                                    slot="activator"
                                                                    v-model="studyEndDate_Formatted"
                                                                    label="Fecha de Finalización del Estudio"
                                                                    data-vv-as="Fecha de Finalización del Estudio"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    key="endDate-study-input"
                                                                    name="study-endDate"                                                                
                                                                    :error-messages="errors.collect('study-endDate')"
                                                                    v-validate="'required'"
                                                                ></v-text-field>
                                                                <v-date-picker
                                                                    :min="study.startDate"
                                                                    :max="validateCalendars(1)"
                                                                    v-model="study.endDate"
                                                                    locale="es-VE"
                                                                    scrollable
                                                                    @input="dateFormat(3, study.endDate)"
                                                                >
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click.prevent="closeCalendars(3)">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.dialogStudyEnd.save(study.endDate)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-dialog>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-text-field
                                                                v-model="study.study"
                                                                label="Nombre del Estudio"
                                                                data-vv-as="Nombre del Estudio"                                                                
                                                                name="study-name"                                                                
                                                                :error-messages="errors.collect('study-name')"
                                                                v-validate="'required'"
                                                                key="study-name-input"
                                                            ></v-text-field>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="green darken-1" flat @click.prevent="closeCalendars(6)">Cancelar</v-btn>
                                                    <v-btn color="green darken-1" flat @click="addStudyOrTeaching(1)">Guardar</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-layout>
                                        <v-layout row wrap pa-3>
                                            <v-flex v-for="(item, index) in userData.study" :key="index" lg4 md6 xs12 pr-2>
                                                <v-card>
                                                    <v-card-title primary-title>
                                                        <div>
                                                            <h3 class="headline mb-0">{{item.study}}</h3>
                                                            <div> Tipo de Estudio: {{item.typeStudy}}</div>
                                                            <div v-if="study.typeComponent != 'NOAPLICA'"> Tipo de Componente: {{item.typeComponent}}</div>
                                                            <div> Fecha de Inicio: {{dateFormat(4, item.startDate)}}</div>
                                                            <div> Fecha de Finalización: {{dateFormat(4, item.endDate)}}</div>
                                                            <div> Nombre de la Institución: {{item.universityOrigin}}</div>
                                                            <!-- {{index}} -->
                                                        </div>
                                                    </v-card-title>
                                                    <v-card-actions>
                                                    <v-btn flat color="green darken-1" @click="editStudyOrTeaching(1, item, index)">Modificar</v-btn>
                                                    <v-btn flat color="green darken-1" @click.prevent="deleteStudyOrTeaching(1, item.pk)">Eliminar</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-layout>

                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item
                        value="tab-3"
                        key="3"
                        >
                            <v-card >
                                <v-card-text>
                                    <v-layout column >
                                        <v-layout xs12 pr-4>
                                            <v-btn color="primary" dark @click="modalWorkExperience = true">Nuevo Empleo</v-btn>
                                            <v-dialog v-model="modalWorkExperience" persistent max-width="75%">
                                                <v-card>
                                                    <v-card-title class="headline">Suministre los datos del empleo a cargar:</v-card-title>
                                                    <v-card-text></v-card-text>
                                                    <v-layout row wrap mx-5>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-text-field
                                                                v-model="workExperience.institution"
                                                                name="workExperience-institution"
                                                                :error-messages="errors.collect('workExperience-institution')"
                                                                label="Nombre de la Institución"
                                                                class=""
                                                                data-vv-as="Nombre de la Institución"
                                                                v-validate="'required'"
                                                                key="institution-input"
                                                            ></v-text-field>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-dialog
                                                                ref="dialogWorkExperienceStart"
                                                                v-model="modalWorkExperienceStartDate"
                                                                :return-value.sync="workExperience.startDate"
                                                                persistent
                                                                lazy
                                                                full-width
                                                                width="290px"
                                                            >
                                                                <v-text-field
                                                                    slot="activator"
                                                                    v-model="workExperienceStartDate_Formatted"
                                                                    label="Fecha de Inicio del Empleo"
                                                                    data-vv-as="Fecha de Inicio del Empleo"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    key="startDate-workExperience-input"
                                                                    name="workExperience-startdate"
                                                                    :error-messages="errors.collect('workExperience-startdate')"
                                                                    v-validate="'required'"
                                                                ></v-text-field>
                                                                <v-date-picker
                                                                    v-model="workExperience.startDate"
                                                                    locale="es-VE"
                                                                    scrollable
                                                                    @input="dateFormat(6, workExperience.startDate)"
                                                                    @change="validateChange(1)"
                                                                    :max="validateCalendars(1)"
                                                                >
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click.prevent="closeCalendars(4)">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.dialogWorkExperienceStart.save(workExperience.startDate)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-dialog>
                                                        </v-flex>
                                                        <v-flex v-if="workExperienceStartDate_Formatted" lg6 md6 xs12 pr-4>
                                                            <v-dialog
                                                                ref="dialogWorkExperienceEnd"
                                                                v-model="modalWorkExperienceEndDate"
                                                                :return-value.sync="workExperience.endDate"
                                                                persistent
                                                                lazy
                                                                full-width
                                                                width="290px"
                                                            >
                                                                <v-text-field
                                                                    slot="activator"
                                                                    v-model="workExperienceEndDate_Formatted"
                                                                    label="Fecha de Finalización del Empleo"
                                                                    data-vv-as="Fecha de Finalización del Empleo"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    key="endDate-workExperience-input"
                                                                    name="workExperience-endDate"                                                                
                                                                    :error-messages="errors.collect('workExperience-endDate')"
                                                                    v-validate="'required'"
                                                                ></v-text-field>
                                                                <v-date-picker
                                                                    :min="workExperience.startDate"
                                                                    :max="validateCalendars(1)"
                                                                    v-model="workExperience.endDate"
                                                                    locale="es-VE"
                                                                    scrollable
                                                                    @input="dateFormat(7, workExperience.endDate)"
                                                                >
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn flat color="primary" @click.prevent="closeCalendars(5)">Cancel</v-btn>
                                                                    <v-btn flat color="primary" @click="$refs.dialogWorkExperienceEnd.save(workExperience.endDate)">OK</v-btn>
                                                                </v-date-picker>
                                                            </v-dialog>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-text-field
                                                                v-model="workExperience.appointment"
                                                                label="Cargo que desempeñó"
                                                                data-vv-as="Cargo que desempeñó"                                                                
                                                                name="workExperience-appointment"                                                                
                                                                :error-messages="errors.collect('workExperience-appointment')"
                                                                v-validate="'required'"
                                                                key="workExperience-appointment-input"
                                                            ></v-text-field>
                                                        </v-flex>
                                                        <v-flex lg6 md6 xs12 pr-4>
                                                            <v-text-field
                                                                v-model="workExperience.observation"
                                                                label="Observación"
                                                                data-vv-as="Observación"                                                                
                                                                name="workExperience-observation"                                                                
                                                                :error-messages="errors.collect('workExperience-observation')"
                                                                v-validate=""
                                                                key="workExperience-observation-input"
                                                            ></v-text-field>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="green darken-1" flat @click.prevent="closeCalendars(8)">Cancelar</v-btn>
                                                    <v-btn color="green darken-1" flat @click="addWorkExperience(1)">Guardar</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-layout>
                                        <v-layout row wrap pa-3>
                                            <v-flex v-for="(item, index) in userData.workExperience" :key="index" lg4 md6 xs12 pr-2>
                                                <v-card>
                                                    <v-card-title primary-title>
                                                        <div>
                                                            <h3 class="headline mb-0">{{item.appointment}}</h3>
                                                            <div> Institución: {{item.institution}}</div>
                                                            <div> Fecha de Inicio: {{dateFormat(4, item.startDate)}}</div>
                                                            <div> Fecha de Finalización: {{dateFormat(4, item.endDate)}}</div>
                                                            <div> Observación: {{item.observation ? item.observation : 'No Aplica'}}</div>
                                                            <!-- {{index}} -->
                                                        </div>
                                                    </v-card-title>
                                                    <v-card-actions>
                                                    <v-btn flat color="green darken-1" @click="editWorkExperience(1, item, index)">Modificar</v-btn>
                                                    <v-btn flat color="green darken-1" @click.prevent="deleteWorkExperience(1, item.pk)">Eliminar</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-layout>

                                </v-card-text>
                            </v-card>
                        </v-tab-item> 
                        <v-tab-item
                        value="tab-4"
                        key="4"
                        >
                            <v-card >
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-dialog
                                                ref="dialogDateIn"
                                                v-model="modalDateIn"
                                                :return-value.sync="userData.institutional.dateIn"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="dateIn_Formatted"
                                                    label="Fecha de Ingreso a la Institución"
                                                    data-vv-as="Fecha de Ingreso a la Institución"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="endDate-study-input"
                                                    name="dateIn"                                                                
                                                    :error-messages="errors.collect('dateIn')"
                                                    v-validate="'required'"
                                                ></v-text-field>
                                                <v-date-picker
                                                    v-model="userData.institutional.dateIn"
                                                    locale="es-VE"
                                                    scrollable
                                                    @input="dateFormat(5, userData.institutional.dateIn)"
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click.prevent="closeCalendars(7)">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialogDateIn.save(userData.institutional.dateIn)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-select
                                                :items="conditionInt"
                                                v-model="userData.institutional.condition"
                                                label="Tipo de Trabajador"
                                                key="condition-input"
                                                v-validate="'required'"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                        <!-- <v-flex v-if="userData.institutional.condition == 'DOCENTE'" lg6 md6 xs12 pr-4> -->
                                            <v-select
                                                :items="userData.institutional.condition != 'DOCENTE' ? categoryInt : categoryInt2 "
                                                v-model="userData.institutional.category"
                                                label="Categoria o Nivel del Trabajador"
                                                key="category-input"
                                                v-validate="'required'"
                                            >
                                            </v-select>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.institutional.appointment"
                                                name="appointment"
                                                :error-messages="errors.collect('appointment')"
                                                label="Nombramiento UNEFANB"
                                                class=""
                                                data-vv-as="Nombramiento UNEFANB"
                                                v-validate="'required'"
                                                key="appointment-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.institutional.positionOPSU"
                                                name="positionOPSU"
                                                :error-messages="errors.collect('positionOPSU')"
                                                label="Cargo OPSU"
                                                class=""
                                                data-vv-as="Cargo OPSU"
                                                v-validate="'required'"
                                                key="positionOPSU-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-select
                                                :items="departments"
                                                item-value="pk"
                                                item-text="name"
                                                v-model="userData.institutional.department_id"
                                                label="Departamento donde Labora el Trabajador"
                                                key="category-input"
                                                v-validate="'required'"
                                            >
                                            </v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item
                        value="tab-5"
                        key="5"
                        >
                        <v-card>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex lg6 md6 xs12 pr-4>
                                        <v-text-field
                                            v-model="userData.extra.serCPatria"
                                            name="serCPatria"
                                            :error-messages="errors.collect('serCPatria')"
                                            label="Serial del Carnet de la Patria"
                                            class=""
                                            data-vv-as="Serial del Carnet de la Patria"
                                            v-validate="'required'"
                                            key="serCPatria-input"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg6 md6 xs12 pr-4>
                                        <v-text-field
                                            v-model="userData.extra.codCPatria"
                                            name="codCPatria"
                                            :error-messages="errors.collect('codCPatria')"
                                            label="Código del Carnet de la Patria"
                                            class=""
                                            data-vv-as="Código del Carnet de la Patria"
                                            v-validate="'required'"
                                            key="codCPatria-input"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg6 md6 xs12 pr-4>
                                        <v-text-field
                                            v-model="userData.extra.whatsapp"
                                            name="whatsapp"
                                            :error-messages="errors.collect('whatsapp')"
                                            label="Número de Teléfono con Whatsapp"
                                            class=""
                                            data-vv-as="Número de Teléfono con Whatsapp"
                                            v-validate="'required'"
                                            key="whatsapp-input"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg6 md6 xs12 pr-4>
                                        <v-text-field
                                            v-model="userData.extra.facebook"
                                            name="facebook"
                                            :error-messages="errors.collect('facebook')"
                                            label="Usuario de Facebook"
                                            class=""
                                            data-vv-as="Usuario de Facebook"
                                            v-validate="'required'"
                                            key="facebook-input"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg6 md6 xs12 pr-4>
                                        <v-text-field
                                            v-model="userData.extra.instagram"
                                            name="instagram"
                                            :error-messages="errors.collect('instagram')"
                                            label="Usuario de Instagram"
                                            class=""
                                            data-vv-as="Usuario de Instagram"
                                            v-validate="'required'"
                                            key="instagram-input"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg6 md6 xs12 pr-4>
                                        <v-text-field
                                            v-model="userData.extra.twitter"
                                            name="twitter"
                                            :error-messages="errors.collect('twitter')"
                                            label="Usuario de Twitter"
                                            class=""
                                            data-vv-as="Usuario de Twitter"
                                            v-validate="'required'"
                                            key="twitter-input"
                                        ></v-text-field>
                                    </v-flex>

                                </v-layout>


                            </v-card-text>
                        </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./registerEmployer.js"></script>

