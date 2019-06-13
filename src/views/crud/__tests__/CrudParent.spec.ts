import 'jest';
import '@/class-component-hooks';
import CrudParent from '@/views/crud/CrudParent.ts';
import {flushPromises} from '@/test/utils';


describe('CrudParent.vue', () => {
    test('refresh', async (done) => {
        const crudParent = new CrudParent();
        crudParent.refreshItems();
        await flushPromises();
        expect(crudParent.refreshing).toBeFalsy();
        done();
    });

    test('create', async (done) => {
        const crudParent = new CrudParent();
        crudParent.createItem({}, (result: boolean) => {
            expect(result).toBeFalsy();
        });
        await flushPromises();
        done();
    });

    test('update', async (done) => {
        const crudParent = new CrudParent();
        crudParent.updateItem({}, (result: boolean) => {
            expect(result).toBeFalsy();
        });
        await flushPromises();
        done();
    });

    test('delete', async (done) => {
        const crudParent = new CrudParent();
        crudParent.deleteItem(0, (result: boolean) => {
            expect(result).toBeFalsy();
        });
        await flushPromises();
        done();
    });
});
