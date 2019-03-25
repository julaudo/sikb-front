<template>
    <v-app>
        <navigation />
        <main-view />
    </v-app>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Navigation from '@/views/layout/Navigation.vue';
import MainView from '@/views/layout/MainView.vue';

@Component({
    components: {Navigation, MainView},
})
export default class Layout extends Vue {
}
</script>
