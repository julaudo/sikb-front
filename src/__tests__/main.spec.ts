import {flushPromises} from '@/test/utils';

describe('main.ts', () => {

    test('Can mount app', async (done) => {
        document.body.innerHTML = '<div id="app"></div>';

        // Executes main file
        require('../main.ts');
        await flushPromises();

        const pElement = document.getElementById('btnLogin');
        expect(pElement).toBeTruthy();

        done();
    });
});
