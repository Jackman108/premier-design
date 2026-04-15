import {ChangeEvent, FC} from 'react';
import Image from 'next/image';

import {UiButton} from '@shared/ui/primitives/UiButton';

import {useBeforeAfterSlider} from '../hooks/useBeforeAfterSlider';
import {BeforeAfterShowcaseProps} from '../interface/BeforeAfterShowcase.props';
import styles from './BeforeAfterShowcase.module.css';

const CASES_LIMIT = 3;

const BeforeAfterShowcase: FC<BeforeAfterShowcaseProps> = ({cases}) => {
    const selectedCases = cases.slice(0, CASES_LIMIT);
    const {
        activeCase,
        activeCaseId,
        sliderValue,
        setActiveCaseId,
        setSliderValue,
        beforeImage,
        afterImage,
    } = useBeforeAfterSlider(selectedCases);

    if (!activeCase) {
        return null;
    }

    const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(event.target.value));
    };

    return (
        <section className={styles.section} aria-labelledby='before-after-title'>
            <div className={styles.section__header}>
                <p className={styles.section__eyebrow}>Case Studies</p>
                <h2 id='before-after-title' className={styles.section__title}>До / После: как меняется пространство</h2>
                <p className={styles.section__description}>
                    Реальные проекты с акцентом на результат: визуальный контраст, сроки и метрики по площади.
                </p>
            </div>

            <div className={styles.caseTabs} role='tablist' aria-label='Выбор кейса'>
                {selectedCases.map((caseItem) => (
                    <UiButton
                        key={caseItem.id}
                        type='button'
                        variant={caseItem.id === activeCaseId ? 'primary' : 'secondary'}
                        role='tab'
                        aria-selected={caseItem.id === activeCaseId}
                        className={styles.caseTab}
                        onClick={() => setActiveCaseId(caseItem.id)}
                    >
                        {caseItem.address}
                    </UiButton>
                ))}
            </div>

            <div className={styles.viewer}>
                <div className={styles.viewer__meta}>
                    <p>{activeCase.address}</p>
                    <span>{activeCase.deadlines}</span>
                </div>

                <div className={styles.comparison}>
                    <Image
                        src={beforeImage}
                        alt={`До ремонта: ${activeCase.address}`}
                        fill={true}
                        sizes='(max-width: 768px) 100vw, 900px'
                        className={styles.comparison__image}
                    />
                    <div className={styles.comparison__after} style={{width: `${sliderValue}%`}}>
                        <Image
                            src={afterImage}
                            alt={`После ремонта: ${activeCase.address}`}
                            fill={true}
                            sizes='(max-width: 768px) 100vw, 900px'
                            className={styles.comparison__image}
                        />
                    </div>
                    <div className={styles.comparison__divider} style={{left: `${sliderValue}%`}}>
                        <span>↔</span>
                    </div>
                </div>

                <label className={styles.sliderLabel} htmlFor='before-after-slider'>
                    Соотношение до/после: {sliderValue}%
                </label>
                <input
                    id='before-after-slider'
                    className={styles.slider}
                    type='range'
                    min={10}
                    max={90}
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
            </div>
        </section>
    );
};

export default BeforeAfterShowcase;
