import type {ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ReactElement} from 'react';
import {forwardRef} from 'react';
import {buttonRecipe} from './UiButton.recipe';

export type UiButtonVariant = 'primary' | 'secondary' | 'ghost';

type UiButtonOwnProps = {
	variant?: UiButtonVariant;
};

export type UiButtonProps<C extends ElementType = 'button'> = UiButtonOwnProps & {
	as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof UiButtonOwnProps | 'as'>;

type UiButtonRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];
type UiButtonComponent = <C extends ElementType = 'button'>(props: UiButtonProps<C>) => ReactElement | null;

const UiButtonBase = <C extends ElementType = 'button'>(
	props: UiButtonProps<C>,
	ref: UiButtonRef<C>,
) => {
	const {as, variant = 'primary', ...restProps} = props;
	const Component = (as ?? 'button') as ElementType;
	const {className = '', ...elementProps} = restProps as {className?: string};
	const componentProps =
		Component === 'button' && !('type' in elementProps)
			? {...elementProps, type: 'button'}
			: elementProps;

	return <Component ref={ref} className={`${buttonRecipe({variant})} ${className}`.trim()} {...componentProps} />;
};

export const UiButton = forwardRef(
	UiButtonBase as (
		props: UiButtonProps<ElementType>,
		ref: UiButtonRef<ElementType>,
	) => ReactElement | null,
) as UiButtonComponent;
