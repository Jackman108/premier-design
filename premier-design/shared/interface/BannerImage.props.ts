/** Семантика баннера/карточки с изображением: общий контракт для hero, share, appeal. */
export interface BannerImageProps {
	shortTitle: string;
	src: string;
	alt: string;
	quality: number;
	width: number;
	height: number;
}
