import styles from './Layout.module.css';
import Header from '../header/Header';
import {Footer} from '@shared/utils/dynamicImports';
import {FC, ReactElement} from 'react';
import ButtonsPanel from "../../../buttons-panel/ui/ButtonsPanel";
import {LayoutProps} from "../../interface/Layout.props";
import {useBackgroundLoader} from "@shared/hooks/useBackgroundLoader";

const Layout: FC<LayoutProps> = ({
                                     children, headerProps, footerProps, additionalData
                                 }: LayoutProps): ReactElement => {
    useBackgroundLoader();
    return (
        <>
            <Header {...headerProps}/>
            <main className={styles.body} role='main'>
                {children}
                <ButtonsPanel additionalData={additionalData}/>
            </main>
            <Footer {...footerProps}/>
        </>
    );
}
export default Layout;
