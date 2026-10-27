import {AtlasesKeys} from "../../enums";
import {MainScene} from "../../scenes";
import {MAP_OBJECTS_BLOCKERS} from "./constants";
import type {MapObjectProps} from "./types";
import {v4 as generateUUIDv4} from "uuid";

export class MapObject extends Phaser.Physics.Arcade.Sprite {
    scene: MainScene;
    isBlocker: boolean;
    id: string;

    constructor({scene, x, y, variation}: MapObjectProps) {
        super(scene, x, y, AtlasesKeys.MAP_OBJECTS, variation);
        this.scene = scene;
        this.id = `${variation}-${generateUUIDv4()}`;
        this.isBlocker = MAP_OBJECTS_BLOCKERS.includes(variation);

        // Включение физики: статическое тело — блокеры неподвижны и дешевле в обработке
        this.scene.physics.add.existing(this, true);
        // Добавление картинки объекта на сцену
        this.scene.add.existing(this);

        if (this.isBlocker) {
            this.scene.blockers.add(this);
        }
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