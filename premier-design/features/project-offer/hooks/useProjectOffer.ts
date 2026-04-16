import {useMemo} from 'react';

type ProjectOfferItem = {
	id: number | string;
};

export const useProjectOffer = <T extends ProjectOfferItem>(data: T[]) => {
	return useMemo(() => data || [], [data]);
};
