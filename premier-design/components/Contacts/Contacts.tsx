import React from "react";
import styles from "./Contacts.module.css";
import Logo from "../Logo/Logo";
import SocialIcons from "../SocialIcons/SocialIcons";
import { format } from "date-fns";

const Contacts: React.FC = (): JSX.Element => {
    return (
        <div className={styles.footer__contacts}>
            <div className={styles.footer__logo}>
                <Logo />
            </div>
            <div className={styles.footer__copy}>
                &copy; Premier Design, 2012 - {format(new Date(), 'yyyy')}.
                <br />
                Все права защищены
            </div>
            <div className={styles.footer__socialIcons}>
                <SocialIcons />
            </div>
        </div>
    );
};

export default Contacts;