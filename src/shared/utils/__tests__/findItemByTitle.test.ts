import type { TitleProps } from '@shared/ui/title/interface/Title.props';

import { findItemByTitle, getTitleData } from '../findItemByTitle';

const titles: TitleProps[] = [
	{ shortTitle: 'home', title: 'H', description: 'd' },
	{ shortTitle: 'about', title: 'A', description: 'd' },
];

describe('findItemByTitle', () => {
	it('returns item by shortTitle', () => {
		expect(findItemByTitle(titles, 'about')?.title).toBe('A');
	});

	it('returns undefined when not found', () => {
		expect(findItemByTitle(titles, 'missing')).toBeUndefined();
	});

	it('reuses cache map for same key', () => {
		const cache = new Map<string, TitleProps>();
		const a = findItemByTitle(titles, 'home', cache);
		const b = findItemByTitle(titles, 'home', cache);
		expect(a).toBe(b);
		expect(cache.size).toBe(1);
	});
});

describe('getTitleData', () => {
	it('builds record from keys', () => {
		const map = getTitleData(titles, 'home', 'about');
		expect(map.home?.shortTitle).toBe('home');
		expect(map.about?.shortTitle).toBe('about');
	});
});
