<template>
<v-container>
    <v-card>
    <v-card-title>
        Gestionar Usuarios del sistema
        <v-spacer></v-spacer>
        <v-btn @click="create" color="primary" dark>Nuevo</v-btn>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        class="table-employers"
        >
        <template slot="no-data">
        </template>
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right">{{ props.item.first_name != '' ? props.item.first_name : '---' }}</td>
            <td class="text-xs-right">{{ props.item.last_name != '' ? props.item.last_name : '---' }}</td>
            <td class="text-xs-right"><v-icon>{{props.item.is_active ? 'fa-check' : 'fa-times'}}</v-icon></td>
            <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2"
                    @click="edit(props.item)"
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
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            No hay resultados para la busqueda de: "{{ search }}".
        </v-alert>  
    </v-data-table>
    <v-dialog
        v-model="dialog" 
        persistent :overlay="false"
        max-width="70%"
        transition="dialog-transition"
    >
         <v-card>
            <v-card-title>
                <span class="headline">{{ user.id == undefined? 'Crear Usuario' : 'Editar Usuario' }}</span>
            </v-card-title>
            <v-card-text>
    
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="user.username"
                        name="username"
                        :error-messages="errors.collect('username')"
                        label="Nombre de usuario"
                        class=""
                        data-vv-as="Nombre de usuario"
                        v-validate="'required'"
                        key="username-input"
                    ></v-text-field>                
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="user.first_name"
                        name="first_name"
                        :error-messages="errors.collect('first_name')"
                        label="Primer Nombre"
                        class=""
                        data-vv-as="Primer Nombre"
                        v-validate="'required'"
                        key="first_name-input"
                    ></v-text-field>                
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="user.last_name"
                        name="last_name"
                        :error-messages="errors.collect('last_name')"
                        label="Primer apellido"
                        class=""
                        data-vv-as="Primer apellido"
                        v-validate="'required'"
                        key="last_name-input"
                    ></v-text-field>                
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="user.email"
                        name="email"
                        :error-messages="errors.collect('email')"
                        label="Correo Electronico"
                        class=""
                        data-vv-as="Correo Electronico"
                        v-validate="'required|email'"
                        key="email-input"
                    ></v-text-field>                
                </v-flex>
                <v-flex xs12>
                    <v-checkbox
                        v-model="user.is_active"
                        label="Puede acceder al sistema?"
                        key="active-input"
                    ></v-checkbox>
                    
                </v-flex>
                <v-flex xs12 sm6 v-if='this.user.id == undefined'>
                    <v-text-field
                    v-model="user.password"
                    :data-vv-as="'Contraseña'"
                    v-validate="'required|min:8'"
                    name="pw_confirm"
                    ref="pw_confirm"
                    :label="'Contraseña'"
                    :error-messages="errors.first('pw_confirm')"
                    prepend-icon="vpn_key"
                    :type="showPass ? 'text' : 'password'"
                    @click:append="showPass = !showPass"
                    :append-icon="showPass ? 'visibility' : 'visibility_off'"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 pl-sm-3 v-if='this.user.id == undefined'>
                    <v-text-field
                    v-model="passconfirm"
                    :data-vv-as="'Confirmar contraseña'"
                    v-validate="'required|confirmed:pw_confirm'"
                    name="confirm_field"
                    :label="'Confirmar contraseña'"
                    :error-messages="errors.first('confirm_field')"
                    prepend-icon="vpn_key"
                    :type="showPass2 ? 'text' : 'password'"
                    @click:append="showPass2 = !showPass2"
                    :append-icon="showPass2 ? 'visibility' : 'visibility_off'"
                    ></v-text-field>
                </v-flex>
            </v-layout>


            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" flat @click="saveOrUpdate()">Guardar</v-btn>
            </v-card-actions>
         </v-card>
    </v-dialog>
    </v-card>

</v-container>
    
</template>
<script src='./userSystem.js'></script>