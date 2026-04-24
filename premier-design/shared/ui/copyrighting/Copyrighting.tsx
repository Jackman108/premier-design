import React, {FC, ReactElement} from "react";
import styles from "./Copyrighting.module.css";
import {SITE_OPERATOR} from "@shared/constants/company";
import Logo from "@shared/ui/logo/Logo";
import SocialIcons from "@shared/ui/social-icons/SocialIcons";
import {format} from "date-fns";

const Copyrighting: FC = (): ReactElement => {
    return (

        <section className={styles.footer__contacts}>
            <div className={styles.footer__logo}>
                <Logo/>
            </div>
            <div className={styles.footer__copy}>
                &copy; {SITE_OPERATOR.brandName}, {SITE_OPERATOR.copyrightStartYear} - {format(new Date(), 'yyyy')}.
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