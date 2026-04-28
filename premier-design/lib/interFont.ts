import {Inter, Playfair_Display} from 'next/font/google';

export const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	preload: true,
	adjustFontFallback: true,
	fallback: ['system-ui', 'Arial', 'sans-serif'],
	variable: '--font-inter',
});

export const playfair = Playfair_Display({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	preload: true,
	adjustFontFallback: true,
	fallback: ['Georgia', 'Times New Roman', 'serif'],
	variable: '--font-playfair',
});
