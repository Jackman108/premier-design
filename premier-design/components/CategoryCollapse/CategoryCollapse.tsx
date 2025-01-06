import {FC} from 'react';
import Link from 'next/link';
import {Category} from "../../interface/Prices.props";
import styles from './CategoryCollapse.module.css';
import {useModalState} from "../../hooks/useModalState";

const CategoryCollapse: FC<{ category: Category }> = ({category}) => {
    const {isOpen, toggleModal} = useModalState();

    return (
        <section className={`${styles.categoryCollapse} ${isOpen ? styles.open : ''}`}>
            <div className={styles.categoryHeader} onClick={toggleModal}>
                <h3>{category.title}</h3>
                <span className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}/>
            </div>
            {isOpen && (
                <div className={styles.categoryBody}>
                    <table className={styles.table}>
                        <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Услуга</th>
                            <th className={`${styles.th} ${styles.unitColumn}`}>Ед.измер.</th>
                            <th className={`${styles.th} ${styles.priceColumn}`}>Цена</th>
                        </tr>
                        </thead>
                        <tbody>
                        {category.priceList.map((item, idx) => (
                            <tr key={idx} className={styles.tr}>
                                <td className={styles.td}>
                                    <Link href={item.canonical} className={styles.link}>
                                        <p>{item.service}</p>
                                    </Link>
                                </td>
                                <td className={`${styles.td} ${styles.unitColumn}`}>{item.unit}</td>
                                <td className={`${styles.td} ${styles.priceColumn}`}>{item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default CategoryCollapse;
