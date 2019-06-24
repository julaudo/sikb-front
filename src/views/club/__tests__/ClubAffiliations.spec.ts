import 'jest';
import {mount} from '@vue/test-utils';
import '@/class-component-hooks';
import ClubAffiliations from '../ClubAffiliations.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/i18n';
import store from '@/store/store';
import {AffiliationsApi, AffiliationStatus, Sex} from '@/generated';
import Router from 'vue-router';
import {
    flushPromises,
    initAxiosInterceptors,
    setInputText,
    startjsonserver,
    stopjsonserver,
} from '@/test/utils';
import globalAxios from 'axios';
import {createRouter} from '@/router';
import AffiliationVue from '@/views/club/AffiliationVue.vue';


let wrapper: any;

const getCurrentAffiliationView = () => {
    return wrapper.findAll(AffiliationVue).filter((c: any) => c.isVisible()).at(0);
};

const testButton = (button: boolean | null, name: string) => {
    // There is one AffiliationVue per tab, we need to find the active one
    const btn = getCurrentAffiliationView().find(name);

    if (button === null) {
        expect(btn.exists()).toBe(false);
    } else  if (button) {
        expect(btn.exists()).toBe(true);
        expect(btn.classes()).not.toContain('v-btn--disabled');
    } else {
        expect(btn.exists()).toBe(true);
        expect(btn.classes()).toContain('v-btn--disabled');
    }
};

const testButtons = (cancelButton: boolean | null,
                     submitButton: boolean | null,
                     deleteButton: boolean | null,
                     validateButton: boolean | null,
                     rejectButton: boolean | null) => {
    testButton(cancelButton, '#btnAffiliationCancel');
    testButton(submitButton, '#btnAffiliationSubmit');
    testButton(deleteButton, '#btnAffiliationDelete');
    testButton(validateButton, '#btnAffiliationValidate');
    testButton(rejectButton, '#btnAffiliationReject');
};

