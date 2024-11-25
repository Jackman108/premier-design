module.exports = {
    async rewrites() {
        return [
            { source: '/', destination: '/' },
            { source: '/Repairs', destination: '/repairs' },
            { source: '/Design', destination: '/design' },
            { source: '/About', destination: '/about' },
            { source: '/Contacts', destination: '/contacts' },
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
