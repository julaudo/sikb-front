<template>

    <v-content  ref="content">
        <v-container ref="container" fluid fill-height>
            <v-layout fill-height
                    justify-center
            >
                <v-fade-transition fill-height mode="out-in">
                    <router-view fill-height/>
                </v-fade-transition>
            </v-layout>
        </v-container>
    </v-content>


</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class MainView extends Vue {
    public mounted() {
        const element = this.$refs.container as HTMLElement;
        element.style.height = 'calc(100vh - ' + element.parentElement!.offsetTop + 'px)';
    }
}
</script>
