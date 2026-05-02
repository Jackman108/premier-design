/**
 * Типизированные ключи словаря `data/locales/<locale>/ui.json`.
 * Значения объекта === строка-ключ в JSON (как dot-нотация во Feb Code messages).
 */
export const UI = {
	menuMobileNavAriaLabel: 'menu.mobileNavAriaLabel',
	menuSectionLinkAriaLabel: 'menu.sectionLinkAriaLabel',
	localeSwitcherGroupAriaLabel: 'localeSwitcher.groupAriaLabel',

	commonLogoHomeAria: 'common.logoHomeAria',
	commonPhoneCallAria: 'common.phoneCallAria',

	socialTelegramAria: 'social.telegramAria',
	socialVkAria: 'social.vkAria',
	socialInstagramAria: 'social.instagramAria',

	themeToggleAria: 'theme.toggleAria',
	layoutMenuToggleAria: 'layout.menuToggleAria',

	orderPlaceOrderAria: 'order.placeOrderAria',

	feedbackModalTitle: 'feedback.modalTitle',
	feedbackModalDescription: 'feedback.modalDescription',
	feedbackCloseModalAria: 'feedback.closeModalAria',

	feedbackFormNameLabel: 'feedback.form.nameLabel',
	feedbackFormNamePlaceholder: 'feedback.form.namePlaceholder',
	feedbackFormEmailLabel: 'feedback.form.emailLabel',
	feedbackFormCountryCodeLabel: 'feedback.form.countryCodeLabel',
	feedbackFormCountryCodeAria: 'feedback.form.countryCodeAria',
	feedbackFormPhoneLabel: 'feedback.form.phoneLabel',
	feedbackFormPhonePlaceholder: 'feedback.form.phonePlaceholder',
	feedbackFormMessageLabel: 'feedback.form.messageLabel',
	feedbackFormMessagePlaceholder: 'feedback.form.messagePlaceholder',
	feedbackFormConsentPrefix: 'feedback.form.consentPrefix',
	feedbackFormUserAgreementLink: 'feedback.form.userAgreementLink',
	feedbackFormConsentAnd: 'feedback.form.consentAnd',
	feedbackFormPrivacyLink: 'feedback.form.privacyLink',
	feedbackFormConsentEnd: 'feedback.form.consentEnd',
	feedbackFormSubmitAria: 'feedback.form.submitAria',
	feedbackFormSubmitSending: 'feedback.form.submitSending',
	feedbackFormSubmitIdle: 'feedback.form.submitIdle',

	feedbackValidationNameRequired: 'feedback.validation.nameRequired',
	feedbackValidationPhoneRequired: 'feedback.validation.phoneRequired',
	feedbackValidationPhoneInvalid: 'feedback.validation.phoneInvalid',
	feedbackValidationPhoneOperatorRules: 'feedback.validation.phoneOperatorRules',
	feedbackValidationEmailInvalid: 'feedback.validation.emailInvalid',
	feedbackValidationMessageRequired: 'feedback.validation.messageRequired',
	feedbackValidationConsentRequired: 'feedback.validation.consentRequired',

	feedbackSuccessTitle: 'feedback.successTitle',
	feedbackSuccessSubtitle: 'feedback.successSubtitle',

	errorBoundaryTitle: 'error.boundaryTitle',
	errorBoundaryDescription: 'error.boundaryDescription',

	panelQuickActionsAria: 'panel.quickActionsAria',

	servicesCategoryPricingIntro: 'services.categoryPricingIntro',
	servicesTableHeaderService: 'services.tableHeaderService',
	servicesTableHeaderUnit: 'services.tableHeaderUnit',
	servicesTableHeaderPrice: 'services.tableHeaderPrice',
	servicesPriceRowAriaLabel: 'services.priceRowAriaLabel',
	servicesMetaLabelService: 'services.metaLabelService',
	servicesMetaLabelUnit: 'services.metaLabelUnit',
	servicesMetaLabelPrice: 'services.metaLabelPrice',

	relatedAdvantagesHeading: 'related.advantagesHeading',
	relatedWhyYouNeedHeading: 'related.whyYouNeedHeading',

	sitemapMachineReadableLead: 'sitemap.machineReadableLead',
	sitemapNoteAfterLink: 'sitemap.noteAfterLink',
	sitemapHomeCrumbLabel: 'sitemap.homeCrumbLabel',

	homeChromeSectionNavAria: 'homeChrome.sectionNavAria',
	homeChromeScrollTopAria: 'homeChrome.scrollTopAria',
	homeChromeScrollTopLabel: 'homeChrome.scrollTopLabel',
	homeChromeNavOffer: 'homeChrome.nav.offer',
	homeChromeNavServices: 'homeChrome.nav.services',
	homeChromeNavApproach: 'homeChrome.nav.approach',
	homeChromeNavSteps: 'homeChrome.nav.steps',
	homeChromeNavExamples: 'homeChrome.nav.examples',
	homeChromeNavTrust: 'homeChrome.nav.trust',
	homeChromeNavCosting: 'homeChrome.nav.costing',
	homeChromeNavRelated: 'homeChrome.nav.related',
	homeChromeNavFaq: 'homeChrome.nav.faq',
	homeChromeNavReviews: 'homeChrome.nav.reviews',
	homeChromeNavQuiz: 'homeChrome.nav.quiz',
	homeChromeNavAppeal: 'homeChrome.nav.appeal',

	cookiesTitle: 'cookies.title',
	cookiesDescription: 'cookies.description',
	cookiesPrivacyOpenAria: 'cookies.privacyOpenAria',
	cookiesPrivacyLinkText: 'cookies.privacyLinkText',
	cookiesAcceptAllAria: 'cookies.acceptAllAria',
	cookiesAcceptButtonText: 'cookies.acceptButtonText',
	cookiesRejectAllAria: 'cookies.rejectAllAria',
	cookiesRejectButtonText: 'cookies.rejectButtonText',
	cookiesCheckmarkAlt: 'cookies.checkmarkAlt',

	legalWrapperAria: 'legal.wrapperAria',
	legalUnpLabel: 'legal.unpLabel',
	legalRegistrationLabel: 'legal.registrationLabel',
	legalAddressLabel: 'legal.addressLabel',
	legalEmailLabel: 'legal.emailLabel',
	legalBankLabel: 'legal.bankLabel',
	legalBicLabel: 'legal.bicLabel',
	legalAccountLabel: 'legal.accountLabel',

	sliderOpenSlideAria: 'slider.openSlideAria',
	sliderPrevSlideAria: 'slider.prevSlideAria',
	sliderNextSlideAria: 'slider.nextSlideAria',
} as const;

export type UiMessageKey = (typeof UI)[keyof typeof UI];

export type UiTemplateKey = typeof UI.menuSectionLinkAriaLabel | typeof UI.servicesPriceRowAriaLabel;

export type UiTemplateVars<K extends UiTemplateKey> = K extends typeof UI.menuSectionLinkAriaLabel
	? { section: string }
	: K extends typeof UI.servicesPriceRowAriaLabel
		? { service: string }
		: never;
