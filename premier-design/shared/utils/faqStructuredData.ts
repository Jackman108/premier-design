type WithQuestionAnswer = { question: string; answer: string };

/** `CustomHead` / JSON-LD FAQ: те же поля, что у `FaqEntry`, без лишнего `id` в схеме. */
export const mapFaqEntriesToStructuredData = (items: ReadonlyArray<WithQuestionAnswer>) =>
	items.map(({ question, answer }) => ({ question, answer }));
