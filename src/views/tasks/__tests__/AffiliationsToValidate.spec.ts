import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import ClubAffiliations from '../ClubAffiliations.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import {AffiliationsApi, AffiliationStatus, Functionality, Sex} from '@/generated';
import Router from 'vue-router';
import {
    flushPromises,
    initAxiosInterceptors,
    setInputText,
    startjsonserver,
    stopjsonserver,
} from '@/test/utils';
import globalAxios from 'axios';
import {createRouter} from '@/router';
import AffiliationVue from '@/views/club/AffiliationVue.vue';
import AffiliationsToValidate from '@/views/tasks/AffiliationsToValidate.vue';

const splitPane = require('vue-splitpane').default;
Vue.component('split-pane', splitPane);

let wrapper: any;

const getCurrentAffiliationView = () => {
    return wrapper.findAll(AffiliationVue).filter((c: any) => c.isVisible()).at(0);
};

describe('AffiliationsToValidate.vue', () => {

    const routerView = Vue.extend({
        template: `<router-view />`,
    });


    let router: Router;
    beforeEach(async () => {
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

        await startjsonserver();
    });

    afterEach(async () => {
        wrapper.destroy();
        await stopjsonserver();
    });

    test('test routes', async () => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/tasks/affiliations');
        await flushPromises();

        const vm = wrapper.find(AffiliationsToValidate).vm;

        expect(vm.affiliations.length).toBe(1);

        const items = wrapper.find(AffiliationsToValidate).findAll('.v-list__tile__content');
        expect(items.length).toBe(1);

        items.at(0).trigger('click');
        await flushPromises();

        expect(router.currentRoute.fullPath).toBe('/tasks/affiliations/1620172018');
    });
});
