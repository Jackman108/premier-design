function readScrollPaddingTopPx(fallbackPx: number): number {
	if (typeof document === 'undefined') {
		return fallbackPx;
	}
	const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
	const parsed = parseFloat(raw);
	return Number.isFinite(parsed) ? parsed : fallbackPx;
}

/**
 * Какая секция «текущая» при скролле: последняя из списка, чей верх уже не выше линии активации
 * (учёт `scroll-padding-top` на `html` для фиксированной шапки).
 */
export function computeActiveHomeSectionId(
	linkIds: readonly string[],
	scrollY: number,
	fallbackScrollPaddingPx = 96,
): string | null {
	if (typeof document === 'undefined' || linkIds.length === 0) {
		return linkIds[0] ?? null;
	}

	const activationLine = scrollY + readScrollPaddingTopPx(fallbackScrollPaddingPx) + 2;
	let current: string | null = linkIds[0] ?? null;

	for (const id of linkIds) {
		const el = document.getElementById(id);
		if (!el) {
			continue;
		}
		const rect = el.getBoundingClientRect();
		const sectionTop = rect.top + window.scrollY;
		if (sectionTop <= activationLine) {
			current = id;
		}
	}

	return current;
}
