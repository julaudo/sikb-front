import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import globalAxios from 'axios';
import {flushPromises, initAxiosInterceptors, setInputText, startjsonserver, stopjsonserver} from '@/test/utils';
import {changed, decremented, equal, getRows, incremented, testCreate, testDelete, testEdit} from '@/test/common';
import Persons from '@/views/crud/Persons.vue';
import {Functionality, PersonsApi} from '@/generated';


describe('Persons.vue', () => {
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

        Vue.component('Persons', Persons);


        wrapper = mount(Vue.extend({
            template: `<div data-app="true" class="application theme--light" id="app"><Persons /></div>`,
        }), {
            attachToDocument: true,
            sync: false,
            i18n,
            store,
        });

        await startjsonserver();
        await flushPromises();
    });

    afterEach(async () => {
        wrapper.destroy();
        await stopjsonserver();
    });

    test('delete person', async () => {
        store.state.userInfo!.functionalities = [Functionality.PERSONDELETE];
        await testDelete(Persons, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
            return true;
        }, decremented);
    });

    test('delete person failure', async () => {
        store.state.userInfo!.functionalities = [Functionality.PERSONDELETE];

        // Delete from database
        const items = wrapper.find(Persons).vm.items;
        for (const item of items) {
            await new PersonsApi().deletePerson('', item.id);
        }

        // Delete fails
        await testDelete(Persons, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
            return false;
        }, equal);
        expect(getRows(wrapper).length).toBe(items.length);

        // Refresh : table is now empty
        wrapper.find('#btnRefresh').element.click();
        await flushPromises();


        expect(wrapper.find(Persons).vm.items.length).toBe(0);
    });

    const getData = async (id: any) => {
        return (await new PersonsApi().getPerson('', id)).data.name;
    };

    test('edit person', async () => {
        store.state.userInfo!.functionalities = [Functionality.PERSONUPDATE];
        await testEdit(Persons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, getData, changed);
    });

    const setData = () => {
        setInputText(wrapper.find('#crud_name'), ' input', 'name');
        setInputText(wrapper.find('#crud_firstName'), 'input', 'last name');
        setInputText(wrapper.find('#crud_email'), 'input', 'mail@mail.fr');
    };

    test('create person', async () => {
        store.state.userInfo!.functionalities = [Functionality.PERSONCREATE];
        await testCreate(Persons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);
    });

    test('create resize', async () => {
        (global as any).innerHeight = 500;

        (global as any).dispatchEvent(new Event('resize'));
    });
});
