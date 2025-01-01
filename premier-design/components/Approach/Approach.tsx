import styles from './Approach.module.css';
import Title from '../UX/Title/Title';
import ApproachCards from '../Cards/ApproachCards/ApproachCards';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {FC} from "react";
import {TitleProps} from "../../interface/Title.props";
import {ApproachesProps} from "../../interface/Approach.props";

const Approach: FC<ApproachesProps> = ({titles, cards}) => {
    const titleData = findItemByTitle(titles, "our-approach") || {} as TitleProps;
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />
                <ApproachCards cards={cards}/>
            </div>
        </section>
    );
};
export default Approach;