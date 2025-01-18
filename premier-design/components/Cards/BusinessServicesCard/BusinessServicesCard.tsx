import {FC} from 'react';
import styles from './BusinessServicesCard.module.css';
import Image from 'next/image';
import List from "../../UX/List/List";
import {BusinessServicesCardProps} from "../../../interface/BusinessService.props";

const BusinessServicesCard: FC<BusinessServicesCardProps> = ({category, details, image}) => (
    <div className={styles.service}>
        <div className={styles.imageWrapper}>
            <Image src={image} alt={category} width={800} height={600} loading="lazy"/>
        </div>
        <h3 className={styles.category}>{category}</h3>
        <List items={details} className={styles.details}/>
    </div>
);

export default BusinessServicesCard;
