import 'jest';
import {mount, Wrapper} from '@vue/test-utils';
import DateEditor from '../DateEditor.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import MultiEditor from '@/views/common/MultiEditor.vue';
import {Printer} from '@/utils/printer';
import {flushPromises} from '@/test/utils';

describe('DateEditor.vue', () => {
    let wrapper: Wrapper<any>;

    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.component('MultiEditor', MultiEditor);

        wrapper = mount(Vue.extend({
            name: 'parent',
            template: `<div data-app="true" id="app"><MultiEditor 
               v-model="parent_value"
               :items="parent_items"
               :itemText="parent_itemText"
               :chipText="parent_chipText"
               :format="parent_format"
               :label="parent_label"
               /></div>`,
        }),{
            sync: true,
            attachToDocument: true,
            props: ['parent_itemText', 'parent_chipText', 'parent_items', 'parent_format', 'parent_label'],
            data: () => {
                return {
                    parent_value: [],
                }
            },
            propsData: {
                parent_itemText: new Printer((a: any) => a.name),
                parent_chipText: new Printer((a: any) => a.shortName),
                parent_items: [
                    {name: 'name1', shortName: 'short1'},
                    {name: 'name2', shortName: 'short2'},
                    {name: 'name3', shortName: 'short3'},
                ],
                parent_format: (a: any) => a,
                parent_label: 'label',
            }});
    });

    test('test initial value', async (done) => {
        const parent = wrapper.vm;

        let chips = wrapper.findAll('.v-chip__content');
        expect(chips.length).toEqual(0);

        const checkBoxes = wrapper.findAll('input[type="checkbox"]');

        // Check 1st element
        checkBoxes.at(0).element.click();
        expect(parent.parent_value.length).toEqual(1);
        expect(parent.parent_value[0].name).toEqual('name1');
        chips = wrapper.findAll('.v-chip__content');
        expect(chips.length).toEqual(1);
        expect(chips.at(0).text()).toEqual(expect.stringContaining('short1'));

        // Uncheck
        checkBoxes.at(0).element.click();
        chips = wrapper.findAll('.v-chip__content');
        expect(chips.length).toEqual(0);

        // Check 2nd element
        checkBoxes.at(1).element.click();
        expect(parent.parent_value.length).toEqual(1);
        expect(parent.parent_value[0].name).toEqual('name2');
        chips = wrapper.findAll('.v-chip__content');
        expect(chips.length).toEqual(1);
        expect(chips.at(0).text()).toEqual(expect.stringContaining('short2'));


        // Click on close button
        const close = wrapper.find('.v-chip__content>.v-chip__close');
        close.element.click();
        expect(parent.parent_value.length).toEqual(0);

        done();
    });
});
