/**
 * Обязательные реквизиты ИП в подвале сайта (соответствие Постановлению Совмина РБ №31).
 *
 * Контракт:
 *   - источник всех значений — `SITE_OPERATOR` из `shared/constants/company.ts`;
 *   - строки с `null` (УНП/регистрация/банк) скрываются — публикуем только подтверждённое.
 *   - семантика: `<address>` для контактных данных, `<dl>` для пар «реквизит → значение».
 */
import { FC } from 'react';
import styles from './LegalRequisites.module.css';
import { SITE_OPERATOR } from '@shared/constants/company';

const LegalRequisites: FC = () => {
	const { legalEntity, address, publicEmail, bankDetails } = SITE_OPERATOR;

	return (
		<address className={styles.requisites} aria-label="Реквизиты и контактная информация">
			<p className={styles.requisites__name}>{legalEntity.fullName}</p>

			<dl className={styles.requisites__list}>
				{legalEntity.unp ? (
					<div className={styles.requisites__row}>
						<dt>УНП</dt>
						<dd>{legalEntity.unp}</dd>
					</div>
				) : null}

				{legalEntity.registrationAuthority && legalEntity.registrationDate ? (
					<div className={styles.requisites__row}>
						<dt>Регистрация</dt>
						<dd>{`${legalEntity.registrationAuthority}, ${legalEntity.registrationDate}`}</dd>
					</div>
				) : null}

				<div className={styles.requisites__row}>
					<dt>Адрес</dt>
					<dd>{address.full}</dd>
				</div>

				<div className={styles.requisites__row}>
					<dt>E-mail</dt>
					<dd>
						<a href={`mailto:${publicEmail}`}>{publicEmail}</a>
					</dd>
				</div>

				{bankDetails ? (
					<>
						<div className={styles.requisites__row}>
							<dt>Банк</dt>
							<dd>{bankDetails.bankName}</dd>
						</div>
						<div className={styles.requisites__row}>
							<dt>BIC</dt>
							<dd>{bankDetails.bic}</dd>
						</div>
						<div className={styles.requisites__row}>
							<dt>Счёт</dt>
							<dd>{bankDetails.account}</dd>
						</div>
					</>
				) : null}
			</dl>
		</address>
	);
};

export default LegalRequisites;
