import {AddressMapConfig} from '@features/address/interface/AddressMapConfig';

// Централизуем конфиг карты в utils, чтобы UI-слой не хранил инфраструктурные строки.
export const OFFICE_MAP_CONFIG: AddressMapConfig = {
	title: 'Карта офиса Premier Design',
	src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2406.954659386236!2d30.0512086769656!3d52.89523970838021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d6b7ad5504649b%3A0x82fae45646cff6dd!2z0YPQu9C40YbQsCDQn9C10YDQstC-0LzQsNC50YHQutCw0Y8gMTIsINCW0LvQvtCx0LjQvSwg0JPQvtC80LXQu9GM0YHQutCw0Y8g0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sby!4v1732562295857!5m2!1sru!2sby',
};
