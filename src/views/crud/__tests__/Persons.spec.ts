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
import Persons from '@/views/crud/Persons.vue';
import {PersonsApi} from '@/generated';


describe('Persons.vue', () => {
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

        Vue.component('Persons', Persons);


        wrapper = mount(Vue.extend({
            template: `<div data-app="true" class="application theme--light" id="app"><Persons /></div>`,
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

    test('delete person', async (done) => {
        await testDelete(Persons, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
        }, decremented);

        done();
    });

    const getData = async (id: any) => {
        return (await new PersonsApi().getPerson('', id)).data.name;
    };

    test('edit person', async (done) => {
        await testEdit(Persons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, getData, changed);

        done();
    });

    const setData = () => {
        setInputText(wrapper.find('#crud_name'), ' input', 'name');
        setInputText(wrapper.find('#crud_firstName'), 'input', 'last name');
        setInputText(wrapper.find('#crud_email'), 'input', 'mail@mail.fr');
    };

    test('create person', async (done) => {
        await testCreate(Persons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });
});
