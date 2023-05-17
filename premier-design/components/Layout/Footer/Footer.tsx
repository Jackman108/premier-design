import React from "react";
import styles from "./Footer.module.css";
import DesktopMenu from "../../Menu/DesktopMenu/DesktopMenu";
import News from "../../News/News";
import Copywriting from "../../Copywriting/Copywriting";

const Footer: React.FC<{ data: DataProps }> = ({ data }): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Copywriting />
                <News data={data} />
                <DesktopMenu 
                data={data} 
                menuStyle='footer' />
            </div>
        </footer>
    );
};

export default Footer;