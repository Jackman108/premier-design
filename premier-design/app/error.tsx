'use client';

import {useEffect} from 'react';

type Props = {
	error: Error & {digest?: string};
	reset: () => void;
};

const GlobalError = ({error, reset}: Props) => {
	useEffect(() => {
		console.error('[app/error]', error);
	}, [error]);

	return (
		<div style={{padding: '2rem', textAlign: 'center'}}>
			<h2>Что-то пошло не так</h2>
			<p>Попробуйте повторить действие или обновить страницу.</p>
			<button type="button" onClick={() => reset()}>
				Повторить
			</button>
		</div>
	);
};

export default GlobalError;
