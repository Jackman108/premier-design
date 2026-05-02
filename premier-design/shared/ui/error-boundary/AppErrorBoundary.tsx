'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { UI, useLocale } from '@shared/i18n';

import styles from './AppErrorBoundary.module.css';

type Props = {
	children: ReactNode;
};

type State = {
	hasError: boolean;
};

function ErrorFallback(): ReactNode {
	const { t } = useLocale();
	return (
		<section className={styles.fallback}>
			<h2>{t(UI.errorBoundaryTitle)}</h2>
			<p>{t(UI.errorBoundaryDescription)}</p>
		</section>
	);
}

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
			return <ErrorFallback />;
		}

		return this.props.children;
	}
}
