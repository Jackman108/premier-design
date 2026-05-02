import { FC, type ReactElement } from 'react';

import type { HomePageSectionProps } from '@widgets/home-page-section/interface/HomePageSection.props';
import homeStyles from '@widgets/home-page-section/HomePage.module.css';

const join = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/** Оболочка `<section>` для главной: единая сетка, `data-reveal` и `data-*` в одном месте. */
const HomePageSection: FC<HomePageSectionProps> = ({
	id,
	dataSlotId,
	'aria-label': ariaLabel,
	layout,
	density,
	width,
	className: extra,
	children,
}): ReactElement => {
	const isHero = layout === 'hero';
	const isFeatures = layout === 'features';
	const isContent = layout === 'content';

	const className = join(
		isHero && homeStyles.heroShell,
		isFeatures && homeStyles.featuresShell,
		isContent && homeStyles.section,
		isContent && homeStyles.reveal,
		extra,
	);

	/** `shell` / `features` — наружный padding только у оболочки; внутри секции отступы не дублируем. */
	const rhythm = layout === 'content' ? 'shell' : layout === 'features' ? 'features' : undefined;

	return (
		<section
			id={id}
			data-slot-id={dataSlotId}
			aria-label={ariaLabel}
			className={className}
			data-reveal={isHero ? undefined : 'true'}
			data-rhythm={rhythm}
			data-density={isContent && density ? density : undefined}
			data-width={isContent && width ? width : undefined}
		>
			{children}
		</section>
	);
};

export default HomePageSection;
