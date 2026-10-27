import {getGameConfig} from '../getGameConfig';
import {Scene, Scale} from 'phaser';
import {GAME_PASS_DEFECT_ID} from '../../constants';
import {screenWidth, screenHeight} from '../../constants/zoom';

jest.mock('phaser', () => ({
	AUTO: 0,
	Scene: class {},
	Scale: {FIT: 5}
}));
jest.mock('phaser3-rex-plugins/plugins/gestures-plugin.js', () => ({
	__esModule: true,
	default: class {}
}));

(globalThis as {Phaser?: unknown}).Phaser = {
	AUTO: 0,
	Scale: {FIT: 5}
};

afterAll(() => {
	delete (globalThis as {Phaser?: unknown}).Phaser;
});

describe('getGameConfig', () => {
	const scenes = [new Scene(), new Scene()];
	const config = getGameConfig(scenes);

	it('should create a config with the passed scenes', () => {
		expect(config.scene).toBe(scenes);
	});

	it('should mount the game into the passed parent container', () => {
		expect(config.parent).toBe(GAME_PASS_DEFECT_ID);
		expect(config.scale?.parent).toBe(GAME_PASS_DEFECT_ID);
	});

	it('should use auto renderer, FIT mode and screen sizes', () => {
		expect(config.type).toBe(0);
		expect(config.scale?.mode).toBe(Scale.FIT);
		expect(config.scale?.width).toBe(screenWidth);
		expect(config.scale?.height).toBe(screenHeight);
	});

	it('should configure arcade physics without gravity and debug', () => {
		expect(config.physics?.default).toBe('arcade');
		expect(config.physics?.arcade).toEqual({gravity: {x: 0, y: 0}, debug: false});
	});

	it('should configure pixel art rendering without texture limit', () => {
		expect(config.maxTextures).toBe(-1);
		expect(config.pixelArt).toBe(true);
		expect(config.roundPixels).toBe(true);
	});

	it('should register the rexGestures gestures plugin', () => {
		const scenePlugins = (config.plugins as {scene?: unknown[]}).scene;

		expect(scenePlugins).toEqual([{
			key: 'rexGestures',
			plugin: expect.anything(),
			mapping: 'rexGestures'
		}]);
	});
});
