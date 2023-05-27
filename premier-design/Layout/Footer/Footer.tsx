import styles from "./Footer.module.css";
import useResizeEffects from "../../hooks/useResizeEffects";
import dynamic from "next/dynamic";
import { FC } from "react";
import { GetDataProps } from "../../pages/[types]/Data";

const News = dynamic(() => import('../../components/News/News'));
const Menu = dynamic(() => import('../../components/Menu/Menu'));
const Copywriting = dynamic(() => import('../../components/Copywriting/Copywriting'));


const Footer: FC<GetDataProps> = ({ data }): JSX.Element => {
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