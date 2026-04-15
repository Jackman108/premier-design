import {ExampleCardProps} from '@features/examples/interface/Examples.props';

export interface BeforeAfterShowcaseProps {
    cases: ExampleCardProps[];
}

export interface BeforeAfterState {
    activeCaseId: number;
    sliderValue: number;
}
