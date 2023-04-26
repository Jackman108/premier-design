import React from "react";
import styles from "./Footer.module.css";
import FooterMenu from "../Menu/FooterMenu/FooterMenu";
import menuItems from "../Menu/MenuItems/MenuItems";
import News from "../News/News";
import newsData from "../../data/news.json";
import Contacts from "../Contacts/Contacts";

function Footer(): JSX.Element {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Contacts />
                <News news={newsData} />
                <FooterMenu MenuItems={menuItems} />                
            </div>
        </footer>
    );
};

export default Footer;