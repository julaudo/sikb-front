import 'jest';
import {mount} from '@vue/test-utils';
import DateEditor from '../DateEditor.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

describe('DateEditor.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        Vue.use(Vuetify);

        wrapper = mount(DateEditor,  {
            sync: true,
            propsData: {
                label: 'label',
                value: '2018-01-01',
            }});
    });

    test('test initial value', () => {
        expect(wrapper.find('.v-text-field').props().value).toMatch('01/01/2018');
    });

    test('test parent change', () => {
        wrapper.setProps({
            label: 'label',
            value: '2019-01-01',
        });

        expect(wrapper.find('.v-text-field').props().value).toMatch('01/01/2019');
    });

    test('test input change', () => {
        wrapper.find('input').element.value = '01/01/2019';
        wrapper.find('input').trigger('input');
        expect(wrapper.emitted().input).toBeFalsy();

        wrapper.find('input').trigger('blur');
        expect(wrapper.emitted().input).toEqual([['2019-01-01']]);
    });

    test('test bad value', () => {
        wrapper.find('input').element.value = 'bad';
        wrapper.find('input').trigger('input');
        expect(wrapper.emitted().input).toBeFalsy();

        wrapper.find('input').trigger('blur');
        expect(wrapper.emitted().input).toBeFalsy();
        expect(wrapper.find('.v-text-field').props().value).toMatch('01/01/2018');
    });

    test('test empty', () => {
        wrapper.find('input').element.value = '';
        wrapper.find('input').trigger('input');
        expect(wrapper.emitted().input).toBeFalsy();

        wrapper.find('input').trigger('blur');
        expect(wrapper.emitted().input).toEqual([['']]);
    });

    test('test click', () => {
        expect(wrapper.find('.v-picker--date').exists()).toBeFalsy();

        wrapper.find('.v-icon--link').trigger('click');

        expect(wrapper.find('.v-picker--date').exists()).toBeTruthy();
    });
});
