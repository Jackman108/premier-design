import styles from './Approach.module.css';
import Title from '../UX/Title/Title';
import ApproachCards from '../Cards/ApproachCards/ApproachCards';
import { findTitle } from '../../pages/api/constants';
import { DataProps } from '../../interface/interfaceData';

const Approach: React.FC<{ data: DataProps }> = ({ 
    data 
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 3) || {};
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title                   
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ApproachCards data={data} />
            </div>
        </section >
    );
};
export default Approach;