import React from "react";
import styles from "./Contacts.module.css";
import Logo from "../Logo/Logo";
import SocialIcons from "../SocialIcons/SocialIcons";
import { format } from "date-fns";


function Contacts(): JSX.Element {
    return (
        <div className={styles.footerContacts}>
            <div className={styles.footerLogo}>
                <Logo />
            </div>
            <div className={styles.footerSocialIcons}>
                <SocialIcons />
            </div>
            <div className={styles.footerCopy}>
                <div>
                    &copy; Premier Design, 2012 - {format(new Date(), 'yyyy')}.
                    <br />
                    Все права защищены
                </div>
            </div>
        </div>
    );
};

export default Contacts;