import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Vuetify from 'vuetify/lib';
import i18n from './i18n';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: 'md',
});

// TODO remove hardcoded data
export const baseOptions = {
  username: 'admin',
  password: 'admin',
};


new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
