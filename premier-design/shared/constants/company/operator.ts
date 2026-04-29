import type {
	AddressDetails,
	BankDetails,
	ContactPoint,
	LegalRequisites,
	WorkHoursSummary,
} from './types';

import {SITE_SOCIAL} from './social';

/**
 * Оператор сайта (ИП), контакты, JSON-LD-фрагменты.
 * Импортирует `SITE_SOCIAL` для `structuredData.sameAs`.
 */
export const SITE_OPERATOR = {
	publicOrigin: 'https://premium-design.pro',
	brandName: 'Premium Design',
	copyrightStartYear: 2012,
	privacyContactEmail: 'admin@premium-design.pro',
	legalEntityShortName: 'ИП Коробов Е.В.',
	legalEntity: {
		fullName: 'ИП Коробов Евгений Викторович',
		shortName: 'ИП Коробов Е.В.',
		unp: '491455920',
		registrationAuthority: 'Жлобинский районный исполнительный комитет (ЕГР)',
		registrationDate: '10.06.2019',
	} as LegalRequisites,
	phone: {
		tel: '+375291942881',
		display: '+375 (29) 194-28-81',
	} as ContactPoint,
	publicEmail: 'admin@premium-design.pro',
	address: {
		full: 'г. Жлобин, ул. Первомайская, д. 12а',
		streetAddress: 'ул. Первомайская, 12а',
		addressLocality: 'Жлобин',
		postalCode: '247210',
		addressCountry: 'BY',
	} as AddressDetails,
	workHours: {
		summary: 'Пн–Пт: 09:00 – 18:00',
		slots: [{daysOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '09:00', closes: '18:00'}],
	} as WorkHoursSummary,
	bankDetails: null as BankDetails,
	structuredData: {
		sameAs: [SITE_SOCIAL.telegram, SITE_SOCIAL.vk, SITE_SOCIAL.instagram],
		address: {
			streetAddress: 'Pervomayskaya',
			addressLocality: 'Zhlobin',
			postalCode: '247210',
			addressCountry: 'BY',
		},
		areaServed: [
			{'@type': 'City', name: 'Zhlobin'},
			{'@type': 'Country', name: 'Belarus'},
		],
		priceRange: '$$',
	},
} as const;

/** Канонический production-origin без завершающего слэша (sitemap, JSON-LD). */
export const SITE_PUBLIC_ORIGIN = SITE_OPERATOR.publicOrigin;
