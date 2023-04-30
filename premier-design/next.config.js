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
}
