import {rescaleHandler} from '../rescaleHandler';
import type {MainScene} from '../../scenes';

jest.mock('../../scenes', () => ({
	BootScene: class {},
	MainScene: class {}
}));
jest.mock('../../constants/zoom', () => ({
	DPR: 2
}));

type FakeParent = {width: number; height: number};
type FakeCanvas = {width: number; height: number; style: {width?: string; height?: string}};
type FakeScale = {parent?: FakeParent; canvas?: FakeCanvas; setGameSize: jest.Mock; setParentSize: jest.Mock};
type FakeScene = {parent: FakeParent; canvas: FakeCanvas; scale: FakeScale; scene: MainScene};

const setViewport = (width: number, height: number) => {
	Object.defineProperty(window, 'innerWidth', {configurable: true, value: width});
	Object.defineProperty(window, 'innerHeight', {configurable: true, value: height});
};

const createFakeScene = (withParentAndCanvas = true): FakeScene => {
	const parent: FakeParent = {width: 0, height: 0};
	const canvas: FakeCanvas = {width: 0, height: 0, style: {}};
	const scale: FakeScale = {
		parent: withParentAndCanvas ? parent : undefined,
		canvas: withParentAndCanvas ? canvas : undefined,
		setGameSize: jest.fn(),
		setParentSize: jest.fn()
	};

	return {parent, canvas, scale, scene: {scale} as unknown as MainScene};
};

describe('rescaleHandler', () => {
	afterEach(() => {
		delete (window as unknown as {innerWidth?: unknown}).innerWidth;
		delete (window as unknown as {innerHeight?: unknown}).innerHeight;
	});

	it('should scale the canvas by DPR and sync scene sizes', () => {
		setViewport(800, 600);
		const {parent, canvas, scale, scene} = createFakeScene();

		rescaleHandler(scene);

		expect(parent.width).toBe(800);
		expect(parent.height).toBe(600);
		expect(canvas.width).toBe(1600);
		expect(canvas.height).toBe(1200);
		expect(scale.setGameSize).toHaveBeenCalledWith(1600, 1200);
		expect(scale.setParentSize).toHaveBeenCalledWith(800, 600);
	});

	it('should round window and canvas sizes', () => {
		setViewport(799.6, 600.4);
		const {parent, canvas, scale, scene} = createFakeScene();

		rescaleHandler(scene);

		expect(parent.width).toBe(800);
		expect(parent.height).toBe(600);
		expect(canvas.width).toBe(1599);
		expect(canvas.height).toBe(1201);
		expect(scale.setGameSize).toHaveBeenCalledWith(1599, 1201);
		expect(scale.setParentSize).toHaveBeenCalledWith(799.6, 600.4);
	});

	it('should assign window sizes to canvas style (current implementation)', () => {
		setViewport(800, 600);
		const {canvas, scene} = createFakeScene();

		rescaleHandler(scene);

		expect(canvas.style.width).toBe('800 + px');
		expect(canvas.style.height).toBe('600 + px');
	});

	it('should not fail when the scene has no parent and canvas', () => {
		setViewport(800, 600);
		const {scale, scene} = createFakeScene(false);

		expect(() => rescaleHandler(scene)).not.toThrow();
		expect(scale.setGameSize).toHaveBeenCalledWith(1600, 1200);
		expect(scale.setParentSize).toHaveBeenCalledWith(800, 600);
	});
});
