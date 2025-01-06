'use client';
import {ChangeEvent, FC, FormEvent, memo, useState} from "react";
import styles from "./FeedbackForm.module.css";
import {FeedbackFormProps, FeedbackItem} from "../../../interface/FeedbackModal.props";
import {PatternFormat} from 'react-number-format';
import {validateForm} from "../../../validates/validateForm";


const FeedbackForm: FC<FeedbackFormProps> = memo(({onSubmit}) => {
    const [formDataState, setFormDataState] = useState<FeedbackItem>({
        name: "",
        phone: "",
        email: "",
        message: "",
        consent: false,
    });
    const [country, setCountry] = useState("by");
    const [isConsentGiven, setIsConsentGiven] = useState(false);
    const [errors, setErrors] = useState({name: "", phone: "", email: "", message: "", consent: ""});


    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormDataState((prev) => ({...prev, [name]: value}));
        setErrors((prevErrors) => ({...prevErrors, [name]: ""}));
    };

    const handlePhoneChange = (values: { value: string }) => {
        const countryCode = country === 'ru' ? '+7' : '+375';
        const formattedPhone = `${countryCode}${values.value}`;
        setFormDataState((prev) => ({...prev, phone: formattedPhone}));
        setErrors((prevErrors) => ({...prevErrors, phone: ""}));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formErrors = validateForm(formDataState, isConsentGiven);
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
            <div className={`${styles.input__group}`}>
                <label>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={isConsentGiven}
                        onChange={() => setIsConsentGiven(prev => !prev)}
                    />
                    Нажимая на кнопку, вы соглашаетесь с{" "}
                    <a href="/documents/user-agreement" target="_blank">пользовательским соглашением</a> и{" "}
                    <a href="/documents/privacy-policy" target="_blank">политикой конфиденциальности</a>.
                </label>
                {errors.consent && <div className={styles.errorMessage}>{errors.consent}</div>}
            </div>
            <div className={styles.form__button}>
                <button type="submit">Отправить</button>
            </div>
        </form>
    );
});
FeedbackForm.displayName = "FeedbackForm";
export default FeedbackForm;
