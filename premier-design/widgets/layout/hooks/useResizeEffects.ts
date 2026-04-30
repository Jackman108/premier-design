'use client';

import type { UseResizeEffectsProps } from '@shared/interface/UseResizeEffects.props';
import { useViewportMobile } from '@shared/hooks/useViewportMobile';

import useMobileMenu from './useMobileMenu';

/** Меню футера + мобильный breakpoint; зависит от `useMobileMenu` — слой `widgets/layout`. */
function useResizeEffects(): UseResizeEffectsProps {
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
	const { isMobile } = useViewportMobile();

	return { isMobileMenuOpen, toggleMobileMenu, isMobile };
}

export default useResizeEffects;
