import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import OfferList from '../components/OfferList/OfferList';
import ProjectOffer from '../components/ProjectOffer/ProjectOffer';
import Examples from '../components/Examples/Examples';
import Appeal from '../components/Appeal/Appeal';
import { getData } from './api/data';
import { memo } from 'react';

const Design: NextPage<DataProps> = memo((): JSX.Element => {
    const data = getData();
    const findTitle = data.title.find((item) => item.id === 7);
    const { title = '', description = '' } = findTitle || {};
    const findButton = data.button[1]?.buttonHeader ?? '';
    const bannerImageSettings: BannerImagesProps = data.bannersImages[0];
    return (
        <Layout data={data}>
            <main>
                <section>
                    <Banner
                        buttonStyle='button-white'
                        title={title}
                        description={description}
                        buttonHeader={findButton}
                        bannerImg={bannerImageSettings}
                        titleStyle='title-white'
                        descriptionStyle='description-white'
                    />
                    <OfferList data={data.offerList.filter((offer) => offer.id === 1)} />
                    <Examples data={data} />
                    <ProjectOffer
                        data={data.offerProject.designType}
                        buttonHeader={findButton}
                        buttonStyle='button-black'
                    />
                    <Appeal data={data} />
                </section>
            </main>
        </Layout>
    );
});

export default Design;