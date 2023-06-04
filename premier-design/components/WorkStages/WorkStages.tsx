'use client'
import { FC, useState, useEffect } from 'react';
import styles from './WorkStages.module.css';
import Title from '../UX/Title/Title';
import Image from 'next/image';
import { GetDataProps } from '../../interface/interfaceData';
import { findTitle } from '../../pages/api/constants';


const WorkStages: FC<GetDataProps> = ({
    data
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 13) || {};
    const [currentStep, setCurrentStep] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const nextStep = () => {
            if (currentStep < data.workStages.length) {
                setCurrentStep(prevStep => prevStep + 1);
            } else {
                setFinished(true);
            }
        };
        const interval = setInterval(() => {
            nextStep();
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [currentStep, data.workStages]);

    return (
        <section className={styles.stages}>
            <div className={styles.stages__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                />
                <div className={styles.timeline}>
                    {data.workStages.map((stage) => (
                        <div
                            key={stage.id}
                            className={`${styles.timeline__step} 
                            ${currentStep >= stage.id ? styles.active : ''}`}
                        >
                            <div className={styles.fade}>
                                <Image
                                    priority
                                    src={stage.src}
                                    alt={stage.alt}
                                    quality={stage.quality}
                                    width={stage.width}
                                    height={stage.height}
                                    placeholder='empty'
                                    className={styles.content__image}
                                />
                                <div className={styles.content__stage}>
                                    {stage.stage}
                                </div>
                            </div>
                            <div className={styles.timeline__progress} />
                        </div>

                    ))}
                    {finished &&
                        <div className={`${styles.timeline__step} ${styles.finishFlag}`}>
                            Финиш
                        </div>

                    }

                </div>
            </div>
        </section>
    );
};
export default WorkStages;