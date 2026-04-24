'use client';

import styles from './Layout.module.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {FC, ReactElement} from 'react';
import ButtonsPanel from "../../../buttons-panel/ui/ButtonsPanel";
import {LayoutProps} from "../../interface/Layout.props";
import {useBackgroundLoader} from "@shared/hooks/useBackgroundLoader";

const Layout: FC<LayoutProps> = ({
                                     children,
                                     headerProps,
                                     footerProps,
                                     additionalData,
                                     footerNewsHashSyncOnMount,
                                 }: LayoutProps): ReactElement => {
    useBackgroundLoader();
    const newsHashSync =
        footerNewsHashSyncOnMount ?? footerProps.newsHashSyncOnMount ?? true;
    return (
        <>
            <Header {...headerProps}/>
            <main className={styles.body} role='main'>
                {children}
                <ButtonsPanel additionalData={additionalData}/>
            </main>
            <Footer {...footerProps} newsHashSyncOnMount={newsHashSync}/>
        </>
    );
}
export default Layout;
