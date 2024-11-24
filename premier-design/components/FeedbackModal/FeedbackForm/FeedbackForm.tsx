'use client';
import {ChangeEvent, FC, FormEvent, memo, useState} from "react";
import styles from "./FeedbackForm.module.css";
import {FeedbackFormProps} from "../../../interface/FeedbackModal.props";
import {validatePhone} from "../../../validates/validatePhone";
import {validateEmail} from "../../../validates/validateEmail";
import {PatternFormat} from 'react-number-format';


const FeedbackForm: FC<FeedbackFormProps> = memo(({onSubmit, formDataState, onInputChange}) => {
    const [country, setCountry] = useState("by");
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [event.target.name]: ""
        }));
        onInputChange(event);
    };

    const handlePhoneChange = (values: { value: string }) => {
        const countryCode = country === 'ru' ? '+7' : '+375';
        const formattedPhone = `${countryCode}${values.value}`;
        onInputChange({
            target: {
                name: 'phone',
                value: formattedPhone,
            },
        } as ChangeEvent<HTMLInputElement>);
    };

    const validateForm = () => {
        return {
            name: formDataState.name ? "" : "Введите ваше имя",
            phone: formDataState.phone ? (validatePhone(formDataState.phone) ? "" : "Неверный формат номера телефона!") : "Введите ваш номер телефона",
            email: formDataState.email && !validateEmail(formDataState.email) ? "Неверный формат email." : "",
            message: formDataState.message ? "" : "Введите сообщение",
        };
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formDataState.phone)

        const formErrors = validateForm();

        if (Object.values(formErrors).some((error) => error)) {
            setErrors(formErrors);
            return;
        }

        const cleanedPhone = formDataState.phone.replace(/\D/g, '');
        onSubmit({...formDataState, phone: cleanedPhone});
    };

    const phoneMask = country === 'ru' ? '+7 (###) ###-##-##' : '+375 (##) ###-##-##';

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input__group}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Введите ваше имя"
                    value={formDataState.name}
                    onChange={handleInputChange}
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

                <PatternFormat
                    format={phoneMask}
                    allowEmptyFormatting
                    mask="_"
                    id="phone"
                    name="phone"
                    placeholder="Введите ваш номер телефона"
                    value={formDataState.phone.replace(/^\+375|^\+7/, "")}
                    onValueChange={handlePhoneChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
