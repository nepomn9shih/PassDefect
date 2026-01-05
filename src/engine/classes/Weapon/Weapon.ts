import type {WeaponProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {PlayerDirections, WeaponVariations} from '../../enums';
import {WEAPON_INITIAL_SCALE} from './constants';

export class Weapon extends Phaser.Physics.Arcade.Sprite {
	scene: MainScene;
	x: number;
	y: number;
	variation: WeaponVariations;
	direction: PlayerDirections;

	constructor({
		scene,
		x,
		y,
		variation,
		frame,
		direction
	}: WeaponProps) {
		super(scene, x, y, variation, frame);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.variation = variation;

		// Подключаем оружие в физику
		this.scene.physics.world.enable(this);
		// Делаем чтобы не двигали другие объекты
		this.setImmovable(true);
		// Настраиваем размер
		this.setScale(WEAPON_INITIAL_SCALE);
		this.alpha = 1;
	}

	setDirection(direction: PlayerDirections) {
		this.direction = direction;
	}
}
