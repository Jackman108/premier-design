import {Paper} from "./Paper.props";
import {NewsProps} from "./News.props";
import {MenuProps} from "./Menu.props";
import {ButtonProps} from "./Button.props";
import {FeatureProps} from "./Feature.props";
import {TitleProps} from "./Title.props";
import {ApproachCardProps, ServiceCardProps} from "./Cards.props";
import {OfferListProps} from "./OfferList.props";
import {OfferProjectProps} from "./OfferProject.props";
import {BannerImageProps} from "./Banner.props";
import {PartnersProps} from "./Partners.props";
import {StepsWorkProps} from "./StepsWork.props";
import {Prices} from "./Prices.props";
import {Review} from "./Review.props";
import {PanelProps} from "./Panel.props";
import {ExampleCardProps} from "./Examples.props";
import {CostingCardProps} from "./Costing.props";
import {RelatedServiceCardProps} from "./RelatedService.props";

export interface DataProps {
    menu: MenuProps[];
    button: ButtonProps[];
    news: NewsProps[];
    features: FeatureProps[];
    title: TitleProps[];
    cards: {
        approachCard: ApproachCardProps[];
        costingCard: CostingCardProps[];
        examplesCard: ExampleCardProps[];
        servicesCard: ServiceCardProps[];
    };
    offerList: OfferListProps;
    offerProject: {
        designType: OfferProjectProps[];
        repairType: OfferProjectProps[];
    }
    bannersImages: BannerImageProps[];
    partners: PartnersProps[];
    stepsWork: StepsWorkProps[];
    pageMeta: {
        [key: string]: {
            title: string;
            description: string;
            canonical: string;
        };
    };
    papers: Paper[];
    prices: Prices;
    reviews: Review[];
    panel: PanelProps[];
    relatedServices: RelatedServiceCardProps[];
}

export interface GetDataProps {
    data: DataProps;
}
