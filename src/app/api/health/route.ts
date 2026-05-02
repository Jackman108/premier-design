import { NextResponse } from 'next/server';

const resolveRevision = (): string | undefined =>
	process.env.VERCEL_GIT_COMMIT_SHA?.trim() ||
	process.env.GITHUB_SHA?.trim() ||
	process.env.NEXT_PUBLIC_BUILD_ID?.trim() ||
	undefined;

/**
 * Лёгкий liveness для Docker/orchestrator и nginx-upstream проверок.
 * Не грузит главную страницу и не трогает внешние сервисы.
 * Расширенное тело (BP-16) — для наблюдаемости; контракт **`status: ok`** сохраняется.
 */
export async function GET() {
	return NextResponse.json(
		{
			status: 'ok',
			service: 'premium-design',
			version: process.env.npm_package_version ?? 'unknown',
			timestamp: new Date().toISOString(),
			environment: process.env.NODE_ENV ?? 'unknown',
			uptimeSeconds: Math.floor(process.uptime()),
			revision: resolveRevision() ?? null,
		},
		{
			status: 200,
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	);
}
