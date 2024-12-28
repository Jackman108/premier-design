import {Paper} from "./Paper.props";
import {NewsProps} from "./News.props";
import {MenuProps} from "./Menu.props";
import {ButtonProps} from "./Button.props";
import {FeatureProps} from "./Feature.props";
import {TitleProps} from "./Title.props";
import {ApproachCardProps, CostingCardProps, ExampleCardProps, ServiceCardProps} from "./Cards.props";
import {OfferListProps} from "./OfferList.props";
import {OfferProjectProps} from "./OfferProject.props";
import {BannerImageProps} from "./Banner.props";
import {PartnersProps} from "./Partners.props";
import {StepsWorkProps} from "./StepsWork.props";
import {Prices} from "./Prices.props";

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
    offerList: OfferListProps[];
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
        };
    };
    papers: Paper[];
    prices: Prices;
}

export interface GetDataProps {
    data: DataProps;
}
