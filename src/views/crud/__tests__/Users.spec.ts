import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import Users from '@/views/crud/Users.vue';
import store from '@/store/store';
import globalAxios from 'axios';
import {initAxiosInterceptors, startjsonserver, stopjsonserver} from '@/test/utils';
import {
    changed,
    decremented,
    equal,
    incremented,
    notChanged,
    testCreate,
    testDelete,
    testEdit,
} from './common';
import {UsersApi} from '@/generated';


describe('Users.vue', () => {
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
            features: [],
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

        startjsonserver(() => undefined, done);
    });

    afterEach((done) => {
        wrapper.destroy();
        stopjsonserver(done);
    });

    test('delete user', async (done) => {
        await testDelete(Users, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
        }, decremented);

        done();
    });


    test('cancel delete user', async (done) => {
        await testDelete(Users, wrapper, () => {
            wrapper.find('#refDeleteDialogNo').trigger('click');
        }, equal);

        done();
    });

    test('escape delete user', async (done) => {
        await testDelete(Users, wrapper, () => {
            wrapper.find('#refDeleteDialogNo').trigger('keydown.esc');
        }, equal);

        done();
    });

    const getData = async (id: any) => {
        return (await new UsersApi().getUser('', id)).data.email;
    };

    test('edit user', async (done) => {
        await testEdit(Users, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, getData, changed);

        done();
    });

    test('edit cancel', async (done) => {
        await testEdit(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('click');
        }, getData, notChanged);

        done();
    });

    test('edit escape', async (done) => {
        await testEdit(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('keydown.esc');
        }, getData, notChanged);

        done();
    });

    const setData = () => {
        const mailInput = wrapper.find('#refDialog').findAll('input').at(0) as any;
        const mail = 'test@mail.fr';
        mailInput.element.value = mail;
        mailInput.trigger('input');

        const select = wrapper.find('#refDialog').find('.v-select').vm as any;
        select.selectItem(1);
    };

    test('create user', async (done) => {
        await testCreate(Users, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });

    test('create user', async (done) => {
        await testCreate(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('click');
        }, setData, equal);

        done();
    });

    test('create user', async (done) => {
        await testCreate(Users, wrapper, () => {
            wrapper.find('#refDialogCancel').trigger('keydown.esc');
        }, setData, equal);

        done();
    });
});
