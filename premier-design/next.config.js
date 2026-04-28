import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
	// Без авто-открытия браузера (удобно для CI и headless); отчёт — в выводе сборки / артефактах анализатора.
	openAnalyzer: process.env.ANALYZE_OPEN === 'true',
});

const isDevelopment = process.env.NODE_ENV !== 'production';
// Pages + Next: inline chunks пока требуют 'unsafe-inline'; nonce / strict-dynamic — ADR 0004.
const scriptSrcPolicy = isDevelopment ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
// Prod: только same-origin (fetch форм, dataLayer); dev — HMR и отладка.
const connectSrcPolicy = isDevelopment ? "'self' https: http: ws: wss:" : "'self'";
// Узкий список вместо https: — карты Google (embed/thumbs), остальное с self/public.
const imgSrcPolicy =
	"'self' data: blob: https://www.google.com https://maps.gstatic.com https://maps.googleapis.com";

// HSTS — только при реальном HTTPS (ниже). CSP `upgrade-insecure-requests` не используем: на HTTP (docker :8080 без TLS)
// Chrome иначе запрашивает статику как https://… → ERR_SSL_PROTOCOL_ERROR. HTTPS на проде — редирект/TLS у nginx/Vercel.
const isHttpsHardenedEnv =
	process.env.LOCAL_HTTP_STACK !== '1' &&
	(process.env.VERCEL === '1' || process.env.ENABLE_HTTPS_SECURITY_HEADERS === 'true');

const contentSecurityPolicy = [
	"default-src 'self'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"frame-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com",
	"object-src 'none'",
	`script-src ${scriptSrcPolicy}`,
	"style-src 'self' 'unsafe-inline'",
	`img-src ${imgSrcPolicy}`,
	"font-src 'self' data:",
	`connect-src ${connectSrcPolicy}`,
].join('; ');

const nextConfig = {
	output: 'standalone',
	reactCompiler: true,
	// Убираем unstable dev-indicator, который в Next 16 + турбо может давать шумные HMR-ошибки в гибридном pages/app.
	devIndicators: false,
	// Playwright / CI: baseURL 127.0.0.1 и dev-сервер на localhost — иначе блокируется webpack-hmr.
	allowedDevOrigins: ['127.0.0.1', 'localhost'],
	webpack: (config, {dev}) => {
		if (dev) {
			config.watchOptions = {
				...config.watchOptions,
				// На Windows-дисках (G:) watchpack иногда цепляет системные директории и падает на lstat.
				ignored: [
					'**/System Volume Information/**',
					'**/$RECYCLE.BIN/**',
					...(Array.isArray(config.watchOptions?.ignored) ? config.watchOptions.ignored : []),
				],
			};
		}
		return config;
	},
	async rewrites() {
		return [
			{source: '/sitemap.xml', destination: '/api/sitemap'},
			{source: '/user-agreement', destination: '/documents/user-agreement'},
			{source: '/privacy-policy', destination: '/documents/privacy-policy'},
			{source: '/public-offer', destination: '/documents/public-offer'},
		];
	},
	images: {
		// Только локальные SVG из `public/`; риск XSS — см. ADR 0004.
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'none'; script-src 'none'; style-src 'none'; sandbox;",
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 60,
		// Next.js 16: только перечисленные quality разрешены для next/image (см. docs/messages/next-image-unconfigured-qualities).
		qualities: [75, 90, 95, 100],
	},

	async headers() {
		return [
			{
				// Skip `/_next/*` so dev/build internal assets are not wrapped in page security headers.
				source: '/((?!_next/).*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
					{
						key: 'Content-Security-Policy',
						value: contentSecurityPolicy,
					},
					...(isHttpsHardenedEnv
						? [
								{
									key: 'Strict-Transport-Security',
									value: 'max-age=31536000; includeSubDomains; preload',
								},
							]
						: []),
				],
			},
			{
				source: '/public/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
	compress: true,
	pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
};

export default withBundleAnalyzer(nextConfig);

