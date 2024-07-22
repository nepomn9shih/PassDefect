import {PlayerContainerProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {PlayerSkinVariations} from '../../enums';
import { Player } from './Player';

export class PlayerContainer extends Phaser.GameObjects.Container {
	scene: MainScene;
	x: number;
	y: number;
	skin: PlayerSkinVariations
	velocity: number;
	player: Player;

	constructor({
		scene,
		x,
		y,
		skin,
		frame = '01'
	}: PlayerContainerProps) {
		super(scene, x, y);
		this.scene = scene;
		this.x = x;
		this.y = y;

		// Скорость при движении игрока
		this.velocity = 160;
		 // Задаем размеры контейнера
 		this.setSize(64, 64);
		// Подключаем игрока в физику
		this.scene.physics.world.enable(this);
		// Игрок не сможет зайти за карту
		// @ts-ignore так как TS не понимает что это не StaticBody
		this.body?.setCollideWorldBounds(true);
		// Добавляем игрока на сцену
		this.scene.add.existing(this);
		// Настраиваем что камера следует за игроком
		this.scene.cameras.main.startFollow(this);

		// создаем спрайт игрока
		this.player = new Player({
			scene: this.scene,
			x: 0,
			y: 0,
			skin,
			frame
		});
		this.add(this.player);
	}

	update() {}
}
