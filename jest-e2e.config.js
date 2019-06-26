module.exports = {
    preset: "jest-puppeteer",
    testRegex: './*\\.test\\.ts$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
