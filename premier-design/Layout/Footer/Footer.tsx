import styles from "./Footer.module.css";
import useResizeEffects from "../../hooks/useResizeEffects";
import {FC} from "react";
import {GetDataProps} from "../../interface/interfaceData";
import Menu from "../../components/Menu/Menu";
import {Copyrighting, News} from '../../components';

import Papers from "../../components/Papers/Papers";

const Footer: FC<GetDataProps> = ({data}) => {
    const {isMobileMenuOpen, toggleMobileMenu,} = useResizeEffects();


    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__papers}>
                    <Papers papers={data.papers}/>
                    <Copyrighting/>
                </div>

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