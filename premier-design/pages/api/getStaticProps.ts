import {getDataFromDB} from './getData';
import type { GetStaticProps } from 'next'
import type { DataProps } from '../../interface/interfaceData';


export const getStaticProps: GetStaticProps<{ data: DataProps }> = async () => {
    const data: DataProps = await getDataFromDB();
    return {
        props: {
            data,
        },
        revalidate: 60,
    };
}; 