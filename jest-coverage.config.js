require('dotenv').config({path: '.env.test'});

module.exports = {
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
        'vue',
    ],
    collectCoverageFrom: [
        '**/*.ts',
        '**/*.vue',
        '!**/*.d.ts',
        '!**/src/generated/**',
        '!**/src/test/**',
        '!**/e2e/**',
    ],
    moduleDirectories: [
        'node_modules',
        'src',
        'src/resources',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        'vuetify/lib': 'vuetify',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!vuetify).*js',
    ],
    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '.*\\.(styl)$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
    testURL: 'http://localhost/',
    testRegex: '^.*\.spec\.ts$',
    globals: {
        'ts-jest': {
            diagnostics: false,
            babelConfig: false,
        },
        'vue-jest': {
            babelConfig: false,
        }
    }
};
