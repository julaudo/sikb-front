import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import Users from '@/views/crud/Users.vue';
import store from '@/store/store';


describe('Users.vue', () => {
    let wrapper: any;


    beforeEach(() => {
        Vue.use(Vuetify);

        store.state.userInfo = {
            login: '',
            token: '',
            profile: '',
            clubs: [],
            features: [],
        };

        Vue.component('Users', Users);

        wrapper = mount(Vue.extend({
            template: `<div><Users /></div>`,
        }), {
            sync: true,
            i18n,
            store,
        });

    });

    test('test store getters', async (done) => {



        done();

    });
});
