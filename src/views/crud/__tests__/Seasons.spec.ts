import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import globalAxios from 'axios';
import {initAxiosInterceptors, setInputText, startjsonserver, stopjsonserver} from '@/test/utils';
import Seasons from '@/views/crud/Seasons.vue';
import {changed, decremented, incremented, testCreate, testDelete, testEdit} from '@/test/common';
import {ConfigurationsApi, Functionality, User, UsersApi} from '@/generated';


describe('Seasons.vue', () => {
    let wrapper: any;

    beforeEach(async () => {
        initAxiosInterceptors(globalAxios);
        jest.setTimeout(30000);
        require('dotenv').config();
        Vue.use(Vuetify);

        store.state.userInfo = {
            login: '',
            token: '',
            clubs: [],
            functionalities: [],
        };

        Vue.component('Seasons', Seasons);


        wrapper = mount(Vue.extend({
            template: `<div data-app="true" class="application theme--light" id="app"><Seasons /></div>`,
        }), {
            attachToDocument: true,
            sync: false,
            i18n,
            store,
        });

        await startjsonserver();
    });

    afterEach(async () => {
        wrapper.destroy();
        await stopjsonserver();
    });

    test('delete season', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.SEASONDELETE];
        await testDelete(Seasons, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
            return true;
        }, decremented);

        done();
    });

    const getData = async (id: any) => {
        return (await new ConfigurationsApi().findSeasons('')).data.filter((s) => s.id === id)[0].description;
    };

    test('edit season', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.SEASONUPDATE];
        await testEdit(Seasons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, getData, changed);

        done();
    });

    const setData = () => {
        setInputText(wrapper.find('#crud_description'), ' input', 'description');
        setInputText(wrapper.find('#crud_begin'), 'input', '01/01/1985');
        setInputText(wrapper.find('#crud_end'), 'input', '31/12/1985');
    };

    test('create season', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.SEASONCREATE];
        await testCreate(Seasons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });
});
