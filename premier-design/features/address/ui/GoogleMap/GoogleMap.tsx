'use client';
import React, { FC, ReactElement } from 'react';
import { useAddressMap } from '@features/address/hooks/useAddressMap';
import styles from './GoogleMap.module.css';

const GoogleMap: FC = (): ReactElement => {
	const map = useAddressMap();

	return (
		<section className={styles.mapContainer}>
			<iframe
				title={map.title}
				src={map.src}
				className={styles.map}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
		</section>
	);
};

export default GoogleMap;
