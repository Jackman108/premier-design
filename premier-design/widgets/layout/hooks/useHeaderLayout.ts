'use client';

import { CSSProperties, useRef } from 'react';

import { useShareBanner } from '@features/banner/share/hooks/useShareBanner';
import { useShareBannerHeight } from '@shared/hooks/useShareBannerHeight';
import type { HeaderProps } from '@widgets/layout/interface/Header.props';
import { useHeaderPlaceholderHeight } from '@widgets/layout/hooks/useHeaderPlaceholderHeight';
import useMobileMenu from '@widgets/layout/hooks/useMobileMenu';
import { useStickyHeader } from '@widgets/layout/hooks/useStickyHeader';
import useThemeToggle from '@widgets/layout/hooks/useThemeToggle';

/** Состояние хедера, плейсхолдера и меню — вынесено из `ui/header` по правилу слоя представления. */
export const useHeaderLayout = ({ menu, shares }: HeaderProps) => {
	const headerRef = useRef<HTMLElement>(null);
	const { currentTheme, toggleTheme } = useThemeToggle();
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
	const { isSticky } = useStickyHeader();
	const { isClosed } = useShareBanner();
	const fallbackPlaceholderPx = isClosed ? 102 : 162;
	const measuredHeaderPx = useHeaderPlaceholderHeight(headerRef, isSticky);
	const placeholderHeightPx = isSticky && measuredHeaderPx != null ? measuredHeaderPx : fallbackPlaceholderPx;
	const hasShareBanner = !isClosed && !isSticky;
	useShareBannerHeight(hasShareBanner);

	const placeholderStyle = {
		'--header-placeholder-height': `${placeholderHeightPx}px`,
	} as CSSProperties;

	return {
		headerRef,
		currentTheme,
		toggleTheme,
		isMobileMenuOpen,
		toggleMobileMenu,
		isSticky,
		hasShareBanner,
		shares,
		menu,
		placeholderStyle,
	};
};
