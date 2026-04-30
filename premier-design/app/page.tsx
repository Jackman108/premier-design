/**
 * Главная — точка входа App Router; композиция в pages-layer (паритет с febcode: thin route + отдельный metadata).
 * `revalidate` объявлен здесь: Next.js не поддерживает реэкспорт segment config из другого модуля.
 */
export const revalidate = 3600;

export { generateMetadata } from '@pages/home/home-metadata';
export { default } from '@pages/home/home-route';
