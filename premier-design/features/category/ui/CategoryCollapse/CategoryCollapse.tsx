import {FC} from 'react';
import Link from 'next/link';
import {Category} from "@features/category/interface/Category.props";
import styles from './CategoryCollapse.module.css';
import pricingStyles from '@shared/ui/pricing-table/pricingTable.module.css';
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
                <h2 id={`category-header-${category.id}`}>{category.title}</h2>
                <span
                    className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}
                    aria-hidden="true"
                />
            </summary>
            {isOpen && (
                <div className={styles.categoryBody}>
                    <table className={pricingStyles.table}>
                        <thead>
                        <tr className={pricingStyles.tr}>
                            <th className={pricingStyles.th}>Услуга</th>
                            <th className={`${pricingStyles.th} ${pricingStyles.unitColumn}`}>Ед.измер.</th>
                            <th className={`${pricingStyles.th} ${pricingStyles.priceColumn}`}>Цена</th>
                        </tr>
                        </thead>
                        <tbody>
                        {category.priceList.map((item, idx) => (
                            <tr key={idx} className={pricingStyles.tr}>
                                <td className={pricingStyles.td}>
                                    <Link href={item.canonical} className={pricingStyles.link}
                                          aria-label={`Перейти к разделу ${item.service}`}
                                    >
                                        <p>{item.service}</p>
                                    </Link>
                                </td>
                                <td className={`${pricingStyles.td} ${pricingStyles.unitColumn}`}>{item.unit}</td>
                                <td className={`${pricingStyles.td} ${pricingStyles.priceColumn}`}>{item.price}</td>
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
