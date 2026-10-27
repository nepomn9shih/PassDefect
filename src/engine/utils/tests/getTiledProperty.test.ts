import {getTiledProperty} from '../getTiledProperty';

type TiledObject = Parameters<typeof getTiledProperty>[0];
type TiledProperty = {name: string; value: unknown};

const createTiledObject = (properties: TiledProperty[]): TiledObject =>
	({properties} as unknown as TiledObject);

describe('getTiledProperty', () => {
	it('should return the property value by name', () => {
		const obj = createTiledObject([
			{name: 'width', value: 32},
			{name: 'spawner', value: 'chest-spawner'},
			{name: 'isSolid', value: true}
		]);

		expect(getTiledProperty(obj, 'spawner')).toBe('chest-spawner');
		expect(getTiledProperty(obj, 'width')).toBe(32);
		expect(getTiledProperty(obj, 'isSolid')).toBe(true);
	});

	it('should return undefined when the property is missing', () => {
		const obj = createTiledObject([{name: 'width', value: 32}]);

		expect(getTiledProperty(obj, 'missing')).toBeUndefined();
	});

	it('should return undefined for an object without properties', () => {
		const obj = createTiledObject([]);

		expect(getTiledProperty(obj, 'width')).toBeUndefined();
	});

	it('should return the first match when property names are duplicated', () => {
		const obj = createTiledObject([
			{name: 'key', value: 1},
			{name: 'key', value: 2}
		]);

		expect(getTiledProperty(obj, 'key')).toBe(1);
	});
});
