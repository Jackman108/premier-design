import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

const isDevelopment = process.env.NODE_ENV !== 'production';
const scriptSrcPolicy = isDevelopment ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
const connectSrcPolicy = isDevelopment ? "'self' https: http: ws: wss:" : "'self' https:";

// На HTTP нельзя слать HSTS и upgrade-insecure-requests — Chrome пытается HTTPS и ломает Lighthouse / next start.
// Включаем только на Vercel или если явно задали env для своего HTTPS за прокси.
const isHttpsHardenedEnv =
	process.env.VERCEL === '1' || process.env.ENABLE_HTTPS_SECURITY_HEADERS === 'true';

const contentSecurityPolicy = [
	"default-src 'self'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"frame-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com",
	"object-src 'none'",
	`script-src ${scriptSrcPolicy}`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob: https:",
	"font-src 'self' data:",
	`connect-src ${connectSrcPolicy}`,
	...(isHttpsHardenedEnv ? ['upgrade-insecure-requests'] : []),
].join('; ');

const nextConfig = {
	output: 'standalone',
	reactCompiler: true,
	async rewrites() {
		return [
			{source: '/sitemap.xml', destination: '/api/sitemap'},
			{source: '/user-agreement', destination: '/documents/user-agreement'},
			{source: '/privacy-policy', destination: '/documents/privacy-policy'},
			{source: '/public-offer', destination: '/documents/public-offer'},
		];
	},
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'self'; sandbox;",
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
	pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
};

export default withBundleAnalyzer(nextConfig);

