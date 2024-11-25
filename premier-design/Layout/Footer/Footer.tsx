import styles from "./Footer.module.css";
import useResizeEffects from "../../hooks/useResizeEffects";
import dynamic from "next/dynamic";
import { FC } from "react";
import  {GetDataProps} from "../../interface/interfaceData";
import Menu from "../../components/Menu/Menu";

const News = dynamic(() => import('../../components/News/News'));
const Copywriting = dynamic(() => import('../../components/UX/Copywriting/Copywriting'));


const Footer: FC<GetDataProps> = ({ data }) => {
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