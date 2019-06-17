import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import {
    flushPromises,
    initAxiosInterceptors, startjsonserver, stopjsonserver,
} from '@/test/utils';
import globalAxios from 'axios';
import {createRouter} from '@/router';
import Clubs from '@/views/crud/Clubs.vue';
import Persons from '@/views/crud/Persons.vue';
import Login from '@/views/Login.vue';
import i18n from '@/i18n';
import store from '@/store/store';
import Seasons from '@/views/crud/Seasons.vue';
import Users from '@/views/crud/Users.vue';


let wrapper: any;

describe('router.ts', () => {

    const routerView = Vue.extend({
        template: `<router-view />`,
    });

    let router: Router;
    beforeEach(async (done) => {
        initAxiosInterceptors(globalAxios);
        jest.setTimeout(30000);
        Vue.use(Vuetify);
        Vue.use(Router);

        router = createRouter();

        wrapper = mount(routerView, {
            stubs: {
                'v-menu': true,
            },
            attachToDocument: true,
            sync: true,
            i18n,
            router,
            store,
        });

        startjsonserver(() => undefined, done);
    });

    afterEach(async (done) => {
        wrapper.destroy();
        stopjsonserver(done);
    });
    const check = (present: any[], absent: any[]) => {
        present.forEach((c: any) =>  expect(wrapper.find(c).exists()).toBeTruthy());
        absent.forEach((c: any) =>  expect(wrapper.find(c).exists()).toBeFalsy());
    }

    test('test routes', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});

        check([], [Clubs, Persons, Users, Seasons]);

        router.push('/admin/clubs');
        await flushPromises();

        check([Clubs], [Persons, Users, Seasons]);

        router.push('/admin/persons');
        await flushPromises();

        check([Persons], [Clubs, Users, Seasons]);

        router.push('/admin/seasons');
        await flushPromises();

        check([Seasons], [Clubs, Users, Persons]);

        router.push('/admin/users');
        await flushPromises();

        check([Users], [Clubs, Seasons, Persons]);

        done();
    });

});
