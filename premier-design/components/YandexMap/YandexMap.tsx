import styles from './YandexMap.module.css';
import { YMaps, Map, Placemark, ZoomControl, FullscreenControl } from '@pbe/react-yandex-maps';

const NEXT_PUBLIC_YANDEX_MAPS_API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '';

const YandexMap: React.FC = (): JSX.Element => {
    const defaultState = {
        center: [52.895233, 30.053785],
        zoom: 14,
    };

    return (
        <section className={styles.mapContainer}>
            <YMaps query={{ apikey: NEXT_PUBLIC_YANDEX_MAPS_API_KEY }}>
                <Map
                    defaultState={defaultState} 
                    className={styles.map}
                    options={{ suppressMapOpenBlock: true }}
                    >
                    <ZoomControl />
                    <FullscreenControl options={{ float: 'right' }} />
                    <Placemark geometry={[52.895233, 30.053785]} />
                </Map>
            </YMaps>
        </section>

    );
};

export default YandexMap;