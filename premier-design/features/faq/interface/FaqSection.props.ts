import type {TitleStyleProps} from '@shared/ui/title/interface/Title.props';

export type FaqEntry = {
    id: string;
    question: string;
    answer: string;
};

export type FaqSectionProps = {
    sectionId: string;
    title: Pick<TitleStyleProps, 'title' | 'description' | 'shortTitle'>;
    items: FaqEntry[];
};
