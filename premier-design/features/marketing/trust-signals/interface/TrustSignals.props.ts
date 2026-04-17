import {Review} from '@shared/ui/reviews/ui/interface/Review.props';
import {FeatureProps} from '@shared/ui/features-section/interface/Feature.props';

export type TrustSignalMetricItem = {
    label: string;
    value: string;
};

export interface TrustSignalsProps {
    reviews: Review[];
    features: FeatureProps[];
    metrics: TrustSignalMetricItem[];
}
