import styles from "./Footer.module.css";
import useResizeEffects from "../../hooks/useResizeEffects";
import {FC} from "react";
import {GetDataProps} from "../../interface/interfaceData";
import Menu from "../../components/Menu/Menu";
import { News, Copyrighting} from '../../components';

const Footer: FC<GetDataProps> = ({data}) => {
    const {isMobileMenuOpen, toggleMobileMenu,} = useResizeEffects();

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Copyrighting/>
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