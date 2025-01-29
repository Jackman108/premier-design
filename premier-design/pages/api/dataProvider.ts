import data from '../../data/data.json';
import type {GetStaticProps} from 'next'
import type {DataProps} from '@widgets/interface/interfaceData';

export const getData = async (): Promise<DataProps> => {
    return data;
};

export const getStaticProps: GetStaticProps<{ data: DataProps }> = async () => {
    const data: DataProps = await getData();

    return {
        props: {
            data,
        },
        revalidate: 3600,
    };
}; 