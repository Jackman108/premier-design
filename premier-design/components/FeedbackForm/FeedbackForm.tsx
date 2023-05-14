import React from "react";
import styles from "./FeedbackForm.module.css";
import { FeedbackFormProps } from "./FeedbackForm.props";


const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.input__group}>
                <label htmlFor="name">Имя:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Введите ваше имя"
                />

            </div>
            <div className={styles.input__group}>
                <label htmlFor="phone">Номер телефона:</label>
                <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required 
                placeholder="Введите ваш номер телефона"/>
            </div>
            <div className={styles.input__group}>
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Введите ваш email"
                />
            </div>
            <div className={styles.input__group}>
                <label htmlFor="message">Сообщение:</label>
                <textarea 
                id="message" 
                name="message" 
                required 
                placeholder="Введите ваше сообщение"
                />
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default FeedbackForm;
