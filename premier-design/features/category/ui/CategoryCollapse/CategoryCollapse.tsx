import {FC} from 'react';
import Link from 'next/link';
import {Category} from "@features/category/interface/Category.props";
import styles from './CategoryCollapse.module.css';
import {useModalState} from "@shared/hooks/useModalState";

const CategoryCollapse: FC<{ category: Category }> = ({category}) => {
    const {isOpen, toggleModal} = useModalState();

    return (
        <div
            className={`${styles.categoryCollapse} ${isOpen ? styles.open : ''}`}
            role="region"
            aria-labelledby={`category-header-${category.id}`}
        >
            <summary
                className={styles.categoryHeader}
                onClick={toggleModal}
                role="button"
                aria-expanded={isOpen}
                aria-label={isOpen ? `Скрыть ${category.title}` : `Показать ${category.title}`}
            >
                <h3 id={`category-header-${category.id}`}>{category.title}</h3>
                <span
                    className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}
                    aria-hidden="true"
                />
            </summary>
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
                                    <Link href={item.canonical} className={styles.link}
                                          aria-label={`Перейти к разделу ${item.service}`}
                                    >
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
        </div>
    );
};

export default CategoryCollapse;
