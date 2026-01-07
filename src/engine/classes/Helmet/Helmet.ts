import {MainScene} from '../../scenes/MainScene';
import {HelmetsVariations} from '../../enums';
import {HELMET_INITIAL_SCALE, HELMETS_OFFSET} from './constants';
import type {HelmetProps} from './types';
import type {PlayerContainer} from '../Player/PlayerContainer';

/** Шлем на игроке или монстре (меняется в зависимости от уровня armor) */
export class Helmet extends Phaser.Physics.Arcade.Sprite {
	scene: MainScene;
	x: number;
	y: number;
	variation: HelmetsVariations;
	owner: PlayerContainer;
	helmetType: string;

	constructor({
		scene,
		x,
		y,
		variation,
		frame = '1',
		owner
	}: HelmetProps) {
		super(scene, x, y, variation, frame);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.variation = variation;
		this.owner = owner;
		this.helmetType = '1';
		this.updateType();

		// Подключаем шлем в физику
		this.scene.physics.world.enable(this);
		// Делаем чтобы не двигали другие объекты
		this.setImmovable(true);
		// Настраиваем размер
		this.setScale(HELMET_INITIAL_SCALE);
		// Если нет брони, то шлем не показываем
		this.updateHelmet();
	}

	updateType() {
		this.helmetType = this.owner.armor > 0 ? `${this.owner.armor}` : '1'
	}

	updateHelmet() {
		this.updateType();
		this.setFrame(this.helmetType);
		this.x = HELMETS_OFFSET[this.variation][this.helmetType]?.x | 0;
		this.y = HELMETS_OFFSET[this.variation][this.helmetType]?.y | 0;
		this.alpha = this.owner.armor > 0 ? 1 : 0;
	}
}
