import fs from 'fs';
import {fileService} from '../fileService';

describe('fileService', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        fileService.filePath = 'C:/tmp/formData.test.json';
    });

    it('returns empty array when file does not exist', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);

        const result = fileService.readData<{id: number}>();

        expect(result).toEqual([]);
    });

    it('reads and parses existing file content', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFileSync').mockReturnValue('[{"id":1}]' as never);

        const result = fileService.readData<{id: number}>();

        expect(result).toEqual([{id: 1}]);
    });

    it('returns empty array when file content is not valid JSON', () => {
        const errSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFileSync').mockReturnValue('not-json' as never);

        const result = fileService.readData<{id: number}>();

        expect(result).toEqual([]);
        errSpy.mockRestore();
    });

    it('appends new data and writes updated content', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFileSync').mockReturnValue('[{"id":1}]' as never);
        const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);

        fileService.saveData({id: 2});

        expect(writeSpy).toHaveBeenCalledWith(
            'C:/tmp/formData.test.json',
            JSON.stringify([{id: 1}, {id: 2}], null, 2)
        );
    });
});
