const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const htmlEscapeRegex = /[&<>"']/g;

export const escapeHtml = (value: string): string => {
    return value.replace(htmlEscapeRegex, (char) => htmlEscapeMap[char] || char);
};
