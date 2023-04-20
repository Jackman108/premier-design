import React from "react";
import styles from "./Footer.module.css";
import FooterMenu from "../Menu/FooterMenu/FooterMenu";
import menuItems from "../Menu/MenuItems/MenuItems";
import News from "../News/News";
import newsData from "../../data/news.json";
import Contacts from "../Contacts/Contacts";

function Footer(): JSX.Element {
    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <Contacts />
                <FooterMenu MenuItems={menuItems} />
                <News news={newsData} />
            </footer>
        </div>
    );
};

export default Footer;