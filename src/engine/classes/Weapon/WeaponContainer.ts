import {MainScene} from '../../scenes/MainScene';
import {PlayerDirections, WeaponBoltsVariations, WeaponVariations} from '../../enums';
import {Weapon} from './Weapon';
import {WeaponBolt} from './WeaponBolt';
import {WEAPON_ATTACK_FRAME, WEAPON_BOLTS_FOR_WEAPON, WEAPON_BOLTS_OFFSET, WEAPON_DEFAULT_FRAME, WEAPON_OFFSET} from './constants';
import {WEAPONS_CONFIG} from './constants';
import type {WeaponContainerProps} from './types';
import type {PlayerContainer} from '../Player/PlayerContainer';

export class WeaponContainer extends Phaser.GameObjects.Container {
	scene: MainScene;
	x: number;
	y: number;
	weapon!: Weapon;
	weaponBolt!: WeaponBolt;
	weaponVariation: WeaponVariations;
	weaponBoltVariation: WeaponBoltsVariations;
	owner: PlayerContainer;
	damage: number;
	shotCost: number;
	attackTime: number;

	constructor({
		scene,
		x,
		y,
		weaponVariation,
		owner
	}: WeaponContainerProps) {
		super(scene, x, y);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.owner = owner;
		this.weaponVariation = weaponVariation;
		this.weaponBoltVariation = WEAPON_BOLTS_FOR_WEAPON[this.weaponVariation];
		this.damage = WEAPONS_CONFIG[this.weaponVariation].damage;
		this.shotCost = WEAPONS_CONFIG[this.weaponVariation].shotCost;
		this.attackTime = WEAPONS_CONFIG[this.weaponVariation].attackTime;
		 // Задаем размеры контейнера
 		this.setSize(36, 46);
		// Подключаем оружие в физику
		this.scene.physics.world.enable(this);
		// Добавляем оружие на сцену
		this.scene.add.existing(this);

		this.createWeaponBolt();
		this.createWeapon();
	}

	/** Создаем заряд оружия */
	createWeaponBolt() {
		this.weaponBolt = new WeaponBolt({
			scene: this.scene,
			x: WEAPON_BOLTS_OFFSET[this.weaponBoltVariation][this.owner.currentDirection].x,
			y: WEAPON_BOLTS_OFFSET[this.weaponBoltVariation][this.owner.currentDirection].y,
			variation: this.weaponBoltVariation,
			frame: '01',
			direction: this.owner.currentDirection,
			damage: this.damage
		});
		this.scene.weaponBolts.add(this.weaponBolt);
		this.add(this.weaponBolt);
	}

	/** Создаем изображение оружия в руках игрока */
	createWeapon() {
		this.weapon = new Weapon({
			scene: this.scene,
			x: WEAPON_OFFSET[this.weaponVariation][this.owner.currentDirection].x,
			y: WEAPON_OFFSET[this.weaponVariation][this.owner.currentDirection].y,
			variation: this.weaponVariation,
			direction: this.owner.currentDirection
		});
		this.scene.add.existing(this.weapon);
		this.add(this.weapon);
	}

	turnWeapon() {
		this.weaponBolt.setX(WEAPON_BOLTS_OFFSET[this.weaponBoltVariation][this.owner.currentDirection].x);
		this.weaponBolt.setY(WEAPON_BOLTS_OFFSET[this.weaponBoltVariation][this.owner.currentDirection].y);
		this.weapon.setX(WEAPON_OFFSET[this.weaponVariation][this.owner.currentDirection].x);
		this.weapon.setY(WEAPON_OFFSET[this.weaponVariation][this.owner.currentDirection].y);

		if (
			this.owner.currentDirection === PlayerDirections.RIGHT
		) {
			this.weaponBolt.setAngle(0).setFlipX(false);
			this.weapon.setAngle(0).setFlipX(false).setFlipY(false);
		}
		if (
			this.owner.currentDirection === PlayerDirections.LEFT
		) {
			this.weaponBolt.setAngle(0).setFlipX(true).setFlipY(false);
			this.weapon.setAngle(0).setFlipX(true).setFlipY(false);
		} 
		if (this.owner.currentDirection === PlayerDirections.RIGHT_UP) {
			this.weaponBolt.setAngle(270).setFlipX(false).setFlipY(false);
			this.weapon.setAngle(270).setFlipX(false).setFlipY(false);
		}
		if (this.owner.currentDirection === PlayerDirections.LEFT_UP) {
			this.weaponBolt.setAngle(270).setFlipX(false).setFlipY(true)
			this.weapon.setAngle(270).setFlipX(false).setFlipY(true);
		}
		if (this.owner.currentDirection === PlayerDirections.RIGHT_DOWN) {
			this.weaponBolt.setAngle(90).setFlipX(false).setFlipY(false);
			this.weapon.setAngle(90).setFlipX(false).setFlipY(false);
		}
		if (this.owner.currentDirection === PlayerDirections.LEFT_DOWN) {
			this.weaponBolt.setAngle(90).setFlipX(false).setFlipY(true)
			this.weapon.setAngle(90).setFlipX(false).setFlipY(true);
		}
	}

	/** Переводит оружие в атакующий режим */
	setAttackMode() {
		// Делает снаряд видимым
		this.weaponBolt.alpha = 1;
		// Меняет текстуру оружия на атакующую
		this.weapon.setFrame(WEAPON_ATTACK_FRAME);
	}

	/** Переводит оружие в обычный режим */
	setDefaultMode() {
		// Делает снаряд невидимым
		this.weaponBolt.alpha = 0;
		// Меняет текстуру оружия на обычную
		this.weapon.setFrame(WEAPON_DEFAULT_FRAME);
	}

	/** Смена оружия на другое */
	changeWeapon(newWeapon: WeaponVariations) {
		if (newWeapon !== this.weaponVariation) {
			// Пересоздаем оружие
			this.weaponVariation = newWeapon;
			this.damage = WEAPONS_CONFIG[this.weaponVariation].damage;
			this.shotCost = WEAPONS_CONFIG[this.weaponVariation].shotCost;
			this.attackTime = WEAPONS_CONFIG[this.weaponVariation].attackTime;
			this.weaponBoltVariation = WEAPON_BOLTS_FOR_WEAPON[this.weaponVariation];

			this.weapon.destroy();
			this.weaponBolt.destroy();

			this.createWeaponBolt();
			this.createWeapon();
		}
	}
}
