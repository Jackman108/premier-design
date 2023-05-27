'use client'
import { FC, useCallback, useEffect } from 'react';
import styles from './YandexMap.module.css';
import { YMaps, Map, Placemark, ZoomControl, FullscreenControl } from '@pbe/react-yandex-maps';

const YandexMap: FC = (): JSX.Element => {
    const yandexMapsApiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '';
    const defaultCenter = [52.895233, 30.053785];
    const defaultZoom = 14;

    const setCookie = useCallback((name: string, value: string, days: number): void => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = '; expires=' + date.toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value || '')}; SameSite=Lax; expires=${expires}; path=/`;
    }, []);

    useEffect(() => {
        setCookie('mycookie', 'myvalue', 30);
    }, [setCookie]);

    return (
        <section className={styles.mapContainer}>
            <YMaps query={{ apikey: yandexMapsApiKey }}>
                <Map
                    defaultState={{
                        center: defaultCenter,
                        zoom: defaultZoom,
                    }}
                    className={styles.map}
                    options={{ suppressMapOpenBlock: true }}
                >
                    <ZoomControl />
                    <FullscreenControl options={{ float: 'right' }} />
                    <Placemark geometry={defaultCenter} />
                </Map>
            </YMaps>

        </section>

    );
};

export default YandexMap;