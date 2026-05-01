'use client';

import { useReportWebVitals } from 'next/web-vitals';

import type { WebVitalsIngestBody } from '@shared/lib/web-vitals-ingest';

function sendToIngest(metric: WebVitalsIngestBody): void {
	if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
		return;
	}
	const body = JSON.stringify(metric);
	const blob = new Blob([body], { type: 'application/json' });
	if (navigator.sendBeacon?.('/api/vitals', blob)) {
		return;
	}
	void fetch('/api/vitals', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body,
		keepalive: true,
	});
}

/** Реальные CWV из продакшена → `POST /api/vitals` (BP-03). */
export function WebVitalsReporter(): null {
	useReportWebVitals((metric) => {
		sendToIngest({
			name: metric.name as WebVitalsIngestBody['name'],
			value: metric.value,
			id: metric.id,
			rating: metric.rating,
			delta: metric.delta,
			navigationType: metric.navigationType,
		});
	});
	return null;
}
