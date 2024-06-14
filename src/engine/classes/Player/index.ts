import {PlayerProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {PlayerSkinVariations} from '../../enums';
import { PLAYER_INITIAL_SCALE } from './constants';

export class Player extends Phaser.Physics.Arcade.Sprite {
	scene: MainScene;
	x: number;
	y: number;
	skin: PlayerSkinVariations

	constructor({
		scene,
		x,
		y,
		skin
	}: PlayerProps) {
		super(scene, x, y, skin);
		this.scene = scene;
		this.x = x;
		this.y = y;

		// Сохраняем контекст для передачи внутрь функции
		const player = this;
		player.scale = PLAYER_INITIAL_SCALE;

		// Добавляем поле на сцену с картой
		this.scene.map.playerLayer?.add(player);
	}

	update() {}
}
