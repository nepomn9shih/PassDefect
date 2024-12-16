import {getRandomNumber} from './../../utils/getRandomNumber';
import {GameEvents, MonsterAnimation, MonstersVariations} from '../../enums';
import {PLAYER_INITIAL_SCALE} from '../Player/constants';
import {HEALTH_BAR_CONFIG, MONSTERS_PARAMS} from './constants';
import {MonsterProps} from './types';
import { getMonsterAnimations } from './getMonsterAnimations';

export class Monster extends Phaser.Physics.Arcade.Sprite {
    id: string;
    health: number;
    maxHealth: number;
    healthBar: Phaser.GameObjects.Graphics;
    variation: MonstersVariations;

    constructor({scene, x, y, variation, id, health, maxHealth}: MonsterProps) {
        super(scene, x, y, variation);
        this.scene = scene;
        this.id = id;
        this.variation = variation;
        this.health = health;
        this.maxHealth = maxHealth;
        this.healthBar = this.scene.add.graphics();

        this.scene.physics.world.enable(this);
        this.createAnimations();
        // Делает несдвигаемым
        this.setImmovable(false);
        this.setScale(PLAYER_INITIAL_SCALE);
        this.setCollideWorldBounds(true);
        this.scene.add.existing(this);
        this.createHealthBar();
        this.playSpawnAnimation();

        this.scene.time.delayedCall(1000, () => {
            this.playMoveAnimation();
        }, [], this);
    }
   
    createAnimations() {
        const animations = getMonsterAnimations(this);
    
        Object.keys(animations).forEach((animation: MonsterAnimation) => this.anims.create(animations[animation]));
    }

    playMoveAnimation(){
        this.playAnimation(MonsterAnimation.MOVE);
    }

    playAnimation(animation: MonsterAnimation) {
        this.anims.play(animation);
    }

    playDeathAnimation(){
        this.playAnimation(MonsterAnimation.DEATH);
    }
    
    playGetHitAnimation(){
        this.playAnimation(MonsterAnimation.GET_HIT);
    }
    
    playSpawnAnimation(){
        this.playAnimation(MonsterAnimation.SPAWN);
    }

    createHealthBar() {
        const {height, width} = HEALTH_BAR_CONFIG;
        this.healthBar.fillStyle(0xe3e4ab, 1);
        // Подложка шкалы здоровья
        this.healthBar.fillRect(
            this.x - width / 2,
            this.y - this.width * PLAYER_INITIAL_SCALE / 2 - height,
            width,
            height
        );
        // Шкала здоровья
        this.healthBar.fillStyle(0x5f010a, 1);
        this.healthBar.fillRect(
            this.x - width / 2,
            this.y - this.width * PLAYER_INITIAL_SCALE / 2 - height,
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
            this.makeInactive();
            this.playDeathAnimation();
			// Чтобы успела отыграть анимация смерти
			this.scene.time.delayedCall(1000, () => {
                this.stop();
				this.scene.events.emit(GameEvents.DESTROY_MONSTER, this.id);
			}, [], this);
        }
    }

    makeDamage() {
        const {min, max} = MONSTERS_PARAMS[this.variation].attack;

        return getRandomNumber(min, max);
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.updateHealthBar();

        if(this.body) {
            this.body.checkCollision.none = false;
        }
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);

        if(this.body) {
            this.body.checkCollision.none = true;
        }
    }

    update() {
        this.updateHealthBar();
    }
}
