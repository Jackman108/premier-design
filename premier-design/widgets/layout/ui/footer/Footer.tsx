import styles from "./Footer.module.css";
import useResizeEffects from "@shared/hooks/useResizeEffects";
import {FC} from "react";
import Menu from "@shared/ui/menu/ui/Menu";
import {  News} from '@shared/utils/dynamicImports';
import Papers from "@features/papers/ui/Papers/Papers";
import CookiesBanner from "../../../cookies-banner/ui/CookiesBanner";
import {FooterProps} from "../../interface/Footer.props";
import Copyrighting from "@shared/ui/copyrighting/Copyrighting";

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