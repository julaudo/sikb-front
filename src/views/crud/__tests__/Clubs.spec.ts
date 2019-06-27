import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import globalAxios from 'axios';
import {flushPromises, initAxiosInterceptors, setInputText, startjsonserver, stopjsonserver} from '@/test/utils';
import {changed, decremented, getRows, incremented, testCreate, testDelete, testEdit} from '@/test/common';
import {ClubsApi, Functionality} from '@/generated';
import Clubs from '@/views/crud/Clubs.vue';
import {ICrudParent} from '@/model/model';
import Router from 'vue-router';
import {createRouter} from '@/router';


describe('Clubs.vue', () => {
    let wrapper: any;
    let router: Router;

    beforeEach( async () => {
        initAxiosInterceptors(globalAxios);
        jest.setTimeout(30000);
        require('dotenv').config();
        Vue.use(Vuetify);
        Vue.use(Router);

        router = createRouter();

        store.state.userInfo = {
            login: '',
            token: '',
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
            router,
        });

        await startjsonserver();
    });

    afterEach(async () => {
        wrapper.destroy();
        await stopjsonserver();
    });

    test('delete club', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.CLUBDELETE];
        await testDelete(Clubs, wrapper, () => {
            wrapper.find('#refDeleteDialogYes').trigger('click');
            return true;
        }, decremented);

        done();
    });

    const getData = async (id: any) => {
        return (await new ClubsApi().getClubById('', id)).data.name;
    };

    test('edit club', async (done) => {
        store.state.userInfo!.functionalities = [Functionality.CLUBUPDATE];
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
        store.state.userInfo!.functionalities = [Functionality.CLUBCREATE];
        await testCreate(Clubs, wrapper, () => {
            wrapper.find('#refDialogSave').trigger('click');
        }, setData, incremented);

        done();
    });

    test('goto affiliations', async (done) => {
        await flushPromises();
        const rows = getRows(wrapper);
        const vm = wrapper.find(Clubs).vm as any as ICrudParent;
        const columns = rows.at(0).findAll('td');

        const nameIndex = vm.headers.findIndex((h: any) => h.value === 'name');
        const clubName = columns.at(nameIndex).text();
        const club = vm.items.find((c: any) => c.name === clubName);

        const editIndex = vm.headers.findIndex((h: any) => h.value === 'affiliations');
        columns.at(editIndex).find('i').trigger('click');
        await flushPromises();

        expect(router.currentRoute.fullPath).toEqual('/club/' + club!.id + '/affiliations');

        done();
    });
});
