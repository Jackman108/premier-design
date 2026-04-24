import {useEffect} from 'react';

const applyBackgroundByTheme = () => {
	const isDark =
		document.documentElement.classList.contains('dark')
		|| document.documentElement.getAttribute('data-theme') === 'dark';

	/* Слабее оверлей, чтобы рисунок tools.svg оставался читаемым. */
	document.body.style.backgroundImage = isDark
		? "linear-gradient(rgb(5 5 5 / 0.64), rgb(5 5 5 / 0.64)), url('/tools.svg')"
		: "linear-gradient(rgb(250 245 230 / 0.38), rgb(250 245 230 / 0.38)), url('/tools.svg')";
	document.body.style.backgroundRepeat = 'repeat';
	document.body.style.backgroundSize = '18%';
	document.body.style.backgroundAttachment = 'fixed';
	document.body.style.backgroundColor = isDark ? 'var(--color-bg)' : 'var(--beige)';
};

export function useBackgroundLoader() {
	useEffect(() => {
		const img = new Image();
		img.src = '/tools.svg';
		img.onload = () => {
			applyBackgroundByTheme();
		};

		// Тема может меняться без перезагрузки страницы — синхронизируем фон.
		const observer = new MutationObserver(() => applyBackgroundByTheme());
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class', 'data-theme'],
		});

		return () => observer.disconnect();
	}, []);
}
