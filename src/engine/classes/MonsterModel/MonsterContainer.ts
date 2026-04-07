import {getRandomNumber} from './../../utils/getRandomNumber';
import {GameEvents, MonsterAnimation, MonstersVariations, MoveDirections, WeaponVariations} from '../../enums';
import {HEALTH_BAR_CONFIG, MAX_VERTICAL_DISTANCE_TO_CHANGE_DIRECTION, MONSTER_INITIAL_SCALE, MONSTERS_PARAMS} from './constants';
import type {MonsterContainerProps} from './types';
import {Monster} from './Monster';
import {MainScene} from '../../scenes';
import {WeaponContainer} from '../Weapon/WeaponContainer';

export class MonsterContainer extends Phaser.GameObjects.Container {
    scene: MainScene;
    id: string;
    health: number;
    maxHealth: number;
    sculls: number;
    gold: number;
    healthBar: Phaser.GameObjects.Graphics;
    variation: MonstersVariations;
    monster: Monster;
    currentDirection: MoveDirections;
    weapon: WeaponContainer;
    weaponVariation: WeaponVariations;
    velocity: number;
    monsterAttacking: boolean;
    moveMonsterInterval: NodeJS.Timeout | null = null;
    flipX: boolean;
    player: false;

    constructor({
        scene,
        x,
        y,
        variation,
        id,
        health,
        maxHealth,
        sculls,
        gold
    }: MonsterContainerProps) {
        super(scene, x, y);
        this.scene = scene;
        this.id = id;
        // Чтобы понимать что это не игрок при создании оружия
        this.player = false;
        this.variation = variation;
         // Задаем размеры контейнера
 		this.setSize(36, 46);
        this.health = health;
        this.maxHealth = maxHealth;
        this.sculls = sculls;
        this.gold = gold;
        this.healthBar = this.scene.add.graphics();
        this.velocity = 10;
        this.monsterAttacking = false;
        this.weaponVariation = MONSTERS_PARAMS[this.variation].weaponVariation;
        this.currentDirection = MoveDirections.RIGHT;
        this.flipX = true;

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.createHealthBar();
        // создаем спрайт монстра
        this.monster = new Monster({
            scene: this.scene,
            x: 0,
            y: 0,
            variation,
            frame: '01'
        });
        this.add(this.monster);

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

        this.scene.time.delayedCall(1000, () => {
            this.moveMonster();
        }, [], this);
    }

    playMoveAnimation(){
        this.monster.playAnimation(MonsterAnimation.MOVE);
    }

    playDeathAnimation(){
        this.monster.playAnimation(MonsterAnimation.DEATH);
    }
    
    playGetHitAnimation(){
        this.monster.playAnimation(MonsterAnimation.GET_HIT);
    }
    
    playSpawnAnimation(){
        this.monster.playAnimation(MonsterAnimation.SPAWN);
        this.scene.time.delayedCall(1000, () => {
            this.playMoveAnimation();
        }, [], this);
    }

    createHealthBar() {
        const {height, width} = HEALTH_BAR_CONFIG;
        this.healthBar.fillStyle(0xe3e4ab, 1);
        // Подложка шкалы здоровья
        this.healthBar.fillRect(
            this.x - width / 2,
            this.y - this.height * MONSTER_INITIAL_SCALE - 2 * height,
            width,
            height
        );
        // Шкала здоровья
        this.healthBar.fillStyle(0x5f010a, 1);
        this.healthBar.fillRect(
            this.x - width / 2,
            this.y - this.height * MONSTER_INITIAL_SCALE - 2 * height,
            width * (this.health / this.maxHealth), 
            height
        );
    }
    
    updateHealthBar() {
        this.healthBar.clear();
        // При нулевом здоровье шкалу не показываем
        if (this.health) {
            this.createHealthBar();
        }
    }

    loseHealth(damage: number) {
        this.health = this.health - damage;
        this.playGetHitAnimation();

        if (this.health < 0) {
            this.health = 0
        }

        this.updateHealthBar();

        if (!this.health) {
            //@ts-expect-error ts не определяет нужный body
            this.body?.setVelocity(0);
            this.playDeathAnimation();
			// Чтобы успела отыграть анимация смерти
			this.scene.time.delayedCall(1000, () => {
                this.monster.stop();
                this.makeInactive();
				this.scene.events.emit(GameEvents.DESTROY_MONSTER, this.id);
			}, [], this);
        }
    }

    turnWeapon() {
		this.weapon.turnWeapon();
	}

