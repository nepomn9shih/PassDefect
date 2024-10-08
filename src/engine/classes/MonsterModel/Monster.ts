import { GameEvents } from '../../enums';
import {PLAYER_INITIAL_SCALE} from '../Player/constants';
import { HEALTH_BAR_CONFIG } from './constants';
import {MonsterProps} from './types';

export class Monster extends Phaser.Physics.Arcade.Image {
    id: string;
    health: number;
    maxHealth: number;
    healthBar: Phaser.GameObjects.Graphics;

    constructor({scene, x, y, type, id, health, maxHealth}: MonsterProps) {
        super(scene, x, y, type);
        this.scene = scene;
        this.id = id;
        this.health = health;
        this.maxHealth = maxHealth;
        this.healthBar = this.scene.add.graphics();

        this.scene.physics.world.enable(this);
        // Делает несдвигаемым
        this.setImmovable(false);
        this.setScale(PLAYER_INITIAL_SCALE);
        this.setCollideWorldBounds(true);
        this.scene.add.existing(this);
        this.createHealthBar();
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
        this.health && this.createHealthBar();
    }

    loseHealth(damage: number) {
        this.health = this.health - damage;

        if (this.health < 0) {
            this.health = 0
        }

        this.updateHealthBar();

        if (!this.health) {
            this.makeInactive();
            this.scene.events.emit(GameEvents.DESTROY_MONSTER, this.id);
        }
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.updateHealthBar();
        this.body && (this.body.checkCollision.none = false);
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body && (this.body.checkCollision.none = true);
    }
}
