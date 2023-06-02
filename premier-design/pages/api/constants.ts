import { BannerImagesProps, DataProps } from '../../interface/interfaceData';
import { getStaticProps } from '../api/data';


export const findTitle = (data: DataProps, id: number) => {
    return data.title?.find((item) => item.id === id);
};

export const bannerImageSettings = (data: DataProps, id: number): BannerImagesProps | undefined => {
    return data.bannersImages?.find((item) => item.id === id);
};

export const findButton = (data: DataProps, index: number) => {
    return data.button?.[index]?.buttonHeader ?? '';
};

export { getStaticProps };
