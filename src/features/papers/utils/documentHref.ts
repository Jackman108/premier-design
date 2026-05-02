/** Canonical URL for a legal document page (App Router under `app/documents/`). */
export function documentHref(shortTitle: string): string {
	return `/documents/${shortTitle}`;
}
