import {getPlayerLevel} from '../getPlayerLevel';

describe('getPlayerLevel', () => {
	it.each([
		[0, 1],
		[1, 1],
		[2, 2],
		[5, 2],
		[6, 3],
		[11, 3],
		[19, 4],
		[29, 5],
		[41, 6],
		[55, 7],
		[71, 8],
		[89, 9],
		[109, 10],
		[131, 11],
		[155, 12],
		[181, 13],
		[209, 14],
		[210, 15],
		[239, 15]
	])('should treat %i sculls as level %i', (sculls, expectedLevel) => {
		expect(getPlayerLevel(sculls)).toBe(expectedLevel);
	});

	it('should return 1 for values above the maximum threshold (current behavior)', () => {
		expect(getPlayerLevel(240)).toBe(1);
		expect(getPlayerLevel(100000)).toBe(1);
	});
});
