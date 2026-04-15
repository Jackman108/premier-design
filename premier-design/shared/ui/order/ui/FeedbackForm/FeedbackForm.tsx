'use client';
import {FC, memo} from "react";
import styles from "./FeedbackForm.module.css";
import {FeedbackFormProps} from "@shared/ui/order/interface/FeedbackModal.props";
import {UiButton} from "@shared/ui/primitives/UiButton";
import {UiCheckbox} from "@shared/ui/primitives/UiCheckbox";
import {UiInput} from "@shared/ui/primitives/UiInput";
import {UiTextarea} from "@shared/ui/primitives/UiTextarea";
import {PatternFormat} from 'react-number-format';
import {useFeedbackForm} from "@shared/ui/order/hooks/useFeedbackForm";


const FeedbackForm: FC<FeedbackFormProps> = memo(({onSubmit}) => {
    const {
        country,
        errors,
        formDataState,
        isConsentGiven,
        phoneMask,
        displayedPhone,
        setCountry,
        handleInputChange,
        handlePhoneChange,
        handleConsentChange,
        handleSubmit,
    } = useFeedbackForm({onSubmit});

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.input__group}>
                <UiInput
                    label="Имя"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Введите ваше имя"
                    value={formDataState.name}
                    onChange={handleInputChange}
                    className={errors.name ? styles.inputError : ''}
                    aria-invalid={errors.name ? 'true' : undefined}
                    error={errors.name || undefined}
                />
            </div>
            <div className={styles.input__group}>
                <div className={styles.inlineRow}>
                    <div className={styles.inlineField}>
                        <label htmlFor="feedback-country" className={styles.fieldLabel}>Код страны</label>
                        <select
                            id="feedback-country"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            className={`${styles.tokenControl} ${styles.tokenControlSelect} ${errors.phone ? styles.inputError : ''}`.trim()}
                            aria-label="Код страны для номера телефона"
                        >
                            <option value="ru">🇷🇺</option>
                            <option value="by">🇧🇾</option>
                        </select>
                    </div>
                    <div className={styles.inlineFieldGrow}>
                        <label htmlFor="phone" className={styles.fieldLabel}>Телефон</label>
                        <PatternFormat
                            format={phoneMask}
                            allowEmptyFormatting
                            mask="_"
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="Введите ваш номер телефона"
                            value={displayedPhone}
                            onValueChange={handlePhoneChange}
                            className={`${styles.tokenControl} ${errors.phone ? styles.inputError : ''}`.trim()}
                            aria-invalid={errors.phone ? 'true' : undefined}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                    </div>
                </div>
                {errors.phone && <div id="phone-error" className={styles.errorMessage} role="alert">{errors.phone}</div>}
            </div>
            <div className={styles.input__group}>
                <UiInput
                    label="Email (необязательно)"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Введите ваш email (необязательно)"
                    value={formDataState.email}
                    onChange={handleInputChange}
                    className={errors.email ? styles.inputError : ''}
                    aria-invalid={errors.email ? 'true' : undefined}
                    error={errors.email || undefined}
                />
            </div>
            <div className={styles.input__group}>
                <UiTextarea
                    label="Сообщение"
                    id="message"
                    name="message"
                    placeholder="Введите ваше сообщение"
                    value={formDataState.message}
                    onChange={handleInputChange}
                    className={errors.message ? styles.inputError : ''}
                    aria-invalid={errors.message ? 'true' : undefined}
                    error={errors.message || undefined}
                    rows={6}
                />
            </div>
            <div className={styles.input__group}>
                <UiCheckbox
                    id="feedback-consent"
                    name="consent"
                    checked={isConsentGiven}
                    onChange={handleConsentChange}
                    aria-invalid={errors.consent ? 'true' : undefined}
                    error={errors.consent || undefined}
                    label={
                        <>
                            Нажимая на кнопку, вы соглашаетесь с{' '}
                            <a href="/documents/user-agreement" target="_blank" rel="noopener noreferrer">
                                пользовательским соглашением
                            </a>{' '}
                            и{' '}
                            <a href="/documents/privacy-policy" target="_blank" rel="noopener noreferrer">
                                политикой конфиденциальности
                            </a>
                            .
                        </>
                    }
                />
            </div>
            <div className={styles.form__button}>
                <UiButton type="submit" className={styles.submitButton} aria-label="Отправить заявку">
                    Отправить
                </UiButton>
            </div>
        </form>
    );
});
FeedbackForm.displayName = "FeedbackForm";
export default FeedbackForm;
