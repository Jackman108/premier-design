import {TitleProps} from "../interface/Title.props";

export const findItemByTitle = <T extends { shortTitle: string }>(
    data: T[],
    shortTitle: string,
    cache: Map<string, T> = new Map()
): T | undefined => {
    if (cache.has(shortTitle)) {
        return cache.get(shortTitle);
    }
    const item = data.find(item => item.shortTitle === shortTitle);
    if (item) {
        cache.set(shortTitle, item);
    }
    return item;
};

export const getTitleData = (titles: TitleProps[], ...keys: string[]): Record<string, TitleProps> => {
    return keys.reduce((acc, key) => {
        acc[key] = findItemByTitle(titles, key) || {} as TitleProps;
        return acc;
    }, {} as Record<string, TitleProps>);
};