import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import Router from 'vue-router';
import {
    flushPromises,
    initAxiosInterceptors,
    startjsonserver,
    stopjsonserver,
} from '@/test/utils';
import {createRouter} from '@/router';
import App from '@/App.vue';
import globalAxios from 'axios';
import ClubVue from '@/views/club/ClubVue.vue';



describe('ClubVue.vue', () => {
    let wrapper: any;
    let router: Router;

    beforeEach((done) => {
        initAxiosInterceptors(globalAxios);


        jest.setTimeout(30000);
        Vue.use(Vuetify);
        Vue.use(Router);

        router = createRouter();

        wrapper = mount(App, {
            sync: true,
            i18n,
            router,
            store,
        });
        startjsonserver((server: any) => {
            server.post('/users/login', (req: any, res: any) => {
                if (req.body.login === 'loginOK') {
                    res.jsonp({
                        access_token: 'ZWEyMDMyMDItNDFmMS00ZmI1LTllYWYtYjYxNDQ2N2MyMWZlMjAxOS0wNi0wN1QwNjoxNToyNC42MjZa',
                        user: {
                            id: 1,
                            email: 'myEmail@kin-ball.fr',
                            profile: {
                                type: {
                                    id: 1,
                                    name: 'Administrator',
                                    functionalities: [
                                        'USER_READ',
                                        'USER_CREATE',
                                        'USER_UPDATE',
                                        'USER_DELETE',
                                        'CLUB_READ',
                                        'CLUB_CREATE',
                                        'CLUB_UPDATE',
                                        'CLUB_DELETE',
                                        'AFFILIATION_VALIDATE',
                                        'PERSON_READ',
                                        'PERSON_CREATE',
                                        'PERSON_UPDATE',
                                        'PERSON_DELETE',
                                        'SEASON_READ',
                                        'SEASON_CREATE',
                                        'SEASON_UPDATE',
                                        'SEASON_DELETE',
                                    ],
                                },
                                clubIds: [],
                            },
                        },
                    });
                } else {
                    res.status(500).jsonp({});
                }
            });
        }, done);
    });

    afterEach(async (done) => {
        wrapper.destroy();
        stopjsonserver(done);
    });

    const setInputText = (selector: string, value: string) => {
        wrapper.find(selector).element.value = value;
        wrapper.find(selector).trigger('input');
    };

    const expectInput = (selector: string, value: string) => {
        expect(wrapper.find(selector).element.value).toEqual(value);
    }

    test('successful login', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();
        const clubVue = wrapper.find(ClubVue).vm;

        const clubName = wrapper.find("#clubName").element.value;
        const clubShortName = wrapper.find("#clubShortName").element.value;

        const newClubName = clubName + '_new';
        const newClubShortName = clubShortName + '_new';

        setInputText('#clubName', newClubName);
        setInputText('#clubShortName', newClubShortName);

        wrapper.find('#btnCancel').trigger('click');

        expectInput('#clubName', clubName);
        expectInput('#clubShortName', clubShortName);

        done();
    });
});
