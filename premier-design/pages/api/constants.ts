import { DataProps } from '../[types]/Data';
import { getStaticProps } from '../api/data';


export const findTitle = (data: DataProps, id: number) => {
    return data.title?.find((item) => item.id === id);
};

export const bannerImageSettings = (data: DataProps, index: number) => {
    return data.bannersImages[index];
};

export const findButton = (data: DataProps, index: number) => {
    return data.button?.[index]?.buttonHeader ?? '';
};

export { getStaticProps };
