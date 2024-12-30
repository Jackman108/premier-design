import {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {BsFillArrowUpRightSquareFill} from 'react-icons/bs';
import {findItemByTitle} from '../../utils/findItemByTitle';
import Title from '../UX/Title/Title';
import styles from './StepsWork.module.css';
import {StepsWorkProps} from "../../interface/StepsWork.props";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import {TitleProps} from "../../interface/Title.props";

const StepsWork: FC<{ stepsWork: StepsWorkProps[]; titles: TitleProps[] }> = ({stepsWork, titles,}): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "application-process") || {};
    const [currentStep, setCurrentStep] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const isVisible = useIntersectionObserver(containerRef, 0.1);


    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setCurrentStep((prevStep) =>
                    prevStep < (stepsWork?.length || 0) - 1 ? prevStep + 1 : prevStep
                );
            }, 2000);

            return () => {
                clearInterval(interval);
            };
        }
        return;
    }, [isVisible, stepsWork?.length]);

    const renderStep = (stage: StepsWorkProps, isActive: boolean) => (
        <div key={stage.id} className={`${styles.timeline__step} ${isActive ? styles.active : ''}`}>
            <div className={styles.fade}>
                <BsFillArrowUpRightSquareFill className={styles.content__image}/>
                <div className={styles.content__stage}>{stage.stage}</div>
                <div className={styles.timeline__progress}/>
            </div>
        </div>
    );

    return (
        <section className={styles.stages}>
            <div className={styles.stages__container} ref={containerRef}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                {stepsWork && stepsWork.length > 0 ? (
                    <div className={styles.timeline}>
                        {stepsWork.map((stage) => renderStep(stage, currentStep >= stage.id))}
                    </div>
                ) : (
                    <div>Загрузка...</div>
                )}
            </div>
        </section>
    );
};
export default StepsWork;