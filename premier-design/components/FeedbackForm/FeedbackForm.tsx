import { FC, memo } from "react";
import styles from "./FeedbackForm.module.css";
export interface FeedbackItem {
    name: string;
    phone: string;
    email: string;
    message: string;
}
export interface FeedbackFormProps {
    onSubmit: (data: FeedbackItem) => Promise<void>;
    onInputChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    formDataState: FeedbackItem;
}

const FeedbackForm: FC<FeedbackFormProps> = memo(({
    onSubmit,
    formDataState,
    onInputChange
}) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
export default FeedbackForm;
