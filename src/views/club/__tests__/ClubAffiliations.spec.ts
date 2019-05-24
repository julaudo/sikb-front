import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import ClubAffiliations from '../ClubAffiliations.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import {Season, SeasonWithAffiliation, Sex} from '@/generated';
import Router from 'vue-router';
import {Features} from '@/model/model';
import {nextTick} from 'q';

describe('ClubAffiliations.vue', () => {
    let wrapper: any;

    const currentSeason: Season = {id: '20172018', begin: '2017', end: '2018', description: '2017/2018'};
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
        Vue.use(Vuetify);
        Vue.use(Router);

        store.state.seasons = [];
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
                'v-menu': true
            },
            sync: true,
            i18n,
            router,
            store,
        });

    });

    test('test store getters', (done) => {

        const affiliations: SeasonWithAffiliation[] = [
            {
                season: {id: '20162017', begin: '2016', end: '2017', description: '2016/2017'},
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
                    id: 0,
                },
            },
            {
                season: {id: '20172018', begin: '2017', end: '2018', description: '2017/2018'},
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
                    id: 0,
                },
            },
        ];

        const axios = require('axios');
        const MockAdapter = require('axios-mock-adapter');
        // This sets the mock adapter on the default instance
        const mock = new MockAdapter(axios);
        mock.onGet(/.*api\/v1\/clubs\/12\/affiliations\/?/).reply(200, affiliations);

        router.push('/club/12/affiliations', () => {
            nextTick(() => {
                const vm = wrapper.find(ClubAffiliations).vm;
                expect(vm.affiliations.length).toEqual(2);
                expect(vm.active).toEqual('20172018');
                done();
            });
        });

    });
});
