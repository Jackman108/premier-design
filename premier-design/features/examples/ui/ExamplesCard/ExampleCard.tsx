'use client';
import { FC, KeyboardEvent, ReactElement } from 'react';
import styles from './ExampleCard.module.css';
import NextImage from 'next/image';
import { ExampleCardComponentProps } from '@features/examples/interface/Examples.props';

const ExampleCard: FC<ExampleCardComponentProps> = ({ card, onClick }): ReactElement => {
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onClick(card);
		}
	};

	return (
		<div
			className={styles.examples__card}
			role="button"
			tabIndex={0}
			onClick={() => onClick(card)}
			onKeyDown={handleKeyDown}
		>
			<div className={styles.card__background}>
				<NextImage
					src={card.background}
					alt={card.address}
					width={424}
					height={241}
					loading="lazy"
					sizes="(max-width: 768px) 90vw, 32vw"
					style={{ width: '100%', height: 'auto' }}
				/>
			</div>
			<div className={styles.card__content}>
				<div className={styles.card__address}>{card.address}</div>
				<div className={styles.card__deadlines}>{card.deadlines}</div>
				{card.budgetRange ? <div className={styles.card__metaLine}>{card.budgetRange}</div> : null}
				{card.onTimeNote ? <div className={styles.card__metaLine}>{card.onTimeNote}</div> : null}
				<div className={styles.card__option}>
					<div className={styles.card__bathroom}>
						<div className={styles.bathroom__icon}>
							<NextImage src={card.bathroomIcon} alt="bathroom" width={20} height={20} loading="lazy" />
						</div>
						<div className={styles.bathroom__option}>{card.bathroomOption}</div>
					</div>
					<div className={styles.card__area}>
						<div className={styles.area__icon}>
							<NextImage src={card.areaIcon} alt="area" width={20} height={20} loading="lazy" />
						</div>
						<div className={styles.area__option}>{card.areaOption}</div>
						<div className={styles.area__square}>{card.areaSquare}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ExampleCard;
