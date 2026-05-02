import '@testing-library/jest-dom';

// jsdom: без showModal/close у <dialog> нет ожидаемого «открытого» состояния для a11y-тестов.
// В среде `node` (часть unit-тестов) глобала HTMLDialogElement нет — не трогаем prototype.
if (typeof HTMLDialogElement !== 'undefined') {
	const dialogProto = HTMLDialogElement.prototype as HTMLDialogElement & {
		showModal?: () => void;
		close?: () => void;
	};
	if (!dialogProto.showModal) {
		dialogProto.showModal = function showModalPolyfill(this: HTMLDialogElement) {
			this.setAttribute('open', '');
		};
	}
	if (!dialogProto.close) {
		dialogProto.close = function closePolyfill(this: HTMLDialogElement) {
			this.removeAttribute('open');
		};
	}
}
