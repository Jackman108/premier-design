import React from "react";
import styles from "./Footer.module.css";
import Menu from '../../Menu/Menu';
import News from "../../News/News";
import Copywriting from "../../Copywriting/Copywriting";
import useResizeEffects from "../../hooks/useResizeEffects";

const Footer: React.FC<{ data: DataProps }> = ({
    data
}): JSX.Element => {
    const { isMobileMenuOpen, toggleMobileMenu, } = useResizeEffects();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Copywriting />
                <News 
                news={data.news} 
                newsStyle='footer'
                />
                <Menu
                    data={data}
                    menuStyle='footer'
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                />
            </div>
        </footer>
    );
};

export default Footer;