    makeAttack() {
        this.monsterAttacking = true;
        this.weapon.setAttackMode();
		this.scene.time.delayedCall(this.weapon.attackTime, () => {
			this.weapon.setDefaultMode();
            this.monsterAttacking = false;
		}, [], this);
    }

    /** Проверяем, что игрок в зоне досягаемости оружия и атакуем */
    checkToMakeAttack() {
        if (
            this.health > 0
                && !this.monsterAttacking
                && !this.scene.player.damageCooldown
        ) {
            const distance = Phaser.Math.Distance.Between(
                this.x, this.y,
                this.scene.player.x, this.scene.player.y
            );

            if (distance < this.weapon.distance) {
                this.makeAttack();
            }
        }
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.updateHealthBar();

        if(this.body) {
            //@ts-expect-error ts не определяет нужный body
            this.body.checkCollision.none = false;
        }
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);

        if(this.body) {
            //@ts-expect-error ts не определяет нужный body
            this.body.checkCollision.none = true;
        }
    }

    goRight() {
        //@ts-expect-error ts не определяет нужный body
        this.body?.setVelocityX(this.velocity);
        this.monster.flipX = false;
    }

    goLeft() {
        //@ts-expect-error ts не определяет нужный body
        this.body?.setVelocityX(-this.velocity);
        this.monster.flipX = true;
    }

    goDown() {
       //@ts-expect-error ts не определяет нужный body
        this.body?.setVelocityY(this.velocity);
    }

    goTop() {
        //@ts-expect-error ts не определяет нужный body
        this.body?.setVelocityY(-this.velocity);
    }

    randomlyMove() {
        const randomPosition = getRandomNumber(1, 8);

        switch (randomPosition) {
            case 1: {
                this.goRight();
                this.currentDirection = MoveDirections.RIGHT;
                break;
            }
            case 2: {
                this.goLeft();
                this.currentDirection = MoveDirections.LEFT;
                break;
            }
            case 3: {
                this.goDown();
                this.currentDirection = this.monster.flipX
                    ? MoveDirections.LEFT_DOWN
                    : MoveDirections.RIGHT_DOWN;
                break;
            }
            case 4: {
                this.goTop();
                this.currentDirection = this.monster.flipX
                    ? MoveDirections.LEFT_UP
                    : MoveDirections.RIGHT_UP;
                break;
            }
            case 5: {
                this.goRight();
                this.goDown();
                this.currentDirection = MoveDirections.RIGHT_DOWN;
                break;
            }
            case 6: {
                this.goRight();
                this.goTop();
                this.currentDirection = MoveDirections.RIGHT_UP;
                break;
            }
            case 7: {
                this.goLeft();
                this.goDown();
                this.currentDirection = MoveDirections.LEFT_DOWN;
                break;
            }
            case 8: {
                this.goLeft();
                this.goTop();
                this.currentDirection = MoveDirections.LEFT_UP;
                break;
            }
            default:
                break;
        };
    };
    
    moveMonster() {
        this.moveMonsterInterval = setInterval(() => {
            if (this.health > 0) {
                const distance = Phaser.Math.Distance.Between(
                    this.x, this.y,
                    this.scene.player.x, this.scene.player.y
                );

                if (distance > MONSTERS_PARAMS[this.variation].sight) {
                    // если игрок не в поле зрения монстра, то монстр рандомно бродит
                    this.randomlyMove();
                } else {
                    // если игрок в поле зрения монстра, то монстр преследует игрока
                    this.scene.physics.moveToObject(this, this.scene.player, MONSTERS_PARAMS[this.variation].speed);
                    this.monster.flipX = this.scene.player.x < this.x;
                    const dx = this.scene.player.x - this.x;
                    const dy = this.scene.player.y - this.y;
                    const absDy = Math.abs(dy);
                    if (dx > 0) {
                        if (absDy < MAX_VERTICAL_DISTANCE_TO_CHANGE_DIRECTION) {
                            this.currentDirection = MoveDirections.RIGHT
                        } else {
                            this.currentDirection =  dy > 0
                                ? MoveDirections.RIGHT_DOWN
                                : MoveDirections.RIGHT_UP;
                        }
                    }
                    if (dx < 0) {
                        if (absDy < MAX_VERTICAL_DISTANCE_TO_CHANGE_DIRECTION) {
                            this.currentDirection = MoveDirections.LEFT
                        } else {
                            this.currentDirection = dy > 0
                                ? MoveDirections.LEFT_DOWN
                                : MoveDirections.LEFT_UP;
                        }
                    }
                }    
            }
        }, 1000);
    }

    update() {
        this.updateHealthBar();
        this.turnWeapon();
        this.checkToMakeAttack();
    }
}
