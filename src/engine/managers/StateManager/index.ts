import {
	setActiveWeapon,
	setArmor,
	setBolts,
	setGameOver as dispatchSetGameOver,
	setLevel,
	setMoney,
	setPaused as dispatchSetPaused,
	setPlayerHealth,
	setSculls,
	setZoom,
	requestRestart as dispatchRequestRestart
} from '../../../reducers/slices';
import type { WeaponVariations } from '../../enums';
import {MainScene} from '../../scenes/MainScene';
import type {StateManagerProps} from './types';

export class StateManager {
	scene: MainScene;

	constructor({scene}: StateManagerProps) {
		this.scene = scene;
	}

	// Настройки камеры
	setZoom(zoom: number) {
		this.scene.store.dispatch(setZoom(zoom));
	}

	// Управление параметрами игрока
	setSculls(sculls: number) {
		this.scene.store.dispatch(setSculls(sculls));
	}

	setLevel(level: number) {
		this.scene.store.dispatch(setLevel(level));
	}

	setGold(gold: number) {
		this.scene.store.dispatch(setMoney(gold));
	}

	setHealth(health: number) {
		this.scene.store.dispatch(setPlayerHealth(health));
	}

	setArmor(armor: number) {
		this.scene.store.dispatch(setArmor(armor));
	}
	
	setBolts(bolts: number) {
		this.scene.store.dispatch(setBolts(bolts));
	}

	setActiveWeapon(weapon: WeaponVariations) {
		this.scene.store.dispatch(setActiveWeapon(weapon));
	}

	/** Управление паузой и гейм-овером */
	setPaused(isPaused: boolean) {
		this.scene.store.dispatch(dispatchSetPaused(isPaused));
	}

	setGameOver() {
		this.scene.store.dispatch(dispatchSetGameOver());
	}

	requestRestart() {
		this.scene.store.dispatch(dispatchRequestRestart());
	}
}
