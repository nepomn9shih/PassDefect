import {MainScene} from "../../scenes";
import {ChestProps} from "./types";

export class Chest extends Phaser.Physics.Arcade.Sprite {
    scene: MainScene;
    coins: number;
    id: string;

    constructor({scene, x, y, key, frame, coins, id}: ChestProps) {
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.coins = coins;
        this.id = id;
        // Включение физики
        this.scene.physics.world.enable(this);
        // Добавление сундука на сцену
        this.scene.add.existing(this);
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