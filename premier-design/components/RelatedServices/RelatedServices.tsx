import React from 'react';
import styles from './RelatedServices.module.css';
import Title from "../UX/Title/Title";
import {RelatedServicesProps} from "../../interface/RelatedService.props";
import useResizeEffects from "../../hooks/useResizeEffects";
import Slider from "../Slider/Slider";
import RelatedServiceCard from "../Cards/RelatedServicesCard/RelatedServiceCard";

const RelatedServices: React.FC<RelatedServicesProps> = ({title, relatedServices}) => {
    const {isMobile} = useResizeEffects();


    return (
        <section className={styles.relatedServices}>
            <div className={styles.relatedServices__container} id={`related-services`}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
                />
                <div className={styles.items}>
                    {isMobile ? (
                        <Slider isMobile={isMobile} slidesPerView={1}>
                            {relatedServices.map((relatedService) => (
                                <RelatedServiceCard key={relatedService.id} {...relatedService} />
                            ))}
                        </Slider>
                    ) : (
                        relatedServices.map((relatedService) => (
                            <RelatedServiceCard key={relatedService.id} {...relatedService} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;
