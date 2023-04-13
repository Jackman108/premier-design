module.exports = {
    async rewrites() {
        return [          
            { source: '/home', destination: '/home' },
            { source: '/services', destination: '/services' },
            { source: '/portfolio', destination: '/portfolio' },
            { source: '/about', destination: '/about' },
            { source: '/contacts', destination: '/contacts' },
        ]
    },
}
