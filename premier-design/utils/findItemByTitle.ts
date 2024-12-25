export const findItemByTitle = <T extends { shortTitle: string }>(
    data: T[],
    shortTitle: string
): T | undefined => {
    return data.find(item => item.shortTitle === shortTitle);
};

