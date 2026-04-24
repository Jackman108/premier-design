import {getServicesTierStaticPaths, getServicesTierStaticProps} from '@lib/servicesTierStatic';
import {ServicesTierPage} from '@widgets/services-tier';

export const getStaticPaths = getServicesTierStaticPaths;
export const getStaticProps = getServicesTierStaticProps;

export default ServicesTierPage;
