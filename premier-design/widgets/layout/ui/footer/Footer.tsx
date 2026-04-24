'use client';

import styles from "./Footer.module.css";
import useResizeEffects from '@widgets/layout/hooks/useResizeEffects';
import {FC} from "react";
import Menu from "@shared/ui/menu/ui/Menu";
import {News} from '@features/news';
import {Papers} from '@features/papers';
import CookiesBanner from "../../../cookies-banner/ui/CookiesBanner";
import {FooterProps} from "../../interface/Footer.props";
import Copyrighting from "@shared/ui/copyrighting/Copyrighting";
import DeveloperCredit from "./DeveloperCredit/DeveloperCredit";

const Footer: FC<FooterProps> = ({papers, news, menu, newsHashSyncOnMount = true}) => {
    const {isMobileMenuOpen, toggleMobileMenu,} = useResizeEffects();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__papers}>
                    <Papers papers={papers}/>
                    <Copyrighting/>
                    <DeveloperCredit/>
                </div>
                <div className={styles.footer__news}>
                    <News news={news} newsStyle='footer' syncHashOnMount={newsHashSyncOnMount}/>
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
