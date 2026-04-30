/** Соответствие путей App Router `app/documents/*` и заголовков для крошек. */
export const DOCUMENT_BREADCRUMB_ROUTES: Record<string, { pageTitle: string }> = {
	'/documents/public-offer': { pageTitle: 'Публичная оферта' },
	'/documents/privacy-policy': { pageTitle: 'Политика конфиденциальности' },
	'/documents/user-agreement': { pageTitle: 'Пользовательское соглашение' },
};
