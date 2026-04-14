import {envVar} from '../envVar';

describe('envVar', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = {...originalEnv};
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('returns environment variable when present', () => {
        process.env.TEST_ENV_KEY = 'value-123';

        expect(envVar('TEST_ENV_KEY')).toBe('value-123');
    });

    it('throws when environment variable is missing', () => {
        delete process.env.MISSING_ENV_KEY;

        expect(() => envVar('MISSING_ENV_KEY')).toThrow('Environment variable "MISSING_ENV_KEY" is missing');
    });
});
