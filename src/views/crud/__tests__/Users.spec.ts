import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import Users from '@/views/crud/Users.vue';
import store from '@/store/store';
import globalAxios from 'axios';
import {initAxiosInterceptors, setInputText, startjsonserver, stopjsonserver} from '@/test/utils';
import {
    changed,
    decremented,
    equal,
    incremented,
    notChanged,
    testCreate,
    testDelete,
    testEdit,
} from '@/test/common';
import {Functionality, UsersApi} from '@/generated';


describe('Users.vue', () => {
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

        Vue.component('Users', Users);


        wrapper = mount(Vue.extend({
            template: `<div data-app="true" class="application theme--light" id="app"><Users /></div>`,
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

    test('delete user', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERDELETE];
        await testDelete(Users, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
            return true;
        }, decremented);

        done();
    });


    test('cancel delete user', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERDELETE];
        await testDelete(Users, wrapper, () => {
            wrapper.find('#refDeleteDialogNo').trigger('click');
            return true;
        }, equal);

        done();
    });

    test('escape delete user', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERDELETE];
        await testDelete(Users, wrapper, () => {
            wrapper.find('#refDeleteDialogNo').trigger('keydown.esc');
            return true;
        }, equal);

        done();
    });

    const getData = async (id: any) => {
        return (await new UsersApi().getUser('', id)).data.email;
    };

    test('edit user', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERUPDATE];
        await testEdit(Users, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, getData, changed);

        done();
    });

    test('edit cancel', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERUPDATE];
        await testEdit(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('click');
        }, getData, notChanged);

        done();
    });

    test('edit escape', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERUPDATE];
        await testEdit(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('keydown.esc');
        }, getData, notChanged);

        done();
    });

    const setData = () => {

        setInputText(wrapper.find('#crud_email'), ' input', 'test@mail.fr');

        const select = wrapper.find('#refDialog').find('.v-select').vm as any;
        select.selectItem(1);
    };

    test('create user', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERCREATE];
        await testCreate(Users, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });

    test('create user cancel', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERCREATE];
        await testCreate(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('click');
        }, setData, equal);

        done();
    });

    test('create user escape', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.USERCREATE];
        await testCreate(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('keydown.esc');
        }, setData, equal);

        done();
    });
});
