import React, { useState, useEffect } from 'react';
import styles from './BrickWallLoader.module.css';

const BrickWallLoader = (): JSX.Element => {
    const [animationActive, setAnimationActive] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [brickRows, setBrickRows] = useState([[], [], [0]]);
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!animationActive) {
                setAnimationActive(true);
                setBrickRows((prevRows) => {
                    // Создаем новый массив с обновленными значениями для каждого кирпича
                    const newRows = prevRows.map((row) =>
                        row.map((brick) => (brick > 0 ? brick - 1 : 0))
                    );

                    // Изменяем значения для следующего шага анимации
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

    return (
        <div style={{ display: animationFinished ? 'block' : 'none' }}>
            <div className={styles.brickWallLoader}>
                {brickRows.map((brickRow, rowIndex) => (
                    <div key={rowIndex} className={styles.brickRow}>
                        {brickRow.map((brick, brickIndex) => (
                            <div
                                key={`${rowIndex}-${brickIndex}`}
                                className={`${styles.brick} ${brickIndex < brick && animationActive
                                    ? styles.brickAnimation
                                    : ''}`}
                                style={{ backgroundColor: "#4D4540" }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrickWallLoader;
