import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	include: ['./**/*.{js,jsx,ts,tsx}'],
	exclude: ['./node_modules', './styled-system', './.next', './dist'],
	outdir: 'styled-system',
	preflight: false,
	theme: {
		extend: {
			tokens: {
				fonts: {
					sans: { value: 'var(--font-family)' },
					heading: { value: 'var(--font-heading)' },
				},
				colors: {
					bg: { value: 'var(--color-bg)' },
					surface: { value: 'var(--color-surface)' },
					surfaceMuted: { value: 'var(--color-surface-muted)' },
					text: { value: 'var(--color-text)' },
					textMuted: { value: 'var(--color-text-muted)' },
					border: { value: 'var(--color-border)' },
					accent: { value: 'var(--color-accent)' },
					accentHover: { value: 'var(--color-accent-hover)' },
				},
				radii: {
					sm: { value: 'var(--radius-sm)' },
					md: { value: 'var(--radius-md)' },
					lg: { value: 'var(--radius-lg)' },
				},
				shadows: {
					sm: { value: 'var(--shadow-sm)' },
					md: { value: 'var(--shadow-md)' },
					lg: { value: 'var(--shadow-lg)' },
				},
				zIndex: {
					hide: { value: 'var(--z-hide)' },
					base: { value: 'var(--z-base)' },
					content: { value: 'var(--z-content)' },
					raised: { value: 'var(--z-raised)' },
					header: { value: 'var(--z-header)' },
					dropdown: { value: 'var(--z-dropdown)' },
					modal: { value: 'var(--z-modal)' },
					overlay: { value: 'var(--z-overlay)' },
					toast: { value: 'var(--z-toast)' },
				},
			},
			textStyles: {
				h1: {
					value: {
						fontFamily: 'heading',
						fontWeight: 'bold',
						fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
						lineHeight: '1.1',
						letterSpacing: '-0.02em',
					},
				},
				h2: {
					value: {
						fontFamily: 'heading',
						fontWeight: 'bold',
						fontSize: 'clamp(2rem, 4vw + 1rem, 3.5rem)',
						lineHeight: '1.2',
						letterSpacing: '-0.01em',
					},
				},
				h3: {
					value: {
						fontFamily: 'heading',
						fontWeight: 'semibold',
						fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.5rem)',
						lineHeight: '1.3',
					},
				},
				body: {
					value: {
						fontFamily: 'sans',
						fontSize: '1rem',
						lineHeight: '1.5',
					},
				},
				bodyLarge: {
					value: {
						fontFamily: 'sans',
						fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
						lineHeight: '1.6',
					},
				},
			},
		},
	},
});
