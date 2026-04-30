'use client';

import {CSSProperties, FC} from 'react';

import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import {UiButton} from '@shared/ui/primitives/UiButton';

import {useLeadQuiz} from '../hooks/useLeadQuiz';
import {useLeadQuizTracking} from '../hooks/useLeadQuizTracking';
import {useLeadQuizViewModel} from '../hooks/useLeadQuizViewModel';
import {LeadQuizProps} from '../interface/LeadQuiz.props';
import styles from './LeadQuiz.module.css';

const LeadQuiz: FC<LeadQuizProps> = ({ctaLabel}) => {
    const {step, answers, canMoveNext, setAnswer, nextStep, prevStep, totalSteps} = useLeadQuiz();
    const {trackAnswerSelect} = useLeadQuizTracking({step, totalSteps});
    const {handleAnswerSelect, quizSummary} = useLeadQuizViewModel({
        answers,
        setAnswer,
        trackAnswerSelect,
    });

    return (
        <section id='lead-quiz' className={styles.section} aria-labelledby='lead-quiz-title'>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Подбор решения</p>
                <h2 id='lead-quiz-title' className={styles.title}>Квиз: узнайте бюджет и план запуска за 60 секунд</h2>
                <p className={styles.description}>Ответьте на 3 вопроса и получите персональный сценарий работ с оценкой сроков.</p>
            </div>

            <div
                className={styles.progressTrack}
                aria-hidden='true'
                style={{'--quiz-progress': `${(step / totalSteps) * 100}%`} as CSSProperties}
            >
                <div className={styles.progressValue}/>
            </div>

            <div className={styles.card}>
                {step === 1 && (
                    <fieldset className={styles.fieldset}>
                        <legend>1. Что планируете?</legend>
                        <label><input type='radio' name='projectType' checked={answers.projectType === 'Квартира'} onChange={() => handleAnswerSelect('projectType', 'Квартира')}/>Квартира</label>
                        <label><input type='radio' name='projectType' checked={answers.projectType === 'Дом'} onChange={() => handleAnswerSelect('projectType', 'Дом')}/>Дом</label>
                        <label><input type='radio' name='projectType' checked={answers.projectType === 'Коммерческий объект'} onChange={() => handleAnswerSelect('projectType', 'Коммерческий объект')}/>Коммерческий объект</label>
                    </fieldset>
                )}

                {step === 2 && (
                    <fieldset className={styles.fieldset}>
                        <legend>2. Площадь проекта</legend>
                        <label><input type='radio' name='area' checked={answers.area === 'до 60 м²'} onChange={() => handleAnswerSelect('area', 'до 60 м²')}/>до 60 м²</label>
                        <label><input type='radio' name='area' checked={answers.area === '60-120 м²'} onChange={() => handleAnswerSelect('area', '60-120 м²')}/>60-120 м²</label>
                        <label><input type='radio' name='area' checked={answers.area === '120+ м²'} onChange={() => handleAnswerSelect('area', '120+ м²')}/>120+ м²</label>
                    </fieldset>
                )}

                {step === 3 && (
                    <fieldset className={styles.fieldset}>
                        <legend>3. Когда хотите старт?</legend>
                        <label><input type='radio' name='startWindow' checked={answers.startWindow === 'В течение месяца'} onChange={() => handleAnswerSelect('startWindow', 'В течение месяца')}/>В течение месяца</label>
                        <label><input type='radio' name='startWindow' checked={answers.startWindow === '1-3 месяца'} onChange={() => handleAnswerSelect('startWindow', '1-3 месяца')}/>1-3 месяца</label>
                        <label><input type='radio' name='startWindow' checked={answers.startWindow === 'Позже, оцениваю варианты'} onChange={() => handleAnswerSelect('startWindow', 'Позже, оцениваю варианты')}/>Позже, оцениваю варианты</label>
                    </fieldset>
                )}

                <div className={styles.actions}>
                    <UiButton type='button' variant='ghost' onClick={prevStep} disabled={step === 1}>Назад</UiButton>
                    {step < totalSteps ? (
                        <UiButton type='button' variant='primary' onClick={nextStep} disabled={!canMoveNext}>Далее</UiButton>
                    ) : (
                        <OrderButton
                            buttonData={ctaLabel}
                            buttonStyle='button-black'
                            prefilledMessage={quizSummary}
                            trackingContext='lead_quiz_submit_cta'
                        />
                    )}
                </div>

                {step === totalSteps && (
                    <p className={styles.summary}>
                        Ваш выбор: {answers.projectType}, {answers.area}, старт: {answers.startWindow}. Нажмите кнопку ниже, и данные автоматически добавятся в сообщение заявки.
                    </p>
                )}
            </div>
        </section>
    );
};

export default LeadQuiz;
