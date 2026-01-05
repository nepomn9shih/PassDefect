import {MainScene} from '../../scenes/MainScene';
import {PlayerDirections, WeaponBoltsVariations} from '../../enums';
import {WEAPON_BOLTS_INITIAL_SCALE} from './constants';
import type {WeaponBoltProps} from './types';

export class WeaponBolt extends Phaser.Physics.Arcade.Sprite {
	scene: MainScene;
	x: number;
	y: number;
	variation: WeaponBoltsVariations;
	direction: PlayerDirections;
	damage: number;

	constructor({
		scene,
		x,
		y,
		variation,
		frame,
		direction,
		damage
	}: WeaponBoltProps) {
		super(scene, x, y, variation, frame);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.variation = variation;
		this.damage = damage;

		// Подключаем оружие в физику
		this.scene.physics.world.enable(this);
		// Делаем чтобы не двигали другие объекты
		this.setImmovable(true);
		// Настраиваем размер
		this.setScale(WEAPON_BOLTS_INITIAL_SCALE);
		this.alpha = 0;
	}

	setDirection(direction: PlayerDirections) {
		this.direction = direction;
	}
}
