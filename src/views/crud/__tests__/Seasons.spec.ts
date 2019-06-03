import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import globalAxios from 'axios';
import {initAxiosInterceptors, startjsonserver, stopjsonserver} from '@/test/utils';
import Seasons from '@/views/crud/Seasons.vue';
import {changed, decremented, incremented, testCreate, testDelete, testEdit} from './common';


describe('Seasons.vue', () => {
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

        Vue.component('Seasons', Seasons);


        wrapper = mount(Vue.extend({
            template: `<div data-app="true" class="application theme--light" id="app"><Seasons /></div>`,
        }), {
            attachToDocument: true,
            sync: false,
            i18n,
            store,
        });

        startjsonserver(() => {}, done);
    });

    afterEach((done) => {
        wrapper.destroy();
        stopjsonserver(done);
    });

    test('delete season', async (done) => {
        await testDelete(Seasons, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
        }, decremented);

        done();
    });

    xtest('edit season', async (done) => {
        await testEdit(Seasons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, changed);

        done();
    });

    const setData = () => {
        const descInput = wrapper.find('#refDialog').findAll('input').at(0) as any;
        const desc = 'test@mail.fr';
        descInput.element.value = desc;
        descInput.trigger('input');


        const beginInput = wrapper.find('#refDialog').findAll('input').at(1) as any;
        const begin = '01/01/1985';
        beginInput.element.value = begin;
        beginInput.trigger('input');


        const endInput = wrapper.find('#refDialog').findAll('input').at(2) as any;
        const end = '31/12/1985';
        endInput.element.value = end;
        endInput.trigger('input');
    };

    test('create season', async (done) => {
        await testCreate(Seasons, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });
});
