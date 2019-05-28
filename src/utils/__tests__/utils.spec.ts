import 'jest';
import {mount} from '@vue/test-utils';
import Vue from 'vue';
import Utils from '../utils';
import i18n from '@/i18n';

const utilsTest = Vue.extend({
    template: `<div />`,
    mixins: [Utils],
});

describe('Test', () => {
    let wrapper;
    let utils: Utils;

    beforeEach(() => {
        wrapper = mount(utilsTest, {i18n});
        utils = wrapper.vm as Utils;
    });

    test('utils.resolveProperty', () => {
        const object = {
            prop: {
                subProp: 'value',
            },
        };
        expect(utils.resolveProperty('prop.subProp', object)).toMatch(object.prop.subProp);
    });

    test('utils.setProperty', () => {
        const object = {
            prop: {
                subProp: 'value',
            },
        };

        utils.setProperty('prop.subProp', object, 'new value');
        expect(object.prop.subProp).toMatch('new value');
    });

    test('equals', () => {
        expect(utils.equals(null, undefined)).toBeTruthy();
        expect(utils.equals(null, null)).toBeTruthy();
        expect(utils.equals(undefined, undefined)).toBeTruthy();
        expect(utils.equals(undefined, null)).toBeTruthy();
        expect(utils.equals('', '')).toBeTruthy();
        expect(utils.equals({}, {})).toBeTruthy();
        expect(utils.equals({a: 1, b: {c: 1}}, {a: 1, b: {c: 1}})).toBeTruthy();
        expect(utils.equals({a: 1, b: {c: 1}}, {a: 1, b: {c: 2}})).toBeFalsy();
    });

    test('omit', () => {
        expect(utils.omit({a: 1, b: {c: 1}}, 'a')).toEqual({b: {c: 1}});
        expect(utils.omit({a: 1, b: {c: 1}}, 'b')).toEqual({a: 1});
        expect(utils.omit({a: 1}, 'a')).toEqual({});
        expect(utils.omit({a: 1}, 'b')).toEqual({a: 1});
    });

    test('translate', () => {
        expect(utils.translate('yes', 'no')).toEqual('Oui');
        expect(utils.translate('no', 'yes')).toEqual('Non');
        expect(utils.translate('noooo', 'yes')).toEqual('Oui');
        expect(utils.translate('yesss', 'no')).toEqual('Non');
        expect(utils.translate('yesss', 'noooo')).toEqual('noooo');
    });
});
