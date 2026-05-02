import fs from 'fs';

import { fileService } from '../fileService';

const validRow = {
	name: 'Test User',
	phone: '+375291234567',
	email: '',
	message: 'hello world test',
	consent: true,
};

describe('fileService', () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		fileService.filePath = 'C:/tmp/formData.test.json';
	});

	it('returns empty array when file does not exist', () => {
		jest.spyOn(fs, 'existsSync').mockReturnValue(false);

		const result = fileService.readPersistedFeedback();

		expect(result).toEqual([]);
	});

	it('reads and parses existing file content', () => {
		jest.spyOn(fs, 'existsSync').mockReturnValue(true);
		jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([validRow]) as never);

		const result = fileService.readPersistedFeedback();

		expect(result).toEqual([validRow]);
	});

	it('returns empty array when file content is not valid JSON', () => {
		const errSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		jest.spyOn(fs, 'existsSync').mockReturnValue(true);
		jest.spyOn(fs, 'readFileSync').mockReturnValue('not-json' as never);

		const result = fileService.readPersistedFeedback();

		expect(result).toEqual([]);
		errSpy.mockRestore();
	});

	it('returns empty array when JSON shape fails schema', () => {
		const errSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		jest.spyOn(fs, 'existsSync').mockReturnValue(true);
		jest.spyOn(fs, 'readFileSync').mockReturnValue('[{"invalid":true}]' as never);

		const result = fileService.readPersistedFeedback();

		expect(result).toEqual([]);
		errSpy.mockRestore();
	});

	it('appends new data and writes updated content', () => {
		jest.spyOn(fs, 'existsSync').mockReturnValue(true);
		jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([validRow]) as never);
		const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);

		const second = { ...validRow, name: 'Other' };
		fileService.saveData(second);

		expect(writeSpy).toHaveBeenCalledWith('C:/tmp/formData.test.json', JSON.stringify([validRow, second], null, 2));
	});
});
