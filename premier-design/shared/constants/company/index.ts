/**
 * Единый источник публичных идентификаторов сайта, оператора и внешних контрагентов (вне `data.json`).
 *
 * Зачем: соответствие Постановлению Совмина РБ №31 (24.01.2014) и Закону «О защите прав потребителей»
 * требует на сайте указывать ФИО ИП (или наименование юрлица), УНП, юр.адрес, контакты, режим работы.
 * Все потребители (Footer/`LegalRequisites`, `Phone`, `WorkHours`, `Address`, JSON-LD, юр.тексты,
 * `public/robots.txt`) обязаны брать значения отсюда и нигде не дублировать литералы.
 *
 * PD-R-03: модули `types`, `social`, `operator`, `developer`; публичный API — отсюда (`@shared/constants/company`).
 */

import {DEVELOPER_STUDIO_FEB_CODE} from './developer';
import {SITE_OPERATOR, SITE_PUBLIC_ORIGIN} from './operator';
import {SITE_SOCIAL} from './social';

export type {
	AddressDetails,
	BankDetails,
	ContactPoint,
	LegalRequisites,
	WorkHoursSummary,
} from './types';

export {DEVELOPER_STUDIO_FEB_CODE, SITE_OPERATOR, SITE_PUBLIC_ORIGIN, SITE_SOCIAL};
