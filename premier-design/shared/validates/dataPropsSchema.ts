import {z} from 'zod';

const faqEntrySchema = z.object({
	id: z.string(),
	question: z.string(),
	answer: z.string(),
});

const homeSectionKeySchema = z.enum([
	'features',
	'offer',
	'services',
	'approach',
	'steps',
	'examples',
	'trust',
	'costing',
	'related',
	'faq',
	'reviews',
	'quiz',
	'appeal',
]);

const structuredDataRatingSchema = z.object({
	ratingValue: z.string(),
	reviewCount: z.number(),
	bestRating: z.string(),
});

const serviceJsonLdInputSchema = z.object({
	name: z.string(),
	description: z.string(),
	url: z.string(),
});

/** Элемент `titlesPage`: SEO + опциональные поля JSON-LD; лишние ключи сохраняются (`z.looseObject`). */
const titlePageSchema = z.looseObject({
	id: z.number(),
	title: z.string(),
	shortTitle: z.string(),
	description: z.string(),
	metaTitle: z.string(),
	metaDescription: z.string(),
	canonical: z.string(),
	faqForStructuredData: z.array(faqEntrySchema).optional(),
	structuredDataRating: structuredDataRatingSchema.optional(),
	serviceForStructuredData: serviceJsonLdInputSchema.optional(),
});

const menuItemSchema = z.object({
	id: z.number(),
	title: z.string(),
	ruTitle: z.string(),
});

const buttonPropsSchema = z.object({
	id: z.number().optional(),
	buttonHeader: z.string(),
	shortTitle: z.string(),
});

const newsItemSchema = z.object({
	id: z.number(),
	image: z.string(),
	imagePng: z.string(),
	title: z.string(),
	text: z.string(),
	date: z.string(),
});

const paperSchema = z.object({
	id: z.number(),
	title: z.string(),
	shortTitle: z.string(),
});

const costingCardSchema = z.object({
	id: z.number(),
	title: z.string(),
	image: z.string(),
});

const panelSchema = z.object({
	id: z.string(),
	icon: z.string(),
	altText: z.string(),
	text: z.string(),
	position: z.object({bottom: z.string()}),
});

const bannerImageSchema = z.object({
	id: z.number().optional(),
	shortTitle: z.string(),
	src: z.string(),
	alt: z.string(),
	quality: z.number(),
	width: z.number(),
	height: z.number(),
});

const shareBannerDataSchema = z.object({
	shortTitle: z.string(),
	link: z.string(),
	imageDesc: bannerImageSchema,
	imageMob: bannerImageSchema,
});

/** Элемент `bannersImages` (hero/thumbnail в JSON). */
const bannerListImageSchema = z.object({
	id: z.number(),
	shortTitle: z.string(),
	src: z.string(),
	alt: z.string(),
	quality: z.number(),
	width: z.number(),
	height: z.number(),
});

/** Блоки `title` (секции без полного SEO). */
const titleBlockSchema = z.looseObject({
	id: z.number(),
	title: z.string(),
	shortTitle: z.string(),
	description: z.string(),
});

const priceItemSchema = z.object({
	service: z.string(),
	unit: z.string(),
	price: z.string(),
	canonical: z.string(),
});

const categorySchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	image: z.object({
		src: z.string(),
		alt: z.string(),
		quality: z.number(),
		width: z.number(),
		height: z.number(),
	}),
	priceList: z.array(priceItemSchema),
});

const pricesSchema = z.object({
	repairs: z.array(categorySchema),
	design: z.array(categorySchema),
});

const relatedServiceCardSchema = z.object({
	id: z.string(),
	title: z.string(),
	subTitle: z.string(),
	description: z.string(),
	image: z.string(),
	canonical: z.string(),
	benefits: z.array(z.string()),
	text: z.string(),
	triggers: z.array(z.string()),
});

const offerTypeSchema = z.object({
	id: z.number(),
	image: z.string(),
	title: z.string(),
	description: z.string(),
	questions: z.array(z.string()),
	tips: z.string(),
	shortTitle: z.string(),
});

const offerBannerSchema = z.strictObject({
	homeType: offerTypeSchema,
	designType: offerTypeSchema,
	repairType: offerTypeSchema,
	aboutType: offerTypeSchema,
	portfolioType: offerTypeSchema,
	estimateType: offerTypeSchema,
});

const partnerItemSchema = z.object({
	id: z.number(),
	src: z.string(),
	srcPng: z.string(),
	alt: z.string(),
	quality: z.number(),
	width: z.number(),
	height: z.number(),
	discounts: z.string(),
});

const featureItemSchema = z.object({
	id: z.number(),
	title: z.string(),
	iconPng: z.string(),
	icon: z.string(),
});

