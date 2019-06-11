import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import ClubAffiliations from '../ClubAffiliations.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import {Sex} from '@/generated';
import Router from 'vue-router';
import {Features} from '@/model/model';
import {flushPromises, initAxiosInterceptors, startjsonserver, stopjsonserver} from '@/test/utils';
import globalAxios from 'axios';

const testButton = (wrapper: any, disabled: boolean, name: string) => {
    const btn = wrapper.find(name);
    expect(btn).toBeTruthy();
    if (disabled) {
        expect(btn.classes()).toContain('v-btn--disabled');
    } else {
        expect(btn.classes()).not.toContain('v-btn--disabled');
    }
};

const testButtons = (wrapper: any, cancelDisabled: boolean, validateDisabled: boolean, deleteDisabled: boolean) => {
    testButton(wrapper, cancelDisabled, '#btnAffiliationCancel');
    testButton(wrapper, validateDisabled, '#btnAffiliationValidate');
    testButton(wrapper, deleteDisabled, '#btnAffiliationDelete');
};

describe('ClubAffiliations.vue', () => {
    let wrapper: any;

    const routerView = Vue.extend({
        template: `<router-view />`,
    });


    let router: Router;
    beforeEach(async (done) => {
        initAxiosInterceptors(globalAxios);
        jest.setTimeout(30000);
        Vue.use(Vuetify);
        Vue.use(Router);

        router = new Router({
            mode: 'hash',
            base: process.env.BASE_URL,
            routes: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import( '../../Home.vue'),
                },
                {
                    path: '/club/:clubId/affiliations',
                    name: 'affiliations',
                    component: () => import( '../../club/ClubAffiliations.vue'),
                    meta: {
                        icon: 'verified_user',
                        features: [Features.CLUB_ADMIN],
                    },
                    children: [
                        {
                            path: ':seasonId',
                            name: 'affiliation',
                            component: () => import( '../../club/AffiliationVue.vue'),
                            meta: {
                                icon: 'verified_user',
                                features: [Features.CLUB_ADMIN],
                            },
                        },
                    ],
                },
                {
                    path: '*',
                    redirect: '/',
                },
            ],
        });

        wrapper = mount(routerView, {
            stubs: {
                'v-menu': true,
            },
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

    test('test delete', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/club/12/affiliations');
        await flushPromises();

        expect(router.currentRoute.fullPath).toEqual('/club/12/affiliations/20172018');
        const vm = wrapper.find(ClubAffiliations).vm;
        expect(vm.affiliations.length).toEqual(2);

        wrapper.find('#btnAffiliationDelete').trigger('click');
        await flushPromises()
        expect(vm.affiliations.length).toEqual(1);
        done();
    });

    test('test routes', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/club/12/affiliations');
        await flushPromises();

        expect(router.currentRoute.fullPath).toEqual('/club/12/affiliations/20172018');
        const vm = wrapper.find(ClubAffiliations).vm;
        expect(vm.affiliations.length).toEqual(2);
        expect(vm.active).toEqual('20172018');
        testButtons(wrapper, true, true, false);


        router.push('/club/12/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);
        expect(vm.active).toEqual('20162017');
        testButtons(wrapper, true, true, false);

        // Ajout saison puis annulation
        router.push('/club/12/affiliations/20182019');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(3);
        expect(vm.active).toEqual('20182019');
        testButtons(wrapper, false, true, true);

        wrapper.find('#btnAffiliationCancel').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);
        testButtons(wrapper, true, true, false);

        // Ajout saison inexistante
        router.push('/club/12/affiliations/20202021');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);
        testButtons(wrapper, true, true, false);

        // Changement club
        router.push('/club/13/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);
        expect(vm.active).toEqual('20162017');
        testButtons(wrapper, true, true, false);

        // Affiliation pour la saison en cours
        vm.affiliateForSeasonAndSetRouteFromExisting(vm.currentSeason);
        expect(vm.affiliations.length).toEqual(2);
        testButtons(wrapper, false, true, true);


        // Changement de club + création affiliation
        router.push('/club/14/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);
        expect(vm.active).toEqual('20162017');
        testButtons(wrapper, false, true, true);

        // Annulation
        wrapper.find('#btnAffiliationCancel').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(0);
        expect(vm.active).toEqual(null);

        // Création
        router.push('/club/14/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);
        expect(vm.active).toEqual('20162017');
        testButtons(wrapper, false, true, true);

        vm.affiliations[0].affiliation = {
            address: 'address',
            board: {
                electedDate: '2018-01-01',
                    membersNumber: 2,
                    president: {name: 'president', sex: Sex.MALE},
                secretary: {name: 'secretary', sex: Sex.MALE},
                treasurer: {name: 'treasurer', sex: Sex.MALE},
            },
            city: 'city',
            email: 'mail@mail.fr',
            phoneNumber: '0666223344',
            postalCode: 'postalCode',
            prefectureCity: 'prefectureCity',
            prefectureNumber: 'prefectureNumber',
            siretNumber: 'siretNumber',
            webSite: 'webSite',
        };
        await flushPromises();
        testButtons(wrapper, false, false, true);


        wrapper.find('#btnAffiliationValidate').trigger('click');

        done();

    });
});
