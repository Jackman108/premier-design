import React, { FC } from "react";
import styles from "./Address.module.css";
import SocialIcons from "../UX/SocialIcons/SocialIcons";
import Phone from "../UX/Phone/Phone";
import GoogleMap from "../UX/GoogleMap/GoogleMap";

const Address: FC = (): JSX.Element => {
    return (
        <section className={styles.address__contacts}>
            <div className={styles.address__content}>
                <div className={styles.address__item}>
                    <h3>Позвоните нам:</h3>
                    <Phone />
                </div>
                <div className={styles.address__item}>
                    <h3>Адрес и режим работы:</h3>
                    <p> г. Жлобин, ул. Первомайска, д. 12а</p>
                    <p> Пн-Пт: 9:00 - 18:00</p>
                </div>
                <div className={styles.address__item}>
                    <h3>Мы в соц. сетях:</h3>
                    <SocialIcons />
                </div>
            </div>
            <GoogleMap />
        </section>
    );
};

export default Address;