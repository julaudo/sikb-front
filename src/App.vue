<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar
            v-model="snackbar"
            :top="true"
            :right="true"
            :color="'error'"
            :multi-line="false"
            :timeout="6000"
            :vertical="false"
    >
      {{snackbarText}}
      <v-btn
              dark
              flat
              @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<style>
  html {
    overflow-y: hidden;
  }
  .v-dialog {
    width: unset;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nprogress {
      position: relative;
      z-index: 9999999;
  }

  .inputNumber input[type='number'] {
    -moz-appearance:textfield;
  }
  .inputNumber input::-webkit-outer-spin-button,
  .inputNumber input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }


</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import NProgress from 'nprogress';
import router from '@/router';
import {Route} from 'vue-router';
import store from '@/store/store';


@Component
export default class App extends Vue {
  private snackbar = false;
  private snackbarText = '';
  private count = 0;
  private requestInterceptor = 0;
  private responseInterceptor = 0;


  public beforeDestroy() {
    Axios.interceptors.request.eject(this.requestInterceptor);
    Axios.interceptors.response.eject(this.responseInterceptor);
  }

  public mounted() {
    const vm = this;

    this.requestInterceptor = Axios.interceptors.request.use((req) => {
      this.incrementCount();
      return req;
    });

    this.responseInterceptor = Axios.interceptors.response.use((response) => {
      this.decrementCount();
      return response;
    }, (error) => {
      this.decrementCount();

      vm.snackbarText = vm.$t('http.error.' + error.config.method).toString();
      vm.snackbar = false;
      setTimeout(() => vm.snackbar = true);
      return Promise.reject(error);
    });

    router.beforeEach((to: Route, from: Route, next) => {
      this.incrementCount();
      // TODO check /club access
      if (to.meta
              && to.meta.features
              && to.meta.features.filter((f: string) => store.getters.features.indexOf(f) !== -1).length === 0) {
        next(false);
        this.decrementCount();
      } else {
        next();
        this.decrementCount();
      }
    });

  }

  private incrementCount() {
    if (this.count === 0) {
        NProgress.start();
    }
    this.count++;
  }

  private decrementCount() {
    this.$nextTick(() => {
      this.count--;
      if (this.count === 0) {
        NProgress.done();
      }
    });
  }
}
</script>
