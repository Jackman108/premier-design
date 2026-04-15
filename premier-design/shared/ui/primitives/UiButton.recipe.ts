import {cva} from '../../../styled-system/css';

export const buttonRecipe = cva({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 'var(--space-sm)',
		padding: 'var(--space-sm) var(--space-md)',
		borderRadius: 'var(--radius-md)',
		border: '1px solid transparent',
		fontFamily: 'var(--font-family)',
		fontWeight: '600',
		cursor: 'pointer',
		transition: 'background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
		_disabled: {
			opacity: 0.55,
			cursor: 'not-allowed',
		},
		_focusVisible: {
			outline: 'none',
			boxShadow: 'var(--focus-ring)',
		},
	},
	variants: {
		variant: {
			primary: {
				background: 'var(--color-accent)',
				color: 'var(--white)',
				_hover: {
					_notDisabled: {
						background: 'var(--color-accent-hover)',
					},
				},
			},
			secondary: {
				background: 'var(--color-surface-muted)',
				color: 'var(--color-text)',
				borderColor: 'var(--color-border)',
				_hover: {
					_notDisabled: {
						background: 'var(--gray-light)',
					},
				},
			},
			ghost: {
				background: 'transparent',
				color: 'var(--color-accent)',
				borderColor: 'var(--color-accent)',
				_hover: {
					_notDisabled: {
						background: 'var(--color-accent-soft)',
					},
				},
			},
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});