import styles from './Approach.module.css';
import Title from '../UX/Title/Title';
import ApproachCards from '../Cards/ApproachCards/ApproachCards';
import {findItemByShortTitle} from '../../pages/api/constants';
import {DataProps} from '../../interface/interfaceData';
import {FC} from "react";

const Approach: FC<{ data: DataProps }> = ({
                                               data
                                           }) => {
    const {title = '', description = '', shortTitle = ''} = findItemByShortTitle(data.title, "our-approach") || {};
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <ApproachCards data={data}/>
            </div>
        </section>
    );
};
export default Approach;