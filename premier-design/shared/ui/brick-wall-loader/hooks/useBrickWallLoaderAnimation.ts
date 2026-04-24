import {useEffect, useState} from 'react';

/** Интервальная анимация «кирпичной стены» — состояние вне `ui/BrickWallLoader`. */
export const useBrickWallLoaderAnimation = () => {
	const [animationActive, setAnimationActive] = useState(false);
	const [animationFinished, setAnimationFinished] = useState(false);
	const [brickRows, setBrickRows] = useState<number[][]>([[], [], [0]]);
	const [animationStep, setAnimationStep] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			if (!animationActive) {
				setAnimationActive(true);
				setBrickRows((prevRows) => {
					const newRows = prevRows.map((row) => row.map((brick) => (brick > 0 ? brick - 1 : 0)));

					if (animationFinished) {
						switch (animationStep) {
							case 0:
								newRows[2][0] = 1;
								setAnimationStep(1);
								break;
							case 1:
								newRows[2][1] = 2;
								setAnimationStep(2);
								break;
							case 2:
								newRows[2][2] = 3;
								setAnimationStep(3);
								break;
							case 3:
								newRows[1][0] = 1;
								setAnimationStep(4);
								break;
							case 4:
								newRows[1][1] = 2;
								setAnimationStep(5);
								break;
							case 5:
								newRows[0][0] = 1;
								setAnimationStep(0);
								break;
							default:
								newRows[0][0] = 1;
								setAnimationStep(0);
						}
					}
					if (animationStep === 0) {
						setAnimationFinished(true);
					}
					return newRows;
				});
			} else {
				setAnimationActive(false);
			}
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, [animationActive, animationStep, animationFinished]);

	return {animationActive, animationFinished, brickRows};
};
