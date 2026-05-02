'use client';

import { type FC, type ReactElement, useMemo, useState } from 'react';

import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

import type { ExampleCardProps, PortfolioProjectSlidersProps } from '../../interface/Examples.props';
import Arrow from '@shared/ui/slider/ui/Arrow';
import Title from '@shared/ui/title/ui/Title';

import styles from './PortfolioProjectSliders.module.css';

const HERO_SIZES = '(max-width: 768px) 100vw, min(90rem, 100%)';

const ProjectKeenSlider: FC<{
	card: ExampleCardProps;
	sources: string[];
}> = ({ card, sources }): ReactElement => {
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		created: () => {
			setLoaded(true);
		},
		slides: {
			perView: 1,
			spacing: 0,
		},
	});

	return (
		<div className={`keen-slider ${styles.sliderRoot}`} ref={sliderRef}>
			{sources.map((src, index) => (
				<div className={`keen-slider__slide ${styles.slide}`} key={src}>
					<div className={styles.slideInner}>
						<Image
							alt={`${card.address} — фото ${index + 1}`}
							className={styles.slideImage}
							fill
							priority={card.id === 1 && index === 0}
							sizes={HERO_SIZES}
							src={src}
						/>
					</div>
				</div>
			))}
			{loaded ? (
				<>
					<Arrow
						left
						disabled={false}
						onActivate={(e) => {
							e.stopPropagation();
							instanceRef.current?.prev();
						}}
					/>
					<Arrow
						disabled={false}
						onActivate={(e) => {
							e.stopPropagation();
							instanceRef.current?.next();
						}}
					/>
				</>
			) : null}
		</div>
	);
};

const ProjectBlock: FC<{ card: ExampleCardProps }> = ({ card }): ReactElement => {
	const sources = useMemo(
		() => (card.images.length > 0 ? card.images : [card.background]),
		[card.background, card.images],
	);
	const many = sources.length > 1;

	return (
		<article className={styles.project} aria-labelledby={`portfolio-project-${card.id}`}>
			<header className={styles.projectHeader}>
				<h2 className={styles.projectTitle} id={`portfolio-project-${card.id}`}>
					{card.address}
				</h2>
				<div className={styles.sliderFrame}>
					{many ? (
						<ProjectKeenSlider card={card} sources={sources} />
					) : (
						<div className={styles.singleSlide}>
							<div className={styles.slideInner}>
								<Image
									alt={card.address}
									className={styles.slideImage}
									fill
									priority={card.id === 1}
									sizes={HERO_SIZES}
									src={sources[0]!}
								/>
							</div>
						</div>
					)}
				</div>
			</header>
			<div className={styles.projectMeta}>
				<p className={styles.deadline}>{card.deadlines}</p>
				{card.budgetRange ? <p className={styles.metaLine}>{card.budgetRange}</p> : null}
				{card.onTimeNote ? <p className={styles.metaLine}>{card.onTimeNote}</p> : null}
				<div className={styles.iconRow}>
					<span className={styles.iconGroup}>
						<Image alt="" height={20} src={card.bathroomIcon} width={20} />
						<span>{card.bathroomOption}</span>
					</span>
					<span className={styles.iconGroup}>
						<Image alt="" height={20} src={card.areaIcon} width={20} />
						<span>
							{card.areaOption} {card.areaSquare}
						</span>
					</span>
				</div>
			</div>
		</article>
	);
};

const PortfolioProjectSliders: FC<PortfolioProjectSlidersProps> = ({ cards, title }): ReactElement => {
	return (
		<section className={styles.root} aria-label={title.title}>
			<div className={styles.inner}>
				<Title
					description={title.description}
					descriptionStyle="description-black"
					shortTitle={title.shortTitle}
					title={title.title}
					titleStyle="title-black"
				/>
				<div className={styles.projectList}>
					{cards.map((card) => (
						<ProjectBlock card={card} key={card.id} />
					))}
				</div>
			</div>
		</section>
	);
};

export default PortfolioProjectSliders;
