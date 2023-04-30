import React from "react";
import styles from "./Footer.module.css";
import FooterMenu from "../../Menu/FooterMenu/FooterMenu";
import News from "../../News/News";
import data from "../../../data/data.json";
import Contacts from "../../Contacts/Contacts";
import { FooterProps } from "./Footer.props";


function Footer({}: FooterProps): JSX.Element {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Contacts />
                <News data={data} />
                <FooterMenu data={data} />                
            </div>
        </footer>
    );
};

export default Footer;