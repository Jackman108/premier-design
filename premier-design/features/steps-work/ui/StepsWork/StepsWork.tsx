import {FC, ReactElement, useRef} from 'react';
import Title from '@shared/ui/title/ui/Title';
import styles from './StepsWork.module.css';
import {StepsWorkProps} from "@features/steps-work/interface/StepsWork.props";
import useIntersectionObserver from "@features/steps-work/hooks/useIntersectionObserver";
import {TitleProps} from "@shared/ui/title/interface/Title.props";
import Image from "next/image";
import {useStepAnimation} from "@features/steps-work/hooks/useStepAnimation";

const StepsWork: FC<{ stepsWork: StepsWorkProps[]; title: TitleProps }> = ({stepsWork, title}): ReactElement => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(containerRef, 0.1);

    const currentStep = useStepAnimation(stepsWork.length, 800, isVisible);


    const renderStep = (step: StepsWorkProps, isActive: boolean, delay: number) => (
        <div
            key={step.id}
            className={`${styles.step__item} ${isActive ? styles.step__item_active : ''}`}
            style={{animationDelay: `${delay}ms`}}
        >
            <div className={styles.step__icon_wrapper}>
                <div className={styles.step__number}>{step.id}</div>
                <Image
                    src={step.icon}
                    alt={step.title}
                    className={styles.step__icon}
                    data-lzl-src={step.icon}
                    quality={100}
                    width={80}
                    height={80}
                    sizes="(max-width: 600px) 50px, (max-width: 1440px) 80px, 100px"
                    placeholder="empty"
                />
            </div>
            <div className={styles.step__content}>
                <h5 className={styles.step__title}>{step.title}</h5>
                <p className={styles.step__description}>{step.description}</p>
            </div>
        </div>
    );

    return (
        <section className={styles.steps}>
            <div className={styles.steps__container}>
                <Title
                    titleStyle="title-black"
                    descriptionStyle="description-black"
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
                />
                <div className={styles.steps__list} ref={containerRef}>
                    {stepsWork && stepsWork.length > 0 ? (
                        stepsWork.map((step, index) => renderStep(step, currentStep >= index, index * 500))
                    ) : (
                        <div>Загрузка...</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StepsWork;
