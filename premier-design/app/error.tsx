'use client';

import {useEffect} from 'react';

import styles from './error.module.css';

type Props = {
	error: Error & {digest?: string};
	reset: () => void;
};

const GlobalError = ({error, reset}: Props) => {
	useEffect(() => {
		console.error('[app/error]', error);
	}, [error]);

	return (
		<div className={styles.root}>
			<h2>Что-то пошло не так</h2>
			<p>Попробуйте повторить действие или обновить страницу.</p>
			<button type="button" onClick={() => reset()}>
				Повторить
			</button>
		</div>
	);
};

export default GlobalError;
