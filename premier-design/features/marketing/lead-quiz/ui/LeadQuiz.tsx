import {FC, useMemo} from 'react';

import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import {UiButton} from '@shared/ui/primitives/UiButton';

import {useLeadQuiz} from '../hooks/useLeadQuiz';
import {LeadQuizProps} from '../interface/LeadQuiz.props';
import styles from './LeadQuiz.module.css';

const LeadQuiz: FC<LeadQuizProps> = ({ctaLabel}) => {
    const {step, answers, canMoveNext, setAnswer, nextStep, prevStep, totalSteps} = useLeadQuiz();

    const quizSummary = useMemo(
        () => [
            'Квиз-заявка с сайта.',
            `Тип проекта: ${answers.projectType ?? '-'}`,
            `Площадь: ${answers.area ?? '-'}`,
            `Срок старта: ${answers.startWindow ?? '-'}`,
        ].join('\n'),
        [answers.area, answers.projectType, answers.startWindow],
    );

    return (
        <section className={styles.section} aria-labelledby='lead-quiz-title'>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Interactive Funnel</p>
                <h2 id='lead-quiz-title' className={styles.title}>Квиз: узнайте бюджет и план запуска за 60 секунд</h2>
                <p className={styles.description}>Ответьте на 3 вопроса и получите персональный сценарий работ с оценкой сроков.</p>
            </div>

            <div className={styles.progressTrack} aria-hidden='true'>
                <div className={styles.progressValue} style={{width: `${(step / totalSteps) * 100}%`}}/>
            </div>

            <div className={styles.card}>
                {step === 1 && (
                    <fieldset className={styles.fieldset}>
                        <legend>1. Что планируете?</legend>
                        <label><input type='radio' name='projectType' checked={answers.projectType === 'Квартира'} onChange={() => setAnswer('projectType', 'Квартира')}/>Квартира</label>
                        <label><input type='radio' name='projectType' checked={answers.projectType === 'Дом'} onChange={() => setAnswer('projectType', 'Дом')}/>Дом</label>
                        <label><input type='radio' name='projectType' checked={answers.projectType === 'Коммерческий объект'} onChange={() => setAnswer('projectType', 'Коммерческий объект')}/>Коммерческий объект</label>
                    </fieldset>
                )}

                {step === 2 && (
                    <fieldset className={styles.fieldset}>
                        <legend>2. Площадь проекта</legend>
                        <label><input type='radio' name='area' checked={answers.area === 'до 60 м²'} onChange={() => setAnswer('area', 'до 60 м²')}/>до 60 м²</label>
                        <label><input type='radio' name='area' checked={answers.area === '60-120 м²'} onChange={() => setAnswer('area', '60-120 м²')}/>60-120 м²</label>
                        <label><input type='radio' name='area' checked={answers.area === '120+ м²'} onChange={() => setAnswer('area', '120+ м²')}/>120+ м²</label>
                    </fieldset>
                )}

                {step === 3 && (
                    <fieldset className={styles.fieldset}>
                        <legend>3. Когда хотите старт?</legend>
                        <label><input type='radio' name='startWindow' checked={answers.startWindow === 'В течение месяца'} onChange={() => setAnswer('startWindow', 'В течение месяца')}/>В течение месяца</label>
                        <label><input type='radio' name='startWindow' checked={answers.startWindow === '1-3 месяца'} onChange={() => setAnswer('startWindow', '1-3 месяца')}/>1-3 месяца</label>
                        <label><input type='radio' name='startWindow' checked={answers.startWindow === 'Позже, оцениваю варианты'} onChange={() => setAnswer('startWindow', 'Позже, оцениваю варианты')}/>Позже, оцениваю варианты</label>
                    </fieldset>
                )}

                <div className={styles.actions}>
                    <UiButton type='button' variant='ghost' onClick={prevStep} disabled={step === 1}>Назад</UiButton>
                    {step < totalSteps ? (
                        <UiButton type='button' variant='primary' onClick={nextStep} disabled={!canMoveNext}>Далее</UiButton>
                    ) : (
                        <OrderButton buttonData={ctaLabel} buttonStyle='button-black' prefilledMessage={quizSummary}/>
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
