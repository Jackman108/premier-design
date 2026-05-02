import { z } from 'zod';

import { feedbackSchema } from './feedbackSchema';

/** Снимок `formData.json`: массив заявок, совместимых с API (`feedbackSchema`). */
export const formDataPersistenceSchema = z.array(feedbackSchema);

export type FormDataPersistenceSnapshot = z.infer<typeof formDataPersistenceSchema>;
