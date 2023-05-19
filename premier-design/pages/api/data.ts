import data from "../../data/data.json";

let cachedData: typeof data | null = null;

export const getData = (): typeof data => {
    if (cachedData) {
        return cachedData;
    }

    cachedData = data;
    return cachedData;
};
