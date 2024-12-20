import React, {FC, ReactElement} from "react";
import styles from "./Copyrighting.module.css";
import Logo from "../Logo/Logo";
import SocialIcons from "../SocialIcons/SocialIcons";
import {format} from "date-fns";

const Copyrighting: FC = (): ReactElement => {
    return (

        <section className={styles.footer__contacts}>
            <div className={styles.footer__logo}>
                <Logo/>
            </div>
            <div className={styles.footer__copy}>
                &copy; Premium Interior, 2012 - {format(new Date(), 'yyyy')}.
                <br/>
                Все права защищены
            </div>
            <div className={styles.footer__socialIcons}>
                <SocialIcons/>
            </div>
        </section>
    );
};

export default Copyrighting;