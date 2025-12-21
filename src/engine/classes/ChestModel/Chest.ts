import {ChestVariations} from "../../enums";
import {MainScene} from "../../scenes";
import {CHEST_INITIAL_SCALE} from "./constants";
import type {ChestProps} from "./types";

export class Chest extends Phaser.Physics.Arcade.Sprite {
    scene: MainScene;
    id: string;
    variation: ChestVariations;
    coins: number;
    hearts: number;
	bolts: number;
	armor: number;

    constructor({scene, x, y, key, coins, id, variation, hearts, bolts, armor}: ChestProps) {
        super(scene, x, y, key, variation);
        this.scene = scene;
        this.variation = variation;
        this.coins = coins;
        this.hearts = hearts;
		this.bolts = bolts;
		this.armor = armor;
        this.id = id;
        // Настраиваем размер ящика
        this.setScale(CHEST_INITIAL_SCALE);
        // Включение физики
        this.scene.physics.world.enable(this);
        // Добавление сундука на сцену
        this.scene.add.existing(this);
    }

    updateChest() {
        this.setFrame(this.variation);
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
    }
}