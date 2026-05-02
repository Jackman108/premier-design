import { z } from 'zod';

let validated = false;

const telegramSchema = z.object({
	TELEGRAM_BOT_TOKEN: z.string().trim().min(1),
	TELEGRAM_CHAT_ID: z.string().trim().min(1),
});

const smtpWhenEmailHostSchema = z.object({
	EMAIL_PORT: z.string().trim().min(1),
	EMAIL_USERNAME: z.string().trim().min(1),
	EMAIL_PASSWORD: z.string().trim().min(1),
	FEEDBACK_EMAIL_TO: z.string().trim().min(1),
});

/**
 * Проверка критичных переменных до обработки запросов (BP-34, паритет с febcode `validateEnvOrThrow`).
 * Не выполняется при `next build` / сборке образа (нет секретов) и в GitHub Actions без strict.
 * Рантайм `next start` / serverless — проверка включена при `NODE_ENV=production`.
 */
export function validateStartupEnv(): void {
	if (validated) {
		return;
	}

	const nextPhase = process.env.NEXT_PHASE;
	const isNextCompilePhase =
		nextPhase === 'phase-production-build' ||
		nextPhase === 'phase-development-build' ||
		process.env.SKIP_STARTUP_ENV_VALIDATION === '1';

	if (isNextCompilePhase) {
		validated = true;
		return;
	}

	const isProd = process.env.NODE_ENV === 'production';
	const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
	const shouldEnforce = isProd && !isGithubActions;

	if (!shouldEnforce) {
		validated = true;
		return;
	}

	const tg = telegramSchema.safeParse(process.env);
	if (!tg.success) {
		const msg = tg.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
		throw new Error(`[startup-env] Production requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID. ${msg}`);
	}

	const emailHost = process.env.EMAIL_HOST?.trim();
	if (emailHost) {
		const smtp = smtpWhenEmailHostSchema.safeParse(process.env);
		if (!smtp.success) {
			const msg = smtp.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
			throw new Error(`[startup-env] EMAIL_HOST is set but SMTP env is incomplete (see .env.example). ${msg}`);
		}
	}

	validated = true;
}
