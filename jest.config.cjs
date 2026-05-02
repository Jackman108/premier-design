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
				tsconfig: '<rootDir>/tsconfig.jest.json',
				// ts-jest may merge options that surface TS 6 deprecations (e.g. node10 resolution); do not fail the suite on those.
				diagnostics: { ignoreCodes: [5101, 5107] },
			},
		],
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^.*styled-system/css$': '<rootDir>/src/__mocks__/styled-system.js',
		'^@app$': '<rootDir>/src/app',
		'^@app/(.*)$': '<rootDir>/src/app/$1',
		'^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
		'^@pages$': '<rootDir>/src/pages-layer',
		'^@pages/(.*)$': '<rootDir>/src/pages-layer/$1',
		'^@pages-layer/(.*)$': '<rootDir>/src/pages-layer/$1',
		'^@features/(.*)$': '<rootDir>/src/features/$1',
		'^@shared/(.*)$': '<rootDir>/src/shared/$1',
		'^@app-types/(.*)$': '<rootDir>/src/types/$1',
		'^@entities$': '<rootDir>/src/entities/index.ts',
		'^@entities/(.*)$': '<rootDir>/src/entities/$1',
	},
	testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/.next/'],
	modulePathIgnorePatterns: ['<rootDir>/.next/'],
	collectCoverageFrom: [
		'src/shared/ui/primitives/**/*.{ts,tsx}',
		'!src/shared/ui/primitives/**/*.stories.{ts,tsx}',
		'src/features/**/*.{ts,tsx}',
		'src/shared/**/*.{ts,tsx}',
		'src/validates/**/*.{ts,tsx}',
		'src/services/**/*.{ts,tsx}',
		'src/app/api/**/*.{ts,tsx}',
		'!**/__tests__/**',
		'!**/*.d.ts',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text-summary', 'lcov'],
};
