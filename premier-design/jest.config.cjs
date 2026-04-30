/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
                // TS 6 + ts-jest: rootDir, react-jsx, ignoreDeprecations — see tsconfig.jest.json (keep root tsconfig IDE-clean).
                tsconfig: '<rootDir>/tsconfig.jest.json',
            },
        ],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^.*styled-system/css$': '<rootDir>/__mocks__/styled-system.js',
        '^@app$': '<rootDir>/app',
        '^@app/(.*)$': '<rootDir>/app/$1',
        '^@widgets/(.*)$': '<rootDir>/widgets/$1',
        '^@pages$': '<rootDir>/pages-layer',
        '^@pages/(.*)$': '<rootDir>/pages-layer/$1',
        '^@pages-layer/(.*)$': '<rootDir>/pages-layer/$1',
        '^@features/(.*)$': '<rootDir>/features/$1',
        '^@shared/(.*)$': '<rootDir>/shared/$1',
        '^@app-types/(.*)$': '<rootDir>/types/$1',
        '^@lib/(.*)$': '<rootDir>/lib/$1',
        '^@entities$': '<rootDir>/entities/index.ts',
        '^@entities/(.*)$': '<rootDir>/entities/$1',
    },
    testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/.next/'],
    modulePathIgnorePatterns: ['<rootDir>/.next/'],
    collectCoverageFrom: [
        'shared/ui/primitives/**/*.{ts,tsx}',
        '!shared/ui/primitives/**/*.stories.{ts,tsx}',
        'features/**/*.{ts,tsx}',
        'shared/**/*.{ts,tsx}',
        'validates/**/*.{ts,tsx}',
        'services/**/*.{ts,tsx}',
        'app/api/**/*.{ts,tsx}',
        '!**/__tests__/**',
        '!**/*.d.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
};
