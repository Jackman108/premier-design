import data from '../../data/data.json';
import type { GetStaticProps } from 'next'
import type { DataProps } from '../../interface/interfaceData';

export const getData = async (): Promise<typeof data> => {
    return data;
};

export const getStaticProps: GetStaticProps<{ data: DataProps }> = async () => {
    const data: DataProps = await getData();
    return {
        props: {
            data,
        },
        revalidate: 60,
    };
}; 