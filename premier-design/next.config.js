import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
	output: 'standalone',
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
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains; preload',
					},
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
