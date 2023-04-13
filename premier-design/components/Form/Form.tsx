import React from "react";
import styles from "./Form.module.css";
import type { FormProps } from "./Form.props";


const Form: React.FC<FormProps> = ({ onSubmit }) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required />

            <button type="submit">Send</button>
        </form>
    );
};

export default Form;
