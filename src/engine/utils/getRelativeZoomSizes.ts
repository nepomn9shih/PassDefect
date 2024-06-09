export const getRelativeZoomSizes = (size: number, devicePixelRatio: number) => {
	return Math.round(size * devicePixelRatio * 100) / 100;
};