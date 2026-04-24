import {ServiceDetail} from '@features/services';
import {staticPathsHandler} from "@shared/utils/staticPathsHandler";
import {staticPropsHandler} from "@lib/staticPropsHandler";


export const getStaticPaths = staticPathsHandler();
export const getStaticProps = staticPropsHandler();

export default ServiceDetail;
