import {useMemo} from 'react';

import {OFFICE_MAP_CONFIG} from '@features/address/utils/addressMap.constants';

// Предоставляет стабильный контракт карты для UI-компонента.
// Это упрощает переиспользование и замену источника адреса в одном месте.
export const useAddressMap = () => {
	return useMemo(() => OFFICE_MAP_CONFIG, []);
};
