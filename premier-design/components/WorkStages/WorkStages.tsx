'use client'
import {FC, memo, ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {BsFillArrowUpRightSquareFill} from 'react-icons/bs';

import {GetDataProps, WorkStagesProps} from '../../interface/interfaceData';
import {findItemByShortTitle} from '../../pages/api/constants';

import Title from '../UX/Title/Title';

import styles from './WorkStages.module.css';

const MemoizedTitle = memo(Title);

const WorkStages: FC<GetDataProps> = ({
                                          data
                                      }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByShortTitle(data.title, "our-partners") || {};
    const [currentStep, setCurrentStep] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const observerCallback: IntersectionObserverCallback = useCallback((entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    }, []);

    useEffect(() => {
        const containerNode = containerRef.current;
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        if (containerNode) {
            observer.observe(containerNode);
        }

        return () => {
            if (containerNode) {
                observer.unobserve(containerNode);
            }
        };
    }, [observerCallback]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) =>
                prevStep < (data.workStages?.length || 0) ? prevStep + 1 : prevStep
            );
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [data.workStages, currentStep]);

    return (
        <section className={styles.stages}>
            <div className={styles.stages__container} ref={containerRef}>
                <MemoizedTitle
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <div className={styles.timeline}>
                    {data.workStages?.map((stage: WorkStagesProps) => (
                        <div
                            key={stage.id}
                            className={`${styles.timeline__step} 
                            ${currentStep >= stage.id ? styles.active : ''}`}
                        >
                            <div className={styles.fade}>
                                <BsFillArrowUpRightSquareFill
                                    className={styles.content__image}
                                />
                                <div className={styles.content__stage}>
                                    {stage.stage}
                                </div>
                                <div className={styles.timeline__progress}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default WorkStages;