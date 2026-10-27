import {getRandomMonsterVariation} from '../getRandomMonsterVariation';
import {MonstersVariations} from '../../enums';

describe('getRandomMonsterVariation', () => {
	let randomSpy: jest.SpyInstance;

	beforeEach(() => {
		randomSpy = jest.spyOn(Math, 'random');
	});

	afterEach(() => {
		randomSpy.mockRestore();
	});

	it('should return the knight when Math.random() returns 0', () => {
		randomSpy.mockReturnValue(0);

		expect(getRandomMonsterVariation()).toBe(MonstersVariations.KNIGHT);
	});

	it('should return the knight when Math.random() is close to 1', () => {
		randomSpy.mockReturnValue(0.9999999);

		expect(getRandomMonsterVariation()).toBe(MonstersVariations.KNIGHT);
	});

	it('should always return a valid monster variation', () => {
		randomSpy.mockReturnValue(0.42);

		const results = Array.from({length: 10}, () => getRandomMonsterVariation());

		results.forEach((variation) => {
			expect(Object.values(MonstersVariations)).toContain(variation);
		});
	});
});
