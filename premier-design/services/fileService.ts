import fs from 'fs';
import path from 'path';

const logIoError = (operation: string, error: unknown): void => {
	console.error(`[fileService] ${operation}`, error);
};

export const fileService = {
	filePath: path.join(process.cwd(), 'formData.json'),

	readData<T>(): T[] {
		try {
			if (!fs.existsSync(this.filePath)) {
				return [];
			}
			const fileData = fs.readFileSync(this.filePath, 'utf-8');
			return JSON.parse(fileData) as T[];
		} catch (error) {
			logIoError('readData', error);
			return [];
		}
	},

	saveData<T>(data: T): void {
		try {
			const prevData = this.readData<T>();
			const newData = [...prevData, data];
			fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2));
		} catch (error) {
			logIoError('saveData', error);
		}
	},
};
