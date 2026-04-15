import {defineConfig} from '@pandacss/dev';

export default defineConfig({
	include: ['./**/*.{js,jsx,ts,tsx}'],
	exclude: ['./node_modules', './styled-system', './.next', './dist'],
	outdir: 'styled-system',
	preflight: false,
	theme: {
		extend: {
			tokens: {
				colors: {
					bg: {value: 'var(--color-bg)'},
					surface: {value: 'var(--color-surface)'},
					surfaceMuted: {value: 'var(--color-surface-muted)'},
					text: {value: 'var(--color-text)'},
					textMuted: {value: 'var(--color-text-muted)'},
					border: {value: 'var(--color-border)'},
					accent: {value: 'var(--color-accent)'},
					accentHover: {value: 'var(--color-accent-hover)'},
				},
				radii: {
					sm: {value: 'var(--radius-sm)'},
					md: {value: 'var(--radius-md)'},
					lg: {value: 'var(--radius-lg)'},
				},
				shadows: {
					sm: {value: 'var(--shadow-sm)'},
					md: {value: 'var(--shadow-md)'},
					lg: {value: 'var(--shadow-lg)'},
				},
				zIndex: {
					hide: {value: 'var(--z-hide)'},
					base: {value: 'var(--z-base)'},
					content: {value: 'var(--z-content)'},
					raised: {value: 'var(--z-raised)'},
					header: {value: 'var(--z-header)'},
					dropdown: {value: 'var(--z-dropdown)'},
					modal: {value: 'var(--z-modal)'},
					overlay: {value: 'var(--z-overlay)'},
					toast: {value: 'var(--z-toast)'},
				},
			},
		},
	},
});
