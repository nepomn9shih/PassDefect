import {PlayerContainerProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {PlayerAnimation, PlayerDirections, PlayerSkinVariations, WeaponVariations} from '../../enums';
import {Player} from './Player';
import {Weapon} from './Weapon';
import {WEAPON_OFFSET} from './constants';

export class PlayerContainer extends Phaser.GameObjects.Container {
	scene: MainScene;
	x: number;
	y: number;
	skin: PlayerSkinVariations
	velocity: number;
	health: number;
    maxHealth: number;
    id: string;
	player: Player;
	currentDirection: PlayerDirections;
	viewDirection: PlayerDirections.LEFT | PlayerDirections.RIGHT;
	playerAttacking: boolean;
	playerMoving: boolean;
	flipX: boolean;
	isHit: boolean;
	weapon: Weapon;
	weaponVariation: WeaponVariations;
	weaponHit: boolean;

	constructor({
		scene,
		x,
		y,
		skin,
		frame = '01',
		health,
		maxHealth,
		id
	}: PlayerContainerProps) {
		super(scene, x, y);
		this.scene = scene;
		this.x = x;
		this.y = y;

		this.health = health;
 		this.maxHealth = maxHealth;
 		this.id = id;
		// Скорость при движении игрока
		this.velocity = 160;
		this.currentDirection = PlayerDirections.RIGHT;
		this.viewDirection = PlayerDirections.RIGHT;
		this.weaponVariation = WeaponVariations.FLAME_GUN;
 		this.playerAttacking = false;
		this.flipX = true;
		// попало ли оружие по цели
		this.isHit = false;
		 // Задаем размеры контейнера
 		this.setSize(64, 64);
		// Подключаем игрока в физику
		this.scene.physics.world.enable(this);
		// Игрок не сможет зайти за карту
		// @ts-expect-error так как TS не понимает что это не StaticBody
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

		// Создаем оружие
		this.weapon = new Weapon({
			scene: this.scene,
			x: WEAPON_OFFSET[this.weaponVariation][this.currentDirection].x,
			y: WEAPON_OFFSET[this.weaponVariation][this.currentDirection].y,
			variation: this.weaponVariation,
			frame,
			direction: this.currentDirection
		});
		this.scene.add.existing(this.weapon);
		this.add(this.weapon);
	}

	turnWeapon() {
		this.weapon.setX(WEAPON_OFFSET[this.weaponVariation][this.currentDirection].x);
		this.weapon.setY(WEAPON_OFFSET[this.weaponVariation][this.currentDirection].y);

		if (
			this.currentDirection === PlayerDirections.RIGHT
			|| this.currentDirection === PlayerDirections.LEFT
		) {
			this.weapon.setAngle(0);
		} 
		if (this.currentDirection === PlayerDirections.UP) {
			this.weapon.setAngle(270);
		}
		if (this.currentDirection === PlayerDirections.DOWN) {
			this.weapon.setAngle(90);
		}
	}

	update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		// @ts-expect-error так как TS не понимает что это не StaticBody
		this.body?.setVelocity(0);

		if (
			cursors.left.isUp
			&& cursors.right.isUp
			&& cursors.up.isUp
			&& cursors.down.isUp
		) {
			this.playerMoving = false;
		}

		if (cursors.left.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body?.setVelocityX(-this.velocity);
			this.currentDirection = PlayerDirections.LEFT;
			this.viewDirection = PlayerDirections.LEFT;
			this.player.flipX = true; 
			this.playerMoving = true;
		} else if (cursors.right.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body.setVelocityX(this.velocity);
			this.currentDirection = PlayerDirections.RIGHT;
			this.viewDirection = PlayerDirections.RIGHT;
			this.player.flipX = false; 
			this.playerMoving = true;
		}
		if (cursors.up.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body.setVelocityY(-this.velocity);
			this.currentDirection = PlayerDirections.UP;
			this.playerMoving = true;
		} else if (cursors.down.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body.setVelocityY(this.velocity);
			this.currentDirection = PlayerDirections.DOWN;
			this.playerMoving = true;
		}

		this.turnWeapon();

		if (this.playerMoving) {
			if (
				this.viewDirection === PlayerDirections.LEFT
				|| this.viewDirection === PlayerDirections.RIGHT
			) {
				this.player.playAnimation(PlayerAnimation.MOVE);
			}
		}

		// Разворачивает оружие когда игрок повернут влево
		this.weapon.flipX = false;
		if (this.currentDirection === PlayerDirections.LEFT) {
			this.weapon.flipX = true;
 		}

		if (this.playerAttacking) {
			// что-то делаем во время атаки
		}

		// Разрешает игроку атаковать
 		if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
			this.weapon.alpha = 1;
			this.playerAttacking = true;
			this.scene.time.delayedCall(150, () => {
				this.weapon.alpha = 0;
				this.playerAttacking = false;
				this.weaponHit = false;
			}, [], this);
		}
	}  
}
