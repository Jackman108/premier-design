import dynamic from 'next/dynamic';

export const Features = dynamic(() => import('@shared/ui/features-section/ui/Features'));
export const Services = dynamic(() => import('@features/services/ui/Services/Services'));
export const Approach = dynamic(() => import('@features/approach/ui/Approach'));
export const Examples = dynamic(() => import('@features/examples/ui/Examples/Examples'));
export const Costing = dynamic(() => import('@features/coasting/ui/Costing/Costing'));
export const Appeal = dynamic(() => import('@features/banner/appeal/ui/AppealBanner'));
export const OfferBanner = dynamic(() => import('@features/banner/offer/ui/OfferBanner'));
export const ProjectOffer = dynamic(() => import('@features/project-offer/ui/ProjectOffer/ProjectOffer'));
export const Partners = dynamic(() => import('@features/partners/ui/Partners/Partners'));
export const StepsWork = dynamic(() => import('@features/steps-work/ui/StepsWork/StepsWork'));
export const News = dynamic(() => import('@features/news/ui/News/News'));
export const Address = dynamic(() => import('@features/address/ui/Address/Address'));
export const Footer = dynamic(() => import('../../widgets/layout/ui/footer/Footer'));
export const BusinessServices = dynamic(() => import('@features/business-services/ui/BusinessServices/BusinessServices'));
export const Category = dynamic(() => import('@features/category/ui/Category/Category'));
export const RelatedServices = dynamic(() => import('@features/related-services/ui/RelatedServices/RelatedServices'));
export const Reviews = dynamic(() => import('@shared/ui/reviews/ui/Reviews/Reviews'));
