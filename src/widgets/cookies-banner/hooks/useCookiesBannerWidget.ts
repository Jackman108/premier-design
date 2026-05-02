'use client';

import type { Paper } from '@features/papers';
import { useModalState } from '@shared/hooks/useModalState';

import { useCookiesBanner } from './useCookiesBanner';

export function useCookiesBannerWidget(papers: Paper[]) {
	const { isOpen, closeModal, openModal } = useModalState(false);
	const { handleAction } = useCookiesBanner(openModal, closeModal);
	const privacyPolicy = papers.find((paper) => paper.shortTitle === 'privacy-policy');

	return { handleAction, isOpen, privacyPolicy };
}
