import { Fragment, type ReactElement } from 'react';

import type { TitleProps } from '@shared/ui/title/interface/Title.props';
import type { DataProps } from '@shared/validates/dataPropsSchema';
import type { HeroBannerProps } from '@features/banner';

import { HOME_PAGE_REGISTERED_SLOTS, type HomePageSlotRenderContext } from './home-page-slot-registry';

export type HomePageSectionsProps = {
	data: DataProps;
	bannerProps: HeroBannerProps;
	titles: Record<string, TitleProps>;
	buttonHeader: string;
};

/** Секции главной ниже хрома — композиция по реестру [`HOME_PAGE_REGISTERED_SLOTS`](./home-page-slot-registry.tsx) / [`HOME_PAGE_SECTION_IDS`](./home-page-slots.ts). */
export function HomePageSections(props: HomePageSectionsProps): ReactElement {
	const ctx: HomePageSlotRenderContext = props;

	return (
		<>
			{HOME_PAGE_REGISTERED_SLOTS.map((slot) => (
				<Fragment key={slot.slotId}>{slot.render(ctx)}</Fragment>
			))}
		</>
	);
}
