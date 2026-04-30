import { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Title from '@shared/ui/title/ui/Title';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import { findItemByTitle } from '@shared/utils/findItemByTitle';
import type { ButtonProps } from '@entities/button';
import { CategoryProps } from '@features/category/interface/Category.props';
import styles from './ServiceCategoriesHub.module.css';

/** Каталог категорий прайса карточками (страница `/services`), по смыслу как блок категорий на «Ремонт», но с переходом в `/services/[id]`. */
const ServiceCategoriesHub: FC<CategoryProps> = ({ titles, buttonData, repairs }): ReactElement => {
	const { title = '', description = '', shortTitle = '' } = findItemByTitle(titles, 'repair-categories') || {};
	const buttonHeader = findItemByTitle(buttonData, 'leave_request') || ({} as ButtonProps);

	return (
		<section className={styles.hub} aria-label="Каталог услуг по категориям">
			<div className={styles.hub__container}>
				<Title
					titleStyle="title-black"
					descriptionStyle="description-black"
					title={title}
					description={description}
					shortTitle={shortTitle}
				/>
				<ul className={styles.grid}>
					{repairs.map((category) => (
						<li key={category.id} className={styles.gridItem}>
							<Link href={`/services/${category.id}`} className={styles.card}>
								<div className={styles.imageFrame}>
									<Image
										src={category.image.src}
										alt={category.image.alt}
										width={category.image.width}
										height={category.image.height}
										quality={category.image.quality}
										className={styles.image}
										sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
									/>
								</div>
								<div className={styles.cardBody}>
									<h2 className={styles.cardTitle}>{category.title}</h2>
									<p className={styles.cardDesc}>{category.description}</p>
									<span className={styles.cardCta}>Смотреть услуги</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
				<OrderButton buttonData={buttonHeader.buttonHeader} buttonStyle="button-black" />
			</div>
		</section>
	);
};

export default ServiceCategoriesHub;
