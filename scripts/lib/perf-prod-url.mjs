/** Добавляет `?perf=1` к URL для Lighthouse (паритет febcode `perf-prod-url`). */

export function withPerfAuditQuery(url, usePerfAuditQuery = true) {
	if (!usePerfAuditQuery) return url;
	const hasPerf = /(?:\?|&)perf=(?:1|true)(?:&|$)/i.test(url);
	if (hasPerf) return url;
	return `${url}${url.includes('?') ? '&' : '?'}perf=1`;
}
