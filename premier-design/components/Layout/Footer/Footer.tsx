import React from "react";
import styles from "./Footer.module.css";
import Menu from '../../Menu/Menu';
import News from "../../News/News";
import Copywriting from "../../Copywriting/Copywriting";

const Footer: React.FC<{ data: DataProps }> = ({ 
    data 
}): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Copywriting />
                <News data={data} />
                <Menu 
                data={data} 
                menuStyle='footer' />
            </div>
        </footer>
    );
};

export default Footer;