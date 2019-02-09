<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-card>
                <v-card-title>
                Buscar
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                class="table-employers"
                >
                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        Perdon, nada para mostrar aqui :(
                    </v-alert>
                </template>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                </v-data-table>
            </v-card>
        </v-layout>
    </v-container>
</template>
<script src="./Employers.js"></script>
<style>
.table-employers tr th{
    background-color: aqua
}
</style>
