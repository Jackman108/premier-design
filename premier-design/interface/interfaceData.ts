import {Paper} from "./Paper.props";
import {NewsProps} from "./News.props";
import {MenuProps} from "./Menu.props";
import {ButtonProps} from "./Button.props";
import {FeatureProps} from "./Feature.props";
import {TitlePage, TitleProps} from "./Title.props";
import {ApproachCardProps, ServiceCardProps} from "./Cards.props";
import {OfferListProps} from "./OfferList.props";
import {OfferProjectProps} from "./OfferProject.props";
import {BannerImageProps} from "./Banner.props";
import {PartnersProps} from "./Partners.props";
import {StepsWorkProps} from "./StepsWork.props";
import {Prices} from "./Category.props";
import {Review} from "./Review.props";
import {PanelProps} from "./Panel.props";
import {ExampleCardProps} from "./Examples.props";
import {CostingCardProps} from "./Costing.props";
import {RelatedServiceCardProps} from "./RelatedService.props";
import {BusinessServiceCard, BusinessServices} from "./BusinessService.props";

export interface DataProps {
    titlesPage: TitlePage[]
    menu: MenuProps[];
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
