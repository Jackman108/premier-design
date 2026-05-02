import fs from 'fs';
import path from 'path';

import type { FeedbackInput } from '@shared/validates/feedbackSchema';
import { feedbackSchema } from '@shared/validates/feedbackSchema';
import { formDataPersistenceSchema } from '@shared/validates/formDataPersistenceSchema';

const logIoError = (operation: string, error: unknown): void => {
	console.error(`[fileService] ${operation}`, error);
};

export const fileService = {
	filePath: path.join(process.cwd(), 'formData.json'),

	readPersistedFeedback(): FeedbackInput[] {
		try {
			if (!fs.existsSync(this.filePath)) {
				return [];
			}
			const fileData = fs.readFileSync(this.filePath, 'utf-8');
			const parsedJson: unknown = JSON.parse(fileData);
			const parsed = formDataPersistenceSchema.safeParse(parsedJson);
			if (!parsed.success) {
				console.error('[fileService] readPersistedFeedback: invalid shape', parsed.error.flatten());
				return [];
			}
			return parsed.data;
		} catch (error) {
			logIoError('readPersistedFeedback', error);
			return [];
		}
	},

	saveData(data: FeedbackInput): void {
		try {
			const single = feedbackSchema.safeParse(data);
			if (!single.success) {
				console.error('[fileService] saveData: rejected payload', single.error.flatten());
				return;
			}
			const prevData = this.readPersistedFeedback();
			const newData = [...prevData, single.data];
			fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2));
		} catch (error) {
			logIoError('saveData', error);
		}
	},
};
