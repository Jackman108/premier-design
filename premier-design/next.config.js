module.exports = {
    async rewrites() {
        return [
            { source: '/', destination: '/' },
            { source: '/repairs', destination: '/repairs' },
            { source: '/design', destination: '/design' },
            { source: '/about', destination: '/about' },
            { source: '/contacts', destination: '/contacts' },
            { source: '/sitemap.xml', destination: '/api/sitemap' },
        ]
    },
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async headers() {
        return [
            {
                source: '/images/:path*',
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
