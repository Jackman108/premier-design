import fs from 'fs';
import path from 'path';

export const fileService = {
    filePath: path.join(process.cwd(), 'formData.json'),

    readData<T>(): T[] {
        if (!fs.existsSync(this.filePath)) return [];
        const fileData = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileData) as T[];
    },

    saveData<T>(data: T): void {
        const prevData = this.readData<T>();
        const newData = [...prevData, data];
        fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2));
    },
};