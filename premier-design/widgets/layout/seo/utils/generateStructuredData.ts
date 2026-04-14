export const generateStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Premium Interior",
    "url": "https://premium-interior.by",
    "logo": "/logo.png",
    "sameAs": ["https://t.me/PremiumInterior", "https://www.instagram.com/proremont_zhl", "https://vk.com/premium_interior_zhl" ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pervomayskaya",
        "addressLocality": "Zhlobin",
        "postalCode": "247210",
        "addressCountry": "BY"
    }
});