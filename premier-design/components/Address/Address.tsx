import React from "react";
import styles from "./Address.module.css";
import SocialIcons from "../SocialIcons/SocialIcons";
import Phone from "../Phone/Phone";


const Address: React.FC = (): JSX.Element => {
    return (
        <div className={styles.address__contacts}>
            <h1 className={styles.address__header}>
                Наши контакты
            </h1>
            <div className={styles.address__content}>
                <div className={styles.address__item}>
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
        </div>
    );
};

export default Address;