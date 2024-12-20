'use client'
import {FC, ReactElement, useCallback, useEffect} from 'react';
import styles from './YandexMap.module.css';
import {YMaps, Map, Placemark, ZoomControl, FullscreenControl} from '@pbe/react-yandex-maps';

const YandexMap: FC = (): ReactElement => {
    const {
        NEXT_PUBLIC_YANDEX_MAPS_API_KEY: yandexMapsApiKey = '',
    } = process.env;
    const defaultCenter: [number, number] = [52.895233, 30.053785];
    const defaultZoom = 14;

    const setCookie = useCallback((name: string, value: string, days: number): void => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value || '')}; SameSite=Lax; expires=${expires}; path=/`;
    }, []);

    useEffect(() => {
        setCookie('mycookie', 'myvalue', 30);
    }, [setCookie]);

    return (
        <section className={styles.mapContainer}>
            <YMaps query={{apikey: yandexMapsApiKey}}>
                <Map
                    defaultState={{
                        center: defaultCenter,
                        zoom: defaultZoom,
                    }}
                    className={styles.map}
                    options={{suppressMapOpenBlock: true}}
                >
                    <ZoomControl/>
                    <FullscreenControl options={{float: 'right'}}/>
                    <Placemark geometry={defaultCenter}/>
                </Map>
            </YMaps>

        </section>

    );
};

export default YandexMap;