/**
 * Единый источник публичных идентификаторов сайта, оператора и внешних контрагентов (вне `data.json`).
 *
 * Зачем: соответствие Постановлению Совмина РБ №31 (24.01.2014) и Закону «О защите прав потребителей»
 * требует на сайте указывать ФИО ИП (или наименование юрлица), УНП, юр.адрес, контакты, режим работы.
 * Все потребители (Footer/`LegalRequisites`, `Phone`, `WorkHours`, `Address`, JSON-LD, юр.тексты,
 * `public/robots.txt`) обязаны брать значения отсюда и нигде не дублировать литералы.
 *
 * Поля без подтверждённых данных (банковские реквизиты и т.д.) — `null`, UI скрывает строки.
 * Регистрация в ЕГР — `legalEntity.registrationAuthority` / `registrationDate` (источник: свидетельство).
 */

export type LegalRequisites = {
	readonly fullName: string;
	readonly shortName: string;
	readonly unp: string | null;
	readonly registrationAuthority: string | null;
	readonly registrationDate: string | null;
};

export type ContactPoint = {
	readonly tel: string;
	readonly display: string;
};

export type AddressDetails = {
	readonly full: string;
	readonly streetAddress: string;
	readonly addressLocality: string;
	readonly postalCode: string;
	readonly addressCountry: string;
};

export type WorkHoursSummary = {
	readonly summary: string;
	readonly slots: ReadonlyArray<{
		readonly daysOfWeek: ReadonlyArray<'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'>;
		readonly opens: string;
		readonly closes: string;
	}>;
};

export type BankDetails = {
	readonly bankName: string;
	readonly bic: string;
	readonly account: string;
} | null;

/**
 * Канонические URL соцсетей (телеграм, VK, Instagram) — единый источник для UI и JSON-LD.
 * См. `shared/ui/social-icons/SocialIcons` и `structuredData.sameAs`.
 */
export const SITE_SOCIAL = {
	telegram: 'https://t.me/PremiumDesignZhl',
	vk: 'https://vk.com/premium_design_zhl',
	instagram: 'https://www.instagram.com/premium_design_zhl',
} as const;

export const SITE_OPERATOR = {
	publicOrigin: 'https://premium-design.pro',
	brandName: 'Premium Design',
	copyrightStartYear: 2012,
	/** Контакт для вопросов по персональным данным и юридическим текстам. */
	privacyContactEmail: 'admin@premium-design.pro',
	/** Короткое юридическое имя — для оферт/политик/подвала, исторический алиас. */
	legalEntityShortName: 'ИП Коробов Е.В.',
	/** Юридическое лицо/ИП — для обязательной информации в подвале. */
	legalEntity: {
		fullName: 'ИП Коробов Евгений Викторович',
		shortName: 'ИП Коробов Е.В.',
		unp: '491455920',
		/** ЕГР — регистрация у Жлобинского РИК по состоянию на дату ниже. */
		registrationAuthority: 'Жлобинский районный исполнительный комитет (ЕГР)',
		registrationDate: '10.06.2019',
	} as LegalRequisites,
	/** Публичный единый телефон (тот же, что в `Phone`-компоненте и JSON-LD). */
	phone: {
		tel: '+375291942881',
		display: '+375 (29) 194-28-81',
	} as ContactPoint,
	/** Публичная почта (обычно совпадает с `privacyContactEmail`). */
	publicEmail: 'admin@premium-design.pro',
	/** Полный адрес и поля для JSON-LD. */
	address: {
		full: 'г. Жлобин, ул. Первомайская, д. 12а',
		streetAddress: 'ул. Первомайская, 12а',
		addressLocality: 'Жлобин',
		postalCode: '247210',
		addressCountry: 'BY',
	} as AddressDetails,
	/** Режим работы. Менять здесь — секция «Контакты» и Footer обновятся одновременно. */
	workHours: {
		summary: 'Пн–Пт: 09:00 – 18:00',
		slots: [
			{ daysOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '09:00', closes: '18:00' },
		],
	} as WorkHoursSummary,
	/** Банковские реквизиты — нужны только при онлайн-оплате/заключении договоров онлайн; пока не публикуем. */
	bankDetails: null as BankDetails,
	structuredData: {
		sameAs: [SITE_SOCIAL.telegram, SITE_SOCIAL.vk, SITE_SOCIAL.instagram],
		/** Латиница — исторический формат для JSON-LD `PostalAddress`. */
		address: {
			streetAddress: 'Pervomayskaya',
			addressLocality: 'Zhlobin',
			postalCode: '247210',
			addressCountry: 'BY',
		},
		areaServed: [
			{ '@type': 'City', name: 'Zhlobin' },
			{ '@type': 'Country', name: 'Belarus' },
		],
		priceRange: '$$',
	},
} as const;

/** Канонический production-origin без завершающего слэша (sitemap, JSON-LD id, `getFullCanonicalUrl`). */
export const SITE_PUBLIC_ORIGIN = SITE_OPERATOR.publicOrigin;

export const DEVELOPER_STUDIO_FEB_CODE = {
	siteUrl: 'https://febcode.pro',
	logoSrc: '/images/feb_logo.svg',
	logoAlt: 'feb-code',
	creditLabel: 'Разработано',
} as const;
