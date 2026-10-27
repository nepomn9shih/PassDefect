import {getRandomNumber} from '../getRandomNumber';

describe('getRandomNumber', () => {
	let randomSpy: jest.SpyInstance;

	beforeEach(() => {
		randomSpy = jest.spyOn(Math, 'random');
	});

	afterEach(() => {
		randomSpy.mockRestore();
	});

	it('should return min when Math.random() returns 0', () => {
		randomSpy.mockReturnValue(0);

		expect(getRandomNumber(5, 10)).toBe(5);
	});

	it('should not exceed the upper bound when Math.random() is close to 1', () => {
		randomSpy.mockReturnValue(0.9999999);

		expect(getRandomNumber(5, 10)).toBe(9);
	});

	it('should work with a negative range', () => {
		randomSpy.mockReturnValue(0.5);

		expect(getRandomNumber(-10, -6)).toBe(-8);
	});

	it('should always return a value within the [min, max) range', () => {
		randomSpy.mockReturnValue(0.42);

		const results = Array.from({length: 30}, () => getRandomNumber(-3, 7));

		results.forEach((result) => {
			expect(result).toBeGreaterThanOrEqual(-3);
			expect(result).toBeLessThan(7);
		});
	});
});
