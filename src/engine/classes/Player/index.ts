import {PlayerProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {PlayerSkinVariations} from '../../enums';
import { PLAYER_INITIAL_SCALE } from './constants';

export class Player extends Phaser.Physics.Arcade.Sprite {
	scene: MainScene;
	x: number;
	y: number;
	skin: PlayerSkinVariations
	velocity: number;

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

		// Скорость при движении игрока
		this.velocity = 160;
		// Подключаем игрока в физику
		this.scene.physics.world.enable(this);
		// Делаем чтобы игрока не двигали другие объекты
		this.setImmovable(false);
		// Настраиваем размер игрока
		this.setScale(PLAYER_INITIAL_SCALE);
		// Игрок не сможет зайти за карту
		this.setCollideWorldBounds(true);
		// Добавляем игрока на сцену
		this.scene.add.existing(this);
		// Настраиваем что камера следует за игроком
		this.scene.cameras.main.startFollow(this);
	}

	update() {}
}
