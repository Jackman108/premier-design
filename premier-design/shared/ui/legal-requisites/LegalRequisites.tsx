'use client';

import { FC } from 'react';

import { UI, useLocale } from '@shared/i18n';
import { SITE_OPERATOR } from '@shared/constants/company';

import styles from './LegalRequisites.module.css';

/**
 * Обязательные реквизиты ИП в подвале сайта (соответствие Постановлению Совмина РБ №31).
 *
 * Контракт:
 *   - источник всех значений — `SITE_OPERATOR` из `shared/constants/company.ts`;
 *   - строки с `null` (УНП/регистрация/банк) скрываются — публикуем только подтверждённое.
 *   - семантика: `<address>` для контактных данных, `<dl>` для пар «реквизит → значение».
 */
const LegalRequisites: FC = () => {
	const { t } = useLocale();
	const { legalEntity, address, publicEmail, bankDetails } = SITE_OPERATOR;

	return (
		<address className={styles.requisites} aria-label={t(UI.legalWrapperAria)}>
			<p className={styles.requisites__name}>{legalEntity.fullName}</p>

			<dl className={styles.requisites__list}>
				{legalEntity.unp ? (
					<div className={styles.requisites__row}>
						<dt>{t(UI.legalUnpLabel)}</dt>
						<dd>{legalEntity.unp}</dd>
					</div>
				) : null}

				{legalEntity.registrationAuthority && legalEntity.registrationDate ? (
					<div className={styles.requisites__row}>
						<dt>{t(UI.legalRegistrationLabel)}</dt>
						<dd>{`${legalEntity.registrationAuthority}, ${legalEntity.registrationDate}`}</dd>
					</div>
				) : null}

				<div className={styles.requisites__row}>
					<dt>{t(UI.legalAddressLabel)}</dt>
					<dd>{address.full}</dd>
				</div>

				<div className={styles.requisites__row}>
					<dt>{t(UI.legalEmailLabel)}</dt>
					<dd>
						<a href={`mailto:${publicEmail}`}>{publicEmail}</a>
					</dd>
				</div>

				{bankDetails ? (
					<>
						<div className={styles.requisites__row}>
							<dt>{t(UI.legalBankLabel)}</dt>
							<dd>{bankDetails.bankName}</dd>
						</div>
						<div className={styles.requisites__row}>
							<dt>{t(UI.legalBicLabel)}</dt>
							<dd>{bankDetails.bic}</dd>
						</div>
						<div className={styles.requisites__row}>
							<dt>{t(UI.legalAccountLabel)}</dt>
							<dd>{bankDetails.account}</dd>
						</div>
					</>
				) : null}
			</dl>
		</address>
	);
};

export default LegalRequisites;
