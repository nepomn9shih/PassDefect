import {getRelativeZoomSizes} from '../getRelativeZoomSizes';

describe('getRelativeZoomSizes', () => {
	it('should not change the size when DPR is 1', () => {
		expect(getRelativeZoomSizes(200, 1)).toBe(200);
	});

	it('should scale the size by devicePixelRatio', () => {
		expect(getRelativeZoomSizes(200, 1.25)).toBe(250);
		expect(getRelativeZoomSizes(3.5, 2)).toBe(7);
	});

	it('should return a fractional size unchanged when hundredths are exact', () => {
		expect(getRelativeZoomSizes(1.5, 1)).toBe(1.5);
	});

	it('should round hundredths up', () => {
		expect(getRelativeZoomSizes(0.05, 1.1)).toBe(0.06);
		expect(getRelativeZoomSizes(0.05, 1.3)).toBe(0.07);
	});

	it('should round hundredths down', () => {
		expect(getRelativeZoomSizes(0.05, 1.05)).toBe(0.05);
	});
});
