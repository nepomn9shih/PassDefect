import {AtlasesKeys} from "../../enums";
import {MainScene} from "../../scenes";
import {SpawnerImageProps} from "./types";
import {v4 as generateUUIDv4} from "uuid";

export class SpawnerImage extends Phaser.Physics.Arcade.Sprite {
    scene: MainScene;
    id: string;

    constructor({scene, x, y, variation}: SpawnerImageProps) {
        super(scene, x, y, AtlasesKeys.SPAWNERS, variation);
        this.scene = scene;

        this.id = `${variation}-${generateUUIDv4()}`;
        // Включение физики
        this.scene.physics.world.enable(this);
        // Добавление картинки спавнера на сцену
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