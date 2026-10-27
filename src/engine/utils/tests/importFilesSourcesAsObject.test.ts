import {importFilesSourcesAsObject} from '../importFilesSourcesAsObject';

describe('importFilesSourcesAsObject', () => {
	it('should collect images into an object keyed by file name', () => {
		const modules = {
			'./coin.png': 'coin-url',
			'./monster.jpg': 'monster-url',
			'./shield.jpeg': 'shield-url',
			'./heart.svg': 'heart-url'
		};

		expect(importFilesSourcesAsObject(modules)).toEqual({
			coin: {imgUrl: 'coin-url'},
			monster: {imgUrl: 'monster-url'},
			shield: {imgUrl: 'shield-url'},
			heart: {imgUrl: 'heart-url'}
		});
	});

	it('should collect json atlases with the jsonUrl key', () => {
		const modules = {
			'./monster-atlas.json': 'atlas-url'
		};

		expect(importFilesSourcesAsObject(modules)).toEqual({
			'monster-atlas': {jsonUrl: 'atlas-url'}
		});
	});

	it('should merge an image and its atlas into one entry regardless of module order', () => {
		const expected = {
			hero: {imgUrl: 'img-url', jsonUrl: 'json-url'}
		};

		expect(importFilesSourcesAsObject({'./hero.png': 'img-url', './hero.json': 'json-url'})).toEqual(expected);
		expect(importFilesSourcesAsObject({'./hero.json': 'json-url', './hero.png': 'img-url'})).toEqual(expected);
	});

	it('should ignore files with other extensions', () => {
		const modules = {
			'./data.txt': 'txt-url',
			'./loader.css': 'css-url',
			'./readme': 'no-ext-url'
		};

		expect(importFilesSourcesAsObject(modules)).toEqual({});
	});

	it('should keep the nested folder path in the key', () => {
		const modules = {
			'./images/coin.png': 'coin-url'
		};

		expect(importFilesSourcesAsObject(modules)).toEqual({
			'images/coin': {imgUrl: 'coin-url'}
		});
	});

	it('should return an empty object for an empty set of modules', () => {
		expect(importFilesSourcesAsObject({})).toEqual({});
	});
});
