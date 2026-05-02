import { ImageResponse } from 'next/og';

import { SITE_OPERATOR } from '@shared/constants/company';

/**
 * Подзаголовок для OG совпадает с `seo.home.metaDescription` локали `ru`
 * (`src/data/locales/ru/data.json`).
 */
const OPEN_GRAPH_HOME_TAGLINE =
	'Ремонт и дизайн интерьеров представительского уровня: Жлобин, Гомельская область и выезд по Беларуси. Прозрачная смета, сроки и гарантия 24 месяца.';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export default function OpenGraphImage() {
	const title = SITE_OPERATOR.brandName;
	const originHost = SITE_OPERATOR.publicOrigin.replace(/^https?:\/\//, '');

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				padding: 72,
				background: 'linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 45%, rgba(51,65,85,1) 100%)',
				color: '#f8fafc',
			}}
		>
			<div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -1 }}>{title}</div>
			<div
				style={{
					marginTop: 28,
					fontSize: 32,
					lineHeight: 1.35,
					maxWidth: 1020,
					opacity: 0.92,
				}}
			>
				{OPEN_GRAPH_HOME_TAGLINE}
			</div>
			<div
				style={{
					marginTop: 44,
					display: 'flex',
					gap: 14,
					alignItems: 'center',
					fontSize: 26,
					opacity: 0.82,
				}}
			>
				<span>{originHost}</span>
				<span>•</span>
				<span>Ремонт и дизайн интерьеров</span>
			</div>
		</div>,
		{ ...size },
	);
}
