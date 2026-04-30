import dynamic from 'next/dynamic';
import SectionSkeleton from '@shared/ui/section-skeleton/SectionSkeleton';

/**
 * Ленивые секции страниц: живут в **`shared/lib/`** (исключение для импортов `@features/*`), а не в остальном `shared/`.
 * Используются из `app/` и `@pages-layer/*`.
 */
export const Features = dynamic(() => import('@shared/ui/features-section/ui/Features'), { loading: SectionSkeleton });
export const Services = dynamic(() => import('@features/services/ui/Services/Services'), { loading: SectionSkeleton });
export const Approach = dynamic(() => import('@features/approach/ui/Approach'), { loading: SectionSkeleton });
export const Examples = dynamic(() => import('@features/examples/ui/Examples/Examples'), { loading: SectionSkeleton });
export const Costing = dynamic(() => import('@features/coasting/ui/Costing/Costing'), { loading: SectionSkeleton });
export const Appeal = dynamic(() => import('@features/banner/appeal/ui/AppealBanner'), { loading: SectionSkeleton });
export const OfferBanner = dynamic(() => import('@features/banner/offer/ui/OfferBanner'), { loading: SectionSkeleton });
export const ProjectOffer = dynamic(() => import('@features/project-offer/ui/ProjectOffer/ProjectOffer'), {
	loading: SectionSkeleton,
});
export const Partners = dynamic(() => import('@features/partners/ui/Partners/Partners'), { loading: SectionSkeleton });
export const StepsWork = dynamic(() => import('@features/steps-work/ui/StepsWork/StepsWork'), {
	loading: SectionSkeleton,
});
export const News = dynamic(() => import('@features/news/ui/News/News'), { loading: SectionSkeleton });
export const Address = dynamic(() => import('@features/address/ui/Address/Address'), { loading: SectionSkeleton });
export const Footer = dynamic(() => import('@widgets/layout/ui/footer/Footer'), { loading: SectionSkeleton });
export const BusinessServices = dynamic(
	() => import('@features/business-services/ui/BusinessServices/BusinessServices'),
	{ loading: SectionSkeleton },
);
export const Category = dynamic(() => import('@features/category/ui/Category/Category'), { loading: SectionSkeleton });
export const RelatedServices = dynamic(() => import('@features/related-services/ui/RelatedServices/RelatedServices'), {
	loading: SectionSkeleton,
});
export const Reviews = dynamic(() => import('@shared/ui/reviews/ui/Reviews/Reviews'), { loading: SectionSkeleton });
export const TrustSignals = dynamic(() => import('@features/marketing/trust-signals/ui/TrustSignals'), {
	loading: SectionSkeleton,
});
export const LeadQuiz = dynamic(() => import('@features/marketing/lead-quiz/ui/LeadQuiz'), {
	loading: SectionSkeleton,
});
export const FaqSection = dynamic(() => import('@features/faq/ui/FaqSection'), { loading: SectionSkeleton });
export const VideoSpotlight = dynamic(() => import('@features/marketing/video-spotlight/ui/VideoSpotlight'), {
	loading: SectionSkeleton,
});
