import styles from "./Footer.module.css";
import useResizeEffects from "../../hooks/useResizeEffects";
import {FC} from "react";
import Menu from "../../components/Menu/Menu";
import {Copyrighting, News} from '../../components';
import Papers from "../../components/Papers/Papers";
import {FooterProps} from "../../interface/Layout.props";
import CookiesBanner from "../../components/CookiesBanner/CookiesBanner";

const Footer: FC<FooterProps> = ({papers, news, menu}) => {
    const {isMobileMenuOpen, toggleMobileMenu,} = useResizeEffects();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__papers}>
                    <Papers papers={papers}/>
                    <Copyrighting/>
                </div>
                <div className={styles.footer__news}>
                    <News news={news} newsStyle='footer'/>
                </div>
                <Menu
                    menu={menu}
                    menuStyle='footer'
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                />
            </div>
            <CookiesBanner papers={papers}/>
        </footer>
    );
};
export default Footer;