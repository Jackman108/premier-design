import React, { FC } from "react";
import styles from "./Address.module.css";
import SocialIcons from "../UX/SocialIcons/SocialIcons";
import Phone from "../UX/Phone/Phone";
import dynamic from "next/dynamic";
const YandexMap = dynamic(() => import('../UX/YandexMap/YandexMap'));

const Address: FC = (): JSX.Element => {
    return (
        <section className={styles.address__contacts}>
            <div className={styles.address__content}>
                <div className={styles.address__item}>
                    <h3>Специалист по работе с клиентами:</h3>
                    <Phone />
                </div>
                <div className={styles.address__item}>
                    <h3>Адрес и режим работы:</h3>
                    <p> г. Жлобин, ул. Первомайска, д. 12а</p>
                </div>
                <div className={styles.address__item}>
                    <h3>Мы в соц. сетях:</h3>
                    <SocialIcons />
                </div>
            </div>
            <YandexMap />
        </section>
    );
};

export default Address;