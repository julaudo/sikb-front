import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import Router from 'vue-router';
import {
    expectInput,
    flushPromises,
    initAxiosInterceptors, setInputText,
    startjsonserver, stopjsonserver,
} from '@/test/utils';
import {createRouter} from '@/router';
import App from '@/App.vue';
import globalAxios from 'axios';
import ClubVue from '@/views/club/ClubVue.vue';
import {Club, ClubsApi} from '@/generated';
import {addFileList} from '@/test/filelist';

describe('ClubVue.vue', () => {
    let wrapper: any;
    let router: Router;

    beforeEach(async () => {
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
        await startjsonserver();
    });

    afterEach(async () => {
        wrapper.destroy();
        await stopjsonserver();
    });

    test('test reset', async () => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();

        const clubName = wrapper.find('#clubName').element.value;
        const clubShortName = wrapper.find('#clubShortName').element.value;

        const newClubName = clubName + '_new';
        const newClubShortName = clubShortName + '_new';

        setInputText(wrapper, '#clubName', newClubName);
        setInputText(wrapper, '#clubShortName', newClubShortName);

        wrapper.find('#btnCancel').trigger('click');
        await flushPromises();

        expectInput(wrapper, '#clubName', clubName);
        expectInput(wrapper, '#clubShortName', clubShortName);
    });

    test('test set name', async () => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();

        const clubName = wrapper.find('#clubName').element.value;
        const clubShortName = wrapper.find('#clubShortName').element.value;

        const newClubName = clubName + '_new';
        const newClubShortName = clubShortName + '_new';

        setInputText(wrapper, '#clubName', newClubName);
        setInputText(wrapper, '#clubShortName', newClubShortName);

        wrapper.find('#btnValidate').trigger('click');
        await flushPromises();

        expectInput(wrapper, '#clubName', newClubName);
        expectInput(wrapper, '#clubShortName', newClubShortName);

        const storeClub = store.getters.clubs.find((c: Club) => c.id === 1);

        expect(storeClub.name).toEqual(newClubName);
        expect(storeClub.shortName).toEqual(newClubShortName);
    });

    test('test set logo', async () => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();

        const uploader = wrapper.find('#uploader').find('input');
        addFileList(uploader.element, 'README.md');

        uploader.trigger('change');
        await flushPromises();

        wrapper.find('#btnValidate').trigger('click');
        await flushPromises();

        const club = await new ClubsApi().getClubById('', 1);
        console.log(club.data.logo!.location);
    });
});
