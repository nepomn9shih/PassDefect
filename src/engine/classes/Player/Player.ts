import {PlayerProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {PlayerAnimation, PlayerSkinVariations} from '../../enums';
import {PLAYER_INITIAL_SCALE} from './constants';
import {getPlayerAnimations} from './getPlayerAnimations';

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
		skin,
		frame
	}: PlayerProps) {
		super(scene, x, y, skin, frame);
		this.scene = scene;
		this.skin = skin;
		this.x = x;
		this.y = y;

		// Подключаем игрока в физику
		this.scene.physics.world.enable(this);
		// Делаем чтобы игрока не двигали другие объекты
		this.setImmovable(true);
		// Настраиваем размер игрока
		this.setScale(PLAYER_INITIAL_SCALE);
		// Добавляем игрока на сцену
		this.scene.add.existing(this);

		this.createAnimations();
	}

	createAnimations() {
		const animations = getPlayerAnimations(this);
	
		Object.keys(animations).forEach((animation: PlayerAnimation) => this.anims.create(animations[animation]));
	}

	playAnimation(animation: PlayerAnimation) {
		this.anims.play(animation);
	}
}
