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
	'appeal',
]);

/**
 * Runtime-проверка корня `data/data.json` перед SSG/ISR: обязательные ключи как у `DataProps`,
 * без лишних полей на верхнем уровне; углублённо — критичные блоки (FAQ, trust, about, contacts).
 */
export const dataPropsSchema = z
	.object({
		titlesPage: z.array(z.unknown()),
		menu: z.array(z.unknown()),
		button: z.array(z.unknown()),
		news: z.array(z.unknown()),
		features: z.array(z.unknown()),
		title: z.array(z.unknown()),
		approachCard: z.array(z.unknown()),
		costingCard: z.array(z.unknown()),
		examplesCard: z.array(z.unknown()),
		servicesCard: z.array(z.unknown()),
		businessServiceCard: z.array(z.unknown()),
		offerBanner: z.record(z.string(), z.unknown()),
		offerProject: z.object({
			designType: z.array(z.unknown()),
			repairType: z.array(z.unknown()),
		}),
		bannersImages: z.array(z.unknown()),
		partners: z.array(z.unknown()),
		stepsWork: z.array(z.unknown()),
		papers: z.array(z.unknown()),
		prices: z.record(z.string(), z.unknown()),
		reviews: z.array(z.unknown()),
		panel: z.array(z.unknown()),
		relatedServices: z.array(z.unknown()),
		businessServices: z.record(z.string(), z.unknown()),
		shares: z.array(z.unknown()),
		trustSignals: z.object({
			metrics: z.array(
				z.object({
					label: z.string(),
					value: z.string(),
				}),
			),
			structuredDataRating: z
				.object({
					ratingValue: z.string(),
					reviewCount: z.number(),
					bestRating: z.string(),
				})
				.optional(),
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
	})
	.strict();

export const formatDataPropsParseError = (error: z.ZodError): string => {
	const head = error.issues.slice(0, 8).map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`);
	const suffix = error.issues.length > 8 ? ` … (+${error.issues.length - 8})` : '';
	return head.join('; ') + suffix;
};
