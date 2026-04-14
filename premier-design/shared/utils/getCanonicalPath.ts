export const getCanonicalPath = (canonical: string): string => {
    if (!canonical) return '';
    return canonical.split('/').pop() || '';
};