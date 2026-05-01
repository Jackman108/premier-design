describe('validateStartupEnv', () => {
	const originalEnv = process.env;
	const env = () => process.env as Record<string, string | undefined>;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...originalEnv };
	});

	afterAll(() => {
		process.env = originalEnv;
	});

	it('does not enforce when NODE_ENV is not production', async () => {
		env().NODE_ENV = 'development';
		delete env().TELEGRAM_BOT_TOKEN;
		const { validateStartupEnv } = await import('../validateStartupEnv');
		expect(() => validateStartupEnv()).not.toThrow();
	});

	it('does not enforce on GitHub Actions', async () => {
		env().NODE_ENV = 'production';
		env().GITHUB_ACTIONS = 'true';
		delete env().TELEGRAM_BOT_TOKEN;
		const { validateStartupEnv } = await import('../validateStartupEnv');
		expect(() => validateStartupEnv()).not.toThrow();
	});

	it('throws in production when Telegram env is missing', async () => {
		env().NODE_ENV = 'production';
		delete env().GITHUB_ACTIONS;
		env().TELEGRAM_BOT_TOKEN = '';
		env().TELEGRAM_CHAT_ID = '123';
		const { validateStartupEnv } = await import('../validateStartupEnv');
		expect(() => validateStartupEnv()).toThrow(/TELEGRAM_BOT_TOKEN/);
	});

	it('throws when EMAIL_HOST is set but SMTP bundle is incomplete', async () => {
		env().NODE_ENV = 'production';
		delete env().GITHUB_ACTIONS;
		env().TELEGRAM_BOT_TOKEN = 't';
		env().TELEGRAM_CHAT_ID = 'c';
		env().EMAIL_HOST = 'smtp.example.com';
		delete env().EMAIL_PORT;
		const { validateStartupEnv } = await import('../validateStartupEnv');
		expect(() => validateStartupEnv()).toThrow(/EMAIL_HOST/);
	});
});