const serviceCardSchema = z.object({
	id: z.number().optional(),
	text: z.string(),
	image: z.string(),
	href: z.string(),
});

const approachCardSchema = z.object({
	id: z.number(),
	image: z.string(),
	title: z.string(),
	description: z.string(),
});

const stepsWorkItemSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	icon: z.string(),
});

const exampleCardSchema = z.looseObject({
	id: z.number(),
	background: z.string(),
	address: z.string(),
	deadlines: z.string(),
	budgetRange: z.string().optional(),
	onTimeNote: z.string().optional(),
	bathroomIcon: z.string(),
	bathroomOption: z.number(),
	areaIcon: z.string(),
	areaOption: z.number(),
	areaSquare: z.string(),
	images: z.array(z.string()),
});

const reviewSchema = z.object({
	id: z.number(),
	name: z.string(),
	city: z.string(),
	text: z.string(),
	photoUrl: z.string(),
});

const businessServiceCardSchema = z.object({
	category: z.string(),
	image: z.string(),
	details: z.array(z.string()),
});

const businessServicesRootSchema = z
	.object({
		callToAction: z.object({
			headline: z.string(),
			reasons: z.array(z.string()),
		}),
	})
	.passthrough();

const offerProjectItemSchema = z.object({
	id: z.number(),
	image: z.string(),
	title: z.string(),
	price: z.string(),
	pros: z.string(),
	cons: z.string(),
	prosDescription: z.array(z.string()),
	consDescription: z.array(z.string()),
});

/**
 * Runtime-проверка корня `data/locales/<locale>/data.json` перед SSG/ISR: обязательные ключи,
 * без лишних полей на верхнем уровне; тип **`DataProps` = `z.infer`** — единый контракт данных.
 */
export const dataPropsSchema = z.strictObject({
		titlesPage: z.array(titlePageSchema),
		menu: z.array(menuItemSchema),
		button: z.array(buttonPropsSchema),
		news: z.array(newsItemSchema),
		features: z.array(featureItemSchema),
		title: z.array(titleBlockSchema),
		approachCard: z.array(approachCardSchema),
		costingCard: z.array(costingCardSchema),
		examplesCard: z.array(exampleCardSchema),
		servicesCard: z.array(serviceCardSchema),
		businessServiceCard: z.array(businessServiceCardSchema),
		offerBanner: offerBannerSchema,
		offerProject: z.object({
			designType: z.array(offerProjectItemSchema),
			repairType: z.array(offerProjectItemSchema),
		}),
		bannersImages: z.array(bannerListImageSchema),
		partners: z.array(partnerItemSchema),
		stepsWork: z.array(stepsWorkItemSchema),
		papers: z.array(paperSchema),
		prices: pricesSchema,
		reviews: z.array(reviewSchema),
		panel: z.array(panelSchema),
		relatedServices: z.array(relatedServiceCardSchema),
		businessServices: businessServicesRootSchema,
		shares: z.array(shareBannerDataSchema),
		trustSignals: z.object({
			metrics: z.array(
				z.object({
					label: z.string(),
					value: z.string(),
				}),
			),
			structuredDataRating: structuredDataRatingSchema.optional(),
		}),
		homeHeroHighlights: z.array(z.string()),
		homeVideoSpotlight: z.object({
			title: z.string(),
			description: z.string(),
			youtubeId: z.string(),
		}),
		homePage: z.object({
			sectionAriaLabels: z.record(homeSectionKeySchema, z.string()),
		}),
		faqContent: z.object({
			home: z.array(faqEntrySchema),
			design: z.array(faqEntrySchema),
			repairs: z.array(faqEntrySchema),
		}),
		companyAbout: z.object({
			intro: z.string(),
			milestonesTitle: z.string(),
			milestones: z.array(
				z.object({
					year: z.string(),
					text: z.string(),
				}),
			),
			teamTitle: z.string(),
			team: z.array(
				z.object({
					name: z.string(),
					role: z.string(),
					note: z.string(),
				}),
			),
			licensesNote: z.string(),
		}),
		contactsPage: z.object({
			uspAside: z.object({
				ariaLabel: z.string(),
				items: z.array(z.string()),
			}),
		}),
	});

/** Тип корня JSON после успешного `dataPropsSchema.safeParse` (единый источник истины). */
export type DataProps = z.infer<typeof dataPropsSchema>;

export const formatDataPropsParseError = (error: z.ZodError): string => {
	const head = error.issues.slice(0, 8).map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`);
	const suffix = error.issues.length > 8 ? ` … (+${error.issues.length - 8})` : '';
	return head.join('; ') + suffix;
};
