import { z } from 'zod';

/** Имена метрик Next.js `useReportWebVitals` / web-vitals. */
export const webVitalsMetricNameSchema = z.enum(['TTFB', 'FCP', 'LCP', 'CLS', 'INP', 'FID']);

export const webVitalsIngestBodySchema = z
	.object({
		name: webVitalsMetricNameSchema,
		value: z.number(),
		id: z.string().min(1).max(128),
		rating: z.enum(['good', 'needs-improvement', 'poor']).optional(),
		delta: z.number().optional(),
		navigationType: z.string().max(32).optional(),
	})
	.strict();

export type WebVitalsIngestBody = z.infer<typeof webVitalsIngestBodySchema>;
