import { GameEvents } from '../../enums';
import {PLAYER_INITIAL_SCALE} from '../Player/constants';
import {MonsterProps} from './types';

export class Monster extends Phaser.Physics.Arcade.Image {
    id: string;
    health: number;
    maxHealth: number;

    constructor({scene, x, y, type, id, health, maxHealth}: MonsterProps) {
        super(scene, x, y, type);
        this.scene = scene;
        this.id = id;
        this.health = health;
        this.maxHealth = maxHealth;

        this.scene.physics.world.enable(this);
        // Делает несдвигаемым
        this.setImmovable(false);
        this.setScale(PLAYER_INITIAL_SCALE);
        this.setCollideWorldBounds(true);
        this.scene.add.existing(this);
    }

    loseHealth(damage: number) {
        this.health -= damage;

        if (this.health <= 0) {
            this.makeInactive();
            this.scene.events.emit(GameEvents.DESTROY_MONSTER, this.id);
        }
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.body && (this.body.checkCollision.none = false);
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body && (this.body.checkCollision.none = true);
    }
}
