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
import Navigation from '@/views/layout/Navigation.vue';



describe('App.vue', () => {
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
            server.get('/users/logout', (req: any, res: any) => {
                res.jsonp({});
            });

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

    const login = async (loginValue: string) => {
        const loginInput = wrapper.find('#login').find('input') as any;
        const passwordInput = wrapper.find('#password').find('input') as any;

        loginInput.element.value = loginValue;
        loginInput.trigger('input');

        passwordInput.element.value = 'password';
        passwordInput.trigger('input');

        await flushPromises();

        wrapper.find('#btnLogin').trigger('click');
        await flushPromises();
    };

    test('successful login', async (done) => {
        await login('loginOK');
        expect(router.currentRoute.fullPath).toEqual('/home');
        await flushPromises();

        const nav = wrapper.find(Navigation);
        nav.vm.logout();
        await flushPromises();

        done();
    });

    test('bad login', async (done) => {
        await login('loginKO');
        expect(router.currentRoute.fullPath).toEqual('/login');
        done();
    });
});
