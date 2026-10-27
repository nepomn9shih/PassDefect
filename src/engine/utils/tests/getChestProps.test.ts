import {getChestProps} from '../getChestProps';
import {ChestVariations} from '../../enums';

describe('getChestProps', () => {
	let randomSpy: jest.SpyInstance;

	beforeEach(() => {
		randomSpy = jest.spyOn(Math, 'random');
	});

	afterEach(() => {
		randomSpy.mockRestore();
	});

	it('should return a heart chest with 1-2 hearts', () => {
		randomSpy.mockReturnValueOnce(0);
		randomSpy.mockReturnValueOnce(0.99);

		expect(getChestProps()).toEqual({
			variation: ChestVariations.HEART,
			gold: 0,
			hearts: 2,
			bolts: 0,
			armor: 0
		});
	});

	it('should return a bolts chest with 5 bolts (case 1)', () => {
		randomSpy.mockReturnValueOnce(0.1);

		expect(getChestProps()).toEqual({
			variation: ChestVariations.BOLTS,
			gold: 0,
			hearts: 0,
			bolts: 5,
			armor: 0
		});
	});

	it('should return a bolts chest with 5 bolts (case 2)', () => {
		randomSpy.mockReturnValueOnce(0.25);

		expect(getChestProps()).toEqual({
			variation: ChestVariations.BOLTS,
			gold: 0,
			hearts: 0,
			bolts: 5,
			armor: 0
		});
	});

	it('should return an armor chest with 1 armor', () => {
		randomSpy.mockReturnValueOnce(0.35);

		expect(getChestProps()).toEqual({
			variation: ChestVariations.ARMOR,
			gold: 0,
			hearts: 0,
			bolts: 0,
			armor: 1
		});
	});

	it('should return a coin chest with 10-19 gold', () => {
		randomSpy.mockReturnValueOnce(0.5);
		randomSpy.mockReturnValueOnce(0.25);

		expect(getChestProps()).toEqual({
			variation: ChestVariations.COIN,
			gold: 12,
			hearts: 0,
			bolts: 0,
			armor: 0
		});
	});

	it('should return exactly one reward type per chest', () => {
		randomSpy.mockReturnValue(0.5);

		const variationsByCase: ChestVariations[] = [
			ChestVariations.HEART,
			ChestVariations.BOLTS,
			ChestVariations.BOLTS,
			ChestVariations.ARMOR,
			ChestVariations.COIN,
			ChestVariations.COIN,
			ChestVariations.COIN,
			ChestVariations.COIN,
			ChestVariations.COIN,
			ChestVariations.COIN
		];

		for (let testCase = 0; testCase < 10; testCase += 1) {
			randomSpy.mockReturnValueOnce(testCase / 10);

			const props = getChestProps();
			const rewards = [props.gold, props.hearts, props.bolts, props.armor];

			expect(props.variation).toBe(variationsByCase[testCase]);
			expect(rewards.filter((reward) => reward > 0)).toHaveLength(1);
		}
	});
});
