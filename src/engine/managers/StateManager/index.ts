import {setArmor, setBolts, setMoney, setPlayerHealth, setSculls, setZoom} from '../../../reducers/slices';
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
}
