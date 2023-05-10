
interface MenuProps {
    id: number;
    title: string;
    ruTitle: string;
}

interface ButtonProps {
    buttonHeader: string;
}

interface NewsProps {
    id: number;
    image: string;
    title: string;
    date: string;
}

interface FeatureProps {
    id: number;
    title: string;
    icon: string;
}

interface TitleProps {
    id?: number;
    title: string;
    description: string;
}

interface ApproachProps {
    id: number;
    image: string;
    title: string;
    description: string;
}

interface CostingProps {
    id: number;
    title: string;
    image: string;
}

interface ExampleProps {
    id: number;
    background: string;
    address: string;
    deadlines: string;
    bathroomIcon: string;
    bathroomOption: number;
    areaIcon: string;
    areaOption: number;
    areaSquare: string;
}

interface ServiceProps {
    id?: number;
    text: string;
    image: string;
}

interface DataProps {
    menu: MenuProps[];
    button: ButtonProps[];
    news: NewsProps[];
    features: FeatureProps[];
    title: TitleProps[];
    list: {
        approach: ApproachProps[];
        costing: CostingProps[];
        examples: ExampleProps[];
        services: ServiceProps[];
    };
}