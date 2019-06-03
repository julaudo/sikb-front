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
import {flushPromises} from '@/test/utils';

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
    const season20162017 = {id: '20162017', begin: '2016', end: '2017', description: '2016/2017'};
    const season20172018 = {id: '20172018', begin: '2017', end: '2018', description: '2017/2018'};
    const season20182019 = {id: '20182019', begin: '2018', end: '2019', description: '2018/2019'};

    const currentSeason = season20172018;
    const routerView = Vue.extend({
        template: `<router-view />`,
    });


    const router = new Router({
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



    beforeEach(() => {
        jest.setTimeout(30000);
        Vue.use(Vuetify);
        Vue.use(Router);

        store.state.seasons = [season20162017, season20172018, season20182019];
        store.state.currentSeason = currentSeason;
        store.state.userInfo = {
            login: '',
            token: '',
            profile: '',
            clubs: [],
            features: [],
        };

        wrapper = mount(routerView, {
            stubs: {
                'v-menu': true,
            },
            sync: true,
            i18n,
            router,
            store,
        });

    });

    test('test store getters', async (done) => {

        const affiliation20162017 = {
            season: season20162017,
            affiliation: {
                address: '',
                board: {
                    electedDate: '',
                    membersNumber: 0,
                    president: {name: 'president', sex: Sex.MALE},
                    secretary: {name: 'secretary', sex: Sex.MALE},
                    treasurer: {name: 'treasurer', sex: Sex.MALE},
                },
                city: '',
                email: '',
                phoneNumber: '',
                postalCode: '',
                prefectureCity: '',
                prefectureNumber: '',
                siretNumber: '',
                webSite: '',
                id: 20162017,
            },
        };

        const affiliation20172018 = {
            season: season20172018,
            affiliation: {
                address: '',
                board: {
                    electedDate: '',
                    membersNumber: 0,
                    president: {name: 'president', sex: Sex.MALE},
                    secretary: {name: 'secretary', sex: Sex.MALE},
                    treasurer: {name: 'treasurer', sex: Sex.MALE},
                },
                city: '',
                email: '',
                phoneNumber: '',
                postalCode: '',
                prefectureCity: '',
                prefectureNumber: '',
                siretNumber: '',
                webSite: '',
                id: 20172018,
            },
        };

        const axios = require('axios');
        const MockAdapter = require('axios-mock-adapter');
        // This sets the mock adapter on the default instance
        const mock = new MockAdapter(axios);
        mock.onGet(/.*clubs\/12\/affiliations\/?/).reply(200, [affiliation20162017, affiliation20172018]);
        mock.onGet(/.*clubs\/13\/affiliations\/?/).reply(200, [affiliation20162017]);
        mock.onGet(/.*clubs\/14\/affiliations\/?/).reply(200, []);
        mock.onPost(/.*clubs\/14\/affiliations\/?/).reply(201);

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

        mock.reset();
        done();

    });
});
