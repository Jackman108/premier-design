import {Inter} from 'next/font/google';

/** Shared instance for `pages/_document` (do not instantiate per render). */
export const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	preload: true,
	fallback: ['system-ui', 'Arial', 'sans-serif'],
});
