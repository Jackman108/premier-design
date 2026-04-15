/** @jest-environment jsdom */
import {act, renderHook, waitFor} from '@testing-library/react';
import {useCookiesBanner, usePrivacyPolicy} from '@widgets/cookies-banner/hooks/useCookiesBanner';

describe('useCookiesBanner', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('opens modal when cookies are not accepted', async () => {
        const openModal = jest.fn();
        const closeModal = jest.fn();

        renderHook(() => useCookiesBanner(openModal, closeModal));

        await waitFor(() => {
            expect(openModal).toHaveBeenCalled();
        });
    });

    it('does not open when cookies already accepted', async () => {
        localStorage.setItem('cookiesAccepted', 'true');
        const openModal = jest.fn();
        const closeModal = jest.fn();

        renderHook(() => useCookiesBanner(openModal, closeModal));

        await act(async () => {
            await new Promise((r) => setTimeout(r, 0));
        });

        expect(openModal).not.toHaveBeenCalled();
    });

    it('handleAction stores acceptance and closes modal', () => {
        const openModal = jest.fn();
        const closeModal = jest.fn();
        const {result} = renderHook(() => useCookiesBanner(openModal, closeModal));

        act(() => {
            result.current.handleAction(true);
        });

        expect(localStorage.getItem('cookiesAccepted')).toBe('true');
        expect(closeModal).toHaveBeenCalled();
    });
});

describe('usePrivacyPolicy', () => {
    it('invokes handlePaperClick with shortTitle', async () => {
        const handlePaperClick = jest.fn();
        const {result} = renderHook(() =>
            usePrivacyPolicy({shortTitle: 'privacy'}, handlePaperClick),
        );

        await act(async () => {
            await result.current.handlePrivacyPolicyClick();
        });

        expect(handlePaperClick).toHaveBeenCalledWith('privacy');
    });
});