describe('ClubAffiliations.vue', () => {

    const routerView = Vue.extend({
        template: `<router-view />`,
    });


    let router: Router;
    beforeEach(async () => {
        initAxiosInterceptors(globalAxios);
        jest.setTimeout(30000);
        Vue.use(Vuetify);
        Vue.use(Router);

        router = createRouter();

        wrapper = mount(routerView, {
            stubs: {
                'v-menu': true,
            },
            attachToDocument: true,
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

    test('test routes', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/club/12/affiliations');
        await flushPromises();

        // 20172018 : affiliation existante TO_COMPLETE
        expect(router.currentRoute.fullPath).toEqual('/club/12/affiliations/20172018');
        const vm = wrapper.find(ClubAffiliations).vm;
        expect(vm.affiliations.length).toEqual(2);
        expect(vm.active).toEqual('20172018');
        testButtons(null, true, true, null, null);


        // 20162017 : affiliation existante TO_COMPLETE
        router.push('/club/12/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);
        expect(vm.active).toEqual('20162017');
        testButtons(null, true, true, null, null);

        // Ajout saison
        router.push('/club/12/affiliations/20182019');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(3);
        expect(vm.active).toEqual('20182019');
        testButtons(true, false, null, null, null);

        // Annulation création
        wrapper.find('#btnAffiliationCancel').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);
        testButtons(null, true, true, null, null);

        // Ajout saison inexistante
        router.push('/club/12/affiliations/20202021');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);
        testButtons(null, true, true, null, null);

        // Changement club, affiliation existante TO_COMPLETE
        router.push('/club/13/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);
        expect(vm.active).toEqual('20162017');
        testButtons(null, true, true, null, null);

        // Affiliation pour la saison en cours
        vm.affiliateForSeasonAndSetRouteFromExisting(vm.currentSeason);
        expect(vm.affiliations.length).toEqual(2);
        testButtons(true, false, null, null, null);


        // Changement de club + création affiliation
        router.push('/club/14/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);
        expect(vm.active).toEqual('20162017');
        testButtons(true, false, null, null, null);

        // Annulation
        wrapper.find('#btnAffiliationCancel').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(0);
        expect(vm.active).toEqual(null);

        // Création
        router.push('/club/14/affiliations/20162017');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);
        expect(vm.active).toEqual('20162017');
        testButtons(true, false, null, null, null);

        // Remplissage avec des données valides
        vm.affiliations[0].affiliation = {
            address: 'address',
            board: {
                electedDate: '2018-01-01',
                membersNumber: 2,
                president: {name: 'president', sex: Sex.MALE},
                secretary: {name: 'secretary', sex: Sex.MALE},
                treasurer: {name: 'treasurer', sex: Sex.MALE},
            },
            city: 'city',
            email: 'mail@mail.fr',
            phoneNumber: '0666223344',
            postalCode: 'postalCode',
            prefectureCity: 'prefectureCity',
            prefectureNumber: 'prefectureNumber',
            siretNumber: 'siretNumber',
            webSite: 'webSite',
            status: AffiliationStatus.TOCOMPLETE,
        };
        await flushPromises();
        testButtons(true, true, null, null, null);

        done();

    });

    test('test delete', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/club/12/affiliations');
        await flushPromises();

        expect(router.currentRoute.fullPath).toEqual('/club/12/affiliations/20172018');
        const vm = wrapper.find(ClubAffiliations).vm;
        expect(vm.affiliations.length).toEqual(2);

        getCurrentAffiliationView().find('#btnAffiliationDelete').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);

        getCurrentAffiliationView().find('#refDeleteDialogYes').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(1);

        done();
    });


    test('test workflow', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/club/12/affiliations');
        await flushPromises();

        const current = getCurrentAffiliationView();

        expect(router.currentRoute.fullPath).toEqual('/club/12/affiliations/20172018');
        const vm = wrapper.find(ClubAffiliations).vm;
        expect(vm.affiliations.length).toEqual(2);
        testButtons(null, true, true, null, null);

        current.find('#btnAffiliationDelete').trigger('click');
        await flushPromises();
        expect(vm.affiliations.length).toEqual(2);

        const prefectureField = current.find('#prefectureCity');
        const prefecture = prefectureField.element.value;
        const newPrefecture = prefecture + '_new';
        testButtons(null, true, true, null, null);
        setInputText(current, '#prefectureCity', newPrefecture);
        testButtons(true, true, true, null, null);
        getCurrentAffiliationView().find('#btnAffiliationCancel').trigger('click');
        testButtons(null, true, true, null, null);
        setInputText(current, '#prefectureCity', newPrefecture);

        // Submit
        getCurrentAffiliationView().find('#btnAffiliationSubmit').trigger('click');
        await flushPromises();

        const affiliation = await new AffiliationsApi().getAffiliation('', 12, '20172018');
        await flushPromises();
        expect(affiliation.data.status).toEqual(AffiliationStatus.SUBMITTED);
        expect(affiliation.data.prefectureCity).toEqual(newPrefecture);
        testButtons(null, null, true, true, true);

        // Reject
        getCurrentAffiliationView().find('#btnAffiliationReject').trigger('click');
        await flushPromises();
        testButtons(null, true, true, null, null);

        // Submit
        getCurrentAffiliationView().find('#btnAffiliationSubmit').trigger('click');
        await flushPromises();
        testButtons(null, null, true, true, true);

        // Validate
        getCurrentAffiliationView().find('#btnAffiliationValidate').trigger('click');
        await flushPromises();
        testButtons(null, null, true, null, null);

        done();
    });

    test('test update', async (done) => {
        await store.dispatch('Login', {login: 'loginOK', password: ''});
        router.push('/club/12/affiliations');
        await flushPromises();
        const current = getCurrentAffiliationView();


        let affiliation = await new AffiliationsApi().getAffiliation('', 12, '20172018');
        expect(affiliation.data.board.president.sex).toBe(Sex.MALE);

        const radios = current.findAll('input[type="radio"]');
        radios.at(1).element.click();

        // Submit
        getCurrentAffiliationView().find('#btnAffiliationSubmit').trigger('click');
        await flushPromises();

        affiliation = await new AffiliationsApi().getAffiliation('', 12, '20172018');
        expect(affiliation.data.board.president.sex).toBe(Sex.FEMALE);
        done();
    });
});
