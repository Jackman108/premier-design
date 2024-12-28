export const generateStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Premium Interior",
    "url": "https://premium-interior.by",
    "logo": "/logo.png",
    "sameAs": ["https://www.facebook.com/PremiumInterior", "https://twitter.com/PremiumInterior"],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pervomayskaya",
        "addressLocality": "Zhlobin",
        "postalCode": "247210",
        "addressCountry": "BY"
    }
});