// components/index.ts
import dynamic from 'next/dynamic';

export const Banner = dynamic(() => import('./Banner/Banner'));
export const Features = dynamic(() => import('./Features/Features'));
export const Services = dynamic(() => import('./Services/Services'));
export const Approach = dynamic(() => import('./Approach/Approach'));
export const Examples = dynamic(() => import('./Examples/Examples'));
export const Costing = dynamic(() => import('./Costing/Costing'));
export const Appeal = dynamic(() => import('./Appeal/Appeal'));
export const OfferList = dynamic(() => import('./OfferList/OfferList'));
export const ProjectOffer = dynamic(() => import('./ProjectOffer/ProjectOffer'));
export const Partners = dynamic(() => import('./Partners/Partners'));
export const WorkStages = dynamic(() => import('./WorkStages/WorkStages'));
export const News = dynamic(() => import('./News/News'));
export const Address = dynamic(() => import('./Address/Address'));
export const Copyrighting = dynamic(() => import('./UX/Copyrighting/Copyrighting'));