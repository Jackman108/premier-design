import {FC} from 'react';
import styles from './List.module.css';

const List: FC<{ items: string[]; className: string }> = ({items, className}) => (
    <ul className={className}>
        {items.map((item, index) => (
            <li key={index} className={styles.item}>{item}</li>
        ))}
    </ul>
);

export default List;
