import styles from './Approach.module.css';
import Title from '@shared/ui/title/ui/Title';
import ApproachCards from '@features/approach/ui/Card/ApproachCards';
import {FC} from "react";
import {ApproachesProps} from "@features/approach/interface/Approach.props";

const Approach: FC<ApproachesProps> = ({title, cards}) => {
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
                />
                <ApproachCards cards={cards}/>
            </div>
        </section>
    );
};
export default Approach;