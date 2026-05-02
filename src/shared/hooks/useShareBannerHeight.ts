import { useLayoutEffect } from 'react';

const SHARE_BANNER_ID = 'share-banner';
const SHARE_BANNER_HEIGHT_VAR = '--share-banner-height';

export const useShareBannerHeight = (isActive: boolean) => {
	useLayoutEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const root = document.documentElement;
		const applyHeight = (height: number) => {
			root.style.setProperty(SHARE_BANNER_HEIGHT_VAR, `${Math.round(height)}px`);
		};

		if (!isActive) {
			applyHeight(0);
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			if (!entry) {
				return;
			}

			applyHeight(entry.contentRect.height);
		});

		let observedBanner: HTMLElement | null = null;
		const observeBanner = () => {
			const banner = document.getElementById(SHARE_BANNER_ID);
			if (!banner || banner === observedBanner) {
				return;
			}

			if (observedBanner) {
				resizeObserver.unobserve(observedBanner);
			}

			observedBanner = banner;
			applyHeight(banner.getBoundingClientRect().height);
			resizeObserver.observe(banner);
		};

		observeBanner();

		const mutationObserver = new MutationObserver(() => {
			observeBanner();
		});

		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});

		const onResize = () => {
			if (!observedBanner) {
				observeBanner();
				return;
			}

			applyHeight(observedBanner.getBoundingClientRect().height);
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
			mutationObserver.disconnect();
			resizeObserver.disconnect();
			applyHeight(0);
		};
	}, [isActive]);
};
