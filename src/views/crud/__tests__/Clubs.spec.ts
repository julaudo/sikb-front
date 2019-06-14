import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import globalAxios from 'axios';
import {initAxiosInterceptors, setInputText, startjsonserver, stopjsonserver} from '@/test/utils';
import {changed, decremented, incremented, testCreate, testDelete, testEdit} from '@/test/common';
import {ClubsApi} from '@/generated';
import Clubs from '@/views/crud/Clubs.vue';


describe('Clubs.vue', () => {
    let wrapper: any;

    beforeEach((done) => {
        initAxiosInterceptors(globalAxios);
        jest.setTimeout(30000);
        require('dotenv').config();
        Vue.use(Vuetify);

        store.state.userInfo = {
            login: '',
            token: '',
            profile: '',
            clubs: [],
            functionalities: [],
        };

        Vue.component('Clubs', Clubs);


        wrapper = mount(Vue.extend({
            template: `<div data-app="true" class="application theme--light" id="app"><Clubs /></div>`,
        }), {
            attachToDocument: true,
            sync: false,
            i18n,
            store,
        });

        startjsonserver(() => undefined, done);
    });

    afterEach((done) => {
        wrapper.destroy();
        stopjsonserver(done);
    });

    test('delete club', async (done) => {
        await testDelete(Clubs, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
        }, decremented);

        done();
    });

    const getData = async (id: any) => {
        return (await new ClubsApi().getClubById('', id)).data.name;
    };

    test('edit club', async (done) => {
        await testEdit(Clubs, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, getData, changed);

        done();
    });

    const setData = () => {
        setInputText(wrapper.find('#crud_name'), ' input', 'name');
        setInputText(wrapper.find('#crud_shortName'), 'input', 'shortName');
    };

    test('create club', async (done) => {
        await testCreate(Clubs, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });
});
