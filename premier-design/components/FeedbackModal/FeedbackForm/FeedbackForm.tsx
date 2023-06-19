'use client';
import { FC, FormEvent, memo } from "react";
import styles from "./FeedbackForm.module.css";
import { FeedbackFormProps } from "./FeedbackForm.props";

const FeedbackForm: FC<FeedbackFormProps> = memo(({
    onSubmit,
    formDataState,
    onInputChange
}) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formDataState);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input__group}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Введите ваше имя"
                    value={formDataState.name}
                    onChange={onInputChange}
                />
            </div>
            <div className={styles.input__group}>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Введите ваш номер телефона"
                    value={formDataState.phone}
                    onChange={onInputChange}
                />
            </div>
            <div className={styles.input__group}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Введите ваш email"
                    value={formDataState.email}
                    onChange={onInputChange}
                />
            </div>
            <div className={styles.input__group}>
                <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Введите ваше сообщение"
                    value={formDataState.message}
                    onChange={onInputChange}
                />
            </div>
            <div className={styles.form__button}>
                <button type="submit">Отправить</button>
            </div>
        </form>
    );
}, (prevProps, nextProps) => {
    return prevProps.onSubmit === nextProps.onSubmit
        && prevProps.formDataState === nextProps.formDataState;
});
FeedbackForm.displayName = "FeedbackForm";
export default FeedbackForm;
