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
import ClubVue from '@/views/club/ClubVue.vue';
import {Club} from '@/generated';



describe('ClubVue.vue', () => {
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
        startjsonserver((server: any) => undefined, done);
    });

    afterEach(async (done) => {
        wrapper.destroy();
        stopjsonserver(done);
    });

    const setInputText = (selector: string, value: string) => {
        wrapper.find(selector).element.value = value;
        wrapper.find(selector).trigger('input');
    };

    const expectInput = (selector: string, value: string) => {
        expect(wrapper.find(selector).element.value).toEqual(value);
    };

    test('test reset', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();

        const clubName = wrapper.find("#clubName").element.value;
        const clubShortName = wrapper.find("#clubShortName").element.value;

        const newClubName = clubName + '_new';
        const newClubShortName = clubShortName + '_new';

        setInputText('#clubName', newClubName);
        setInputText('#clubShortName', newClubShortName);

        wrapper.find('#btnCancel').trigger('click');
        await flushPromises();

        expectInput('#clubName', clubName);
        expectInput('#clubShortName', clubShortName);

        done();
    });

    test('test set name', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();

        const clubName = wrapper.find("#clubName").element.value;
        const clubShortName = wrapper.find("#clubShortName").element.value;

        const newClubName = clubName + '_new';
        const newClubShortName = clubShortName + '_new';

        setInputText('#clubName', newClubName);
        setInputText('#clubShortName', newClubShortName);

        wrapper.find('#btnValidate').trigger('click');
        await flushPromises();

        expectInput('#clubName', newClubName);
        expectInput('#clubShortName', newClubShortName);

        const storeClub = store.getters.clubs.find((c: Club) => c.id === 1);

        expect(storeClub.name).toEqual(newClubName);
        expect(storeClub.shortName).toEqual(newClubShortName);
        done();
    });

    const fs = require('fs')
    const path = require('path')
    const mime = require('mime-types')

    const { JSDOM } = require('jsdom')
    const { File, FileList } = (new JSDOM()).window


    function addFileList(input: any, file_paths: any) {
        if (typeof file_paths === 'string')
            file_paths = [file_paths]
        else if (!Array.isArray(file_paths)) {
            throw new Error('file_paths needs to be a file path string or an Array of file path strings')
        }

        const file_list = file_paths.map((fp: any) => createFile(fp))
        file_list.__proto__ = Object.create(FileList.prototype)

        Object.defineProperty(input, 'files', {
            value: file_list,
            writable: false,
        })

        return input
    }

    function createFile(file_path: any) {
        const { mtimeMs: lastModified } = fs.statSync(file_path)

        return new File(
            [new fs.readFileSync(file_path)],
            path.basename(file_path),
            {
                lastModified,
                type: mime.lookup(file_path) || '',
            }
        )
    }

    test('test set logo', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        await flushPromises();
        router.push({path: '/club/1/general'});
        await flushPromises();

        const uploader = wrapper.find("#uploader").find('input');
        addFileList(uploader.element, 'README.md');

        uploader.trigger('change');
        await flushPromises();

        done();
    });
});
