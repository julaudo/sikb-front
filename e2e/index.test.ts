import 'jest';
import 'jest-environment-puppeteer';

describe('Login page', () => {
    beforeAll(async () => {
        await page.goto('https://julaudo.github.io/sikb-front')
    })

    it('should login sucessfully', async () => {
        await page.focus('#login');
        await page.keyboard.type('club@kin-ball.fr');

        await page.focus('#password');
        await page.keyboard.type('test');


        await Promise.all([
            page.click("#btnLogin"),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        expect(page.url()).toBe('https://julaudo.github.io/sikb-front/#/home');
    })
})
