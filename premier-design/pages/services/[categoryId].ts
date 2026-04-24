import {RelatedServiceDetail} from '@features/related-services';
import {staticPropsHandler} from "@lib/staticPropsHandler";
import {staticPathsHandler} from "@shared/utils/staticPathsHandler";

export const getStaticPaths = staticPathsHandler(true);
export const getStaticProps = staticPropsHandler(true);

export default RelatedServiceDetail;
