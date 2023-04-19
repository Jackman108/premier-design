import React from "react";
import styles from "./Footer.module.css";
import FooterMenu from "../Menu/FooterMenu/FooterMenu";
import menuItems from "../Menu/MenuItems/MenuItems";
import Logo from "../Logo/Logo";
import SocialIcons from "../SocialIcons/SocialIcons";
import LogoImage from '../assets/logo.png';

function Footer(): JSX.Element {
    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <div className={`${styles.footerColumn} ${styles.footerColumn__logo}`}>
                    <div className={styles.footerLogo}>
                        <div className={styles.footerLogo__logo}>
                            <Logo />
                        </div>
                        <p>&copy; 2023 Premier Design</p>
                        <SocialIcons />
                    </div>
                </div>

                <div className={`${styles.footerColumn} ${styles.footerColumn__navigation}`}>
                    <div className={styles.footerColumn__title}>
                        <h2>Навигация</h2>
                    </div>
                    <FooterMenu MenuItems={menuItems} />
                </div>

                <div className={`${styles.footerColumn} ${styles.footerColumn__news}`}>
                    <div className={styles.footerColumn__title}>
                        <h2>Новости</h2>
                    </div>
                    <div className={styles.footerContents}>
                    <div className={styles.footerContent}>
                        <img src={LogoImage.src} alt="Logo" />
                        <p>
                            Moscow Design Week 9-14 Октября 2018
                            10.10.2018
                        </p>
                    </div>
                    <div className={styles.footerContent}>
                        <img src={LogoImage.src} alt="Logo" />
                        <p>
                            Salone del Mobile.Milano Moscow 2018
                            10.10.2018
                        </p>
                    </div>
                    <div className={styles.footerContent}>
                        <img src={LogoImage.src} alt="Logo" />
                        <p>
                            Международная выставка архитектуры и дизайна АРХ Москва
                            16.10.2017
                        </p>
                    </div>
                    </div>
                    
                </div>
            </footer>
        </div>
    );
};

export default Footer;