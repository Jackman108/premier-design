import ServiceDetail from "@features/services/ui/ServiceDetail/ServiceDetail";
import {staticPathsHandler} from "@shared/utils/staticPathsHandler";
import {staticPropsHandler} from "@shared/utils/staticPropsHandler";


export const getStaticPaths = staticPathsHandler();
export const getStaticProps = staticPropsHandler();

export default ServiceDetail;
