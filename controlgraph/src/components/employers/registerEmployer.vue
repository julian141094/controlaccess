<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-form>
                    <v-layout row wrap >
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
                        <v-flex lg3 md6 xs12 pr-4>
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
                        <v-flex lg3 md6 xs12 pr-4>
                            <v-select
                                :items="conditionInt"
                                v-model="userData.institutional.condition"
                                label="Tipo de Trabajador"
                                key="condition-input"
                                v-validate="'required'"
                            ></v-select>
                            <!-- <v-text-field
                                v-model="userData.institutional.condition"
                                name="condition"
                                :error-messages="errors.collect('condition')"
                                label="Condición o Tipo de Trabajador"
                                class=""
                                data-vv-as="Condición o Tipo de Trabajador"
                                v-validate="'required'"
                                key="condition-input"
                            ></v-text-field> -->
                        </v-flex>
                    </v-layout>
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
                        Componente Docente
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
                                                ref="dialog"
                                                v-model="modalDate "
                                                :return-value.sync="userData.birthDate"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="userData.birthDate"
                                                    label="Fecha de Nacimiento"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="birthDate-input"
                                                ></v-text-field>
                                                <v-date-picker 
                                                    v-model="userData.birthDate" 
                                                    locale="es-VE"
                                                    scrollable
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialog.save(modalDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                            <!-- <v-text-field
                                                v-model="userData.birthDate"
                                                name="birthDate"
                                                :error-messages="errors.collect('birthDate')"
                                                label="Fecha de Nacimiento"
                                                class=""
                                                data-vv-as="Fecha de Nacimiento"
                                                v-validate="'required'"
                                                key="birthDate-input"
                                            ></v-text-field> -->
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
                                            <!-- <v-text-field
                                                v-model="userData.license"
                                                name="license"
                                                :error-messages="errors.collect('license')"
                                                label="Tiene Carnet de la Institución?"
                                                class=""
                                                data-vv-as="Tiene Carnet de la Institución?"
                                                v-validate="'required'"
                                                key="license-input"
                                            ></v-text-field> -->
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
                                    <v-layout row wrap>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-select
                                                :items="typeSt"
                                                v-model="userData.study.typeStudy"
                                                label="Tipo de Estudio del Trabajador"
                                                key="typeStudy-input"
                                                v-validate="'required'"
                                            ></v-select>
                                            <!-- <v-text-field
                                                v-model="userData.study.typeStudy"
                                                name="typeStudy"
                                                :error-messages="errors.collect('typeStudy')"
                                                label="Tipo de Estudio del Trabajador"
                                                class=""
                                                data-vv-as="Tipo de Estudio del Trabajador"
                                                v-validate="'required'"
                                                key="typeStudy-input"
                                            ></v-text-field> -->
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-dialog
                                                ref="dialog"
                                                v-model="modalDate"
                                                :return-value.sync="userData.study.startDate"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="userData.study.startDate"
                                                    label="Fecha de Inicio del Estudio"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="startDate-study-input"
                                                ></v-text-field>
                                                <v-date-picker 
                                                    v-model="userData.study.startDate" 
                                                    locale="es-VE"
                                                    scrollable
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialog.save(modalBirthDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                            <!-- <v-text-field
                                                v-model="userData.study.startDate"
                                                name="startDate"
                                                :error-messages="errors.collect('startDate')"
                                                label="Fecha de Inicio del Estudio"
                                                class=""
                                                data-vv-as="Fecha de Inicio del Estudio"
                                                v-validate="'required'"
                                                key="startDate-study-input"
                                            ></v-text-field> -->
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-dialog
                                                ref="dialog"
                                                v-model="modalDate"
                                                :return-value.sync="userData.study.endDate"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="userData.study.endDate"
                                                    label="Fecha de Finalización del Estudio"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="endDate-study-input"
                                                ></v-text-field>
                                                <v-date-picker 
                                                    v-model="userData.study.endDate" 
                                                    locale="es-VE"
                                                    scrollable
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialog.save(modalBirthDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                            <!-- <v-text-field
                                                v-model="userData.study.endDate"
                                                name="endDate"
                                                :error-messages="errors.collect('endDate')"
                                                label="Fecha de Finalización del Estudio"
                                                class=""
                                                data-vv-as="Fecha de Finalización del Estudio"
                                                v-validate="'required'"
                                                key="endDate-study-input"
                                            ></v-text-field> -->
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.study.study"
                                                name="study"
                                                :error-messages="errors.collect('study')"
                                                label="Nombre del Estudio"
                                                class=""
                                                data-vv-as="Nombre del Estudio"
                                                v-validate="'required'"
                                                key="study-input"
                                            ></v-text-field>
                                        </v-flex>
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
                                    <v-layout row wrap>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-select
                                                :items="typeCmp"
                                                v-model="userData.teaching.typeComponent"
                                                label="Tipo de Componente Docente"
                                                key="typeComponent-input"
                                                v-validate="'required'"
                                            ></v-select>
                                            <!-- <v-text-field
                                                v-model="userData.teaching.typeComponent"
                                                name="typeComponent"
                                                :error-messages="errors.collect('typeComponent')"
                                                label="Tipo de Componente Docente"
                                                class=""
                                                data-vv-as="Tipo de Componente Docente"
                                                v-validate="'required'"
                                                key="typeComponent-input"
                                            ></v-text-field> -->
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-text-field
                                                v-model="userData.teaching.universityOrigin"
                                                name="universityOrigin"
                                                :error-messages="errors.collect('universityOrigin')"
                                                label="Universidad de Origen"
                                                class=""
                                                data-vv-as="Universidad de Origen"
                                                v-validate="'required'"
                                                key="universityOrigin-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-dialog
                                                ref="dialog"
                                                v-model="modalDate"
                                                :return-value.sync="userData.teaching.startDate"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="userData.teaching.startDate"
                                                    label="Fecha de Inicio del Componente Docente"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="startDate-teaching-input"
                                                ></v-text-field>
                                                <v-date-picker 
                                                    v-model="userData.teaching.startDate" 
                                                    locale="es-VE"
                                                    scrollable
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="this.modalDate = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialog.save(modalBirthDate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                            <!-- <v-text-field
                                                v-model="userData.teaching.startDate"
                                                name="startDate"
                                                :error-messages="errors.collect('startDate')"
                                                label="Fecha de Inicio del Componente Docente"
                                                class=""
                                                data-vv-as="Fecha de Inicio del Componente Docente"
                                                v-validate="'required'"
                                                key="startDate-teaching-input"
                                            ></v-text-field> -->
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-dialog
                                                ref="dialog"
                                                v-model="modalDate"
                                                :return-value.sync="userData.teaching.endDate"
                                                persistent
                                                lazy
                                                full-width
                                                width="290px"
                                            >
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="userData.teaching.endDate"
                                                    label="Fecha de Finalización del Componente Docente"
                                                    prepend-icon="event"
                                                    readonly
                                                    key="endDate-teaching-input"
                                                ></v-text-field>
                                                <v-date-picker 
                                                    v-model="userData.teaching.endDate" 
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
                                            <v-text-field
                                                v-model="userData.teaching.observation"
                                                name="observation"
                                                :error-messages="errors.collect('observation')"
                                                label="Observación Sobre el Componente Docente"
                                                class=""
                                                data-vv-as="Observación Sobre el Componente Docente"
                                                v-validate="'required'"
                                                key="observation-input"
                                            ></v-text-field>
                                        </v-flex>
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
                                            <v-text-field
                                                v-model="userData.institutional.dateIn"
                                                name="dateIn"
                                                :error-messages="errors.collect('dateIn')"
                                                label="Fecha de Ingreso a la Institución"
                                                class=""
                                                data-vv-as="Fecha de Ingreso a la Institución"
                                                v-validate="'required'"
                                                key="dateIn-input"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-select
                                                :items="conditionInt"
                                                v-model="userData.institutional.condition"
                                                label="Tipo de Trabajador"
                                                key="condition-input"
                                                v-validate="'required'"
                                            ></v-select>
                                            <!-- <v-text-field
                                                v-model="userData.institutional.condition"
                                                name="condition"
                                                :error-messages="errors.collect('condition')"
                                                label="Condición o Tipo de Trabajador"
                                                class=""
                                                data-vv-as="Condición o Tipo de Trabajador"
                                                v-validate="'required'"
                                                key="condition-input"
                                            ></v-text-field> -->
                                        </v-flex>
                                        <v-flex lg6 md6 xs12 pr-4>
                                            <v-select
                                                :items="categoryInt"
                                                v-model="userData.institutional.category"
                                                label="Categoria o Nivel del Trabajador"
                                                key="category-input"
                                                v-validate="'required'"
                                            >
                                            </v-select>
                                            <!-- <v-text-field
                                                v-model="userData.institutional.category"
                                                name="category"
                                                :error-messages="errors.collect('category')"
                                                label="Categoria o Nivel del Trabajador"
                                                class=""
                                                data-vv-as="Categoria o Nivel del Trabajador"
                                                v-validate="'required'"
                                                key="category-input"
                                            ></v-text-field> -->
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
                                                <!-- items="departments" -->
                                            <v-select
                                                v-model="userData.institutional.department"
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

