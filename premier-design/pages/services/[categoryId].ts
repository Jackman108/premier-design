import RelatedServiceDetail from "@features/related-services/ui/RelatedServiceDetail/RelatedServiceDetail";
import {staticPropsHandler} from "@shared/utils/staticPropsHandler";
import {staticPathsHandler} from "@shared/utils/staticPathsHandler";

export const getStaticPaths = staticPathsHandler(true);
export const getStaticProps = staticPropsHandler(true);

export default RelatedServiceDetail;
