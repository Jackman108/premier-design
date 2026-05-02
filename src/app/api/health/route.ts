import { NextResponse } from 'next/server';

/**
 * Лёгкий liveness для Docker/orchestrator и nginx-upstream проверок.
 * Не грузит главную страницу и не трогает внешние сервисы.
 */
export async function GET() {
	return NextResponse.json(
		{
			status: 'ok',
			version: process.env.npm_package_version ?? 'unknown',
			timestamp: new Date().toISOString(),
		},
		{
			status: 200,
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	);
}
