import styles from './ProjectOffer.module.css';
import {FC, ReactElement, useMemo} from "react";
import {ProjectOfferProps} from "@features/project-offer/interface/OfferProject.props";
import OfferCard from "../OfferCard/OfferCard";
import SliderComponent from '@shared/ui/slider/ui/Slider';

const ProjectOffer: FC<ProjectOfferProps> = ({data, buttonData, buttonStyle}): ReactElement => {
    const slidesPerView = 1; // Настроить количество слайдов на экране (можно адаптировать для мобильных)

    const memoizedData = useMemo(() => data || [], [data]);
    return (
        <section className={styles.offer}>
            <div className={styles.offer__container}>
                <SliderComponent slidesPerView={slidesPerView} isMobile={true}>
                    {memoizedData.map((offer, index) => (
                        <OfferCard
                            key={offer.id}
                            offer={offer}
                            buttonData={buttonData}
                            buttonStyle={buttonStyle}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </SliderComponent>
            </div>
        </section>
    );

};
export default ProjectOffer;