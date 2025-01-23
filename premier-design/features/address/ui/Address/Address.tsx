import React, {FC, ReactElement} from "react";
import styles from "./Address.module.css";
import SocialIcons from "@shared/ui/social-icons/SocialIcons";
import Phone from "@shared/ui/phone/Phone";
import GoogleMap from "@features/address/ui/GoogleMap/GoogleMap";
import WorkHours from "@shared/ui/work-hours/WorkHours";

const Address: FC = (): ReactElement => {
    return (
        <section className={styles.address__contacts}>
            <div className={styles.address__content}>
                <div className={styles.address__item}>
                    <h3>Позвоните нам:</h3>
                    <Phone/>
                </div>
                <div className={styles.address__item}>
                    <h3>Адрес и режим работы:</h3>
                    <p> г. Жлобин, ул. Первомайска, д. 12а</p>
                    <WorkHours />
                </div>
                <div className={styles.address__item}>
                    <h3>Мы в соц. сетях:</h3>
                    <SocialIcons/>
                </div>
            </div>
            <GoogleMap/>
        </section>
    );
};

export default Address;