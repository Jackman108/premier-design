import React from "react";
import styles from "./Footer.module.css";
import DesktopMenu from "../../Menu/DesktopMenu/DesktopMenu";
import News from "../../News/News";
import data from "../../../data/data.json";
import Contacts from "../../Contacts/Contacts";

const Footer: React.FC<DataProps> = (): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Contacts />
                <News data={data} />
                <DesktopMenu 
                data={data} 
                menuStyle='footer' />
            </div>
        </footer>
    );
};

export default Footer;