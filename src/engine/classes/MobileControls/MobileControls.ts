import {Z_INDEXES} from "../../constants/zindexes";
import {ButtonVariations} from "../../enums";
import type {ControlsScene} from "../../scenes/ControlsScene";
import {Button} from "./Button";
import type {MobileControlsProps} from "./types";

export class MobileControls extends Phaser.GameObjects.Container {
    scene: ControlsScene;
    x: number;
	y: number;
    buttons!: Record<ButtonVariations, Phaser.Physics.Arcade.Sprite | null>;

    constructor({
        scene
    }: MobileControlsProps) {
        super(scene);
        this.scene = scene;
        this.x = 0;
		this.y = 0;

        this.buttons = {
            [ButtonVariations.LEFT]: null,
            [ButtonVariations.RIGHT]: null,
            [ButtonVariations.UP]: null,
            [ButtonVariations.DOWN]: null,
            [ButtonVariations.ATTACK]: null
        };
        this.createButton(ButtonVariations.LEFT);
        this.createButton(ButtonVariations.RIGHT);
        this.createButton(ButtonVariations.UP);
        this.createButton(ButtonVariations.DOWN);
        this.createButton(ButtonVariations.ATTACK);

        // Задаем слой
        this.setDepth(Z_INDEXES.controls);
        // Закрепляет координаты относительно вьюпорта
        this.setScrollFactor(0, 0, true);
        // Добавляем игрока на сцену
        this.scene.add.existing(this);
    }

    createButton(variation: ButtonVariations) {
        if (this.buttons?.[variation]) {
            return;
        }

        this.buttons[variation] = new Button({
            scene: this.scene,
            variation
        });
        this.add(this.buttons[variation]);
    }
};