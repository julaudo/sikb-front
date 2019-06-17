import {flushPromises} from '@/test/utils';
import {Wrapper} from '@vue/test-utils';
import Crud from '@/views/common/Crud.vue';
import {ICrud, ICrudParent} from '@/model/model';

export const getRows = (wrapper: Wrapper<any>) => {
    return wrapper.find('.v-datatable').find('tbody').findAll('tr');
};

export const testDelete = async (component: any, wrapper: Wrapper<any>, action: any, countExpect: (before: number, after: number) => void) => {
    const vm = wrapper.find(component).vm as any as ICrudParent;
    const crud = wrapper.find(Crud).vm as unknown as ICrud;

    await flushPromises();
    const before = vm.items.length;

    const rows = getRows(wrapper);
    expect(rows.length).toEqual(before);

    const columns = rows.at(0).findAll('td');

    const deleteIndex = crud.visibleHeaders.findIndex((h: any) => h.value === 'delete');
    columns.at(deleteIndex).find('i').trigger('click');

    expect(crud.deleteDialog).toBeTruthy();

    action();
    await flushPromises();
    expect(crud.deleteDialog).toBeFalsy();

    const after = getRows(wrapper).length;
    countExpect(before, after);
};



export const testEdit = async (component: any, wrapper: Wrapper<any>, action: any, getData: (id: any) => any, check: (current: any, before: any, after: any) => void) => {
    const vm = wrapper.find(component).vm as any as ICrudParent;
    const crud = wrapper.find(Crud).vm as unknown as ICrud;

    await flushPromises();
    const before = vm.items.length;

    const rows = getRows(wrapper);
    expect(rows.length).toEqual(before);

    const columns = rows.at(0).findAll('td');


    expect(crud.dialog).toBeFalsy();
    expect(crud.editedItem.id).toBeFalsy();

    const editIndex = vm.headers.findIndex((h: any) => h.value === 'edit');
    columns.at(editIndex).find('i').trigger('click');
    await flushPromises();

    expect(crud.deleteDialog).toBeFalsy();
    expect(crud.dialog).toBeTruthy();
    expect(crud.editedItem.id).toBeTruthy();

    const mailInput = wrapper.find('#refDialog').find('input') as any;
    const oldMail = mailInput.element.value;
    const newMail = oldMail + '_new';
    mailInput.element.value = newMail;
    mailInput.trigger('input');
    const id = crud.editedItem.id;

    action();
    await flushPromises();
    expect(crud.dialog).toBeFalsy();

    const data = await getData(id);
    check(data, oldMail, newMail);
};

export const testCreate = async (component: any, wrapper: Wrapper<any>, action: any, setData: () => void, countExpect: (before: number, after: number) => void) => {
    const vm = wrapper.find(component).vm as any as ICrudParent;
    const crud = wrapper.find(Crud).vm as unknown as ICrud;

    await flushPromises();
    const before = vm.items.length;
    expect(crud.dialog).toBeFalsy();
    expect(crud.editedItem.id).toBeFalsy();

    wrapper.find('#btnCrudCreate').trigger('click');
    await flushPromises();

    expect(crud.deleteDialog).toBeFalsy();
    expect(crud.dialog).toBeTruthy();
    expect(crud.editedItem.id).toBeFalsy();

    setData();
    await flushPromises();

    action();
    await flushPromises();
    expect(crud.dialog).toBeFalsy();

    const after = getRows(wrapper).length;
    countExpect(before, after);
};

export const equal = (before: any, after: any) => expect(after).toEqual(before);
export const notEqual = (before: any, after: any) => !expect(after).toEqual(before);
export const decremented = (before: number, after: number) => expect(after).toEqual(before - 1);
export const incremented = (before: number, after: number) => expect(after).toEqual(before + 1);

export const changed = (current: any, before: any, after: any) => expect(current).toEqual(after);
export const notChanged = (current: any, before: any, after: any) => expect(current).toEqual(before);


