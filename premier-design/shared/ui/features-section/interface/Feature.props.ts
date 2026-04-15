export interface FeatureProps {
    id: number;
    title: string;
    iconPng: string;
    icon: string;
}

export interface FeaturesProps {
    features: FeatureProps[];
}