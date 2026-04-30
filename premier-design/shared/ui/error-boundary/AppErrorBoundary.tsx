'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from './AppErrorBoundary.module.css';

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
	public state: State = { hasError: false };

	public static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('[AppErrorBoundary]', error, errorInfo);
	}

	public render(): ReactNode {
		if (this.state.hasError) {
			return (
				<section className={styles.fallback}>
					<h2>Произошла ошибка интерфейса</h2>
					<p>Пожалуйста, перезагрузите страницу.</p>
				</section>
			);
		}

		return this.props.children;
	}
}
