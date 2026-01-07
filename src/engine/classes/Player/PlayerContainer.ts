import type {PlayerContainerProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {GameEvents, PlayerAnimation, PlayerDirections, PlayerSkinVariations, WeaponVariations} from '../../enums';
import {Player} from './Player';
import {PlayerModel} from './PlayerModel';
import {WeaponContainer} from '../Weapon/WeaponContainer';
import {Helmet} from '../Helmet/Helmet';
import {HELMETS_FOR_SKIN} from '../Helmet/constants';
import { getPlayerLevel } from '../../utils/getPlayerLevel';
import { PLAYER_LEVEL_PARAMS } from '../../constants/player';

export class PlayerContainer extends Phaser.GameObjects.Container {
	scene: MainScene;
	x: number;
	y: number;
	skin: PlayerSkinVariations = PlayerSkinVariations.KNIGHT;
	sculls: number;
	level: number;
	velocity: number;
	health: number;
    maxHealth: number;
	gold: number;
    id: string;
	player: Player;
	currentDirection: PlayerDirections;
	viewDirection: PlayerDirections.LEFT | PlayerDirections.RIGHT;
	playerAttacking: boolean;
	playerMoving: boolean = false;
	flipX: boolean;
	isHit: boolean;
	weapon: WeaponContainer;
	helmet: Helmet;
	weaponVariation: WeaponVariations;
	weaponHit: boolean = false;
	bolts: number;
	maxBolts: number;
	armor: number;
	maxArmor: number;
	// если true то игрока только что ударили и пока нельзя ударить снова
	damageCooldown: boolean;

	constructor({
		scene,
		x,
		y,
		skin,
		frame = '01',
		health,
		maxHealth,
		gold,
		id,
		bolts,
		maxBolts,
		armor,
		maxArmor,
		sculls,
		level
	}: PlayerContainerProps) {
		super(scene, x, y);
		this.scene = scene;
		this.x = x;
		this.y = y;

		this.level = level;
		this.health = health;
 		this.maxHealth = maxHealth;
		this.gold = gold;
 		this.id = id;
		this.bolts = bolts;
		this.maxBolts = maxBolts;
		this.armor = armor;
		this.maxArmor = maxArmor;
		this.sculls = sculls;
		this.updateAllBars();
		// Скорость при движении игрока
		this.velocity = 160;
		this.currentDirection = PlayerDirections.RIGHT;
		this.viewDirection = PlayerDirections.RIGHT;
		this.weaponVariation = WeaponVariations.FLAME_GUN;
 		this.playerAttacking = false;
		this.damageCooldown = false;
		this.flipX = true;
		// попало ли оружие по цели
		this.isHit = false;
		 // Задаем размеры контейнера
 		this.setSize(36, 46);
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

		// создаем спрайт шлема игрока
		this.helmet = new Helmet({
			scene: this.scene,
			x: 0,
			y: 0,
			variation: HELMETS_FOR_SKIN[skin],
			frame: '1',
			owner: this
		});
		this.add(this.helmet);

		// Создаем оружие
		this.weapon = new WeaponContainer({
			scene: this.scene,
			x: 0,
			y: 0,
			weaponVariation: this.weaponVariation,
			owner: this
		});
		this.scene.add.existing(this.weapon);
		this.add(this.weapon);
		this.playSpawnAnimation();
	}

	updateHealthBar() {
		this.scene.stateManager.setHealth(this.health);
	}

	updateGoldBar() {
		this.scene.stateManager.setGold(this.gold);
	}

	updateArmorBar() {
		this.scene.stateManager.setArmor(this.armor);
	}

	updateBoltsBar() {
		this.scene.stateManager.setBolts(this.bolts);
	}

	updateScullsBar() {
		this.scene.stateManager.setSculls(this.sculls);
	}

	/** Обновляем все меню */
	updateAllBars() {
		this.updateHealthBar();
		this.updateGoldBar();
		this.updateArmorBar();
		this.updateBoltsBar();
		this.updateScullsBar();
	}

	/** Проверяем нужно ли поднять уровень */
	checkLevelUp() {
		const currentLevel = this.level;
		const newLevel = getPlayerLevel(this.sculls);
		
		if (currentLevel === newLevel) {
			return;
		}

		this.level = newLevel;
		this.scene.events.emit(GameEvents.LEVEL_UP_PLAYER, newLevel);
		const {maxHealth, maxBolts, maxArmor} = PLAYER_LEVEL_PARAMS[newLevel];
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.maxBolts = maxBolts;
		this.bolts = maxBolts;
		this.maxArmor = maxArmor;

		this.updateAllBars();
	}

	turnWeapon() {
		this.weapon.turnWeapon();
	}

	playDeathAnimation(){
		this.player.playAnimation(PlayerAnimation.DEATH);
	}

	playGetHitAnimation(){
		this.player.playAnimation(PlayerAnimation.GET_HIT);
	}

	playSpawnAnimation(){
		this.player.playAnimation(PlayerAnimation.SPAWN);
	}

	respawn(playerObject: PlayerModel) {
		this.health = playerObject.health;
		this.gold = playerObject.gold;
		this.bolts = playerObject.bolts;
		this.armor = playerObject.armor;
		this.sculls = playerObject.sculls;
		this.setPosition(playerObject.x, playerObject.y);
		this.playSpawnAnimation();
		this.updateAllBars();
	}

	healHealth(hearts: number) {
		const newHealth = this.health + hearts;

    	this.health = newHealth > this.maxHealth
			? this.maxHealth
			: newHealth;

        this.updateHealthBar();
	}

	loseBolts(count: number) {
		this.bolts -= count;
		this.updateBoltsBar();
	}

	loseArmor() {
		this.playSpawnAnimation();
		this.armor -= 1;
		this.updateArmorBar();
		this.helmet.updateHelmet();
	}

	loseHealth(damage: number) {
		this.damageCooldown = true;
		this.scene.time.delayedCall(1000, () => {
			this.damageCooldown = false;
		}, [], this);

		if (!this.armor) {
			this.health = this.health - damage;
			this.playGetHitAnimation();

			if (this.health < 0) {
				this.health = 0
			}

			this.updateHealthBar();

			if (!this.health) {
				this.scene.events.emit(GameEvents.DEATH_PLAYER, this.id);
				this.setActive(false);
				this.playDeathAnimation();
				// Чтобы успела отыграть анимация смерти
				this.scene.time.delayedCall(1000, () => {
					this.scene.events.emit(GameEvents.RESPAWN_PLAYER, this.id);
				}, [], this);  
			}
		} else {
			this.loseArmor();
		}
    }

	getGold(gold: number) {
        this.gold += gold;
		this.updateGoldBar();
    }

	getBolts(bolts: number) {
		const newBolts = this.bolts + bolts;

    	this.bolts = newBolts > this.maxBolts
			? this.maxBolts
			: newBolts;

        this.updateBoltsBar();
	}

	getArmor(armor: number) {
		const newArmor = this.armor + armor;

    	this.armor = newArmor > this.maxArmor
			? this.maxArmor
			: newArmor;

        this.updateArmorBar();
		this.helmet.updateHelmet();
	}

	getSculls(sculls: number) {
		const newSculls = this.sculls + sculls;
    	this.sculls = newSculls;

        this.updateScullsBar();
		this.checkLevelUp();
	}

	update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (!this.health) {
			return;
		}
		// @ts-expect-error так как TS не понимает что это не StaticBody
		this.body?.setVelocity(0);

		if (
			cursors.left.isUp
			&& cursors.right.isUp
			&& cursors.up.isUp
			&& cursors.down.isUp
		) {
			if (this.playerMoving) {
				this.playerMoving = false;
				this.player.stop();
			}
		} else {
			if (!this.playerMoving) {
				this.playerMoving = true;
				this.player.playAnimation(PlayerAnimation.MOVE);
			}
		}

		if (cursors.left.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body?.setVelocityX(-this.velocity);
			this.currentDirection = PlayerDirections.LEFT;
			this.viewDirection = PlayerDirections.LEFT;
			this.player.flipX = true;
			this.helmet.flipX = true;
		} else if (cursors.right.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body.setVelocityX(this.velocity);
			this.currentDirection = PlayerDirections.RIGHT;
			this.viewDirection = PlayerDirections.RIGHT;
			this.player.flipX = false;
			this.helmet.flipX = false;
		}
		if (cursors.up.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body.setVelocityY(-this.velocity);
			this.currentDirection = this.viewDirection === PlayerDirections.RIGHT
				? PlayerDirections.RIGHT_UP
				: PlayerDirections.LEFT_UP;
		} else if (cursors.down.isDown) {
			// @ts-expect-error так как TS не понимает что это не StaticBody
			this.body.setVelocityY(this.velocity);
			this.currentDirection = this.viewDirection === PlayerDirections.RIGHT
				? PlayerDirections.RIGHT_DOWN
				: PlayerDirections.LEFT_DOWN;
		}

		this.turnWeapon();

		if (this.playerAttacking) {
			// что-то делаем во время атаки
		}

		// Разрешает игроку атаковать
 		if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
			// Если недостаточно патронов для выстрела, то не атакуем
			if (this.bolts < this.weapon.shotCost) {
				return;
			}

			// Тратим нужное для выстрела количество патронов
			if (this.weapon.shotCost) {
				this.loseBolts(this.weapon.shotCost);
			}

			this.weapon.setAttackMode();
			this.playerAttacking = true;
			this.scene.time.delayedCall(this.weapon.attackTime, () => {
				this.weapon.setDefaultMode();
				this.playerAttacking = false;
				this.weaponHit = false;
			}, [], this);
		}
	}  
}
