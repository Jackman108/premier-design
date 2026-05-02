import { useMemo } from 'react';

type ProjectOfferItem = {
	id: number | string;
};

// Нормализуем входной список офферов в одном месте.
// Это защищает UI от лишних null-check и оставляет компонент только "презентационным".
export const useProjectOffer = <T extends ProjectOfferItem>(data: T[]) => {
	return useMemo(() => data || [], [data]);
};
