import {Paper} from "@features/papers/interface/Paper.props";
import {NewsProps} from "@features/news/interface/News.props";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {FeatureProps} from "@shared/ui/features-section/interface/Feature.props";
import {TitlePage, TitleProps} from "@shared/ui/title/interface/Title.props";
import { ServiceCardProps} from "@features/services/interface/ServiceCard.props";
import {OfferListProps} from "@features/offer-list/interface/OfferList.props";
import {OfferProjectProps} from "@features/project-offer/interface/OfferProject.props";
import {BannerImageProps} from "@features/banner/interface/Banner.props";
import {PartnersProps} from "@features/partners/interface/Partners.props";
import {StepsWorkProps} from "@features/steps-work/interface/StepsWork.props";
import {Prices} from "@features/category/interface/Category.props";
import {Review} from "@shared/ui/reviews/ui/interface/Review.props";
import {ExampleCardProps} from "@features/examples/interface/Examples.props";
import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {RelatedServiceCardProps} from "@features/related-services/interface/RelatedService.props";
import {BusinessServiceCard, BusinessServices} from "@features/business-services/interface/BusinessService.props";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";
import {ApproachCardProps} from "@features/approach/interface/ApproachCard.props";

export interface DataProps {
    titlesPage: TitlePage[]
    menu: MenuItem[];
    button: ButtonProps[];
    news: NewsProps[];
    features: FeatureProps[];
    title: TitleProps[];
    approachCard: ApproachCardProps[];
    costingCard: CostingCardProps[];
    examplesCard: ExampleCardProps[];
    servicesCard: ServiceCardProps[];
    businessServiceCard: BusinessServiceCard[];
    offerList: OfferListProps;
    offerProject: {
        designType: OfferProjectProps[];
        repairType: OfferProjectProps[];
    }
    bannersImages: BannerImageProps[];
    partners: PartnersProps[];
    stepsWork: StepsWorkProps[];
    papers: Paper[];
    prices: Prices;
    reviews: Review[];
    panel: PanelProps[];
    relatedServices: RelatedServiceCardProps[];
    businessServices: BusinessServices;
}

export interface GetDataProps {
    data: DataProps;
}
