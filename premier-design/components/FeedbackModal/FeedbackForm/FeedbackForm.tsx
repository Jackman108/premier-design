'use client';
import {FC, FormEvent, memo, useState} from "react";
import styles from "./FeedbackForm.module.css";
import {FeedbackFormProps} from "../../../interface/FeedbackModal.props";
import {validatePhone} from "../../../validates/validatePhone";
import {validateEmail} from "../../../validates/validateEmail";
import InputMask from 'react-input-mask';

const FeedbackForm: FC<FeedbackFormProps> = memo(({
                                                      onSubmit,
                                                      formDataState,
                                                      onInputChange
                                                  }) => {
    const [country, setCountry] = useState("by");
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const phoneMask = country === 'ru' ? '+7 (999) 999-99-99' : '+375 (99) 999-99-99';

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const cleanedPhone = formDataState.phone.replace(/\D/g, '');
        const formErrors = {name: "", phone: "", email: "", message: ""};

        if (!formDataState.name) {
            formErrors.name = "Введите ваше имя";
        }
        if (!formDataState.phone) {
            formErrors.phone = "Введите ваш номер телефона";
        } else if (!validatePhone(formDataState.phone)) {
            formErrors.phone = "Неверный формат номера телефона! Поддерживаются только номера России и Беларуси.";
        }
        if (!formDataState.message) {
            formErrors.message = "Введите сообщение";
        }
        if (formDataState.email && !validateEmail(formDataState.email)) {
            formErrors.email = "Неверный формат email.";
        }

        if (Object.values(formErrors).some((error) => error)) {
            setErrors(formErrors);
            return;
        }

        onSubmit({...formDataState, phone: cleanedPhone});
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input__group}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Введите ваше имя"
                    value={formDataState.name}
                    onChange={onInputChange}
                    className={errors.name ? `${styles.error}` : ""}
                />
                {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
            </div>
            <div className={`${styles.input__group} ${styles.inline}`}>
                <select
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    className={errors.phone ? `${styles.error}` : ""}
                >
                    <option value="ru">🇷🇺</option>
                    <option value="by">🇧🇾</option>
                </select>

                <InputMask
                    mask={phoneMask}
                    id="phone"
                    name="phone"
                    placeholder="Введите ваш номер телефона"
                    value={formDataState.phone}
                    onChange={onInputChange}
                    className={errors.phone ? `${styles.error}` : ""}
                />
                {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
            </div>
            <div className={styles.input__group}>
            <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Введите ваш email (необязательно)"
                    value={formDataState.email}
                    onChange={onInputChange}
                    className={errors.email ? `${styles.error}` : ""}
                />
                {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            </div>
            <div className={styles.input__group}>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Введите ваше сообщение"
                    value={formDataState.message}
                    onChange={onInputChange}
                    className={errors.message ? `${styles.error}` : ""}
                />
                {errors.message && <div className={styles.errorMessage}>{errors.message}</div>}
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
