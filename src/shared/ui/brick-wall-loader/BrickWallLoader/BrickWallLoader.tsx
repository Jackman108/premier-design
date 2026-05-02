import React, { ReactElement } from 'react';
import styles from './BrickWallLoader.module.css';
import { useBrickWallLoaderAnimation } from '@shared/ui/brick-wall-loader/hooks/useBrickWallLoaderAnimation';

const BrickWallLoader = (): ReactElement => {
	const { animationActive, animationFinished, brickRows } = useBrickWallLoaderAnimation();

	return (
		<div className={styles.root} hidden={!animationFinished}>
			<div className={styles.brickWallLoader}>
				{brickRows.map((brickRow, rowIndex) => (
					<div key={rowIndex} className={styles.brickRow}>
						{brickRow.map((brick, brickIndex) => (
							<div
								key={`${rowIndex}-${brickIndex}`}
								className={`${styles.brick} ${
									brickIndex < brick && animationActive ? styles.brickAnimation : ''
								}`}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default BrickWallLoader;
